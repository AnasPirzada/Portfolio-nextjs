# Welcome Message Feature Documentation

## Overview

When the AI assistant panel opens, it automatically speaks a welcome message to greet the user. This creates a more engaging and friendly experience.

## How It Works

- **Trigger**: The welcome message is spoken automatically when the panel opens for the first time
- **Timing**: There's a 500ms delay to allow the panel animation to start smoothly
- **State**: The assistant enters "speaking" state while the welcome message plays
- **Auto-reset**: After speaking, the assistant automatically switches to "listening" mode

## Current Welcome Message

The default welcome message is:

```
"Hi! I'm Anas, your voice assistant. I can help you learn about my skills, experience, projects, and more. What would you like to know?"
```

## Customization Options

### 1. Change the Welcome Message Text

**Location**: `hooks/useAssistant.js` (around line 227)

Find this code:

```javascript
const welcomeMessage = `Hi! I'm ${ASSISTANT_CONFIG.name}, your voice assistant. I can help you learn about my skills, experience, projects, and more. What would you like to know?`;
```

**Customize it** to your preference:

```javascript
const welcomeMessage = `Hello! Welcome to my portfolio. I'm ${ASSISTANT_CONFIG.name}, and I'm here to help you discover my work, skills, and background. How can I assist you today?`;
```

### 2. Change the Assistant Name

**Location**: `constants/assistant.config.js`

Update the `name` field:

```javascript
export const ASSISTANT_CONFIG = {
  name: 'Your Name', // Change this to your name
  // ... rest of config
};
```

### 3. Disable Welcome Message (If Needed)

**Location**: `hooks/useAssistant.js`

Comment out or remove the `useEffect` that handles the welcome message (around lines 225-240).

### 4. Change Voice Settings

**Location**: `constants/assistant.config.js`

Adjust voice parameters:

```javascript
voice: {
  rate: 1.0,    // Speed: 0.5 (slow) to 2.0 (fast)
  pitch: 1.0,   // Pitch: 0.5 (low) to 2.0 (high)
  volume: 1.0,  // Volume: 0.0 (mute) to 1.0 (max)
  // Use a specific voice (optional)
  preferredVoice: 'Google UK English Female',
},
```

### 5. Change Welcome Message Delay

**Location**: `hooks/useAssistant.js` (around line 233)

Modify the timeout delay (currently 500ms):

```javascript
const timeoutId = setTimeout(() => {
  setState('speaking');
  speak(welcomeMessage);
}, 800); // Change 500 to your preferred delay in milliseconds
```

## Requirements

✅ **Already Implemented** - No additional setup required!

The feature uses:

- Browser's built-in Web Speech API (Text-to-Speech)
- No external APIs or services needed
- Works in Chrome, Edge, Safari, and other modern browsers

## Browser Compatibility

- ✅ Chrome/Edge: Full support
- ✅ Safari: Full support (desktop)
- ✅ Firefox: Limited support (may vary)
- ⚠️ Mobile browsers: Voice quality varies

## Testing

1. Click the AI pill button at the bottom-right
2. Panel should slide up
3. Wait ~500ms
4. AI should automatically speak the welcome message
5. After speaking, it should switch to "listening" mode

## Troubleshooting

### Message Not Playing?

- Check browser console for errors
- Ensure your browser supports Speech Synthesis API
- Verify microphone permissions are granted (may affect TTS in some browsers)

### Want Different Timing?

- Adjust the `timeout` delay in the `useEffect` hook
- Modify `responseDelay` in `assistant.config.js` for subsequent responses

### Message Too Long/Short?

- Edit the `welcomeMessage` variable in `useAssistant.js`
- Keep it concise (2-3 sentences) for best UX

## Example Custom Messages

### Short & Professional

```javascript
const welcomeMessage = `Hi! I'm ${ASSISTANT_CONFIG.name}. Ask me about my experience, skills, or projects.`;
```

### Friendly & Detailed

```javascript
const welcomeMessage = `Hey there! Welcome! I'm ${ASSISTANT_CONFIG.name}, your AI assistant. Feel free to ask me anything about my background, technical expertise, or recent work. What would you like to explore?`;
```

### Casual & Conversational

```javascript
const welcomeMessage = `What's up! I'm ${ASSISTANT_CONFIG.name}. Want to know about my projects, skills, or what I've been working on? Just ask!`;
```

## Notes

- The welcome message only plays **once** per session (when panel first opens)
- If you close and reopen the panel in the same session, it won't repeat
- The message uses the assistant's configured voice settings
- Panel will automatically transition to listening mode after the welcome message finishes
