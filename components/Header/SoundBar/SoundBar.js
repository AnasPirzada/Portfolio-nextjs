import { useState, useRef, useEffect } from "react";

const SoundBar = () => {
  const soundBarEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    if (!soundBarEl.current) return;

    const audio = soundBarEl.current;

    // Check if audio file is accessible
    const checkAudioFile = async () => {
      try {
        const response = await fetch('/sounds/song.mp3', { method: 'HEAD' });
        if (!response.ok) {
          console.warn('Audio file not accessible:', response.status);
          setAudioError(true);
        }
      } catch (error) {
        console.warn('Could not check audio file availability:', error);
        // Don't set error here, let the audio element handle it
      }
    };

    const handleError = (e) => {
      console.error("Audio error:", e);
      console.error("Audio error details:", {
        error: audio.error,
        code: audio.error?.code,
        message: audio.error?.message,
        networkState: audio.networkState,
        readyState: audio.readyState
      });
      setAudioError(true);
    };

    const handleCanPlay = () => {
      setAudioError(false);
    };

    const handleLoadedData = () => {
      setAudioError(false);
    };

    checkAudioFile();
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadeddata', handleLoadedData);

    return () => {
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  const togglePlayPause = async () => {
    if (!soundBarEl.current || audioError) return;

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
      setAudioError(true);
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
      <audio ref={soundBarEl} loop preload="auto">
        <source src="/sounds/song.mp3" type="audio/mpeg" />
        <source src="/sounds/song.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default SoundBar;
