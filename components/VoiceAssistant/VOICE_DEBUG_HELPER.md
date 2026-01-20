# Voice Debug Helper - Verify Voice Settings

## Quick Check: Is Voice Changing?

### Step 1: Open Browser Console (F12)

Look for these logs when the assistant speaks:

```
[Voice Assistant] Voice: [Voice Name] | Lang: [Language] | Pitch: 0.94 | Rate: 0.92
```

### Step 2: Check Available Voices

Paste this in the browser console to see all available voices:

```javascript
speechSynthesis.getVoices().forEach(v => {
  if (v.lang.startsWith('en')) {
    console.log(v.name, '| Lang:', v.lang, '| Default:', v.default);
  }
});
```

### Step 3: Test Voice Manually

Test if pitch/rate changes work:

```javascript
// Test with default voice
const test1 = new SpeechSynthesisUtterance(
  'Hello, this is test one with default settings.'
);
test1.rate = 1.0;
test1.pitch = 1.0;
speechSynthesis.speak(test1);

// Wait for it to finish, then test with new settings
setTimeout(() => {
  const test2 = new SpeechSynthesisUtterance(
    'Hello, this is test two with premium settings.'
  );
  test2.rate = 0.92; // Slower
  test2.pitch = 0.94; // Lower pitch
  speechSynthesis.speak(test2);
}, 2000);
```

## Expected Behavior

**Voice should sound:**

- ✅ Slightly slower (rate 0.92 vs 1.0)
- ✅ Slightly lower pitch (0.94 vs 1.0)
- ✅ More controlled, confident delivery
- ✅ Natural male voice (if available in browser)

## Troubleshooting

### If voice doesn't change:

1. **Hard refresh** the page: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Check console logs** - What voice name appears?
3. **Check browser** - Different browsers have different voices available

### Common Voices by Browser:

- **Chrome**: "Google UK English Male", "Microsoft David"
- **Edge**: "Microsoft David", "Microsoft Mark"
- **Safari**: "Alex", "Daniel", "Tom"

### If you want a specific voice:

1. Check console for available voices
2. Update `constants/assistant.config.js`:
   ```javascript
   preferredVoice: 'Microsoft David', // Use exact name from console
   ```

## Current Settings (constants/assistant.config.js)

- **Pitch**: 0.94 (low-medium male)
- **Rate**: 0.92 (slightly slower, confident)
- **Volume**: 1.0 (full clarity)
- **Preferred Voice**: "Google UK English Male"

## Important Note

Pitch and rate changes are **subtle**:

- Rate 0.92 = 8% slower than default (may be hard to notice)
- Pitch 0.94 = 6% lower than default (may be hard to notice)

If you want **more noticeable** changes, try:

- Rate: `0.85` (15% slower - more noticeable)
- Pitch: `0.90` (10% lower - more noticeable)

But for premium, subtle is better - the current settings should sound natural and confident.
