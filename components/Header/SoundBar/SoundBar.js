import { useState, useRef } from "react";

const SoundBar = () => {
  const soundBarEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = async () => {
    if (!soundBarEl.current) return;

    try {
      if (isPlaying) {
        soundBarEl.current.pause();
        setIsPlaying(false);
      } else {
        await soundBarEl.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={`soundBars link top-1 right-14 flex items-center justify-center ${isPlaying ? "play" : ""}`}
      onClick={togglePlayPause}
    >
      <span />
      <span />
      <span />
      <span />
      <audio ref={soundBarEl} src="/sounds/song.mp3" loop preload="auto" />
    </div>
  );
};

export default SoundBar;
