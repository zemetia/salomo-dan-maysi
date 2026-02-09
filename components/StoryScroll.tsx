import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useMotionValueEvent, motion } from 'framer-motion';
import StoryTextOverlays from './StoryTextOverlays';

const FRAME_COUNT = 104;

export default function StoryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];
    const promises: Promise<void>[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
        const promise = new Promise<void>((resolve) => {
            const img = new Image();
            // Assuming images are in public/images/story/
            img.src = `/images/story/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
            img.onload = () => {
                loadedCount++;
                setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                resolve();
            };
            img.onerror = () => {
                console.warn(`Failed to load frame ${i}`);
                resolve();
            };
            imgArray[i - 1] = img;
        });
        promises.push(promise);
    }

    Promise.all(promises).then(() => {
        setImages(imgArray);
        setLoaded(true);
    });
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const renderFrame = (progress: number) => {
      if (!canvasRef.current || images.length === 0) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const frameIndex = Math.min(
        FRAME_COUNT - 1, 
        Math.floor(progress * FRAME_COUNT)
      );
      
      const img = images[frameIndex];
      // Skip if image not loaded or error
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Draw containing aspect ratio
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.width;
      const ih = img.height;
      
      const scale = Math.min(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
  };
  
  // React to scroll changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
      requestAnimationFrame(() => renderFrame(latest));
  });

  // Handle Resize
  useEffect(() => {
      const handleResize = () => {
          if (canvasRef.current) {
               canvasRef.current.width = window.innerWidth;
               canvasRef.current.height = window.innerHeight;
               // Attempt to redraw last known frame if needed
               // For now, next scroll event will fix it, 
               // or we could store lastProgress in a ref.
               renderFrame(scrollYProgress.get());
          }
      };
      
      window.addEventListener('resize', handleResize);
      handleResize(); 
      
      return () => window.removeEventListener('resize', handleResize);
  }, [loaded, images]); // Dependency on loaded to allow initial sizing

  return (
    <div 
        ref={containerRef} 
        className="relative w-full bg-[#050505]"
        style={{ height: `${(FRAME_COUNT * 5) + 100}vh` }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-10 bg-black">
        <canvas 
            ref={canvasRef} 
            className="w-full h-full object-contain"
        />
        
        <StoryTextOverlays scrollYProgress={scrollYProgress} />

        {!loaded && (
            <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50"
                exit={{ opacity: 0 }}
            >
                <div className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse">
                    INITIALIZING SEQUENCE...
                </div>
                <div className="mt-4 w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
                        style={{ width: `${loadingProgress}%` }}
                    />
                </div>
                <div className="mt-2 text-xs font-mono text-gray-500">
                    LOADING ASSETS: {loadingProgress}%
                </div>
            </motion.div>
        )}
      </div>
    </div>
  );
}
