import { useState, useRef, useEffect } from 'react';

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
          setAudioError(true);
        }
      } catch (error) {
        setAudioError(true);
      }
    };

    const handleError = e => {
      setAudioError(true);
    };

    const handleCanPlay = () => {
      setAudioError(false);
    };

    const handleLoadedData = () => {
      setAudioError(false);
    };

    const handleLoadStart = () => {
    };

    const handleStalled = () => {
    };

    const handleSuspend = () => {
    };

    checkAudioFile();
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('stalled', handleStalled);
    audio.addEventListener('suspend', handleSuspend);

    return () => {
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('stalled', handleStalled);
      audio.removeEventListener('suspend', handleSuspend);
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
      setIsPlaying(false);
      setAudioError(true);
    }
  };

  return (
    <div
      className={`soundBars link top-1 right-14 flex items-center justify-center ${isPlaying ? 'play' : ''}`}
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
