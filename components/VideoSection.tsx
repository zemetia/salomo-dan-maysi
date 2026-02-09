import React, { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface VideoSectionProps {
  t: {
    title: string;
  };
}

const VideoSection: React.FC<VideoSectionProps> = ({ t }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-[#F8F6F2] py-20 md:py-40">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] whitespace-nowrap z-0">
        <span className="font-serif text-[20vw] uppercase tracking-[0.2em] font-bold">CINEMATIC</span>
      </div>

      <div className="relative z-10 w-full">
        {/* Cinematic Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 px-6">
           <div className="flex items-center justify-center gap-4 mb-6 opacity-40">
              <div className="w-8 h-[1px] bg-gold"></div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold">The Film</span>
              <div className="w-8 h-[1px] bg-gold"></div>
           </div>
           <h2 className="font-serif text-4xl md:text-6xl text-[#1C1C1C] italic tracking-tight">{t.title}</h2>
        </div>

        {/* 100VW Video Container */}
        <motion.div 
          style={{ scale, opacity }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] shadow-[0_50px_100px_rgba(0,0,0,0.15)] group overflow-hidden origin-center"
        >
          {/* Top/Bottom Cinematic Fade */}
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#F8F6F2] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#F8F6F2] to-transparent z-20 pointer-events-none"></div>

          {!isPlaying ? (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer" onClick={() => setIsPlaying(true)}>
              {/* Cover Image */}
              <img 
                src="/images/w1.jpg" 
                alt="Video Cover"
                className="absolute inset-0 w-full h-full object-cover brightness-75 transition-transform duration-[2s] group-hover:scale-105"
              />
              
              {/* Play UI */}
              <div className="relative z-20 flex flex-col items-center space-y-8">
                 <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:bg-gold group-hover:border-gold group-hover:scale-110">
                    <Play size={32} className="text-white ml-2" fill="white" />
                 </div>
                 <div className="text-center">
                    <span className="text-white text-[11px] uppercase tracking-[0.6em] font-bold block mb-2 opacity-80">Watch Our Film</span>
                    <div className="w-12 h-[1px] bg-white/40 mx-auto"></div>
                 </div>
              </div>

              {/* Decorative Frame */}
              <div className="absolute inset-8 md:inset-16 border border-white/10 rounded-sm pointer-events-none"></div>
            </div>
          ) : (
            <iframe 
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=1&modestbranding=1&rel=0" 
              title="Wedding Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          )}
        </motion.div>

        {/* Video Footer Caption */}
        <div className="max-w-4xl mx-auto text-center mt-12 md:mt-20 px-6">
           <p className="text-taupe text-xs md:text-sm italic tracking-[0.3em] uppercase opacity-60">
             A movement of love, preserved in time
           </p>
           <div className="mt-10 flex justify-center opacity-20">
              <div className="w-[1px] h-12 bg-gold"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
