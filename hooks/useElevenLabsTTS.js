import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook for Text-to-Speech using ElevenLabs SDK
 * Provides premium, natural, and expressive voices
 */
export const useElevenLabsTTS = (options = {}) => {
  const {
    apiKey = null, // Will use environment variable if not provided
    voiceId = 'pNInz6obpgDQGcFmaJgB', // Adam - energetic male voice (default)
    modelId = 'eleven_turbo_v2_5', // Fast, high-quality model
    stability = 0.5, // Voice stability (0-1)
    similarityBoost = 0.75, // Voice similarity (0-1)
    style = 0.0, // Voice style exaggeration (0-1)
    useSpeakerBoost = true, // Enhance clarity
  } = options;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const audioRef = useRef(null);
  const currentAudioRef = useRef(null);

  // Get API key from environment or options
  const getApiKey = useCallback(() => {
    // First check if provided directly
    if (apiKey) {
      return apiKey;
    }

    // Then check environment variable (works on both server and client in Next.js)
    // Note: In Next.js, NEXT_PUBLIC_ variables are embedded at build time
    const envKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;

    if (envKey && envKey.trim()) {
      return envKey.trim();
    } else {
      // Debug: Show what we're looking for
      if (typeof window !== 'undefined') {
      }
    }

    return null;
  }, [apiKey]);

  // Initialize support flag (REST API + browser Audio)
  useEffect(() => {
    if (typeof window === 'undefined') return; // Server-side check

    const key = getApiKey();
    if (!key) {
      setIsSupported(false);
      return;
    }

    if (typeof Audio === 'undefined') {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);
  }, [getApiKey]);

  // Available premium voices (you can change these)
  const availableVoices = {
    // Energetic, active male voices
    adam: 'pNInz6obpgDQGcFmaJgB', // Adam - energetic, confident
    antoni: 'ErXwobaYiN019PkySvjV', // Antoni - clear, professional
    arnold: 'VR6AewLTigWG4xSOukaG', // Arnold - strong, confident
    bella: 'EXAVITQu4vr4xnSDxMaL', // Bella - warm, friendly
    domi: 'AZnzlk1XvdvUeBnXmlld', // Domi - energetic, expressive
    elli: 'MF3mGyEYCl7XYWbV9V6O', // Elli - calm, professional
    josh: 'TxGEqnHWrfWFTfGW9XjX', // Josh - energetic, young
    rachel: '21m00Tcm4TlvDq8ikWAM', // Rachel - professional, clear
    sam: 'yoZ06aMxZJJb4fAWl0nY', // Sam - energetic, friendly
  };

  // Speak text using ElevenLabs REST API (browser-side fetch)
  const speak = useCallback(
    async (text, voiceOptions = {}) => {
      const key = getApiKey();
      if (!isSupported || !text || !key) {
        return;
      }


      // Stop any current audio
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }

      setIsLoading(true);
      setIsSpeaking(false);

      try {
        // Use provided voice or default
        const selectedVoiceId = voiceOptions.voiceId || voiceId;
        const selectedModelId = voiceOptions.modelId || modelId;


        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'audio/mpeg',
              'xi-api-key': key,
            },
            body: JSON.stringify({
              text,
              model_id: selectedModelId,
              voice_settings: {
                stability: voiceOptions.stability ?? stability,
                similarity_boost:
                  voiceOptions.similarityBoost ?? similarityBoost,
                style: voiceOptions.style ?? style,
                use_speaker_boost:
                  voiceOptions.useSpeakerBoost ?? useSpeakerBoost,
              },
            }),
          }
        );

        if (!response.ok) {
          const errText = await response.text().catch(() => '');
          throw new Error(
            `ElevenLabs REST TTS failed: ${response.status} ${response.statusText}`
          );
        }

        const audioBuffer = await response.arrayBuffer();


        // Convert ArrayBuffer to Blob
        const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Create audio element and play
        const audio = new Audio(audioUrl);
        currentAudioRef.current = audio;
        audioRef.current = audio;

        // Set volume explicitly (ensure it's not muted)
        audio.volume = 1.0;
        audio.muted = false;
        
        // Preload audio to ensure it's ready
        audio.preload = 'auto';
        
        // Set autoplay attribute (helps with some browsers)
        audio.setAttribute('autoplay', '');

        // Set up event handlers
        audio.onplay = () => {
          setIsSpeaking(true);
          setIsLoading(false);
        };

        audio.onended = () => {
          setIsSpeaking(false);
          setIsLoading(false);
          URL.revokeObjectURL(audioUrl);
          currentAudioRef.current = null;
          // Remove from DOM if we added it
          if (audio.parentNode) {
            audio.parentNode.removeChild(audio);
          }
        };

        audio.onerror = error => {
          setIsSpeaking(false);
          setIsLoading(false);
          URL.revokeObjectURL(audioUrl);
          currentAudioRef.current = null;
          // Remove from DOM if we added it
          if (audio.parentNode) {
            audio.parentNode.removeChild(audio);
          }
        };

        audio.onloadeddata = () => {
        };

        // Wait for audio to be ready before playing
        audio.oncanplaythrough = () => {
        };

        // Play audio - handle autoplay policy
        // Since user has already interacted (clicked AI tab or said "hi anas"), autoplay should work
        const attemptPlay = async () => {
          try {
            // Ensure audio is loaded
            if (audio.readyState < 2) {
              await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                  reject(new Error('Audio load timeout'));
                }, 5000);

                audio.oncanplaythrough = () => {
                  clearTimeout(timeout);
                  resolve();
                };

                audio.onerror = err => {
                  clearTimeout(timeout);
                  reject(err);
                };
              });
            }

            // Ensure audio is not muted and volume is set
            audio.volume = 1.0;
            audio.muted = false;
            
            // Add audio to DOM (some browsers require this for autoplay)
            if (!audio.parentNode && typeof document !== 'undefined') {
              audio.style.display = 'none';
              document.body.appendChild(audio);
            }

            // Check if audio can actually play
            if (audio.paused) {
              
              const playPromise = audio.play();
              
              if (playPromise !== undefined) {
                await playPromise;
                // Verify it's actually playing after a short delay
                setTimeout(() => {
                  const isPlaying = !audio.paused && audio.currentTime > 0;
                  
                  if (!isPlaying) {
                    // Add a one-time click handler to unlock audio
                    const unlockAudio = () => {
                      if (audio && audio.paused) {
                        audio.play().catch(() => {});
                      }
                      document.removeEventListener('click', unlockAudio);
                      document.removeEventListener('touchstart', unlockAudio);
                    };
                    
                    document.addEventListener('click', unlockAudio, { once: true });
                    document.addEventListener('touchstart', unlockAudio, { once: true });
                  }
                }, 200);
              }
            } else {
            }
          } catch (error) {
            // Try once more after a short delay (sometimes helps with browser policies)
            setTimeout(async () => {
              try {
                audio.volume = 1.0;
                audio.muted = false;
                await audio.play();
              } catch (retryError) {
                setIsSpeaking(false);
                setIsLoading(false);
              }
            }, 200);
          }
        };

        attemptPlay();
      } catch (error) {
        setIsSpeaking(false);
        setIsLoading(false);
        throw error;
      }
    },
    [isSupported, voiceId, modelId, stability, similarityBoost, style, useSpeakerBoost, getApiKey]
  );

  // Stop speaking
  const stop = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
      setIsSpeaking(false);
      setIsLoading(false);
    }
  }, []);

  // Pause speaking
  const pause = useCallback(() => {
    if (currentAudioRef.current && !currentAudioRef.current.paused) {
      currentAudioRef.current.pause();
    }
  }, []);

  // Resume speaking
  const resume = useCallback(() => {
    if (currentAudioRef.current && currentAudioRef.current.paused) {
      currentAudioRef.current.play();
    }
  }, []);

  return {
    isSpeaking,
    isLoading,
    isSupported,
    speak,
    stop,
    pause,
    resume,
    availableVoices,
  };
};
