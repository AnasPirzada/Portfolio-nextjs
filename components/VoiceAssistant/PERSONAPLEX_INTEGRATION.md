# NVIDIA PersonaPlex Integration

PersonaPlex has been integrated into your portfolio AI assistant. Here's how to use it.

## Setup Complete ✅

Your Hugging Face API key has been added to `.env.local`:
```
NEXT_PUBLIC_PERSONAPLEX_HF_API_KEY=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
```

## Quick Integration

To use PersonaPlex in your assistant, you have two options:

### Option 1: Use PersonaPlex alongside existing TTS (Recommended)

Modify `hooks/useAssistant.js` to include PersonaPlex:

```javascript
import { usePersonaPlexTTS } from './usePersonaPlexTTS';

// Inside useAssistant hook, add:
const personaplexTTS = usePersonaPlexTTS({
  textPrompt: PERSONAPLEX_CONFIG.textPrompt.default,
});

// In your speak function, add PersonaPlex as an option:
if (personaplexTTS.isSupported) {
  await personaplexTTS.speak(text, {
    contextPrompt: PERSONAPLEX_CONFIG.textPrompt.greeting, // or other context
  });
} else if (elevenLabsTTS.isSupported) {
  // fallback to ElevenLabs
}
```

### Option 2: Create a separate PersonaPlex component

Create a new component that uses PersonaPlex independently:

```javascript
import { usePersonaPlexTTS } from '@/hooks/usePersonaPlexTTS';
import { PERSONAPLEX_CONFIG } from '@/constants/personaplex.config';

function PersonaPlexAssistant() {
  const personaplexTTS = usePersonaPlexTTS();
  
  const speak = async (text, context = 'default') => {
    await personaplexTTS.speak(text, {
      contextPrompt: PERSONAPLEX_CONFIG.textPrompt[context],
    });
  };
  
  // ... rest of your component
}
```

## Configuration

Edit `constants/personaplex.config.js` to customize:

- **Text Prompts**: Modify the persona descriptions for different contexts
- **Model Settings**: Adjust temperature, maxLength, etc.

## Available Context Prompts

- `default`: General portfolio assistant
- `greeting`: Friendly welcome messages
- `projects`: Project discussions
- `experience`: Professional experience
- `contact`: Contact information
- `technical`: Technical explanations

## Testing

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Check browser console for:
   ```
   [PersonaPlex TTS] ✅ Ready
   ```

3. Test the integration by calling the `speak` function with PersonaPlex.

## Resources

- [PersonaPlex Research Page](https://research.nvidia.com/labs/adlr/personaplex/)
- [GitHub Repository](https://github.com/NVIDIA/personaplex)
- [Hugging Face Model](https://huggingface.co/nvidia/personaplex-7b-v1)

## Notes

- PersonaPlex uses Hugging Face Inference API
- Audio is generated at 24kHz sample rate
- The model may take a moment to load on first request
- Falls back gracefully if API is unavailable
