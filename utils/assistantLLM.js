/**
 * LLM Service for AI Assistant
 * Handles communication with LLM API for natural language understanding and generation
 */

/**
 * Call the assistant API to get LLM-generated response
 * 
 * @param {string} userMessage - The user's message/query
 * @param {Array} conversationHistory - Previous conversation messages
 * @param {string} provider - LLM provider ('openai', 'anthropic', or 'auto')
 * @returns {Promise<{response: string, provider: string, error?: string}>}
 */
export async function getLLMResponse(userMessage, conversationHistory = [], provider = 'auto') {
  try {
    
    const response = await fetch('/api/assistant/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        conversationHistory: conversationHistory.map(msg => ({
          role: msg.type === 'assistant' ? 'assistant' : 'user',
          content: msg.text,
        })),
        provider,
      }),
    });


    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // If fallback is available, return error to trigger fallback
      if (errorData.fallback) {
        throw new Error(errorData.error || 'LLM unavailable');
      }
      
      throw new Error(errorData.error || `API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      response: data.response,
      provider: data.provider,
    };
  } catch (error) {
    throw error; // Re-throw to allow fallback handling
  }
}

/**
 * Check if LLM is available
 * @returns {Promise<boolean>}
 */
export async function checkLLMAvailability() {
  try {
    const response = await fetch('/api/assistant/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'test',
        conversationHistory: [],
        provider: 'auto',
      }),
    });

    // If we get a 503 with fallback flag, LLM is not configured
    if (response.status === 503) {
      const data = await response.json();
      return !data.fallback; // If fallback is true, LLM is not available
    }

    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Detect intent using LLM (more accurate than regex)
 * This is optional - can use LLM for intent detection or rely on LLM for full response
 * 
 * @param {string} userMessage - The user's message
 * @returns {Promise<string>} - Detected intent
 */
export async function detectIntentWithLLM(userMessage) {
  try {
    const intentPrompt = `Based on this user message, classify the intent into one of these categories:
- greeting: Greetings, hello, hi
- about: Questions about who the person is, background, introduction
- experience: Questions about work experience, years of experience, career
- skills: Questions about technologies, skills, tech stack
- projects: Questions about projects, portfolio, work samples
- contact: Questions about contact information, email, social media
- booking: Requests to book, schedule, or meet
- testimonials: Questions about reviews, feedback, client testimonials
- education: Questions about education, university, degree
- help: Questions about what the assistant can do
- unknown: Anything else

User message: "${userMessage}"

Respond with ONLY the intent category name (e.g., "greeting", "projects", etc.):`;

    const result = await getLLMResponse(intentPrompt, [], 'auto');
    const intent = result.response.toLowerCase().trim();
    
    // Validate intent
    const validIntents = [
      'greeting', 'about', 'experience', 'skills', 'projects',
      'contact', 'booking', 'testimonials', 'education', 'help', 'unknown'
    ];
    
    if (validIntents.includes(intent)) {
      return intent;
    }
    
    return 'unknown';
  } catch (error) {
    return 'unknown';
  }
}
