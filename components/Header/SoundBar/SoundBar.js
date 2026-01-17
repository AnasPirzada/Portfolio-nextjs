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
        console.log('Audio file HEAD request:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          ok: response.ok
        });
        if (!response.ok) {
          console.error('Audio file not accessible:', response.status, response.statusText);
          setAudioError(true);
        } else {
          console.log('Audio file is accessible');
        }
      } catch (error) {
        console.error('Could not check audio file availability:', error);
        setAudioError(true);
      }
    };

    const handleError = (e) => {
      console.error("Audio error:", e);
      console.error("Audio error details:", {
        error: audio.error,
        code: audio.error?.code,
        message: audio.error?.message,
        networkState: audio.networkState,
        readyState: audio.readyState,
        src: audio.src,
        currentSrc: audio.currentSrc
      });
      
      // Log specific error codes
      if (audio.error) {
        const errorMessages = {
          1: 'MEDIA_ERR_ABORTED - The user aborted the audio',
          2: 'MEDIA_ERR_NETWORK - A network error occurred',
          3: 'MEDIA_ERR_DECODE - An error occurred while decoding',
          4: 'MEDIA_ERR_SRC_NOT_SUPPORTED - The audio source is not supported'
        };
        console.error('Error code meaning:', errorMessages[audio.error.code] || 'Unknown error');
      }
      
      setAudioError(true);
    };

    const handleCanPlay = () => {
      console.log('Audio can play - file loaded successfully');
      setAudioError(false);
    };

    const handleLoadedData = () => {
      console.log('Audio data loaded:', {
        duration: audio.duration,
        readyState: audio.readyState,
        networkState: audio.networkState
      });
      setAudioError(false);
    };
    
    const handleLoadStart = () => {
      console.log('Audio load started');
    };
    
    const handleStalled = () => {
      console.warn('Audio load stalled - network issue?');
    };
    
    const handleSuspend = () => {
      console.warn('Audio load suspended');
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
