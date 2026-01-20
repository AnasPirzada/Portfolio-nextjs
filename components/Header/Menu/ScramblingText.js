import { useEffect, useState, useRef } from 'react';

const ScramblingText = ({ text }) => {
  const [displayChars, setDisplayChars] = useState(() => text.split(''));
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const intervalsRef = useRef([]);
  const containerRef = useRef(null);
  const revealedRef = useRef(new Array(text.length).fill(true));

  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  const getRandomChar = () => {
    return chars[Math.floor(Math.random() * chars.length)];
  };

  useEffect(() => {
    // Initialize with text
    const textArray = text.split('');
    setDisplayChars(textArray);
    revealedRef.current = new Array(textArray.length).fill(true);

    return () => {
      intervalsRef.current.forEach(interval => clearInterval(interval));
      intervalsRef.current = [];
    };
  }, [text]);

  useEffect(() => {
    // Clear any existing intervals
    intervalsRef.current.forEach(interval => clearInterval(interval));
    intervalsRef.current = [];

    if (!isHovered) {
      // Smoothly show final text when not hovered
      const textArray = text.split('');
      setDisplayChars(textArray);
      revealedRef.current = new Array(textArray.length).fill(true);
      return;
    }

    // Start animation immediately - no delay
    const textArray = text.split('');
    revealedRef.current = new Array(textArray.length).fill(false);

    // Function to scramble and reveal a specific letter position
    const animateLetter = index => {
      if (revealedRef.current[index] || !isHoveredRef.current) return;

      let scrambleCount = 0;
      const maxScrambles = Math.floor(Math.random() * 5) + 7; // 7-11 scrambles per letter

      const scrambleInterval = setInterval(() => {
        // Check if still hovered
        if (!isHoveredRef.current || revealedRef.current[index]) {
          clearInterval(scrambleInterval);
          return;
        }

        scrambleCount++;

        // Update this specific letter position with random char
        setDisplayChars(prev => {
          const newChars = [...prev];
          if (!revealedRef.current[index]) {
            newChars[index] = getRandomChar();
          }
          return newChars;
        });

        // After enough scrambles, reveal the actual letter
        if (scrambleCount >= maxScrambles) {
          clearInterval(scrambleInterval);
          revealedRef.current[index] = true;

          setDisplayChars(prev => {
            const newChars = [...prev];
            newChars[index] = textArray[index];
            return newChars;
          });
        }
      }, 30); // Scramble speed

      intervalsRef.current.push(scrambleInterval);
    };

    // Start scrambling each letter with a delay between letters
    textArray.forEach((_, index) => {
      setTimeout(() => {
        if (isHoveredRef.current) {
          animateLetter(index);
        }
      }, index * 50); // Delay between each letter starting
    });

    return () => {
      intervalsRef.current.forEach(interval => clearInterval(interval));
      intervalsRef.current = [];
    };
  }, [isHovered, text]);

  return (
    <span
      ref={containerRef}
      className="link"
      onMouseEnter={() => {
        isHoveredRef.current = true;
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        setIsHovered(false);
      }}
    >
      {displayChars.length > 0 ? displayChars.join('') : text}
    </span>
  );
};

export default ScramblingText;
