# AI Assistant LLM Integration Guide

## 🎯 Overview

Your voice assistant has been upgraded to use **real AI (LLM)** instead of rule-based patterns. It now uses Large Language Models (OpenAI GPT or Anthropic Claude) to understand user queries semantically and generate natural, contextual responses.

## ✨ What's New

### Before (Rule-Based)
- ❌ Regex pattern matching for intent detection
- ❌ Pre-written template responses
- ❌ Limited understanding of complex questions
- ❌ Can't handle variations in phrasing

### After (LLM-Powered)
- ✅ Semantic understanding of user queries
- ✅ Natural, contextual response generation
- ✅ Handles complex, multi-part questions
- ✅ Understands variations and synonyms
- ✅ Maintains conversation context
- ✅ Still constrained to portfolio data (no hallucinations)

## 🚀 Setup

### Step 1: Get an API Key

Choose one of these providers:

#### Option A: OpenAI (Recommended)
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-...`)

#### Option B: Anthropic Claude
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key
5. Copy the key

### Step 2: Configure Environment Variables

Create or update `.env.local` in your project root:

```bash
# For OpenAI (recommended)
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4o-mini  # Optional: defaults to gpt-4o-mini (cheap & fast)

# OR for Anthropic
ANTHROPIC_API_KEY=sk-ant-your-api-key-here
ANTHROPIC_MODEL=claude-3-haiku-20240307  # Optional: defaults to claude-3-haiku

# The assistant will auto-select based on available keys
# If both are set, it prefers OpenAI
```

### Step 3: Restart Your Dev Server

```bash
# Stop your current server (Ctrl+C)
# Then restart
npm run dev
# or
yarn dev
```

## ⚙️ Configuration

Edit `constants/assistant.config.js` to customize LLM behavior:

```javascript
llm: {
  // Enable/disable LLM (set to false to use rule-based fallback)
  enabled: true,
  
  // Provider: 'openai', 'anthropic', or 'auto' (auto-selects)
  provider: 'auto',
  
  // Fallback to rule-based if LLM fails
  fallbackOnError: true,
  
  // Use LLM for intent detection (more accurate, but uses more API calls)
  useLLMForIntent: false,  // Set to true for better intent detection
  
  // Maximum conversation history to send to LLM
  maxHistoryLength: 5,  // Last 5 messages for context
}
```

## 🔄 How It Works

### 1. User Speaks
User asks a question via voice or text.

### 2. Intent Detection (Optional)
If `useLLMForIntent: true`, LLM classifies the intent. Otherwise, uses regex patterns.

### 3. Response Generation
LLM generates a natural response based on:
- User's question
- Conversation history (last 5 messages)
- Portfolio data (system prompt constrains responses)

### 4. Fallback
If LLM fails or is unavailable:
- Falls back to rule-based system (if `fallbackOnError: true`)
- User still gets a response

## 📊 Cost Considerations

### OpenAI Pricing (as of 2024)
- **gpt-4o-mini**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- **gpt-4**: ~$2.50 per 1M input tokens, ~$10 per 1M output tokens

**Estimated cost per conversation:**
- With gpt-4o-mini: ~$0.0001-0.0005 per conversation (very cheap)
- With gpt-4: ~$0.001-0.005 per conversation

### Anthropic Pricing
- **claude-3-haiku**: ~$0.25 per 1M input tokens, ~$1.25 per 1M output tokens
- **claude-3-sonnet**: ~$3 per 1M input tokens, ~$15 per 1M output tokens

**Recommendation:** Use `gpt-4o-mini` or `claude-3-haiku` for cost-effective, fast responses.

## 🛡️ Safety & Privacy

### Data Privacy
- ✅ API calls are server-side only (API keys never exposed to client)
- ✅ Conversation history is stored locally in browser
- ✅ Portfolio data is sent to LLM (but it's your public portfolio data)
- ✅ No user personal data is sent to LLM

### Hallucination Prevention
- ✅ System prompt strictly constrains responses to portfolio data
- ✅ LLM is instructed to never make up information
- ✅ Falls back to rule-based system if LLM tries to hallucinate

## 🧪 Testing

### Test LLM Integration

1. **Check if LLM is available:**
   ```javascript
   // In browser console
   import { checkLLMAvailability } from '@/utils/assistantLLM';
   checkLLMAvailability().then(available => {
     console.log('LLM available:', available);
   });
   ```

2. **Test a query:**
   - Open the voice assistant
   - Ask: "Tell me about your experience with React"
   - Should get a natural, contextual response (not a template)

3. **Test fallback:**
   - Temporarily set `enabled: false` in config
   - Ask the same question
   - Should get rule-based response

## 🐛 Troubleshooting

### "LLM unavailable" Error

**Possible causes:**
1. API key not set in `.env.local`
2. API key is invalid
3. Server not restarted after adding API key
4. Network error

**Solutions:**
- Check `.env.local` has the correct key
- Verify key is valid in provider's dashboard
- Restart dev server: `npm run dev`
- Check browser console for detailed errors

### Responses are still template-based

**Check:**
1. `llm.enabled` is `true` in config
2. API key is set correctly
3. Server was restarted
4. Check browser console for LLM errors

### High API costs

**Solutions:**
1. Use cheaper models (`gpt-4o-mini` or `claude-3-haiku`)
2. Reduce `maxHistoryLength` (sends less context)
3. Set `useLLMForIntent: false` (uses LLM only for responses)
4. Enable `fallbackOnError: true` (falls back if LLM fails)

## 📈 Advanced Features

### Custom System Prompt

Edit the `SYSTEM_PROMPT` in `pages/api/assistant/chat.js` to customize the assistant's personality and behavior.

### Conversation Memory

The assistant maintains conversation context (last 5 messages by default). Increase `maxHistoryLength` for longer context, but note:
- Higher token usage (more cost)
- Slower responses
- Better context understanding

### Multi-Provider Support

You can switch providers on the fly:
- Set `provider: 'openai'` to force OpenAI
- Set `provider: 'anthropic'` to force Anthropic
- Set `provider: 'auto'` to auto-select

## 🎓 Summary

Your AI assistant is now powered by real LLM technology while maintaining:
- ✅ Safety (constrained to portfolio data)
- ✅ Privacy (server-side API calls)
- ✅ Reliability (fallback to rule-based system)
- ✅ Cost-effectiveness (uses cheap, fast models)

Enjoy your upgraded AI assistant! 🚀
