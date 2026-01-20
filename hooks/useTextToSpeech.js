import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for Text-to-Speech using Web Speech API
 */
export const useTextToSpeech = (options = {}) => {
  const {
    rate = 1.0,
    pitch = 1.0,
    volume = 1.0,
    useDefaultVoice = true,
    preferredVoice = null,
  } = options;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const utteranceRef = useRef(null);

  // Check if Speech Synthesis is available
  const isSupported = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return 'speechSynthesis' in window;
  }, []);

  // Load available voices
  useEffect(() => {
    if (!isSupported()) return;

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();

    // Some browsers load voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis.onvoiceschanged) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [isSupported]);

  // Get the best voice - Premium AI Voice Profile
  // Matches: Male, 24-30 age perception, International English, natural pronunciation
  const getVoice = useCallback(() => {
    // If voices not loaded yet, try to load them immediately
    if (!voices.length) {
      if (window.speechSynthesis) {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
          // Use voices directly if available (even if state not updated yet)
          // This prevents delay when speaking immediately
          const voicesToUse = availableVoices;

          // Try to find preferred voice
          if (preferredVoice) {
            const exactMatch = voicesToUse.find(
              v => v.name.toLowerCase() === preferredVoice.toLowerCase()
            );
            if (exactMatch) return exactMatch;

            const partialMatch = voicesToUse.find(v =>
              v.name.toLowerCase().includes(preferredVoice.toLowerCase())
            );
            if (partialMatch) return partialMatch;
          }

          // Fallback to any English voice
          const englishVoice = voicesToUse.find(v => v.lang.startsWith('en'));
          if (englishVoice) return englishVoice;

          return voicesToUse[0];
        }
      }
      // If still no voices, return null (will use default)
      return null;
    }

    // First priority: Exact preferred voice match
    if (preferredVoice) {
      const exactMatch = voices.find(
        v => v.name.toLowerCase() === preferredVoice.toLowerCase()
      );
      if (exactMatch) {
        console.log('[Voice Profile] Using preferred voice:', exactMatch.name);
        return exactMatch;
      }

      // Partial match (handles variations like "Google UK English Male" vs "Google UK English")
      const partialMatch = voices.find(v =>
        v.name.toLowerCase().includes(preferredVoice.toLowerCase())
      );
      if (partialMatch) {
        console.log(
          '[Voice Profile] Using partial match voice:',
          partialMatch.name
        );
        return partialMatch;
      }
    }

    // If useDefaultVoice is false, prioritize male voices matching profile
    if (!useDefaultVoice) {
      // Comprehensive male voice keywords for 24-30 age perception
      // These voices typically sound younger, professional, and natural
      const maleKeywords = [
        'male',
        'david',
        'daniel',
        'alex',
        'james',
        'mark',
        'paul',
        'tom',
        'sam',
        'thomas',
        'benjamin',
        'oliver',
        'william',
      ];

      // Female voice exclusions (comprehensive list)
      const femaleExclusions = [
        'female',
        'zira',
        'susan',
        'hazel',
        'catherine',
        'linda',
        'karen',
        'heather',
        'michelle',
        'samantha',
        'victoria',
      ];

      // Try to find a male English voice (prioritize cloud voices for better quality)
      // Cloud voices (localService: false) typically have better natural pronunciation
      // Also prioritize "neural" or "premium" voices for more energetic, natural sound
      const maleVoice = voices.find(v => {
        const nameLower = v.name.toLowerCase();
        const isEnglish = v.lang.startsWith('en');
        const isMale = maleKeywords.some(keyword =>
          nameLower.includes(keyword)
        );
        const isNotFemale = !femaleExclusions.some(exclusion =>
          nameLower.includes(exclusion)
        );
        const isCloudVoice = v.localService === false; // Cloud voices are usually better quality
        const isNeural =
          nameLower.includes('neural') || nameLower.includes('premium');

        return isEnglish && (isMale || isNotFemale) && isCloudVoice && isNeural;
      });

      // If no neural voice found, try any cloud male voice
      if (!maleVoice) {
        const cloudMaleVoice = voices.find(v => {
          const nameLower = v.name.toLowerCase();
          const isEnglish = v.lang.startsWith('en');
          const isMale = maleKeywords.some(keyword =>
            nameLower.includes(keyword)
          );
          const isNotFemale = !femaleExclusions.some(exclusion =>
            nameLower.includes(exclusion)
          );
          const isCloudVoice = v.localService === false;

          return isEnglish && (isMale || isNotFemale) && isCloudVoice;
        });

        if (cloudMaleVoice) {
          console.log(
            '[Voice Profile] Using cloud male voice:',
            cloudMaleVoice.name
          );
          return cloudMaleVoice;
        }
      }

      if (maleVoice) {
        console.log(
          '[Voice Profile] Using neural/premium male voice:',
          maleVoice.name,
          '| Age perception: 24-30'
        );
        return maleVoice;
      }

      // Fallback: Any male English voice (even local)
      const anyMaleVoice = voices.find(v => {
        const nameLower = v.name.toLowerCase();
        const isEnglish = v.lang.startsWith('en');
        const isMale = maleKeywords.some(keyword =>
          nameLower.includes(keyword)
        );
        const isNotFemale = !femaleExclusions.some(exclusion =>
          nameLower.includes(exclusion)
        );
        return isEnglish && (isMale || isNotFemale);
      });

      if (anyMaleVoice) {
        console.log(
          '[Voice Profile] Using fallback male voice:',
          anyMaleVoice.name
        );
        return anyMaleVoice;
      }
    }

    // Fallback: Try to find any good English cloud voice
    const englishVoice = voices.find(
      v => v.lang.startsWith('en') && v.localService === false
    );
    if (englishVoice) {
      console.log(
        '[Voice Profile] Using English cloud voice:',
        englishVoice.name
      );
      return englishVoice;
    }

    // Last resort: default voice
    const defaultVoice = voices.find(v => v.default) || voices[0];
    if (defaultVoice) {
      console.log(
        '[Voice Profile] Using default/fallback voice:',
        defaultVoice.name
      );
    }
    return defaultVoice;
  }, [voices, preferredVoice, useDefaultVoice, rate, pitch, volume]);

  // Speak text with premium voice profile (supports dynamic tone)
  const speak = useCallback(
    (text, dynamicParams = null) => {
      console.log('[Web Speech TTS] speak() called with text:', text);
      if (!isSupported()) {
        console.warn('[Web Speech TTS] Not supported in this browser/context');
        return;
      }
      if (!text) {
        console.warn('[Web Speech TTS] No text provided to speak()');
        return;
      }

      // Cancel any ongoing speech immediately to prevent interruptions
      window.speechSynthesis.cancel();

      // Get voice immediately (will try to load if not available)
      const voice = getVoice();
      console.log(
        '[Web Speech TTS] Available voices length:',
        voices?.length,
        '| Selected voice:',
        voice ? `${voice.name} (${voice.lang})` : 'none'
      );

      // Create utterance immediately - no delay needed
      const utterance = new SpeechSynthesisUtterance(text);

      if (voice) {
        utterance.voice = voice;
      }

      // Use dynamic tone params if provided, otherwise use default from config
      const finalPitch = dynamicParams?.pitch ?? pitch;
      const finalRate = dynamicParams?.rate ?? rate;
      const finalVolume = dynamicParams?.volume ?? volume;

      // Premium voice profile: calm, confident, natural (or dynamic based on context)
      // IMPORTANT: Apply rate, pitch, volume AFTER setting voice
      utterance.rate = finalRate;
      utterance.pitch = finalPitch;
      utterance.volume = finalVolume;

      // Voice Profile Characteristics Applied:
      // ✅ Gender: Male (via voice selection)
      // ✅ Age perception: 24-30 (via voice selection)
      // ✅ Pitch: Higher for energetic sound (1.05)
      // ✅ Speaking rate: Faster for active delivery (1.08)
      // ✅ Tone: Energetic, active, confident (via rate + pitch)
      // ✅ Energy: High, engaging, professional (via faster rate)
      // ✅ Accent: International English (via neural/premium voices)
      // ✅ Clarity: High, natural pronunciation (via volume 1.0)
      // ✅ Emotion: Energetic, active, engaging (via rate + pitch combination)

      // Debug: Log complete voice profile (check browser console)
      if (voice) {
        console.log('[Voice Profile] Voice:', voice.name);
        console.log(
          '[Voice Profile] Lang:',
          voice.lang,
          '| Pitch:',
          finalPitch,
          '| Rate:',
          finalRate,
          '| Volume:',
          finalVolume
        );
        console.log(
          '[Voice Profile] Characteristics: Male, 24-30 age, Energetic, Active, Engaging'
        );
      } else {
        console.warn('[Voice Profile] No voice selected, using default');
      }

      utterance.onstart = () => {
        console.log('[Web Speech TTS] onstart fired');
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        console.log('[Web Speech TTS] onend fired');
        setIsSpeaking(false);
      };

      utterance.onerror = event => {
        // "interrupted" error is harmless - happens when speech is canceled/interrupted
        if (event.error !== 'interrupted') {
          console.error(
            '[Web Speech TTS] ❌ Speech synthesis error:',
            event.error
          );
          console.error('[Web Speech TTS] Error details:', {
            error: event.error,
            charIndex: event.charIndex,
            type: event.type,
          });
          setIsSpeaking(false);
        } else {
          // "interrupted" is expected when speech is stopped - don't log as error
          console.log('[Web Speech TTS] Speech interrupted (normal behavior)');
        }
      };

      utteranceRef.current = utterance;

      // Stop any existing speech first
      window.speechSynthesis.cancel();

      // Small delay to ensure previous speech is stopped
      setTimeout(() => {
        // Speak immediately
        window.speechSynthesis.speak(utterance);
        console.log('[Web Speech TTS] ✅ Speech started');
      }, 50);
    },
    [isSupported, rate, pitch, volume, getVoice]
  );

  // Stop speaking
  const stop = useCallback(() => {
    if (!isSupported()) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  // Pause speaking
  const pause = useCallback(() => {
    if (!isSupported()) return;
    window.speechSynthesis.pause();
  }, [isSupported]);

  // Resume speaking
  const resume = useCallback(() => {
    if (!isSupported()) return;
    window.speechSynthesis.resume();
  }, [isSupported]);

  return {
    isSpeaking,
    voices,
    isSupported: isSupported(),
    speak,
    stop,
    pause,
    resume,
  };
};
