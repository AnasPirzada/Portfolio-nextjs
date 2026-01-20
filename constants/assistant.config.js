/**
 * Voice AI Assistant Configuration
 * Customize the assistant name, wake word, and behavior here
 */

export const ASSISTANT_CONFIG = {
  // Assistant Identity
  name: 'Anas',
  wakePhrase: 'hi anas',

  // Voice Settings - Premium AI Voice Profile
  // Complete voice characteristics matching user's real voice and personality
  voice: {
    // Use browser default voice or specify a voice name
    useDefaultVoice: false,

    // Preferred male voice for premium, natural sound
    // Priority order: Google UK English Male > Microsoft David > Alex > Daniel
    preferredVoice: 'Google UK English Male', // International English, natural male voice

    // VOICE PROFILE (CRITICAL – MATCH EXACTLY):
    // Gender: Male
    // Age perception: 24–30
    // Pitch: Medium-high for more energetic, active sound (younger male voice)
    pitch: 1.05, // Higher pitch for more energetic, active delivery

    // Speaking rate: faster for more energy and engagement
    rate: 1.08, // Faster rate for more energetic, active delivery

    // Volume: Full clarity for natural pronunciation
    volume: 1.0, // Full volume for high clarity

    // VOICE BEHAVIOR:
    // Tone: Calm, neutral-warm, confident
    // Energy: Controlled, professional (not excited, not robotic)
    // Accent: International English (no forced US/UK exaggeration)
    // Clarity: High, natural pronunciation
    // Emotion: Subtle, composed, founder-style voice

    // Voice selection fallbacks (in order of preference):
    fallbackVoices: [
      'Google UK English Male',
      'Microsoft David',
      'Alex',
      'Daniel',
      'Microsoft Mark',
      'Google US English Male',
    ],
  },

  // Recognition Settings
  recognition: {
    continuous: true, // Keep listening after wake word
    interimResults: true, // Show interim results
    lang: 'en-US', // Language for speech recognition
    maxAlternatives: 1, // Number of alternative transcripts
  },

  // UI Settings
  ui: {
    position: 'bottom-right', // Floating button position
    autoExpandOnWake: true, // Automatically expand panel on wake word
    showTranscription: true, // Show live transcription
    showWaveform: true, // Show waveform animation when speaking
  },

  // Behavior Settings
  behavior: {
    autoIdleTimeout: 5000, // Auto go idle after 5 seconds of silence (ms)
    minConfidence: 0.7, // Minimum confidence for wake word detection (0-1)
    responseDelay: 400, // Brief pause before speaking for confident delivery (ms)
  },
};
