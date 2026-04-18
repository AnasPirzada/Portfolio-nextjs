import dynamic from 'next/dynamic';

const VoiceAssistantPanel = dynamic(
  () => import('./VoiceAssistantPanel'),
  { ssr: false }
);

/**
 * Deployment previews (e.g. Vercel dashboard) load the site in an iframe. The Web Speech API
 * is often unavailable there, which triggered a misleading “unsupported browser” banner.
 * We skip mounting the assistant entirely when embedded.
 */
export default function VoiceAssistant() {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    if (window.self !== window.top) {
      return null;
    }
  } catch {
    return null;
  }
  return <VoiceAssistantPanel />;
}
