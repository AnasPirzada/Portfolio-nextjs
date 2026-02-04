/**
 * ElevenLabs TTS Configuration
 * Premium voice settings for attractive, modern voice
 */

export const ELEVENLABS_CONFIG = {
  // API Key - Set in environment variable: NEXT_PUBLIC_ELEVENLABS_API_KEY
  // Get your API key from: https://elevenlabs.io/app/settings/api-keys

  // Voice Selection - Energetic, Active Male Voices
  voices: {
    // Recommended for energetic, active, modern voice
    adam: {
      id: 'pNInz6obpgDQGcFmaJgB',
      name: 'Adam',
      description: 'Energetic, confident, modern male voice',
    },
    josh: {
      id: 'TxGEqnHWrfWFTfGW9XjX',
      name: 'Josh',
      description: 'Energetic, young, friendly male voice',
    },
    antoni: {
      id: 'ErXwobaYiN019PkySvjV',
      name: 'Antoni',
      description: 'Clear, professional, confident male voice',
    },
    arnold: {
      id: 'VR6AewLTigWG4xSOukaG',
      name: 'Arnold',
      description: 'Strong, confident, authoritative male voice',
    },
  },

  // Default voice (can be changed)
  // Options: 'adam', 'josh', 'antoni', 'arnold'
  // Use Josh for a younger, more "boyish" male voice
  defaultVoice: 'josh', // Energetic, young, friendly male voice

  // Model Settings
  model: 'eleven_turbo_v2_5', // Fast, high-quality model
  // Alternative: 'eleven_multilingual_v2' for multilingual support

  // Voice Settings for Energetic, Active Voice
  voiceSettings: {
    stability: 0.5, // Voice stability (0-1) - lower = more variation
    similarityBoost: 0.75, // Voice similarity (0-1) - higher = more similar to original
    style: 0.0, // Style exaggeration (0-1) - 0 = natural, 1 = exaggerated
    useSpeakerBoost: true, // Enhance clarity and presence
  },

  // Dynamic tone adjustments (for different contexts)
  toneProfiles: {
    greeting: {
      stability: 0.5,
      similarityBoost: 0.75,
      style: 0.0,
    },
    projects: {
      stability: 0.6,
      similarityBoost: 0.8,
      style: 0.1, // Slightly more energetic
    },
    experience: {
      stability: 0.55,
      similarityBoost: 0.75,
      style: 0.0,
    },
    contact: {
      stability: 0.5,
      similarityBoost: 0.7,
      style: 0.0,
    },
    technical: {
      stability: 0.6,
      similarityBoost: 0.8,
      style: 0.0,
    },
    default: {
      stability: 0.5,
      similarityBoost: 0.75,
      style: 0.0,
    },
  },
};
