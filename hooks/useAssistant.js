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

  // Initialize analytics on mount
  useEffect(() => {
    initAnalytics();
  }, []);

  // Text-to-Speech - Try ElevenLabs first, fallback to Web Speech API
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

  // Use ElevenLabs if available, otherwise fallback to Web Speech API
  const ttsSupported = elevenLabsTTS.isSupported || webSpeechTTS.isSupported;
  const isSpeaking = elevenLabsTTS.isSpeaking || webSpeechTTS.isSpeaking;

  // Debug: Log ElevenLabs support status
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
    console.log('[Voice Assistant] 🎤 TTS Status Check:');
    console.log('  - ElevenLabs supported:', elevenLabsTTS.isSupported);
    console.log('  - Web Speech API supported:', webSpeechTTS.isSupported);
    console.log('  - API Key present:', !!apiKey);
    if (apiKey) {
      console.log('  - API Key length:', apiKey.length, 'characters');
      console.log('  - API Key starts with:', apiKey.substring(0, 5) + '...');
    } else {
      console.warn('  - ⚠️ API Key NOT FOUND!');
      console.warn(
        '  - Make sure NEXT_PUBLIC_ELEVENLABS_API_KEY is in .env.local'
      );
      console.warn('  - Restart dev server after adding to .env.local');
    }
    console.log(
      '  - Will use:',
      elevenLabsTTS.isSupported ? 'ElevenLabs' : 'Web Speech API'
    );
  }, [elevenLabsTTS.isSupported, webSpeechTTS.isSupported]);

  // Unified speak function
  const speak = useCallback(
    async (text, voiceParams = null) => {
      console.log('[Voice Assistant] Speaking:', text.substring(0, 50) + '...');
      console.log(
        '[Voice Assistant] ElevenLabs supported:',
        elevenLabsTTS.isSupported
      );

      if (elevenLabsTTS.isSupported) {
        // Use ElevenLabs for premium voice
        const toneProfile = voiceParams?.tone || 'default';
        const toneSettings =
          ELEVENLABS_CONFIG.toneProfiles[toneProfile] ||
          ELEVENLABS_CONFIG.toneProfiles.default;

        console.log(
          '[Voice Assistant] Using ElevenLabs TTS with tone:',
          toneProfile
        );

        try {
          await elevenLabsTTS.speak(text, {
            voiceId:
              ELEVENLABS_CONFIG.voices[ELEVENLABS_CONFIG.defaultVoice]?.id,
            ...toneSettings,
          });
          console.log(
            '[Voice Assistant] ✅ ElevenLabs TTS started successfully'
          );
        } catch (error) {
          console.warn(
            '[Voice Assistant] ⚠️ ElevenLabs failed, falling back to Web Speech API:',
            error
          );
          // Fallback to Web Speech API on error
          webSpeechTTS.speak(text, voiceParams);
        }
      } else {
        console.log(
          '[Voice Assistant] Using Web Speech API (ElevenLabs not available)'
        );
        // Fallback to Web Speech API
        webSpeechTTS.speak(text, voiceParams);
      }
    },
    [elevenLabsTTS, webSpeechTTS]
  );

  const stopSpeaking = useCallback(() => {
    if (elevenLabsTTS.isSupported) {
      elevenLabsTTS.stop();
    }
    webSpeechTTS.stop();
  }, [elevenLabsTTS, webSpeechTTS]);

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
    if (result.isFinal && correctedFinal && handleUserInputRef.current) {
      handleUserInputRef.current(correctedFinal);
    }
  }, []);

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
      console.log(
        '[Voice Assistant] No speech detected, restarting listening...'
      );
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
      console.warn('Recognition error:', error.error);
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
      // If we have a transcript, process it
      if (transcript && state === 'listening' && handleUserInputRef.current) {
        handleUserInputRef.current(transcript);
      } else if (state === 'listening') {
        // No transcript, but keep listening active (don't go idle)
        // Restart recognition to keep it ready for next question
        // Use longer delay to prevent rapid restarts
        console.log(
          '[Voice Assistant] Recognition ended, will restart after delay...'
        );
        const timeoutId = setTimeout(() => {
          // Double-check state before restarting
          if (state === 'listening' && startListeningRef.current) {
            startListeningRef.current();
          }
        }, 1500);

        // Store timeout to clear if needed
        return () => clearTimeout(timeoutId);
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
      console.log('[Permission] Already granted, skipping check');
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
      console.log(
        '[Permission] Requesting microphone access via getUserMedia...'
      );
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Success! Immediately stop tracks; we only need permission granted
      stream.getTracks().forEach(t => t.stop());
      micPermissionRef.current = true;
      console.log('[Permission] ✅ Microphone permission granted!');
      return true;
    } catch (err) {
      const errorName = err?.name || 'UnknownError';
      const errorMessage = err?.message || 'Permission denied';

      console.warn('[Permission] ❌ Error:', errorName, errorMessage);

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
            console.log(
              '[Permission] Permission state:',
              permissionStatus.state
            );

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
          console.log('[Permission] Permissions API check failed:', permError);
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
        console.error('[Permission] Unexpected error:', err);
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

      setState('processing');

      // Clear transcript immediately to prevent duplicate display
      setCurrentTranscript('');
      resetTranscript();

      // Add user message to conversation
      setConversation(prev => [
        ...prev,
        { type: 'user', text: userText, timestamp: Date.now() },
      ]);

      // Detect intent
      const intent = detectIntent(userText);
      const isFallback = intent === 'unknown';

      // Generate response
      const response = generateResponse(intent, userText);

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

      // Stop listening BEFORE speaking to prevent feedback loop and interruptions
      console.log('[Voice Assistant] Stopping recognition before speaking...');
      stopListening();

      // Ensure recognition is fully stopped before starting speech
      // Add a small delay to ensure clean state and prevent interruptions
      setTimeout(() => {
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
        setTimeout(() => {
          speak(response, voiceParams);
        }, ASSISTANT_CONFIG.behavior.responseDelay);
      }, 150);
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
    console.log('[Voice Assistant] AI tab clicked, current state:', state);

    if (state === 'idle') {
      console.log('[Voice Assistant] Requesting microphone permission...');
      setIsPanelOpen(true); // Open panel first so user can see what's happening

      // Reset welcome flag so welcome message plays
      hasWelcomedRef.current = false;

      const allowed = await requestMicPermission();
      console.log('[Voice Assistant] Permission result:', allowed);

      if (!allowed) {
        console.warn('[Voice Assistant] Microphone permission not granted');
        return; // Panel is already open, error message will be shown
      }

      // Permission granted - welcome message will play, then listening will start
      // Don't start listening here - let welcome message play first
      console.log(
        '[Voice Assistant] ✅ Permission granted! Welcome message will play, then listening will start.'
      );
      lastActivityRef.current = Date.now();
    } else if (state === 'listening') {
      console.log('[Voice Assistant] Stopping listening, going idle');
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
      console.log(
        '[Voice Assistant] Panel opened, preparing welcome message...'
      );
      hasWelcomedRef.current = true;
      const welcomeMessage = `Hey — I'm ${ASSISTANT_CONFIG.name}. You can ask me about my work, experience, projects, or book a call with me.`;

      // Add welcome message to conversation so it appears in the panel
      setConversation([
        { type: 'assistant', text: welcomeMessage, timestamp: Date.now() },
      ]);

      console.log('[Voice Assistant] Speaking welcome message...');
      // Stop any listening before speaking welcome message
      stopListening();
      setState('speaking');

      // Use friendly tone for welcome message
      const welcomeTone = getDynamicTone('greeting', welcomeMessage);
      const welcomeParams = getVoiceParams(welcomeTone);
      // Add tone name for ElevenLabs
      welcomeParams.tone = 'greeting';

      // For the initial welcome message, force Web Speech API in Chrome
      // This avoids any possible ElevenLabs/autoplay quirks and ensures
      // the user hears the greeting after clicking the AI tab.
      console.log(
        '[Voice Assistant] TTS ready, speaking welcome via Web Speech API...'
      );
      webSpeechTTS.speak(welcomeMessage, welcomeParams);
    } else if (isPanelOpen && !hasWelcomedRef.current && !ttsSupported) {
      // If TTS not supported, just start listening immediately
      console.log(
        '[Voice Assistant] TTS not supported, starting listening immediately...'
      );
      hasWelcomedRef.current = true;
      setState('listening');
      setTimeout(() => {
        startListening();
      }, 500);
    }
  }, [isPanelOpen, ttsSupported, speak, stopListening, startListening, webSpeechTTS]);

  // Stop listening when AI starts speaking (prevent feedback loop and interruptions)
  useEffect(() => {
    if (state === 'speaking' || isSpeaking) {
      console.log(
        '[Voice Assistant] AI is speaking - stopping recognition to prevent feedback and interruptions'
      );
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
      console.log(
        '[Voice Assistant] AI finished speaking - resuming listening'
      );
      setTimeout(() => {
        if (isPanelOpen) {
          setState('listening');
          // Clear any leftover transcripts
          setCurrentTranscript('');
          resetTranscript();
          // Small delay before starting recognition to ensure clean state
          setTimeout(() => {
            console.log(
              '[Voice Assistant] Starting listening after welcome message...'
            );
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
