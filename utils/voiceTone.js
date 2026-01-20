/**
 * Dynamic Voice Tone System
 * Adjusts voice pitch, rate, and style based on context and emotion
 */

/**
 * Voice tone profiles for different contexts
 * Tone = confidence shift, not excitement
 * Word choice conveys excitement, not pitch jumps
 */
export const VOICE_TONES = {
  // Default professional tone (slightly energetic)
  default: {
    pitch: 1.02,
    rate: 1.02,
    description: 'Professional, confident, clear, slightly energetic',
  },

  // Projects - confident and energetic
  projects: {
    pitch: 1.08,
    rate: 1.08,
    description: 'Confident, energetic, engaging',
  },

  // Experience - steady, authoritative
  experience: {
    pitch: 0.96,
    rate: 0.94,
    description: 'Steady, authoritative, professional',
  },

  // Contact - calm, approachable
  contact: {
    pitch: 0.94,
    rate: 0.92,
    description: 'Calm, approachable, relaxed',
  },

  // Greeting - welcoming and active (sharper, more energetic)
  greeting: {
    pitch: 1.12,
    rate: 1.12,
    description: 'Welcoming, active, sharp, energetic',
  },

  // Technical - precise, clear
  technical: {
    pitch: 0.93,
    rate: 0.92,
    description: 'Precise, clear, technical',
  },
};

/**
 * Determine voice tone based on intent and content
 * Tone = confidence shift, not excitement
 */
export const getVoiceTone = (intent, responseText = '') => {
  const text = responseText.toLowerCase();

  // Project-related responses - confident but controlled
  if (
    intent === 'projects' ||
    intent === 'project_detail' ||
    text.includes('project')
  ) {
    return VOICE_TONES.projects;
  }

  // Experience - steady, authoritative
  if (intent === 'experience') {
    return VOICE_TONES.experience;
  }

  // Skills - use experience tone (similar context)
  if (intent === 'skills') {
    return VOICE_TONES.experience;
  }

  // Contact/booking - calm, approachable
  if (intent === 'contact' || intent === 'booking') {
    return VOICE_TONES.contact;
  }

  // Greeting/help - balanced, welcoming
  if (intent === 'greeting' || intent === 'help') {
    return VOICE_TONES.greeting;
  }

  // Testimonials - use projects tone (positive but professional)
  if (intent === 'testimonials') {
    return VOICE_TONES.projects;
  }

  // Technical details - precise, clear
  if (
    text.includes('built') ||
    text.includes('using') ||
    text.includes('technology') ||
    text.includes('stack') ||
    text.includes('framework')
  ) {
    return VOICE_TONES.technical;
  }

  // Default - professional, confident
  return VOICE_TONES.default;
};

/**
 * Get voice parameters for a specific tone
 */
export const getVoiceParams = tone => {
  return {
    pitch: tone.pitch,
    rate: tone.rate,
    volume: 1.0, // Always full volume for clarity
  };
};

/**
 * Analyze response text for context cues
 * Note: We don't use this to boost pitch for excitement
 * Word choice conveys emotion, not voice pitch
 */
export const analyzeEmotion = text => {
  const lowerText = text.toLowerCase();

  // Technical words - use technical tone
  const technicalWords = [
    'technology',
    'stack',
    'framework',
    'api',
    'database',
    'architecture',
    'built',
    'using',
  ];
  const hasTechnical = technicalWords.some(word => lowerText.includes(word));

  if (hasTechnical) {
    return 'technical';
  }

  // Default - let intent determine tone
  return 'default';
};

/**
 * Get dynamic voice tone combining intent + context
 * Tone = confidence shift, not excitement
 * Word choice conveys excitement, not pitch
 */
export const getDynamicTone = (intent, responseText) => {
  const intentTone = getVoiceTone(intent, responseText);
  const context = analyzeEmotion(responseText);

  // If context suggests technical content, use technical tone
  if (context === 'technical' && intentTone !== VOICE_TONES.technical) {
    return VOICE_TONES.technical;
  }

  // Otherwise, use intent-based tone (subtle confidence shifts)
  return intentTone;
};
