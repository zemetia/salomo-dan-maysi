
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioControlProps {
  isMuted: boolean;
  setIsMuted: (val: boolean) => void;
}

const AudioControl: React.FC<AudioControlProps> = ({ isMuted, setIsMuted }) => {
  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-[#E6E3DE] rounded-full flex items-center justify-center text-taupe transition-all hover:bg-gold hover:text-white shadow-sm"
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
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
        </div>
      )}
    </div>
  );
};

export default AudioControl;
