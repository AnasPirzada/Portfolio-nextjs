# Free LLM Setup Guide

## 🎉 Free AI Options for Your Assistant

Since OpenAI quota was exceeded, here are **FREE** alternatives that work great for your portfolio assistant!

## 🚀 Option 1: Groq (Recommended - Fastest & Free!)

**Groq is the best free option** - it's extremely fast and has a generous free tier.

### Setup Steps:

1. **Get Free API Key:**
   - Go to: https://console.groq.com/
   - Sign up (free, no credit card needed)
   - Navigate to API Keys: https://console.groq.com/keys
   - Create a new API key
   - Copy the key

2. **Add to `.env.local`:**
   ```bash
   GROQ_API_KEY=gsk_your_key_here
   GROQ_MODEL=llama-3.1-8b-instant  # Optional: defaults to llama-3.1-8b-instant
   ```

3. **Available Models (all free):**
   - `llama-3.1-8b-instant` - Fast, recommended (default)
   - `llama-3.1-70b-versatile` - More capable, slightly slower
   - `mixtral-8x7b-32768` - Good balance

4. **Restart your dev server:**
   ```bash
   npm run dev
   ```

### Why Groq?
- ✅ **100% FREE** (generous free tier)
- ✅ **Extremely fast** (uses LPUs - Language Processing Units)
- ✅ **No credit card required**
- ✅ **Works on deployed sites** (Vercel, Netlify, etc.)
- ✅ **High quality responses**

---

## 🆓 Option 2: Hugging Face Inference API (Backup)

Hugging Face offers free inference for many models.

### Setup Steps:

1. **Get Free API Key:**
   - Go to: https://huggingface.co/
   - Sign up (free)
   - Go to Settings → Access Tokens: https://huggingface.co/settings/tokens
   - Create a new token with "Read" permissions
   - Copy the token

2. **Add to `.env.local`:**
   ```bash
   HUGGINGFACE_API_KEY=hf_your_token_here
   HUGGINGFACE_MODEL=mistralai/Mistral-7B-Instruct-v0.2  # Optional
   ```

3. **Available Free Models:**
   - `mistralai/Mistral-7B-Instruct-v0.2` - Good quality (default)
   - `meta-llama/Llama-2-7b-chat-hf` - Llama 2
   - `google/flan-t5-large` - Fast, smaller model

4. **Restart your dev server**

### Why Hugging Face?
- ✅ **FREE** (free tier available)
- ✅ **Many model options**
- ✅ **Works on deployed sites**
- ⚠️ Can be slower than Groq
- ⚠️ Some models may have rate limits

---

## 🔄 How Auto-Selection Works

The assistant automatically selects providers in this priority order:

1. **Groq** (if `GROQ_API_KEY` is set) - **FREE**
2. **OpenAI** (if `OPENAI_API_KEY` is set) - Paid
3. **Anthropic** (if `ANTHROPIC_API_KEY` is set) - Paid
4. **Hugging Face** (if `HUGGINGFACE_API_KEY` is set) - **FREE**

So if you add Groq, it will use it automatically!

---

## 📝 Complete `.env.local` Example

```bash
# FREE OPTIONS (Recommended)
GROQ_API_KEY=gsk_your_groq_key_here
GROQ_MODEL=llama-3.1-8b-instant

# OR Hugging Face (backup)
# HUGGINGFACE_API_KEY=hf_your_token_here
# HUGGINGFACE_MODEL=mistralai/Mistral-7B-Instruct-v0.2

# Paid options (if you have credits)
# OPENAI_API_KEY=sk-your-openai-key
# ANTHROPIC_API_KEY=sk-ant-your-anthropic-key
```

---

## 🚀 For Production Deployment

### Vercel Deployment:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add:
   - `GROQ_API_KEY` = `gsk_your_key_here`
   - (Optional) `GROQ_MODEL` = `llama-3.1-8b-instant`
4. Redeploy

### Netlify Deployment:

1. Go to Site settings → Environment variables
2. Add the same variables as above
3. Redeploy

### Other Platforms:

Just add `GROQ_API_KEY` as an environment variable in your hosting platform's settings.

---

## 💰 Cost Comparison

| Provider | Cost | Speed | Quality | Free Tier |
|----------|------|-------|---------|-----------|
| **Groq** | FREE | ⚡⚡⚡ Very Fast | ⭐⭐⭐⭐ Great | ✅ Generous |
| **Hugging Face** | FREE | ⚡⚡ Moderate | ⭐⭐⭐ Good | ✅ Available |
| OpenAI | Paid | ⚡⚡⚡ Fast | ⭐⭐⭐⭐⭐ Excellent | ❌ No |
| Anthropic | Paid | ⚡⚡ Fast | ⭐⭐⭐⭐⭐ Excellent | ❌ No |

**Recommendation:** Use **Groq** for the best free experience!

---

## 🧪 Testing

After setup, test with:
- "Who are you?"
- "Tell me about your projects"
- "What technologies do you use?"

You should get natural, AI-generated responses!

---

## ❓ Troubleshooting

### "No LLM provider configured"
- Make sure `.env.local` has `GROQ_API_KEY` or another provider key
- Restart your dev server after adding keys

### "Groq API error: Invalid API key"
- Check your API key is correct
- Make sure it starts with `gsk_`
- Verify it's active in Groq console

### Still using rule-based responses?
- Check browser console for errors
- Verify `llm.enabled: true` in `assistant.config.js`
- Check server logs for API errors

---

## 🎯 Quick Start (Groq)

1. Sign up: https://console.groq.com/
2. Get API key: https://console.groq.com/keys
3. Add to `.env.local`: `GROQ_API_KEY=gsk_your_key`
4. Restart: `npm run dev`
5. Test! 🎉

Enjoy your free AI assistant! 🚀
