/**
 * OpenAI TTS Hook
 * High-quality, affordable text-to-speech using OpenAI's TTS API
 * 
 * Pricing: $15 per 1M characters (~$0.015 per 1000 chars)
 * For a 500-character response: ~$0.0075 (very cheap!)
 * 
 * Get API key: https://platform.openai.com/api-keys
 */

import { useState, useCallback, useRef, useEffect } from 'react';

export const useOpenAITTS = (options = {}) => {
  const {
    voice = 'alloy', // alloy, echo, fable, onyx, nova, shimmer
    model = 'tts-1', // tts-1 (fast) or tts-1-hd (higher quality)
    speed = 1.0, // 0.25 to 4.0
  } = options;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const audioRef = useRef(null);
  const currentAudioRef = useRef(null);

  // Available voices
  const voices = {
    alloy: 'Alloy - Neutral, balanced voice',
    echo: 'Echo - Clear, confident voice',
    fable: 'Fable - Warm, friendly voice',
    onyx: 'Onyx - Deep, authoritative voice',
    nova: 'Nova - Bright, energetic voice',
    shimmer: 'Shimmer - Soft, gentle voice',
  };

  // Check if OpenAI TTS is available
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    
    if (!apiKey) {
      setIsSupported(false);
      return;
    }

    if (typeof Audio === 'undefined') {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);
  }, []);

  // Get API key
  const getApiKey = useCallback(() => {
    return process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  }, []);

  // Play audio
  const playAudio = useCallback((audioUrl) => {
    return new Promise((resolve, reject) => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }

      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;
      audioRef.current = audio;

      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        resolve();
      };

      audio.onerror = (error) => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        reject(error);
      };

      audio.play().then(() => {
        setIsSpeaking(true);
      }).catch(reject);
    });
  }, []);

  // Speak text using OpenAI TTS
  const speak = useCallback(
    async (text, voiceOptions = {}) => {
      const apiKey = getApiKey();
      
      if (!isSupported || !text || !apiKey) {
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
        const selectedVoice = voiceOptions.voice || voice;
        const selectedModel = voiceOptions.model || model;
        const selectedSpeed = voiceOptions.speed || speed;


        const response = await fetch('https://api.openai.com/v1/audio/speech', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: selectedModel,
            input: text,
            voice: selectedVoice,
            speed: selectedSpeed,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text().catch(() => '');
          let errorMessage = `OpenAI TTS API error: ${response.status} ${response.statusText}`;
          
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.error?.message || errorMessage;
          } catch (e) {
            // Not JSON, use text as-is
            if (errorText) {
              errorMessage = errorText;
            }
          }

          throw new Error(errorMessage);
        }

        // Get audio blob
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        await playAudio(audioUrl);
      } catch (error) {
        setIsLoading(false);
        setIsSpeaking(false);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [isSupported, getApiKey, voice, model, speed, playAudio]
  );

  // Stop speaking
  const stop = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    setIsSpeaking(false);
    setIsLoading(false);
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    isLoading,
    isSupported,
    voices,
  };
};
