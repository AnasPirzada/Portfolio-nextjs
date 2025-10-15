import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.loader}>
          {/* Custom SVG Loader with Stylish A and Water Fill */}
          <svg 
            className={styles.logo} 
            viewBox="0 0 120 120" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Circle Border */}
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="url(#borderGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              className={styles.outerCircle}
            />
            
            {/* Stylish Letter A */}
            <g className={styles.letterA}>
              {/* A Shape - Outline Path */}
              <path
                d="M35 85 L50 25 L70 25 L85 85 L78 85 L73 70 L47 70 L42 85 Z"
                fill="none"
                stroke="url(#letterGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.letterOutline}
              />
              
              {/* A Crossbar */}
              <line
                x1="52"
                y1="55"
                x2="68"
                y2="55"
                stroke="url(#letterGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                className={styles.crossbar}
              />
            </g>
            
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#efc041" />
                <stop offset="100%" stopColor="#eeba2c" />
              </linearGradient>
              
              <linearGradient id="letterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#efc041" />
                <stop offset="100%" stopColor="#eeba2c" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Loading Text */}
        <div className={styles.loadingText}>
          <span className={styles.text}>Loading</span>
          <div className={styles.dots}>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className={styles.progress}>
          <div className={styles.progressBar} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
