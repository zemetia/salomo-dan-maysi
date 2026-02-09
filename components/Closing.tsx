import React from "react";
import { Heart } from "lucide-react";
import { Reveal } from "./Reveal";

interface ClosingProps {
  t: {
    thanks: string;
    wishes: string;
  };
}

const Closing: React.FC<ClosingProps> = ({ t }) => {
  return (
    <div className="text-center py-20 md:py-40 px-6 relative">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none z-0">
        <Heart size={400} fill="currentColor" className="text-gold" />
      </div>

      <Reveal
        direction="up"
        className="relative z-10 max-w-2xl mx-auto space-y-12"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4 opacity-30 mb-8">
            <div className="w-12 h-[1px] bg-gold"></div>
            <Heart size={16} className="text-gold" fill="currentColor" />
            <div className="w-12 h-[1px] bg-gold"></div>
          </div>

          <h2 className="font-script text-7xl md:text-9xl text-gold leading-none">
            {t.thanks}
          </h2>
        </div>

        <p className="text-taupe text-lg md:text-xl leading-relaxed italic font-light opacity-90">
          "{t.wishes}"
        </p>

        <div className="pt-12 flex flex-col items-center space-y-8">
          <div className="flex items-center gap-6 opacity-40">
            <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
          </div>

          <div className="space-y-2">
            <p className="text-taupe uppercase tracking-[0.5em] text-[10px] font-bold opacity-60">
              With Love,
            </p>
            <p className="font-script text-5xl text-[#1C1C1C]">
              Salomo & Maysi
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default Closing;
