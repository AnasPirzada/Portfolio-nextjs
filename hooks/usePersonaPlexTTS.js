import { useState, useCallback, useRef, useEffect } from 'react';
import { PERSONAPLEX_CONFIG } from '@/constants/personaplex.config';

/**
 * Custom hook for Text-to-Speech using NVIDIA PersonaPlex via Hugging Face Inference API
 */
export const usePersonaPlexTTS = (options = {}) => {
  const {
    textPrompt = PERSONAPLEX_CONFIG.textPrompt.default,
    contextPrompt = null,
    temperature = PERSONAPLEX_CONFIG.model.temperature,
    maxLength = PERSONAPLEX_CONFIG.model.maxLength,
  } = options;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const audioRef = useRef(null);
  const currentAudioRef = useRef(null);

  // Check for API key
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hfApiKey = process.env.NEXT_PUBLIC_PERSONAPLEX_HF_API_KEY;
    const customApiUrl = process.env.NEXT_PUBLIC_PERSONAPLEX_API_URL;
    
    if (!hfApiKey && !customApiUrl) {
      console.warn('[PersonaPlex TTS] ❌ Not configured - API key or URL not found');
      console.warn('[PersonaPlex TTS] Set NEXT_PUBLIC_PERSONAPLEX_HF_API_KEY in .env.local');
      setIsSupported(false);
      return;
    }

    if (typeof Audio === 'undefined') {
      console.warn('[PersonaPlex TTS] ❌ HTMLAudioElement not available');
      setIsSupported(false);
      return;
    }

    setIsSupported(true);
    console.log('[PersonaPlex TTS] ✅ Ready');
  }, []);

  // Generate speech using PersonaPlex
  const speak = useCallback(
    async (text, voiceOptions = {}) => {
      if (!isSupported || !text) {
        console.warn('[PersonaPlex TTS] Not supported or no text provided');
        return;
      }

      const hfApiKey = process.env.NEXT_PUBLIC_PERSONAPLEX_HF_API_KEY;
      const customApiUrl = process.env.NEXT_PUBLIC_PERSONAPLEX_API_URL;

      // Stop any current audio
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }

      setIsLoading(true);
      setIsSpeaking(false);

      try {
        const finalTextPrompt = voiceOptions.contextPrompt || contextPrompt || textPrompt;

        if (customApiUrl) {
          // Use custom API endpoint
          console.log('[PersonaPlex TTS] Using custom API endpoint...');
          
          const response = await fetch(`${customApiUrl}/tts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(process.env.NEXT_PUBLIC_PERSONAPLEX_API_KEY && {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_PERSONAPLEX_API_KEY}`,
              }),
            },
            body: JSON.stringify({
              text,
              text_prompt: finalTextPrompt,
              temperature: voiceOptions.temperature ?? temperature,
              max_length: voiceOptions.maxLength ?? maxLength,
            }),
          });

          if (!response.ok) {
            throw new Error(`PersonaPlex API failed: ${response.status}`);
          }

          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          await playAudio(audioUrl);
        } else if (hfApiKey) {
          // Use Hugging Face Inference API
          console.log('[PersonaPlex TTS] Using Hugging Face Inference API...');
          
          // Note: Hugging Face Inference API may require different endpoint structure
          // This is a placeholder - actual implementation depends on PersonaPlex API format
          const response = await fetch(
            `https://api-inference.huggingface.co/models/${PERSONAPLEX_CONFIG.huggingFaceModel}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${hfApiKey}`,
              },
              body: JSON.stringify({
                inputs: text,
                parameters: {
                  text_prompt: finalTextPrompt,
                  temperature: voiceOptions.temperature ?? temperature,
                  max_length: voiceOptions.maxLength ?? maxLength,
                },
              }),
            }
          );

          if (!response.ok) {
            const errorText = await response.text().catch(() => '');
            throw new Error(`Hugging Face API failed: ${response.status} - ${errorText}`);
          }

          // Hugging Face returns audio as blob
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          await playAudio(audioUrl);
        } else {
          throw new Error('No API configuration found');
        }
      } catch (error) {
        console.error('[PersonaPlex TTS] ❌ Error:', error);
        setIsSpeaking(false);
        setIsLoading(false);
        throw error;
      }
    },
    [isSupported, textPrompt, contextPrompt, temperature, maxLength]
  );

  // Helper function to play audio
  const playAudio = async (audioUrl) => {
    const audio = new Audio(audioUrl);
    currentAudioRef.current = audio;
    audioRef.current = audio;

    audio.volume = 1.0;
    audio.muted = false;

    audio.onplay = () => {
      setIsSpeaking(true);
      setIsLoading(false);
      console.log('[PersonaPlex TTS] ✅ Started speaking');
    };

    audio.onended = () => {
      setIsSpeaking(false);
      URL.revokeObjectURL(audioUrl);
      currentAudioRef.current = null;
    };

    audio.onerror = (error) => {
      console.error('[PersonaPlex TTS] ❌ Audio playback error:', error);
      setIsSpeaking(false);
      setIsLoading(false);
      URL.revokeObjectURL(audioUrl);
      currentAudioRef.current = null;
    };

    await audio.play();
    console.log('[PersonaPlex TTS] ✅ Audio playing successfully');
  };

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
  };
};
