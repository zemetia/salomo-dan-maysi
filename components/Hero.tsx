
import React, { useState, useEffect } from 'react';

interface HeroProps {
  t: {
    title: string;
    inviteText: string;
    date: string;
  };
}

const HERO_IMAGES = [
  '/images/HERO.jpg',
  '/images/w1.jpg'
];

const Hero: React.FC<HeroProps> = ({ t }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 7000);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center px-6">
      {/* Dynamic Background with slower parallax scale */}
      {HERO_IMAGES.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
            idx === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: `scale(${1 + scrollY * 0.0002})` }}
        >
          <img
            src={img}
            alt="Hero Background"
            className="w-full h-full object-cover brightness-95"
          />
          {/* Ivory Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8F6F2]/90 via-[#F8F6F2]/30 to-[#F8F6F2]"></div>
        </div>
      ))}

      {/* Content with Parallax Drift */}
      <div 
        className="relative z-20 max-w-4xl space-y-6"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="animate-sequence">
           <p className="text-taupe uppercase tracking-[0.5em] text-[10px] md:text-xs mb-8 opacity-70">
             The Wedding Of
           </p>
           
           <h1 className="font-script text-7xl md:text-9xl text-[#1C1C1C] drop-shadow-sm mb-4 tracking-tighter">
             {t.title}
           </h1>

           <div className="flex items-center justify-center gap-6 mb-12">
              <div className="w-12 h-[1px] bg-gold/40"></div>
              <div className="p-2 border border-gold/20 rounded-full">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
              </div>
              <div className="w-12 h-[1px] bg-gold/40"></div>
           </div>

           <p className="text-taupe text-sm md:text-lg italic max-w-md mx-auto mb-16 leading-relaxed font-light tracking-wide">
             {t.inviteText}
           </p>

           <div className="relative inline-block group">
             <div className="absolute inset-x-0 -bottom-1 h-[1px] bg-gold/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
             <p className="text-base md:text-xl font-serif tracking-[0.3em] uppercase text-[#1C1C1C] px-8 py-2">
               {t.date}
             </p>
           </div>
        </div>
      </div>

      {/* Aesthetic Scroll Prompt */}
      <div className="absolute bottom-12 flex flex-col items-center space-y-6 animate-pulse">
        <span className="text-[9px] uppercase tracking-[0.4em] text-taupe font-medium opacity-60">Begin our Story</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-gold to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
