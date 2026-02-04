/**
 * AI Assistant Chat API Route
 * Handles LLM integration for natural language understanding and response generation
 * 
 * Supports:
 * - OpenAI GPT models (paid)
 * - Anthropic Claude (paid)
 * - Groq (FREE - Fast, recommended for free tier)
 * - Hugging Face Inference API (FREE - Backup option)
 * - Fallback to rule-based system if LLM unavailable
 */

import { PORTFOLIO_DATA } from '@/constants/assistant.data';
import { ASSISTANT_CONFIG } from '@/constants/assistant.config';

// System prompt that constrains the AI to only use portfolio data
const SYSTEM_PROMPT = `You are ${ASSISTANT_CONFIG.name}, a professional portfolio assistant. Your role is to help visitors learn about the portfolio owner's background, skills, projects, and experience.

CRITICAL RULES:
1. You MUST ONLY use information from the provided portfolio data. Never make up or hallucinate information.
2. If asked about something not in the portfolio data, politely redirect to what you can discuss.
3. Keep responses VERY SHORT (1-2 sentences max, under 100 words) for voice interaction to avoid rate limits.
4. Be friendly, professional, and conversational.
5. If asked to book a meeting or schedule a call, acknowledge it and indicate you'll open the calendar.

Portfolio Data:
${JSON.stringify(PORTFOLIO_DATA, null, 2)}

Remember: Only answer based on the portfolio data above. Never invent details.`;

/**
 * Call OpenAI API
 */
async function callOpenAI(userMessage, conversationHistory = []) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  // Build messages array
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory,
    { role: 'user', content: userMessage },
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini', // Use cheaper model by default
      messages,
      temperature: 0.7,
      max_tokens: 200, // Keep responses short for voice
      top_p: 0.9,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'I apologize, but I encountered an error processing your request.';
}

/**
 * Call Anthropic Claude API (optional)
 */
async function callAnthropic(userMessage, conversationHistory = []) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  // Build messages array (Anthropic format)
  const messages = [
    ...conversationHistory.map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content,
    })),
    { role: 'user', content: userMessage },
  ];

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || 'claude-3-haiku-20240307', // Fast, cost-effective
      max_tokens: 200,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(`Anthropic API error: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.content[0]?.text || 'I apologize, but I encountered an error processing your request.';
}

/**
 * Call Groq API (FREE - Fast, recommended!)
 * Get API key from: https://console.groq.com/keys
 */
async function callGroq(userMessage, conversationHistory = []) {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error('GROQ_API_KEY not configured');
  }

  // Build messages array
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory,
    { role: 'user', content: userMessage },
  ];

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant', // Fast, free model
      messages,
      temperature: 0.7,
      max_tokens: 150, // Reduced for rate limit - keep responses short for voice
      top_p: 0.9,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(`Groq API error: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'I apologize, but I encountered an error processing your request.';
}

/**
 * Call Hugging Face Inference API (FREE - Backup option)
 * Get API key from: https://huggingface.co/settings/tokens
 */
async function callHuggingFace(userMessage, conversationHistory = []) {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  
  if (!apiKey) {
    throw new Error('HUGGINGFACE_API_KEY not configured');
  }

  const model = process.env.HUGGINGFACE_MODEL || 'mistralai/Mistral-7B-Instruct-v0.2';
  
  // Build prompt with system message and conversation
  const conversationText = conversationHistory
    .map(msg => `${msg.role === 'assistant' ? 'Assistant' : 'User'}: ${msg.content}`)
    .join('\n');
  
  const fullPrompt = `${SYSTEM_PROMPT}\n\nConversation:\n${conversationText}\nUser: ${userMessage}\nAssistant:`;

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        inputs: fullPrompt,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
          return_full_text: false,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(`Hugging Face API error: ${error.error || response.statusText}`);
  }

  const data = await response.json();
  
  // Hugging Face returns array or object depending on model
  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text.trim();
  } else if (data.generated_text) {
    return data.generated_text.trim();
  }
  
  throw new Error('Unexpected response format from Hugging Face');
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('[Assistant API] 📥 Received request');
  console.log('[Assistant API] Environment check:', {
    hasOpenAI: !!process.env.OPENAI_API_KEY,
    hasAnthropic: !!process.env.ANTHROPIC_API_KEY,
    hasGroq: !!process.env.GROQ_API_KEY,
    hasHuggingFace: !!process.env.HUGGINGFACE_API_KEY,
    openAIKeyLength: process.env.OPENAI_API_KEY?.length || 0,
    anthropicKeyLength: process.env.ANTHROPIC_API_KEY?.length || 0,
    groqKeyLength: process.env.GROQ_API_KEY?.length || 0,
    huggingFaceKeyLength: process.env.HUGGINGFACE_API_KEY?.length || 0,
  });

  try {
    const { message, conversationHistory = [], provider = 'auto' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('[Assistant API] Processing message:', message.substring(0, 50) + '...');
    console.log('[Assistant API] Conversation history:', conversationHistory.length, 'messages');

    // Determine which provider to use
    let selectedProvider = provider;
    if (provider === 'auto') {
      // Auto-select priority: Groq (free) > OpenAI > Anthropic > Hugging Face (free)
      if (process.env.GROQ_API_KEY) {
        selectedProvider = 'groq';
        console.log('[Assistant API] ✅ Selected Groq (FREE)');
      } else if (process.env.OPENAI_API_KEY) {
        selectedProvider = 'openai';
        console.log('[Assistant API] ✅ Selected OpenAI');
      } else if (process.env.ANTHROPIC_API_KEY) {
        selectedProvider = 'anthropic';
        console.log('[Assistant API] ✅ Selected Anthropic');
      } else if (process.env.HUGGINGFACE_API_KEY) {
        selectedProvider = 'huggingface';
        console.log('[Assistant API] ✅ Selected Hugging Face (FREE)');
      } else {
        console.error('[Assistant API] ❌ No API keys found!');
        return res.status(503).json({ 
          error: 'No LLM provider configured. Please add GROQ_API_KEY (free) or another provider.',
          fallback: true 
        });
      }
    }

    let response;
    let usedProvider = selectedProvider;

    // Retry logic for rate limits (especially for Groq free tier)
    let retries = 0;
    const maxRetries = 2;
    let lastError = null;

    while (retries <= maxRetries) {
      try {
        console.log(`[Assistant API] 🚀 Calling LLM provider: ${selectedProvider} (attempt ${retries + 1}/${maxRetries + 1})`);
        
        if (selectedProvider === 'groq') {
          response = await callGroq(message, conversationHistory);
          console.log('[Assistant API] ✅ Groq response received');
          break; // Success, exit retry loop
        } else if (selectedProvider === 'openai') {
          response = await callOpenAI(message, conversationHistory);
          console.log('[Assistant API] ✅ OpenAI response received');
          break;
        } else if (selectedProvider === 'anthropic') {
          response = await callAnthropic(message, conversationHistory);
          console.log('[Assistant API] ✅ Anthropic response received');
          break;
        } else if (selectedProvider === 'huggingface') {
          response = await callHuggingFace(message, conversationHistory);
          console.log('[Assistant API] ✅ Hugging Face response received');
          break;
        } else {
          return res.status(400).json({ error: 'Invalid provider specified' });
        }
      } catch (error) {
        lastError = error;
        
        // Check if it's a rate limit error
        const isRateLimit = error.message?.toLowerCase().includes('rate limit') || 
                           error.message?.toLowerCase().includes('tpm') ||
                           error.message?.toLowerCase().includes('quota') ||
                           error.message?.toLowerCase().includes('exceeded');
        
        if (isRateLimit && retries < maxRetries) {
          // Extract wait time from error message if available
          const waitMatch = error.message.match(/try again in ([\d.]+)s/i);
          const waitTime = waitMatch ? Math.ceil(parseFloat(waitMatch[1]) * 1000) : (retries + 1) * 3000;
          
          console.warn(`[Assistant API] ⚠️ Rate limit hit, waiting ${waitTime}ms before retry (attempt ${retries + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          retries++;
          continue; // Retry
        } else {
          // Not a rate limit or max retries reached, break and throw
          break;
        }
      }
    }

    // If we didn't get a response, return error with fallback
    if (!response) {
      console.error('[Assistant API] ❌ LLM error after retries:', lastError);
      console.error('[Assistant API] Error details:', {
        message: lastError?.message,
        stack: lastError?.stack,
      });
      
      // Return error but indicate fallback is available
      return res.status(500).json({ 
        error: lastError?.message || 'LLM request failed',
        fallback: true 
      });
    }

    // Return successful response
    console.log('[Assistant API] ✅ Sending success response');
    return res.status(200).json({
      response,
      provider: usedProvider,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Assistant API] ❌ Unexpected error:', error);
    console.error('[Assistant API] Error stack:', error.stack);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      fallback: true 
    });
  }
}
