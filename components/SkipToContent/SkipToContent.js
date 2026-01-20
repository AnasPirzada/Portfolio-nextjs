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
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      Skip to Content
    </a>
  );
};

export default SkipToContent;
