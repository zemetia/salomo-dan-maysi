import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioControlProps {
  isMuted: boolean;
  setIsMuted: (val: boolean) => void;
}

const AudioControl: React.FC<AudioControlProps> = ({ isMuted, setIsMuted }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/audio/MUARA - Adera (Lyric Video).mp3');
    audioRef.current.loop = true;
    
    // Try to autoplay
    const playAudio = async () => {
      try {
        audioRef.current!.volume = 0.5;
        await audioRef.current!.play();
        setIsPlaying(true);
        setIsMuted(false);
      } catch (err) {
        // Autoplay blocked by browser, wait for user interaction
        setIsPlaying(false);
        setIsMuted(true);
      }
    };
    
    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted && audioRef.current.paused) {
        audioRef.current.play().catch(() => {
          // Play failed
        });
      }
    }
  }, [isMuted]);

  const handleToggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    
    if (!newMuted && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Play failed
      });
    }
  };

  // Hide bubble after 5 seconds, show again on hover
  useEffect(() => {
    if (!isMuted) {
      const timer = setTimeout(() => setShowBubble(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isMuted]);

  return (
    <>
      {/* Floating Music Bubble Indicator */}
      {!isMuted && (
        <div 
          className={`fixed bottom-8 left-8 z-[100] transition-all duration-500 ${showBubble ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          onMouseEnter={() => setShowBubble(true)}
          onMouseLeave={() => !isMuted && setTimeout(() => setShowBubble(false), 2000)}
        >
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-[#E6E3DE] rounded-full px-4 py-2 shadow-lg animate-float">
            <div className="relative">
              <Music className="w-5 h-5 text-[#C8A96A]" strokeWidth={1.5} />
              {/* Animated sound waves */}
              <span className="absolute -right-1 top-1/2 -translate-y-1/2 flex gap-0.5">
                <span className="w-0.5 h-2 bg-[#C8A96A] rounded-full animate-[bounce_1s_infinite]"></span>
                <span className="w-0.5 h-3 bg-[#C8A96A] rounded-full animate-[bounce_1s_infinite_0.1s]"></span>
                <span className="w-0.5 h-1.5 bg-[#C8A96A] rounded-full animate-[bounce_1s_infinite_0.2s]"></span>
              </span>
            </div>
            <span className="text-sm text-[#4A4A4A] font-medium whitespace-nowrap">Now Playing</span>
            <div className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#C8A96A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8A96A]"></span>
            </div>
          </div>
        </div>
      )}

      {/* Audio Control Button - Bottom Right */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <button
          onClick={handleToggle}
          className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-[#E6E3DE] rounded-full flex items-center justify-center text-[#8B7355] transition-all hover:bg-[#C8A96A] hover:text-white hover:border-[#C8A96A] shadow-sm"
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" strokeWidth={1.5} />
          ) : (
            <Volume2 className="w-5 h-5 animate-pulse" strokeWidth={1.5} />
          )}
        </button>
        
        {/* Visual Feedback for Mute State */}
        {!isMuted && (
          <div className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8A96A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C8A96A]"></span>
          </div>
        )}
      </div>
    </>
  );
};

export default AudioControl;