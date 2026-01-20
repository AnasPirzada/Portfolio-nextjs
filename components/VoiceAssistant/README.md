# Voice AI Assistant

A production-ready voice AI assistant for your developer portfolio website. This assistant activates on a wake word, answers questions based strictly on your portfolio data, and can trigger actions like booking meetings.

## Features

- 🎤 **Wake Word Detection**: Activates on "Hi Anas" (configurable)
- 🗣️ **Voice Recognition**: Converts speech to text using Web Speech API
- 🔊 **Text-to-Speech**: Speaks responses using browser SpeechSynthesis
- 💬 **Live Transcription**: Shows real-time transcription of user speech
- 📊 **Intent Detection**: Understands user queries and routes to appropriate responses
- 🎯 **Knowledge Restriction**: Answers ONLY from portfolio data - no hallucinations
- 📅 **Action Triggers**: Can open Calendly for meeting booking
- 🎨 **Modern UI**: Beautiful, accessible interface with Tailwind CSS
- ♿ **Accessible**: Keyboard and screen reader friendly

## Architecture

### Components

```
components/VoiceAssistant/
├── VoiceAssistant.js          # Main component
├── VoiceAssistant.module.scss # Styles
├── index.js                   # Export
└── README.md                  # This file
```

### Hooks

```
hooks/
├── useVoiceRecognition.js     # Web Speech API wrapper
├── useWakeWord.js             # Wake phrase detection
├── useTextToSpeech.js         # Speech synthesis wrapper
└── useAssistant.js            # Main orchestration hook
```

### Configuration & Data

```
constants/
├── assistant.config.js        # Assistant configuration
└── assistant.data.js          # Portfolio data structure

utils/
└── assistantIntents.js        # Intent detection & response generation
```

## Configuration

### Assistant Identity

Edit `constants/assistant.config.js` to customize:

```javascript
export const ASSISTANT_CONFIG = {
  name: 'Anas', // Assistant name
  wakePhrase: 'hi anas', // Wake word/phrase

  voice: {
    rate: 1.0, // Speech rate (0.1-10)
    pitch: 1.0, // Speech pitch (0-2)
    volume: 1.0, // Speech volume (0-1)
  },

  recognition: {
    lang: 'en-US', // Recognition language
    continuous: true, // Keep listening
    interimResults: true, // Show interim results
  },

  behavior: {
    autoIdleTimeout: 5000, // Auto idle after silence (ms)
    minConfidence: 0.7, // Wake word confidence (0-1)
    responseDelay: 300, // Delay before speaking (ms)
  },
};
```

### Portfolio Data

The assistant uses data from `constants/assistant.data.js`, which aggregates information from:

- `constants/metadata.js` - Basic info
- `constants/skills.js` - Skills & technologies
- `constants/projects.js` - Projects portfolio
- `constants/work.js` - Work experience
- `constants/content.js` - Testimonials, metrics
- `constants/navigation.js` - Contact & social links
- `constants/config.js` - Calendly URL

**Important**: All responses are generated strictly from this data. The assistant will politely decline questions outside the portfolio scope.

## Usage

The assistant is automatically integrated into your app via `pages/_app.js`. It appears as a floating button in the bottom-right corner.

### User Interaction

1. **Wake Word**: Say "Hi Anas" (or configured wake phrase)
2. **Manual Activation**: Click the microphone button
3. **Ask Questions**: Speak naturally after activation
4. **Auto Idle**: Assistant automatically goes idle after 5 seconds of silence

### Supported Intents

The assistant recognizes and handles:

- **Greetings**: "Hi", "Hello", "Hey"
- **About Me**: "Who are you?", "Tell me about yourself"
- **Experience**: "What's your experience?", "How long have you been working?"
- **Skills**: "What are your skills?", "What technologies do you know?"
- **Projects**: "What projects have you built?", "Show me your work"
- **Project Details**: "Tell me about [project name]"
- **Contact**: "How can I contact you?", "What's your email?"
- **Booking**: "Book a meeting", "Schedule a call", "I want to talk"
- **Testimonials**: "What do clients say?", "Show me reviews"
- **Education**: "Where did you study?", "What's your education?"

### Example Queries

- "Hi Anas, what's your experience?"
- "Tell me about your skills"
- "What projects have you worked on?"
- "Book a meeting"
- "How can I contact you?"

## Customization

### Adding New Intents

Edit `utils/assistantIntents.js`:

1. **Add Intent Detection** in `detectIntent()`:

```javascript
// In detectIntent function
if (/(your pattern here)/i.test(normalized)) {
  return 'your_intent';
}
```

2. **Add Response Generation** in `generateResponse()`:

```javascript
// In generateResponse function
case 'your_intent':
  return 'Your response based on PORTFOLIO_DATA';
```

3. **Add Actions** (if needed):

```javascript
// In requiresAction function
if (intent === 'your_intent') {
  return true;
}

// In getBookingAction or create new action handler
```

### Styling

Edit `components/VoiceAssistant/VoiceAssistant.module.scss` to customize:

- Colors and gradients
- Animations
- Layout and spacing
- Responsive breakpoints

### Voice Settings

Modify voice characteristics in `constants/assistant.config.js`:

```javascript
voice: {
  rate: 1.2,        // Faster speech
  pitch: 1.1,       // Higher pitch
  volume: 0.9,      // Slightly quieter
}
```

## Browser Support

### Required APIs

- **Web Speech API (SpeechRecognition)**: Chrome, Edge, Safari
- **Web Speech API (SpeechSynthesis)**: All modern browsers

### Best Experience

- Chrome/Edge: Full support
- Safari: Full support (may require user gesture)
- Firefox: Limited (no SpeechRecognition support)

The assistant gracefully degrades and shows a message if APIs are not supported.

## Security & Privacy

- ✅ **No Background Listening**: Only listens when explicitly activated
- ✅ **No Data Storage**: Voice recordings are not stored
- ✅ **No Third-Party Tracking**: All processing is client-side
- ✅ **User Consent**: Microphone access requires user permission
- ✅ **Local Processing**: All intent detection and response generation happens in the browser

## Troubleshooting

### Microphone Not Working

1. Check browser permissions (Settings > Privacy > Microphone)
2. Ensure HTTPS (required for microphone access)
3. Try a different browser (Chrome/Edge recommended)

### Wake Word Not Detecting

1. Speak clearly and at normal volume
2. Check `minConfidence` in config (lower if needed)
3. Try saying the wake phrase more slowly

### Responses Not Accurate

1. Ensure portfolio data is up-to-date in `constants/assistant.data.js`
2. Check intent patterns in `utils/assistantIntents.js`
3. Review conversation logs in browser console

### Calendly Not Opening

1. Verify `CALENDLY_URL` in `constants/config.js`
2. Check browser popup blockers
3. Ensure Calendly script is loaded (check console)

## Performance

- **Initial Load**: ~50KB (component + styles)
- **Memory**: Minimal (no audio storage)
- **CPU**: Low (only active during listening/speaking)
- **Network**: None (fully client-side)

## Accessibility

- ✅ Keyboard navigation support
- ✅ Screen reader compatible
- ✅ ARIA labels on all interactive elements
- ✅ Focus indicators
- ✅ Reduced motion support

## Extending the Assistant

### Adding Multi-Language Support

1. Update `recognition.lang` in config
2. Add translations to `constants/translations.js`
3. Modify `assistantIntents.js` to use translations
4. Update `generateResponse()` to return translated text

### Adding New Actions

1. Add intent detection
2. Update `requiresAction()` to return true for new intent
3. Create action handler in `useAssistant.js`
4. Update `getBookingAction()` or create new action function

### Integrating with Backend

If you need server-side processing:

1. Create API route in `pages/api/assistant/`
2. Modify `handleUserInput()` in `useAssistant.js` to call API
3. Handle async responses and update conversation state

## License

This component is part of your portfolio project and follows the same license.

## Support

For issues or questions:

1. Check browser console for errors
2. Review this README
3. Check configuration files
4. Verify portfolio data structure

---

**Built with ❤️ for your portfolio**
