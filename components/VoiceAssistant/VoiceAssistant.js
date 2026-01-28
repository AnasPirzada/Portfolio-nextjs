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
      {/* AI Assistant Button */}
      <button
        className={`${styles.assistantButton} ${styles[getMicButtonState()]}`}
        onClick={activate}
        aria-label="Activate voice assistant"
      >
        <FiMic className={styles.micIcon} />
        <span className={styles.buttonText}>
          {state === 'idle' ? 'AI Assistant' : getStateLabel()}
        </span>
        {state !== 'idle' && (
          <div className={styles.activeIndicator}>
            <span></span>
          </div>
        )}
      </button>

      {/* AI Panel */}
      {isPanelOpen && (
        <div className={styles.panel} ref={panelRef}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.headerBadge}>AI</div>
              <div className={styles.headerInfo}>
                <div className={styles.headerTitle}>Assistant</div>
                <div className={styles.headerStatus}>
                  {state === 'idle' && 'Ready'}
                  {state === 'listening' && 'Listening...'}
                  {state === 'processing' && 'Processing...'}
                  {state === 'speaking' && 'Speaking...'}
                </div>
              </div>
            </div>
            <button
              className={styles.closeButton}
              onClick={togglePanel}
              aria-label="Close panel"
            >
              <FiX />
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {conversation.length === 0 &&
            !interimTranscript &&
            !currentTranscript ? (
              <div className={styles.welcomeMessage}>
                <div className={styles.welcomeGrid}></div>
                <div className={styles.welcomeContent}>
                  <div className={styles.welcomeIcon}>
                    <div className={styles.aiGlow}></div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div className={styles.welcomeTitleContainer}>
                    <h3 className={styles.welcomeTitle}>AI Assistant</h3>
                    <div className={styles.welcomeTitleLine}></div>
                  </div>
                  <p className={styles.welcomeText}>
                    Say &ldquo;{ASSISTANT_CONFIG.wakePhrase}&rdquo; to start
                  </p>
                  <p className={styles.welcomeHint}>
                    Ask about my experience, skills, projects, or contact info
                  </p>
                </div>
              </div>
            ) : (
              <>
                {conversation.map((message, index) => (
                  <div
                    key={index}
                    className={`${styles.message} ${styles[message.type]}`}
                  >
                    {message.type === 'assistant' && (
                      <div className={styles.messageAvatar}>
                        <div className={styles.avatarGlow}></div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                      </div>
                    )}
                    <div className={styles.messageContent}>
                      {message.text}
                    </div>
                    {message.type === 'user' && (
                      <div className={styles.messageAvatar}>
                        <FiMic />
                      </div>
                    )}
                  </div>
                ))}

                {state === 'listening' &&
                  (interimTranscript || currentTranscript) && (
                    <div
                      className={`${styles.message} ${styles.user} ${styles.liveTranscript}`}
                    >
                      <div className={styles.messageContent}>
                        {interimTranscript || currentTranscript}
                      </div>
                      <div className={`${styles.messageAvatar} ${styles.pulsing}`}>
                        <FiMic />
                      </div>
                    </div>
                  )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Footer */}
          {state === 'speaking' && (
            <div className={styles.footer}>
              <button
                className={styles.stopButton}
                onClick={goIdle}
                aria-label="Stop speaking"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
                Stop
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;
