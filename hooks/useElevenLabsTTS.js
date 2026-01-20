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
      console.log('[ElevenLabs TTS] ✅ API key provided directly');
      return apiKey;
    }

    // Then check environment variable (works on both server and client in Next.js)
    // Note: In Next.js, NEXT_PUBLIC_ variables are embedded at build time
    const envKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;

    if (envKey && envKey.trim()) {
      console.log('[ElevenLabs TTS] ✅ API key found in environment variable');
      console.log('[ElevenLabs TTS] Key length:', envKey.length, 'characters');
      return envKey.trim();
    } else {
      // Debug: Show what we're looking for
      if (typeof window !== 'undefined') {
        console.warn(
          '[ElevenLabs TTS] ⚠️ API key not found in environment variable'
        );
        console.warn(
          '[ElevenLabs TTS] process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY:',
          process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY
        );
        console.warn(
          '[ElevenLabs TTS] Available NEXT_PUBLIC_ vars:',
          Object.keys(process.env)
            .filter(k => k.startsWith('NEXT_PUBLIC_'))
            .join(', ')
        );
        console.warn(
          '[ElevenLabs TTS] 💡 SOLUTION: Restart your dev server after adding to .env.local'
        );
      }
    }

    return null;
  }, [apiKey]);

  // Initialize support flag (REST API + browser Audio)
  useEffect(() => {
    if (typeof window === 'undefined') return; // Server-side check

    const key = getApiKey();
    if (!key) {
      console.warn('[ElevenLabs TTS] ❌ Not supported - API key not found');
      console.warn('[ElevenLabs TTS] Setup instructions:');
      console.warn('  1. Create .env.local in project root');
      console.warn(
        '  2. Add: NEXT_PUBLIC_ELEVENLABS_API_KEY=your_api_key_here'
      );
      console.warn('  3. Restart dev server: npm run dev');
      setIsSupported(false);
      return;
    }

    if (typeof Audio === 'undefined') {
      console.warn(
        '[ElevenLabs TTS] ❌ Not supported - HTMLAudioElement not available'
      );
      setIsSupported(false);
      return;
    }

    setIsSupported(true);
    console.log('[ElevenLabs TTS] ✅ REST TTS ready (browser Audio + API key)');
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
        console.warn(
          '[ElevenLabs TTS] Not supported or no text provided',
          {
            isSupported,
            hasText: !!text,
            hasKey: !!key,
          }
        );
        return;
      }

      console.log('[ElevenLabs TTS] ✅ Starting REST TTS request...');

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

        console.log('[ElevenLabs TTS] Requesting audio via REST...', {
          voiceId: selectedVoiceId,
          modelId: selectedModelId,
          textLength: text.length,
        });

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
          console.error(
            '[ElevenLabs TTS] ❌ REST request failed:',
            response.status,
            response.statusText,
            errText
          );
          throw new Error(
            `ElevenLabs REST TTS failed: ${response.status} ${response.statusText}`
          );
        }

        const audioBuffer = await response.arrayBuffer();

        console.log(
          '[ElevenLabs TTS] ✅ Audio received | Size:',
          audioBuffer.byteLength,
          'bytes'
        );

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

        // Set up event handlers
        audio.onplay = () => {
          setIsSpeaking(true);
          setIsLoading(false);
          console.log(
            '[ElevenLabs TTS] ✅ Started speaking | Volume:',
            audio.volume,
            '| Muted:',
            audio.muted
          );
        };

        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
          currentAudioRef.current = null;
          console.log('[ElevenLabs TTS] ✅ Finished speaking');
        };

        audio.onerror = error => {
          console.error('[ElevenLabs TTS] ❌ Audio playback error:', error);
          setIsSpeaking(false);
          setIsLoading(false);
          URL.revokeObjectURL(audioUrl);
          currentAudioRef.current = null;
        };

        audio.onloadeddata = () => {
          console.log(
            '[ElevenLabs TTS] Audio loaded | Duration:',
            audio.duration,
            's'
          );
        };

        // Wait for audio to be ready before playing
        audio.oncanplaythrough = () => {
          console.log('[ElevenLabs TTS] Audio ready to play');
        };

        // Play audio - handle autoplay policy
        // Since user has already interacted (clicked AI tab or said "hi anas"), autoplay should work
        const attemptPlay = async () => {
          try {
            // Ensure audio is loaded
            if (audio.readyState < 2) {
              console.log('[ElevenLabs TTS] Waiting for audio to load...');
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

            const playPromise = audio.play();
            if (playPromise !== undefined) {
              await playPromise;
              console.log('[ElevenLabs TTS] ✅ Audio playing successfully');
            }
          } catch (error) {
            console.error('[ElevenLabs TTS] ❌ Play error:', error);
            // Try once more after a short delay (sometimes helps with browser policies)
            setTimeout(() => {
              audio.play().catch(retryError => {
                console.error(
                  '[ElevenLabs TTS] ❌ Retry play failed:',
                  retryError
                );
                setIsSpeaking(false);
                setIsLoading(false);
              });
            }, 100);
          }
        };

        attemptPlay();
      } catch (error) {
        console.error('[ElevenLabs TTS] ❌ Error:', error);
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
      console.log('[ElevenLabs TTS] Stopped speaking');
    }
  }, []);

  // Pause speaking
  const pause = useCallback(() => {
    if (currentAudioRef.current && !currentAudioRef.current.paused) {
      currentAudioRef.current.pause();
      console.log('[ElevenLabs TTS] Paused speaking');
    }
  }, []);

  // Resume speaking
  const resume = useCallback(() => {
    if (currentAudioRef.current && currentAudioRef.current.paused) {
      currentAudioRef.current.play();
      console.log('[ElevenLabs TTS] Resumed speaking');
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
