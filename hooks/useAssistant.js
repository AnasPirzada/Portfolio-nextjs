import { useState, useCallback, useRef, useEffect } from 'react';
import {
  detectIntent,
  generateResponse,
  requiresAction,
  getBookingAction,
} from '@/utils/assistantIntents';
import { useVoiceRecognition } from './useVoiceRecognition';
import { useTextToSpeech } from './useTextToSpeech';
import { useElevenLabsTTS } from './useElevenLabsTTS';
import { useOpenAITTS } from './useOpenAITTS';
import { ELEVENLABS_CONFIG } from '@/constants/elevenlabs.config';
import { useWakeWord } from './useWakeWord';
import { ASSISTANT_CONFIG } from '@/constants/assistant.config';
import { openCalendlyPopup } from '@/utils/calendly';
import { initAnalytics, logInteraction } from '@/utils/assistantAnalytics';
import { getDynamicTone, getVoiceParams } from '@/utils/voiceTone';
import { correctText } from '@/utils/textCorrection';

/**
 * Main hook that orchestrates the voice assistant
 * Combines wake word detection, voice recognition, and TTS
 */
export const useAssistant = () => {
  const [state, setState] = useState('idle'); // idle, listening, processing, speaking
  const [conversation, setConversation] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const silenceTimeoutRef = useRef(null);
  const lastActivityRef = useRef(Date.now());
  const handleUserInputRef = useRef(null);
  const goIdleRef = useRef(null);
  const startListeningRef = useRef(null);
  const hasWelcomedRef = useRef(false);
  const micPermissionRef = useRef(false);
  const currentProcessingRef = useRef(null); // Track current processing to cancel if new input arrives
  const processingQueueRef = useRef([]); // Queue of pending inputs (only process latest)

  // Initialize analytics on mount
  useEffect(() => {
    initAnalytics();
  }, []);

  // Text-to-Speech - Priority: ElevenLabs (premium) > OpenAI TTS > Web Speech API
  const openAITTS = useOpenAITTS({
    voice: 'nova', // Bright, energetic voice (good for portfolio assistant)
    model: 'tts-1', // Fast, affordable model
    speed: 1.0,
  });

  const elevenLabsTTS = useElevenLabsTTS({
    voiceId: ELEVENLABS_CONFIG.voices[ELEVENLABS_CONFIG.defaultVoice]?.id,
    modelId: ELEVENLABS_CONFIG.model,
    ...ELEVENLABS_CONFIG.voiceSettings,
  });

  const webSpeechTTS = useTextToSpeech({
    rate: ASSISTANT_CONFIG.voice.rate,
    pitch: ASSISTANT_CONFIG.voice.pitch,
    volume: ASSISTANT_CONFIG.voice.volume,
    useDefaultVoice: ASSISTANT_CONFIG.voice.useDefaultVoice,
    preferredVoice: ASSISTANT_CONFIG.voice.preferredVoice,
  });

  // Use best available TTS (ElevenLabs > OpenAI > Web Speech API)
  const ttsSupported = elevenLabsTTS.isSupported || openAITTS.isSupported || webSpeechTTS.isSupported;
  const isSpeaking = elevenLabsTTS.isSpeaking || openAITTS.isSpeaking || webSpeechTTS.isSpeaking;

  // TTS Status
  useEffect(() => {
    const selectedTTS = elevenLabsTTS.isSupported 
      ? '🎤 ElevenLabs' 
      : openAITTS.isSupported 
        ? '🎤 OpenAI' 
        : '🎤 Web Speech';
  }, [openAITTS.isSupported, elevenLabsTTS.isSupported, webSpeechTTS.isSupported]);

  // Unified speak function - Priority: ElevenLabs > OpenAI TTS > Web Speech API
  const speak = useCallback(
    async (text, voiceParams = null) => {
      if (elevenLabsTTS.isSupported) {
        // Use ElevenLabs for premium voice (user preference)
        const toneProfile = voiceParams?.tone || 'default';
        const toneSettings =
          ELEVENLABS_CONFIG.toneProfiles[toneProfile] ||
          ELEVENLABS_CONFIG.toneProfiles.default;

        try {
          await elevenLabsTTS.speak(text, {
            voiceId: ELEVENLABS_CONFIG.voices[ELEVENLABS_CONFIG.defaultVoice]?.id,
            ...toneSettings,
          });
        } catch (error) {
          // Fallback to OpenAI TTS
          if (openAITTS.isSupported) {
            try {
              const voiceMap = {
                greeting: 'nova',
                projects: 'echo',
                experience: 'alloy',
                contact: 'shimmer',
                technical: 'onyx',
                default: 'nova',
              };
              const selectedVoice = voiceMap[voiceParams?.tone || 'default'];
              
              await openAITTS.speak(text, {
                voice: selectedVoice,
                model: 'tts-1',
                speed: 1.0,
              });
            } catch (e2) {
              webSpeechTTS.speak(text, voiceParams);
            }
          } else {
            webSpeechTTS.speak(text, voiceParams);
          }
        }
      } else if (openAITTS.isSupported) {
        // Use OpenAI TTS as fallback
        try {
          const voiceMap = {
            greeting: 'nova',
            projects: 'echo',
            experience: 'alloy',
            contact: 'shimmer',
            technical: 'onyx',
            default: 'nova',
          };
          const selectedVoice = voiceMap[voiceParams?.tone || 'default'];
          
          await openAITTS.speak(text, {
            voice: selectedVoice,
            model: 'tts-1',
            speed: 1.0,
          });
        } catch (error) {
          webSpeechTTS.speak(text, voiceParams);
        }
      } else {
        // Fallback to Web Speech API
        webSpeechTTS.speak(text, voiceParams);
      }
    },
    [elevenLabsTTS, openAITTS, webSpeechTTS]
  );

  const stopSpeaking = useCallback(() => {
    if (openAITTS.isSupported) {
      openAITTS.stop();
    }
    if (elevenLabsTTS.isSupported) {
      elevenLabsTTS.stop();
    }
    webSpeechTTS.stop();
  }, [openAITTS, elevenLabsTTS, webSpeechTTS]);

  // Create stable callbacks for voice recognition (using refs to avoid circular dependencies)
  const handleRecognitionResult = useCallback(result => {
    // Correct common speech recognition errors (e.g., "anus" -> "anas")
    const correctedFinal = result.finalTranscript
      ? correctText(result.finalTranscript)
      : '';
    const correctedInterim = result.interimTranscript
      ? correctText(result.interimTranscript)
      : '';

    setCurrentTranscript(correctedFinal || correctedInterim);
    lastActivityRef.current = Date.now();

    // Reset silence timeout
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
    }

    // Process final transcript immediately (with correction applied)
    // If user speaks while assistant is speaking/processing, interrupt and handle new input
    if (result.isFinal && correctedFinal && handleUserInputRef.current) {
      // Only interrupt if we're actually speaking (not just processing)
      // This prevents cancelling responses that are about to be spoken
      const currentState = state;
      const isCurrentlySpeaking = isSpeaking;
      
      // Always interrupt and handle new input - cancel previous processing/speaking
      if (currentState === 'speaking' || currentState === 'processing' || isCurrentlySpeaking) {
        stopSpeaking(); // Stop any current speech immediately
        
        // Always cancel previous processing when new input arrives
        if (currentProcessingRef.current) {
          currentProcessingRef.current.cancelled = true;
        }
        
        // Set state to processing for new input
        setState('processing');
      }
      
      // Always handle new input (don't skip it)
      handleUserInputRef.current(correctedFinal);
    }
  }, [state, isSpeaking, stopSpeaking]);

  const handleRecognitionError = useCallback(error => {
    // Handle "not-allowed" error gracefully - usually means mic permission not granted
    if (error.error === 'not-allowed') {
      // Don't log as error - this is expected if user hasn't granted mic permission
      // The browser will show its own permission prompt
      if (goIdleRef.current) {
        goIdleRef.current();
      }
      return;
    }

    // Handle "no-speech" error - restart listening instead of going idle
    // This keeps the assistant ready even after silence
    if (error.error === 'no-speech') {
      // Don't go idle - restart listening to keep it active
      setTimeout(() => {
        if (state === 'listening' && startListeningRef.current) {
          startListeningRef.current();
        }
      }, 1000);
      return;
    }

    // Ignore "aborted" errors (happen during normal operation)
    if (error.error === 'aborted') {
      return;
    }

    // Only log other errors
    if (
      error.error &&
      error.error !== 'not-allowed' &&
      error.error !== 'aborted' &&
      error.error !== 'no-speech'
    ) {
    }
  }, []);

  // Voice recognition
  const {
    isListening,
    transcript,
    interimTranscript,
    error: recognitionError,
    isSupported: recognitionSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useVoiceRecognition({
    continuous: ASSISTANT_CONFIG.recognition.continuous,
    interimResults: ASSISTANT_CONFIG.recognition.interimResults,
    lang: ASSISTANT_CONFIG.recognition.lang,
    onResult: handleRecognitionResult,
    onError: handleRecognitionError,
    onEnd: () => {
      // If we have a transcript, process it (but only if we're listening, not processing/speaking)
      if (transcript && state === 'listening' && !isSpeaking && handleUserInputRef.current) {
        // Only process if we're actually listening and not speaking/processing
        handleUserInputRef.current(transcript);
      } else if (state === 'listening' && !isSpeaking) {
        // No transcript, but keep listening active (don't go idle)
        // Restart recognition to keep it ready for next question
        // Use longer delay to prevent rapid restarts
        const timeoutId = setTimeout(() => {
          // Double-check state before restarting - don't restart if speaking/processing
          if (state === 'listening' && !isSpeaking && startListeningRef.current) {
            startListeningRef.current();
          }
        }, 1500);

        // Store timeout to clear if needed
        return () => clearTimeout(timeoutId);
      } else {
        // If we're speaking or processing, don't restart recognition
      }
    },
    enabled: state === 'listening',
  });

  // Store startListening in ref for wake word callback
  useEffect(() => {
    startListeningRef.current = startListening;
  }, [startListening]);

  // Request microphone permission before starting recognition
  const requestMicPermission = useCallback(async () => {
    // If already granted, return immediately
    if (micPermissionRef.current) {
      return true;
    }

    // Check if getUserMedia is available
    if (
      typeof navigator === 'undefined' ||
      !navigator.mediaDevices?.getUserMedia
    ) {
      setConversation(prev => [
        ...prev,
        {
          type: 'assistant',
          text: 'Microphone access is not supported in this browser. Please switch to Chrome, Edge, or Safari.',
          timestamp: Date.now(),
        },
      ]);
      return false;
    }

    // Always try getUserMedia directly - it's the most reliable way
    // Permissions API can be inaccurate, especially on localhost
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Success! Immediately stop tracks; we only need permission granted
      stream.getTracks().forEach(t => t.stop());
      micPermissionRef.current = true;
      return true;
    } catch (err) {
      const errorName = err?.name || 'UnknownError';
      const errorMessage = err?.message || 'Permission denied';


      // Check if it's a real permission denial or something else
      if (
        errorName === 'NotAllowedError' ||
        errorName === 'PermissionDeniedError'
      ) {
        // Try checking Permissions API for more details
        try {
          if (navigator.permissions?.query) {
            const permissionStatus = await navigator.permissions.query({
              name: 'microphone',
            });

            if (permissionStatus.state === 'denied') {
              setConversation(prev => [
                ...prev,
                {
                  type: 'assistant',
                  text: 'Microphone access was denied. Please click the lock icon (🔒) in your browser address bar, set Microphone to "Allow", then refresh the page and try again.',
                  timestamp: Date.now(),
                },
              ]);
              return false;
            }

            // If prompt, user might need to try again
            if (permissionStatus.state === 'prompt') {
              setConversation(prev => [
                ...prev,
                {
                  type: 'assistant',
                  text: 'Please allow microphone access when prompted. If no prompt appeared, check your browser settings.',
                  timestamp: Date.now(),
                },
              ]);
              return false;
            }
          }
        } catch (permError) {
        }

        // Fallback message
        setConversation(prev => [
          ...prev,
          {
            type: 'assistant',
            text: 'Microphone access was denied. Click the lock icon (🔒) in your browser address bar, set Microphone to "Allow", refresh the page, and click the AI tab again.',
            timestamp: Date.now(),
          },
        ]);
        return false;
      } else if (errorName === 'NotFoundError') {
        setConversation(prev => [
          ...prev,
          {
            type: 'assistant',
            text: 'No microphone found. Please connect a microphone and try again.',
            timestamp: Date.now(),
          },
        ]);
        return false;
      } else {
        // Other errors
        setConversation(prev => [
          ...prev,
          {
            type: 'assistant',
            text: `Microphone access error: ${errorName}. Please check your browser settings and try again.`,
            timestamp: Date.now(),
          },
        ]);
        return false;
      }
    }
  }, []);

  // Memoized wake callback to prevent infinite loops
  const handleWake = useCallback(() => {
    requestMicPermission().then(allowed => {
      if (!allowed) return;
      setIsPanelOpen(true);
      lastActivityRef.current = Date.now();

      // Reset welcome flag so welcome message plays when panel opens
      hasWelcomedRef.current = false;

      // Start listening after a brief delay to ensure wake word recognition has stopped
      setTimeout(() => {
        setState('listening');
        if (startListeningRef.current) {
          startListeningRef.current();
        }
      }, 200);
    });
  }, [requestMicPermission]);

  // Wake word detection
  const { isAwake, resetWake } = useWakeWord(ASSISTANT_CONFIG.wakePhrase, {
    minConfidence: ASSISTANT_CONFIG.behavior.minConfidence,
    onWake: handleWake,
    enabled: state === 'idle',
  });

  // Go idle state
  const goIdle = useCallback(() => {
    stopListening();
    stopSpeaking();
    setState('idle');
    setCurrentTranscript('');
    resetTranscript();
    resetWake();

    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
    }
  }, [stopListening, stopSpeaking, resetTranscript, resetWake]);

  // Process user input and generate response
  const handleUserInput = useCallback(
    async userText => {
      if (!userText.trim()) {
        goIdle();
        return;
      }

      // Create new processing context FIRST (before cancelling old one)
      // This ensures our processing ID is set before we check cancellations
      const processingId = Date.now();
      const previousProcessing = currentProcessingRef.current;
      currentProcessingRef.current = { id: processingId, cancelled: false };
      

      // ALWAYS cancel any ongoing processing/speaking when new input arrives
      // This prevents multiple responses from being spoken simultaneously
      if (previousProcessing && previousProcessing.id !== processingId) {
        previousProcessing.cancelled = true;
      }
      
      // Always stop any ongoing speech immediately
      if (isSpeaking || state === 'speaking') {
        stopSpeaking();
      }

      setState('processing');

      // Clear transcript immediately to prevent duplicate display
      setCurrentTranscript('');
      resetTranscript();

      // Add user message to conversation and get updated conversation for history
      let conversationHistory = [];
      setConversation(prev => {
        const updated = [
          ...prev,
          { type: 'user', text: userText, timestamp: Date.now() },
        ];
        
        // Get conversation history for LLM (limit to max history length)
        const maxHistory = ASSISTANT_CONFIG.llm?.maxHistoryLength || 5;
        conversationHistory = updated.slice(0, -1).slice(-maxHistory); // Exclude current message
        
        return updated;
      });

      // Process async (intent detection and response generation)
      try {
        // Check if cancelled before processing
        if (currentProcessingRef.current?.cancelled || currentProcessingRef.current?.id !== processingId) {
          return;
        }

        // Detect intent (async if using LLM, sync otherwise)
        const useLLM = ASSISTANT_CONFIG.llm?.useLLMForIntent || false;
        const intentResult = detectIntent(userText, useLLM);
        // Always await - Promise.resolve wraps non-promises, await unwraps promises
        const intent = await Promise.resolve(intentResult);
        
        // Check again if cancelled after intent detection
        if (currentProcessingRef.current?.cancelled || currentProcessingRef.current?.id !== processingId) {
          return;
        }
        
        const isFallback = intent === 'unknown';

        // Generate response (async - may use LLM)
        const response = await generateResponse(intent, userText, conversationHistory);
        
        // Check again if cancelled after response generation
        // Only cancel if ref exists and indicates cancellation
        if (currentProcessingRef.current) {
          if (currentProcessingRef.current.cancelled === true || 
              currentProcessingRef.current.id !== processingId) {
            return;
          }
        }

        // Log interaction for learning
        logInteraction(userText, intent, response, isFallback);

        // Add assistant response to conversation
        setConversation(prev => [
          ...prev,
          { type: 'assistant', text: response, timestamp: Date.now() },
        ]);

        // Check if action is required
        if (requiresAction(intent)) {
          const action = getBookingAction();
          if (action.type === 'open_calendly') {
            // Small delay before opening
            setTimeout(() => {
              openCalendlyPopup(action.url);
            }, ASSISTANT_CONFIG.behavior.responseDelay);
          }
        }

        // Capture the processing reference at this point to check cancellation
        const thisProcessing = currentProcessingRef.current;
        
        // Final check before speaking - check if THIS specific processing was cancelled
        // We check both the captured reference and the current ref
        if (thisProcessing?.cancelled === true || currentProcessingRef.current?.cancelled === true) {
          return;
        }
        
        // Only cancel if a NEW processing has definitely started (different ID and ref exists and not cancelled)
        // Don't cancel if ref was cleared or if it's our own processing
        if (currentProcessingRef.current && 
            currentProcessingRef.current.id && 
            currentProcessingRef.current.id !== processingId &&
            !currentProcessingRef.current.cancelled) {
          return;
        }
        
        // Also check if the captured processing ID doesn't match (meaning it was replaced)
        if (thisProcessing && thisProcessing.id !== processingId) {
          return;
        }
        

        // Stop listening BEFORE speaking to prevent feedback loop and interruptions
        stopListening();

        // Ensure recognition is fully stopped before starting speech
        // Add a small delay to ensure clean state and prevent interruptions
        setTimeout(() => {
          // Check if cancelled - be conservative but not too aggressive
          // Only cancel if ref exists and has different ID (new processing started)
          // OR if explicitly marked as cancelled
          if (currentProcessingRef.current) {
            // Check if this is a different processing (new one started)
            if (currentProcessingRef.current.id !== processingId) {
              return;
            }
            
            // Check if explicitly cancelled
            if (currentProcessingRef.current.cancelled === true) {
              return;
            }
          }
          
          // If ref doesn't exist, proceed (might be cleanup, but don't cancel valid responses)
          // If ref exists and ID matches and not cancelled, proceed

          // Set speaking state and speak with dynamic tone
          setState('speaking');

          // Get dynamic voice tone based on intent and response content
          const voiceTone = getDynamicTone(
            typeof intent === 'object' ? intent.type : intent,
            response
          );
          const voiceParams = getVoiceParams(voiceTone);
          // Add tone name for ElevenLabs (maps to tone profiles)
          const intentType = typeof intent === 'object' ? intent.type : intent;
          const toneMap = {
            greeting: 'greeting',
            projects: 'projects',
            experience: 'experience',
            contact: 'contact',
            technical: 'technical',
          };
          voiceParams.tone = toneMap[intentType] || 'default';

          // Small delay before speaking for confident delivery
          setTimeout(async () => {
            // Final check before actually speaking - be very conservative
            
            // Check if cancelled - only cancel if ref exists and indicates cancellation
            if (currentProcessingRef.current) {
              // Check if this is a different processing (new one started)
              if (currentProcessingRef.current.id !== processingId) {
                return;
              }
              
              // Check if explicitly cancelled
              if (currentProcessingRef.current.cancelled === true) {
                return;
              }
            }
            
            // If ref doesn't exist, proceed (might be cleanup, but don't cancel valid responses)
            // If ref exists and ID matches and not cancelled, proceed
            
            // Speak the response - use await to ensure it completes
            try {
              await speak(response, voiceParams);
            } catch (error) {
              // Even if speaking fails, go back to listening
              setTimeout(() => {
                if (currentProcessingRef.current?.id === processingId) {
                  setState('listening');
                  startListening();
                }
              }, 1000);
            }
          }, ASSISTANT_CONFIG.behavior.responseDelay);
        }, 150);
      } catch (error) {
        // Don't show error if processing was cancelled
        if (currentProcessingRef.current?.cancelled || currentProcessingRef.current?.id !== processingId) {
          return;
        }

        console.log('❌');
        
        // Show error message to user
        const errorMessage = "I'm having trouble processing that. Could you try again?";
        setConversation(prev => [
          ...prev,
          { type: 'assistant', text: errorMessage, timestamp: Date.now() },
        ]);
        
        // Go back to listening
        setTimeout(() => {
          if (currentProcessingRef.current?.id === processingId) {
            setState('listening');
            startListening();
          }
        }, 1000);
      } finally {
        // Clear processing ref if this was the current processing
        if (currentProcessingRef.current?.id === processingId) {
          currentProcessingRef.current = null;
        }
      }
    },
    [speak, resetTranscript, goIdle, stopListening]
  );

  // Store refs for use in callbacks (update after functions are defined)
  useEffect(() => {
    handleUserInputRef.current = handleUserInput;
    goIdleRef.current = goIdle;
    startListeningRef.current = startListening;
  }, [handleUserInput, goIdle, startListening]);

  // Manual activation (mic button click)
  const activate = useCallback(async () => {

    if (state === 'idle') {
      setIsPanelOpen(true); // Open panel first so user can see what's happening

      // Reset welcome flag so welcome message plays
      hasWelcomedRef.current = false;

      const allowed = await requestMicPermission();

      if (!allowed) {
        return; // Panel is already open, error message will be shown
      }

      // Permission granted - welcome message will play, then listening will start
      // Don't start listening here - let welcome message play first
      lastActivityRef.current = Date.now();
    } else if (state === 'listening') {
      goIdle();
    }
  }, [state, goIdle, requestMicPermission]);

  // Toggle panel
  const togglePanel = useCallback(() => {
    setIsPanelOpen(prev => !prev);
  }, []);

  // Welcome message when panel opens for the first time
  useEffect(() => {
    if (isPanelOpen && !hasWelcomedRef.current && ttsSupported) {
      hasWelcomedRef.current = true;
      const welcomeMessage = `Hey — I'm ${ASSISTANT_CONFIG.name}. You can ask me about my work, experience, projects, or book a call with me.`;

      // Add welcome message to conversation so it appears in the panel
      setConversation([
        { type: 'assistant', text: welcomeMessage, timestamp: Date.now() },
      ]);

      // Stop any listening before speaking welcome message
      stopListening();
      setState('speaking');

      // Use friendly tone for welcome message
      const welcomeTone = getDynamicTone('greeting', welcomeMessage);
      const welcomeParams = getVoiceParams(welcomeTone);
      // Add tone name for ElevenLabs/OpenAI TTS
      welcomeParams.tone = 'greeting';

      // Play audio immediately (no setTimeout) to maintain user interaction chain
      // This is critical for browser autoplay policies - audio must play in response to user click
      // Use unified speak function (will use ElevenLabs if available, then OpenAI TTS, then Web Speech API)
      // Play immediately to maintain user interaction context for autoplay
      speak(welcomeMessage, welcomeParams);
    } else if (isPanelOpen && !hasWelcomedRef.current && !ttsSupported) {
      // If TTS not supported, just start listening immediately
      hasWelcomedRef.current = true;
      setState('listening');
      setTimeout(() => {
        startListening();
      }, 500);
    }
  }, [isPanelOpen, ttsSupported, speak, stopListening, startListening, elevenLabsTTS.isSupported, openAITTS.isSupported]);

  // Stop listening when AI starts speaking (prevent feedback loop and interruptions)
  useEffect(() => {
    if (state === 'speaking' || isSpeaking) {
      stopListening();
      // Also cancel any pending recognition starts
      if (startListeningRef.current) {
        // Clear any pending timeouts that might restart recognition
        // This prevents recognition from restarting while speaking
      }
    }
  }, [state, isSpeaking, stopListening]);

  // Update state when speaking status changes
  useEffect(() => {
    if (state === 'speaking' && !isSpeaking) {
      // Finished speaking, go back to listening or idle
      setTimeout(() => {
        if (isPanelOpen) {
          setState('listening');
          // Clear any leftover transcripts
          setCurrentTranscript('');
          resetTranscript();
          // Small delay before starting recognition to ensure clean state
          setTimeout(() => {
            if (startListeningRef.current) {
              startListeningRef.current();
            }
          }, 500); // Increased delay to ensure speech is fully finished
        } else {
          goIdle();
        }
      }, 500);
    }
  }, [isSpeaking, state, isPanelOpen, goIdle, resetTranscript]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      stopListening();
      stopSpeaking();
    };
  }, [stopListening, stopSpeaking]);

  return {
    // State
    state, // idle, listening, processing, speaking
    isListening,
    isSpeaking,
    isAwake,
    isPanelOpen,
    conversation,
    currentTranscript,
    interimTranscript,

    // Errors
    recognitionError,
    recognitionSupported,
    ttsSupported,

    // Actions
    activate,
    goIdle,
    togglePanel,
  };
};
