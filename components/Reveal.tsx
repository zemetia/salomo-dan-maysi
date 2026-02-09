
import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number | "some" | "all"; // Amount of element visible to trigger
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "fit-content", 
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
  amount = 0.3
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: amount });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const variants = {
    hidden: { 
      opacity: 0, 
      x: direction === "left" ? -75 : direction === "right" ? 75 : 0, 
      y: direction === "up" ? 75 : direction === "down" ? -75 : 0 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { duration: duration, delay: delay, ease: "easeOut" }
    },
  };

  return (
    <div ref={ref} className={className} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={mainControls}
        style={{ width: "100%" }} // Ensure content can take full width
      >
        {children}
      </motion.div>
    </div>
  );
};
