import { scrollToElementSmooth } from '@/utils/scrollRevealSupport';

const SkipToContent = () => {
  return (
    <a
      href="#home"
      className="skip-to-content"
      aria-label="Skip to main content"
      onClick={e => {
        e.preventDefault();
        const target = document.getElementById('home');
        if (target) {
          target.focus();
          scrollToElementSmooth(target);
        }
      }}
    >
      Skip to Content
    </a>
  );
};

export default SkipToContent;
