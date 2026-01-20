import { useState, useEffect, useRef, useCallback } from 'react';
import { correctText } from '@/utils/textCorrection';

/**
 * Custom hook for Web Speech API Speech Recognition
 * Handles continuous listening and transcription
 */
export const useVoiceRecognition = (options = {}) => {
  const {
    continuous = true,
    interimResults = true,
    lang = 'en-US',
    onResult,
    onError,
    onEnd,
    enabled = false,
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef('');

  // Check if Speech Recognition is available
  const isSupported = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    return !!SpeechRecognition;
  }, []);

  // Initialize recognition
  useEffect(() => {
    if (typeof window === 'undefined' || !isSupported()) {
      setError(
        new Error('Speech Recognition is not supported in this browser')
      );
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = lang;
    recognition.maxAlternatives = 1;

    // Event handlers
    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      finalTranscriptRef.current = '';
    };

    recognition.onresult = event => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        // Correct common speech recognition errors (e.g., "anus" -> "anas")
        const correctedTranscript = correctText(transcript);

        if (event.results[i].isFinal) {
          final += correctedTranscript + ' ';
        } else {
          interim += correctedTranscript;
        }
      }

      finalTranscriptRef.current += final;
      setTranscript(finalTranscriptRef.current.trim());
      setInterimTranscript(interim);

      if (onResult) {
        onResult({
          finalTranscript: finalTranscriptRef.current.trim(),
          interimTranscript: interim,
          isFinal: final.length > 0,
        });
      }
    };

    recognition.onerror = event => {
      const errorMessage = event.error;
      setError(new Error(errorMessage));
      setIsListening(false);

      // Call onError handler - let it handle specific errors appropriately
      if (onError) {
        onError(event);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      if (onEnd) {
        onEnd();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors when stopping
        }
      }
    };
  }, [continuous, interimResults, lang, onResult, onError, onEnd, isSupported]);

  // Start listening
  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      console.warn('[Voice Recognition] Recognition instance not available');
      return;
    }

    // Check if already listening or starting
    if (isListening) {
      console.log('[Voice Recognition] Already listening, skipping');
      return;
    }

    try {
      // Check if recognition is already active (prevent InvalidStateError)
      const recognition = recognitionRef.current;
      if (
        recognition &&
        (recognition.state === 'started' || recognition.state === 'starting')
      ) {
        console.log('[Voice Recognition] Recognition already active, skipping');
        return;
      }

      console.log('[Voice Recognition] Starting recognition...');
      finalTranscriptRef.current = '';
      setTranscript('');
      setInterimTranscript('');
      recognition.start();
      console.log('[Voice Recognition] ✅ Recognition started successfully');
    } catch (error) {
      const errorName = error?.name || 'UnknownError';
      const errorMessage = error?.message || String(error);

      // Ignore "already started" errors - they're harmless
      if (
        errorName === 'InvalidStateError' ||
        errorMessage.includes('already started')
      ) {
        console.log(
          '[Voice Recognition] Recognition already started, ignoring'
        );
        return;
      }

      console.error(
        '[Voice Recognition] ❌ Error starting:',
        errorName,
        errorMessage
      );
      setError(error);

      // Call onError handler if available
      if (onError) {
        onError({ error: errorName, message: errorMessage });
      }
    }
  }, [isListening, onError]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) return;

    try {
      recognitionRef.current.stop();
    } catch (error) {
      console.error('Error stopping recognition:', error);
    }
  }, [isListening]);

  // Reset transcript
  const resetTranscript = useCallback(() => {
    finalTranscriptRef.current = '';
    setTranscript('');
    setInterimTranscript('');
  }, []);

  // Auto-start/stop based on enabled prop
  useEffect(() => {
    if (enabled && !isListening) {
      startListening();
    } else if (!enabled && isListening) {
      stopListening();
    }
  }, [enabled, isListening, startListening, stopListening]);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported: isSupported(),
    startListening,
    stopListening,
    resetTranscript,
  };
};
