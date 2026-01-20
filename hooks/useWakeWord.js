import { useState, useEffect, useRef, useCallback } from 'react';
import { correctText } from '@/utils/textCorrection';

/**
 * Custom hook for wake word detection
 * Monitors speech recognition for the wake phrase
 */
export const useWakeWord = (wakePhrase, options = {}) => {
  const { minConfidence = 0.7, onWake, enabled = true } = options;

  const [isAwake, setIsAwake] = useState(false);
  const [wakeWordDetected, setWakeWordDetected] = useState(false);
  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);
  const onWakeRef = useRef(onWake);
  const isRunningRef = useRef(false);
  const isCleaningUpRef = useRef(false);
  const hasNotAllowedErrorRef = useRef(false);

  // Store onWake in ref to avoid dependency issues
  useEffect(() => {
    onWakeRef.current = onWake;
  }, [onWake]);

  // Normalize text for comparison
  const normalizeText = useCallback(text => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, '');
  }, []);

  // Check if wake phrase is in transcript
  const checkWakePhrase = useCallback(
    transcript => {
      const normalizedTranscript = normalizeText(transcript);
      const normalizedWakePhrase = normalizeText(wakePhrase);

      // Check if wake phrase appears in transcript
      return normalizedTranscript.includes(normalizedWakePhrase);
    },
    [wakePhrase, normalizeText]
  );

  // Reset not-allowed error flag when enabled becomes true (allows retry after permissions granted)
  useEffect(() => {
    if (enabled && hasNotAllowedErrorRef.current) {
      // Reset the flag when enabled - allows wake word to try again
      hasNotAllowedErrorRef.current = false;
    }
  }, [enabled]);

  // Initialize continuous listening for wake word
  useEffect(() => {
    // Prevent multiple instances - also don't start if we've had a "not-allowed" error
    if (
      typeof window === 'undefined' ||
      !enabled ||
      isAwake ||
      isRunningRef.current ||
      isCleaningUpRef.current ||
      hasNotAllowedErrorRef.current
    ) {
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    // Mark as running to prevent duplicates
    isRunningRef.current = true;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = event => {
      let transcript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const rawTranscript = event.results[i][0].transcript;
        // Correct common speech recognition errors (e.g., "anus" -> "anas")
        transcript += correctText(rawTranscript);
      }

      const normalizedTranscript = normalizeText(transcript);

      // Check for wake phrase in recent results
      if (checkWakePhrase(normalizedTranscript)) {
        setWakeWordDetected(true);
        setIsAwake(true);

        // Mark as awake to prevent restarts
        isRunningRef.current = false;

        // Stop wake word recognition first
        try {
          recognition.stop();
        } catch (e) {
          // Ignore errors
        }

        // Call onWake after stopping recognition
        if (onWakeRef.current) {
          setTimeout(() => {
            onWakeRef.current();
          }, 100);
        }
      }
    };

    recognition.onerror = event => {
      // Handle 'not-allowed' - usually means another instance is running or mic not available
      if (event.error === 'not-allowed') {
        // Mark that we've had a not-allowed error - stop all attempts
        hasNotAllowedErrorRef.current = true;
        isRunningRef.current = false;

        // Stop recognition immediately
        try {
          recognition.stop();
        } catch (e) {
          // Ignore stop errors
        }

        // Clear ref so onend won't try to restart
        if (recognitionRef.current === recognition) {
          recognitionRef.current = null;
        }

        // Don't log to avoid console spam - this is a permission/conflict issue
        // User needs to grant mic permission or close conflicting instances
        return;
      }

      // Ignore 'no-speech' and 'aborted' errors during wake word detection
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        // Only log if not already awake (to avoid spam)
        if (!isAwake && event.error !== 'not-allowed') {
          console.warn('Wake word recognition error:', event.error);
        }
      }

      isRunningRef.current = false;
    };

    recognition.onend = () => {
      // Don't do anything if this isn't the current recognition instance
      if (recognitionRef.current !== recognition) {
        return;
      }

      isRunningRef.current = false;

      // Don't restart if we've had a "not-allowed" error - this will cause infinite loops
      if (hasNotAllowedErrorRef.current) {
        return;
      }

      // Don't restart if we're already awake, not enabled, cleaning up, or already running
      if (
        isAwake ||
        !enabled ||
        isCleaningUpRef.current ||
        isRunningRef.current
      ) {
        return;
      }

      // Clear any existing timeout first
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Wait before attempting restart to avoid conflicts
      timeoutRef.current = setTimeout(() => {
        // Don't restart if we've had a "not-allowed" error
        if (hasNotAllowedErrorRef.current) {
          return;
        }

        // Triple-check conditions before restarting - must still be the current instance
        if (
          recognitionRef.current === recognition &&
          !isAwake &&
          enabled &&
          !isCleaningUpRef.current &&
          !isRunningRef.current &&
          !hasNotAllowedErrorRef.current
        ) {
          try {
            isRunningRef.current = true;
            recognition.start();
          } catch (e) {
            isRunningRef.current = false;
            // If we get "not-allowed", mark it and stop
            if (
              e.message &&
              (e.message.includes('not-allowed') ||
                e.message.includes('NotAllowedError'))
            ) {
              hasNotAllowedErrorRef.current = true;
            }
            // Clear ref if we can't restart (another instance might have taken over)
            if (recognitionRef.current === recognition) {
              recognitionRef.current = null;
            }
          }
        }
      }, 1500); // Longer delay to avoid conflicts
    };

    // Start listening first, then set ref only if successful
    try {
      recognition.start();
      // Only set ref if start was successful
      recognitionRef.current = recognition;
    } catch (error) {
      isRunningRef.current = false;
      // If we get "not-allowed", mark it and don't try again
      if (
        error.message &&
        (error.message.includes('not-allowed') ||
          error.message.includes('NotAllowedError'))
      ) {
        hasNotAllowedErrorRef.current = true;
        return;
      }
      // Don't log if it's just "already started" or similar
      if (error.message && !error.message.includes('already')) {
        console.warn('Could not start wake word detection:', error);
      }
      return;
    }

    return () => {
      // Mark as cleaning up immediately to prevent restarts
      isCleaningUpRef.current = true;
      isRunningRef.current = false;

      // Clear any pending timeout immediately
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Only stop and clear if this is still the current recognition instance
      if (recognitionRef.current === recognition) {
        try {
          recognition.stop();
        } catch (e) {
          // Ignore errors when stopping (might be already stopped)
        }
        recognitionRef.current = null;
      }

      // Reset cleanup flag after a delay to allow new instances
      setTimeout(() => {
        isCleaningUpRef.current = false;
      }, 500);
    };
  }, [enabled, isAwake, wakePhrase, checkWakePhrase, normalizeText]);

  // Reset wake state
  const resetWake = useCallback(() => {
    setIsAwake(false);
    setWakeWordDetected(false);
  }, []);

  return {
    isAwake,
    wakeWordDetected,
    resetWake,
  };
};
