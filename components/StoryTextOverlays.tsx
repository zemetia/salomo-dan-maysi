import React from 'react';
import { motion, useTransform, MotionValue, useMotionValueEvent } from 'framer-motion';
import { storySections } from '../data/story';

interface StoryTextOverlaysProps {
  scrollYProgress: MotionValue<number>;
}

const StoryTextOverlays: React.FC<StoryTextOverlaysProps> = ({ scrollYProgress }) => {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {storySections.map((section, index) => {
        const start = section.start;
        const end = section.end;
        
        // Transform the global scroll progress into a local progress (0 to 1) for this section
        const sectionProgress = useTransform(scrollYProgress, [start, end], [0, 1]);
        
        // We also want opacity to handle the transition in/out
        // Fade in quickly at start, fade out quickly at end
        const opacity = useTransform(
          scrollYProgress,
          [start, start + 0.05, end - 0.05, end],
          [0, 1, 1, 0]
        );
        
        const y = useTransform(
            scrollYProgress,
            [start, end],
            [20, -20]
        );

        return (
          <TypingSection 
            key={index}
            text={section.text}
            progress={sectionProgress}
            opacity={opacity}
            y={y}
            index={index}
          />
        );
      })}
    </div>
  );
};

// Subcomponent to handle the reactive string slicing
const TypingSection = ({ text, progress, opacity, y, index }: { 
    text: string, 
    progress: MotionValue<number>, 
    opacity: MotionValue<number>,
    y: MotionValue<number>,
    index: number 
}) => {
    const [displayedText, setDisplayedText] = React.useState("");
    
    useMotionValueEvent(progress, "change", (latest) => {
        const length = Math.floor(latest * text.length);
        setDisplayedText(text.slice(0, length));
    });

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute z-10 text-center w-full px-4"
        >
            <div className="relative inline-block">
                <div className="absolute -inset-8 bg-blue-500/20 blur-2xl rounded-full" />
                <h2 className="relative text-4xl md:text-6xl font-mono font-bold text-white drop-shadow-sm tracking-tight min-h-[1.5em]">
                   {displayedText}
                   <span className="animate-pulse text-blue-400">_</span>
                </h2>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50" />
            </div>
            <div className="mt-4 font-mono text-xs text-blue-400/50 opacity-70">
                {`<frame:${String(index + 1).padStart(2, '0')} />`}
            </div>
        </motion.div>
    );
};

export default StoryTextOverlays;
