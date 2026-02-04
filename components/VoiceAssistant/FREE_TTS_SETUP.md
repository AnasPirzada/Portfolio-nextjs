# Free AI Voice (TTS) Setup Guide

## 🎤 Free Text-to-Speech Options

Your assistant now supports **free/cheap AI voices**! Here are your options:

## 🚀 Option 1: OpenAI TTS (Recommended - Cheap & High Quality!)

**OpenAI TTS is the best option** - it's very affordable and produces high-quality voices.

### Pricing
- **tts-1**: $15 per 1M characters (~$0.015 per 1000 chars)
- **tts-1-hd**: $30 per 1M characters (higher quality)

**Cost per response:**
- Typical 500-character response: **~$0.0075** (less than 1 cent!)
- For 1000 responses: **~$7.50**
- Very affordable for a portfolio site!

### Setup Steps:

1. **Use Your Existing OpenAI API Key**
   - You already have an OpenAI API key (for LLM)
   - The same key works for TTS too!

2. **Add to `.env.local`:**
   ```bash
   # Use the same OpenAI key for TTS (client-side)
   NEXT_PUBLIC_OPENAI_API_KEY=sk-your-openai-key-here
   ```

3. **Available Voices:**
   - `alloy` - Neutral, balanced voice
   - `echo` - Clear, confident voice
   - `fable` - Warm, friendly voice
   - `onyx` - Deep, authoritative voice
   - `nova` - Bright, energetic voice (default, recommended)
   - `shimmer` - Soft, gentle voice

4. **Restart your dev server:**
   ```bash
   npm run dev
   ```

### Why OpenAI TTS?
- ✅ **Very affordable** (~$0.0075 per response)
- ✅ **High quality** voices
- ✅ **Fast** generation
- ✅ **Works on deployed sites**
- ✅ **Uses same API key** as your LLM

---

## 🆓 Option 2: ElevenLabs (Free Tier Available)

ElevenLabs has a free tier with limited characters per month.

### Setup Steps:

1. **Get Free API Key:**
   - Go to: https://elevenlabs.io/
   - Sign up (free tier available)
   - Go to Profile → API Keys
   - Create a new API key
   - Copy the key

2. **Add to `.env.local`:**
   ```bash
   NEXT_PUBLIC_ELEVENLABS_API_KEY=your-elevenlabs-key-here
   ```

3. **Restart your dev server**

### Why ElevenLabs?
- ✅ **Free tier** available (limited characters/month)
- ✅ **Premium voices**
- ⚠️ Free tier has limits
- ⚠️ Paid plans can be expensive

---

## 🆓 Option 3: Web Speech API (Always Free)

Browser's built-in TTS - always available as fallback.

### No Setup Required!
- ✅ **100% FREE** (no API key needed)
- ✅ **Always available**
- ⚠️ Quality depends on browser/OS
- ⚠️ Limited voice options
- ⚠️ Less natural than AI voices

---

## 🔄 How Priority Works

The assistant automatically selects TTS in this priority order:

1. **OpenAI TTS** (if `NEXT_PUBLIC_OPENAI_API_KEY` is set) - **Recommended**
2. **ElevenLabs** (if `NEXT_PUBLIC_ELEVENLABS_API_KEY` is set)
3. **Web Speech API** (always available as fallback)

---

## 📝 Complete `.env.local` Example

```bash
# LLM (for responses)
GROQ_API_KEY=gsk_your_groq_key_here

# TTS (for voice) - Use same OpenAI key
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-openai-key-here

# OR ElevenLabs (alternative)
# NEXT_PUBLIC_ELEVENLABS_API_KEY=your-elevenlabs-key-here
```

**Note:** You can use the **same OpenAI API key** for both LLM responses and TTS voice!

---

## 🚀 For Production Deployment

### Vercel/Netlify:

Add these environment variables:
- `NEXT_PUBLIC_OPENAI_API_KEY` = `sk-your-key-here`
- (Optional) `NEXT_PUBLIC_ELEVENLABS_API_KEY` = `your-key-here`

Then redeploy.

---

## 💰 Cost Comparison

| Provider | Cost | Quality | Speed | Free Tier |
|----------|------|---------|-------|-----------|
| **OpenAI TTS** | ~$0.0075/response | ⭐⭐⭐⭐⭐ Excellent | ⚡⚡⚡ Fast | ❌ No (but very cheap) |
| **ElevenLabs** | Free tier + Paid | ⭐⭐⭐⭐⭐ Excellent | ⚡⚡⚡ Fast | ✅ Yes (limited) |
| **Web Speech API** | FREE | ⭐⭐⭐ Good | ⚡⚡ Moderate | ✅ Always free |

**Recommendation:** Use **OpenAI TTS** - it's very affordable and high quality!

---

## 🎯 Voice Selection by Context

The assistant automatically selects voices based on context:

- **Greeting**: `nova` (bright, energetic)
- **Projects**: `echo` (clear, confident)
- **Experience**: `alloy` (neutral, balanced)
- **Contact**: `shimmer` (soft, gentle)
- **Technical**: `onyx` (deep, authoritative)

---

## 🧪 Testing

After setup, test with:
1. Open voice assistant
2. Ask a question
3. Listen to the AI voice response

You should hear a natural, high-quality AI voice!

---

## ❓ Troubleshooting

### "OpenAI TTS not working"
- Check `NEXT_PUBLIC_OPENAI_API_KEY` is set in `.env.local`
- Restart dev server after adding key
- Check browser console for errors

### "Still using Web Speech API"
- Verify API key is correct
- Check browser console for TTS status
- Make sure key starts with `sk-`

### "CSP error for ElevenLabs"
- Fixed! CSP has been updated to allow ElevenLabs
- Restart dev server

---

## 🎉 Quick Start (OpenAI TTS)

1. Add to `.env.local`: `NEXT_PUBLIC_OPENAI_API_KEY=sk-your-key`
2. Restart: `npm run dev`
3. Test! 🎤

Enjoy your new AI voice! 🚀
