import { useEffect, useRef, useState } from 'react';
import { useAssistant } from '@/hooks/useAssistant';
import { ASSISTANT_CONFIG } from '@/constants/assistant.config';
import { FiX, FiMic } from 'react-icons/fi';
import styles from './VoiceAssistant.module.scss';

/**
 * Voice AI Assistant Component
 * Floating assistant with voice interaction capabilities
 */
const VoiceAssistant = () => {
  const {
    state,
    isListening,
    isSpeaking,
    isPanelOpen,
    conversation,
    currentTranscript,
    interimTranscript,
    recognitionSupported,
    ttsSupported,
    activate,
    goIdle,
    togglePanel,
  } = useAssistant();

  const panelRef = useRef(null);
  const messagesEndRef = useRef(null);
  const avatarContainerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Scroll to bottom when new messages arrive or transcript updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation, interimTranscript, currentTranscript]);

  // Mouse tracking for 3D effect
  useEffect(() => {
    const container = avatarContainerRef.current;
    if (!container) return;

    const handleMouseMove = e => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized values from -1 to 1 for smoother movement
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      setMousePosition({ x, y });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setMousePosition({ x: 0, y: 0 });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Get orb state
  const getMicButtonState = () => {
    if (state === 'listening') return 'listening';
    if (state === 'speaking') return 'speaking';
    if (state === 'processing') return 'processing';
    return 'idle';
  };

  // Get state label
  const getStateLabel = () => {
    switch (state) {
      case 'listening':
        return 'Listening';
      case 'processing':
        return 'Processing';
      case 'speaking':
        return 'Speaking';
      default:
        return 'Click';
    }
  };

  // Check if browser supports required APIs
  if (!recognitionSupported || !ttsSupported) {
    return (
      <div className={styles.unsupported}>
        <p>Voice features are not supported in this browser.</p>
        <p className={styles.unsupportedHint}>
          Please use Chrome, Edge, or Safari for the best experience.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Premium AI Voice Pill - Bottom Right */}
      <button
        className={`${styles.voicePill} ${styles[getMicButtonState()]}`}
        onClick={activate}
        aria-label="Activate voice assistant"
      >
        <div className={styles.voicePillContent}>
          {/* Text Status with Gold Accent */}
          <div className={styles.statusText}>
            {state === 'idle' ? (
              <>
                AI Ready <span className={styles.accent}>•</span> Say{' '}
                <span className={styles.accent}>
                  &ldquo;{ASSISTANT_CONFIG.wakePhrase}&rdquo;
                </span>
              </>
            ) : (
              <>
                <span className={styles.accent}>AI {getStateLabel()}</span>
              </>
            )}
          </div>

          {/* Animated Sound Wave - White */}
          <div className={styles.soundWave}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </button>

      {/* Chat Panel */}
      {isPanelOpen && (
        <div className={styles.panel} ref={panelRef}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <button
                className={styles.closeButton}
                onClick={togglePanel}
                aria-label="Close panel"
              >
                <FiX />
              </button>
            </div>
          </div>

          {/* Abstract AI Presence - Horizontal Capsule with Eyes */}
          <div
            ref={avatarContainerRef}
            className={styles.avatarContainer}
            onMouseMove={e => {
              if (avatarContainerRef.current) {
                const rect = avatarContainerRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const x = (e.clientX - centerX) / (rect.width / 2);
                const y = (e.clientY - centerY) / (rect.height / 2);
                setMousePosition({ x, y });
                setIsHovering(true);
              }
            }}
            onMouseLeave={() => {
              setIsHovering(false);
              setMousePosition({ x: 0, y: 0 });
            }}
          >
            <div
              className={`${styles.aiPresence} ${styles[`presence${state.charAt(0).toUpperCase() + state.slice(1)}`]}`}
              style={{
                transform: isHovering
                  ? `perspective(1000px) rotateY(${mousePosition.x * 8}deg) rotateX(${-mousePosition.y * 8}deg)`
                  : 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
                transition: isHovering ? 'none' : 'transform 0.5s ease-out',
              }}
            >
              <svg
                className={styles.capsuleSvg}
                viewBox="0 0 180 140"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Body Gradient */}
                  <linearGradient
                    id="bodyGradient"
                    x1="0"
                    y1="0"
                    x2="180"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#101010" />
                    <stop offset="100%" stopColor="#1C1C1C" />
                  </linearGradient>

                  {/* Accent Glow Gradient */}
                  <linearGradient id="accentGlow" x1="0" y1="0" x2="180" y2="0">
                    <stop offset="0%" stopColor="#00FFFF" stopOpacity="0" />
                    <stop offset="50%" stopColor="#00FFFF" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#00FFFF" stopOpacity="0" />
                  </linearGradient>

                  {/* Eye Glow - for listening */}
                  <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00FFFF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#00FFFF" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Main Capsule Body - Horizontal */}
                <rect
                  x="20"
                  y="20"
                  width="140"
                  height="100"
                  rx="50"
                  ry="50"
                  fill="url(#bodyGradient)"
                  className={styles.capsuleBody}
                />

                {/* Left Eye - Proper eye structure with blinking */}
                <g
                  className={styles.eyeGroup}
                  transform={
                    isHovering
                      ? `translate(${70 + mousePosition.x * 3}, ${70 + mousePosition.y * 3})`
                      : 'translate(70, 70)'
                  }
                >
                  {/* Eye white/sclera */}
                  <ellipse
                    cx="0"
                    cy="0"
                    rx="10"
                    ry="7"
                    fill="#ffffff"
                    className={styles.eyeSclera}
                  />
                  {/* Iris */}
                  <ellipse
                    cx={isHovering ? mousePosition.x * 2 : 0}
                    cy={isHovering ? mousePosition.y * 2 : 0}
                    rx={state === 'listening' ? 5 : 4}
                    ry={state === 'listening' ? 5 : 4}
                    fill="#00d4ff"
                    className={`${styles.eyeIris} ${styles.eyeLeftIris}`}
                  />
                  {/* Pupil */}
                  <circle
                    cx={isHovering ? mousePosition.x * 2 : 0}
                    cy={isHovering ? mousePosition.y * 2 : 0}
                    r={state === 'listening' ? 2.5 : 2}
                    fill="#000000"
                    className={styles.eyePupil}
                  />
                  {/* Eye highlight */}
                  <circle
                    cx={(isHovering ? mousePosition.x * 2 : 0) - 1}
                    cy={(isHovering ? mousePosition.y * 2 : 0) - 1}
                    r="1"
                    fill="#ffffff"
                    opacity="0.8"
                    className={styles.eyeHighlight}
                  />
                  {/* Eyelid - for blinking */}
                  <rect
                    x="-11"
                    y="-8"
                    width="22"
                    height="8"
                    fill="#101010"
                    className={`${styles.eyelid} ${styles.eyelidTop}`}
                  />
                  <rect
                    x="-11"
                    y="0"
                    width="22"
                    height="8"
                    fill="#101010"
                    className={`${styles.eyelid} ${styles.eyelidBottom}`}
                  />
                </g>

                {/* Right Eye - Proper eye structure with blinking */}
                <g
                  className={styles.eyeGroup}
                  transform={
                    isHovering
                      ? `translate(${110 + mousePosition.x * 3}, ${70 + mousePosition.y * 3})`
                      : 'translate(110, 70)'
                  }
                >
                  {/* Eye white/sclera */}
                  <ellipse
                    cx="0"
                    cy="0"
                    rx="10"
                    ry="7"
                    fill="#ffffff"
                    className={styles.eyeSclera}
                  />
                  {/* Iris */}
                  <ellipse
                    cx={isHovering ? mousePosition.x * 2 : 0}
                    cy={isHovering ? mousePosition.y * 2 : 0}
                    rx={state === 'listening' ? 5 : 4}
                    ry={state === 'listening' ? 5 : 4}
                    fill="#00d4ff"
                    className={`${styles.eyeIris} ${styles.eyeRightIris}`}
                  />
                  {/* Pupil */}
                  <circle
                    cx={isHovering ? mousePosition.x * 2 : 0}
                    cy={isHovering ? mousePosition.y * 2 : 0}
                    r={state === 'listening' ? 2.5 : 2}
                    fill="#000000"
                    className={styles.eyePupil}
                  />
                  {/* Eye highlight */}
                  <circle
                    cx={(isHovering ? mousePosition.x * 2 : 0) - 1}
                    cy={(isHovering ? mousePosition.y * 2 : 0) - 1}
                    r="1"
                    fill="#ffffff"
                    opacity="0.8"
                    className={styles.eyeHighlight}
                  />
                  {/* Eyelid - for blinking */}
                  <rect
                    x="-11"
                    y="-8"
                    width="22"
                    height="8"
                    fill="#101010"
                    className={`${styles.eyelid} ${styles.eyelidTop}`}
                  />
                  <rect
                    x="-11"
                    y="0"
                    width="22"
                    height="8"
                    fill="#101010"
                    className={`${styles.eyelid} ${styles.eyelidBottom}`}
                  />
                </g>

                {/* Accent Neon Stroke */}
                <rect
                  x="20"
                  y="20"
                  width="140"
                  height="100"
                  rx="50"
                  ry="50"
                  fill="none"
                  stroke="#00FFFF"
                  strokeWidth="2"
                  className={styles.neonStroke}
                  opacity="0.3"
                />

                {/* Accent Glow Overlay */}
                <rect
                  x="20"
                  y="20"
                  width="140"
                  height="100"
                  rx="50"
                  ry="50"
                  fill="url(#accentGlow)"
                  className={styles.glowOverlay}
                  opacity="0.4"
                />
              </svg>

              {/* Breathing Glow - Idle state */}
              <div className={styles.breathingGlow}></div>
            </div>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {conversation.length === 0 &&
            !interimTranscript &&
            !currentTranscript ? (
              <div className={styles.welcomeMessage}>
                <p>
                  Voice assistant ready. Say &ldquo;{ASSISTANT_CONFIG.wakePhrase}&rdquo; to
                  begin.
                </p>
                <p>
                  Ask about experience, skills, projects, or contact
                  information.
                </p>
              </div>
            ) : (
              <>
                {conversation.map((message, index) => (
                  <div
                    key={index}
                    className={`${styles.message} ${styles[message.type]}`}
                  >
                    {message.type === 'user' && (
                      <div className={styles.userMessageIcon}>
                        <FiMic />
                      </div>
                    )}
                    <div className={styles.messageContent}>{message.text}</div>
                  </div>
                ))}

                {/* Live User Transcription - Shows as temporary user message */}
                {/* Only show if we have transcript AND we're actively listening (not processing/speaking) */}
                {state === 'listening' &&
                  (interimTranscript || currentTranscript) && (
                    <div
                      className={`${styles.message} ${styles.user} ${styles.liveTranscript}`}
                    >
                      <div
                        className={`${styles.userMessageIcon} ${styles.micPulsing}`}
                      >
                        <FiMic />
                      </div>
                      <div className={styles.messageContent}>
                        {interimTranscript || currentTranscript}
                      </div>
                    </div>
                  )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            {(state === 'listening' || state === 'speaking') && (
              <div className={styles.footerHint}>
                {state === 'listening' && <p>Listening</p>}
                {state === 'speaking' && <p>Speaking</p>}
              </div>
            )}
            {state === 'speaking' && (
              <button
                className={styles.idleButton}
                onClick={goIdle}
                aria-label="Stop speaking"
              >
                Stop
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;
