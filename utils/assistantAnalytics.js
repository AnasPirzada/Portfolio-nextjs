/**
 * Analytics and Learning System for Voice Assistant
 * Tracks questions, responses, and learns from user interactions
 */

// Store analytics in localStorage (persists across sessions)
const STORAGE_KEY = 'voice_assistant_analytics';
const MAX_ENTRIES = 1000; // Keep last 1000 interactions

/**
 * Initialize analytics storage
 */
export const initAnalytics = () => {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        interactions: [],
        questionPatterns: {},
        intentFrequency: {},
        fallbackQuestions: [],
        totalInteractions: 0,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      })
    );
  }
};

/**
 * Log an interaction (question + response)
 */
export const logInteraction = (
  transcript,
  intent,
  response,
  wasFallback = false
) => {
  if (typeof window === 'undefined') return;

  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

    const interaction = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      transcript: transcript.toLowerCase().trim(),
      intent: typeof intent === 'object' ? intent.type : intent,
      response: response.substring(0, 200), // Store first 200 chars
      wasFallback,
      sessionId: getSessionId(),
    };

    // Add to interactions array
    data.interactions = (data.interactions || []).slice(-MAX_ENTRIES + 1);
    data.interactions.push(interaction);

    // Track intent frequency
    const intentKey = typeof intent === 'object' ? intent.type : intent;
    data.intentFrequency = data.intentFrequency || {};
    data.intentFrequency[intentKey] =
      (data.intentFrequency[intentKey] || 0) + 1;

    // Track fallback questions for learning
    if (wasFallback) {
      data.fallbackQuestions = (data.fallbackQuestions || []).slice(-50); // Keep last 50
      data.fallbackQuestions.push({
        question: transcript.toLowerCase().trim(),
        timestamp: new Date().toISOString(),
      });
    }

    // Extract question patterns (keywords)
    const keywords = extractKeywords(transcript);
    data.questionPatterns = data.questionPatterns || {};
    keywords.forEach(keyword => {
      data.questionPatterns[keyword] =
        (data.questionPatterns[keyword] || 0) + 1;
    });

    data.totalInteractions = (data.totalInteractions || 0) + 1;
    data.lastUpdated = new Date().toISOString();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  } catch (error) {
  }
};

/**
 * Get analytics data
 */
export const getAnalytics = () => {
  if (typeof window === 'undefined') return null;

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (error) {
    return null;
  }
};

/**
 * Get most common questions (for learning)
 */
export const getCommonQuestions = (limit = 10) => {
  const data = getAnalytics();
  if (!data || !data.fallbackQuestions) return [];

  // Group by question text
  const questionCounts = {};
  data.fallbackQuestions.forEach(q => {
    questionCounts[q.question] = (questionCounts[q.question] || 0) + 1;
  });

  // Sort by frequency
  return Object.entries(questionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([question, count]) => ({ question, count }));
};

/**
 * Get intent frequency stats
 */
export const getIntentStats = () => {
  const data = getAnalytics();
  if (!data || !data.intentFrequency) return {};
  return data.intentFrequency;
};

/**
 * Get most common keywords
 */
export const getCommonKeywords = (limit = 20) => {
  const data = getAnalytics();
  if (!data || !data.questionPatterns) return [];

  return Object.entries(data.questionPatterns)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([keyword, count]) => ({ keyword, count }));
};

/**
 * Extract keywords from transcript
 */
const extractKeywords = text => {
  const normalized = text.toLowerCase();
  const stopWords = new Set([
    'the',
    'a',
    'an',
    'and',
    'or',
    'but',
    'in',
    'on',
    'at',
    'to',
    'for',
    'of',
    'with',
    'by',
    'from',
    'as',
    'is',
    'was',
    'are',
    'were',
    'been',
    'be',
    'have',
    'has',
    'had',
    'do',
    'does',
    'did',
    'will',
    'would',
    'should',
    'could',
    'may',
    'might',
    'can',
    'this',
    'that',
    'these',
    'those',
    'i',
    'you',
    'he',
    'she',
    'it',
    'we',
    'they',
    'what',
    'which',
    'who',
    'whom',
    'whose',
    'where',
    'when',
    'why',
    'how',
    'tell',
    'me',
    'about',
    'your',
    'my',
    'his',
    'her',
    'its',
    'our',
    'their',
  ]);

  return normalized
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word))
    .slice(0, 10); // Top 10 keywords
};

/**
 * Get session ID (persists for current browser session)
 */
const getSessionId = () => {
  if (typeof window === 'undefined') return 'unknown';

  if (!sessionStorage.getItem('voice_assistant_session_id')) {
    sessionStorage.setItem(
      'voice_assistant_session_id',
      `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    );
  }

  return sessionStorage.getItem('voice_assistant_session_id');
};

/**
 * Clear analytics (for testing/reset)
 */
export const clearAnalytics = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  initAnalytics();
};

/**
 * Export analytics data (for analysis)
 */
export const exportAnalytics = () => {
  const data = getAnalytics();
  if (!data) return null;

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `voice-assistant-analytics-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
