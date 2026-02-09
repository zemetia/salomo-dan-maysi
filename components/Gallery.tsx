import React, { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface GalleryProps {
  t: {
    title: string;
    subtitle: string;
  };
}

interface ImageConfig {
  url: string;
  ratio: "portrait" | "square" | "landscape";
  offset: string;
  rotate: number;
  zIndex: number;
}

const IMAGES: ImageConfig[] = [
  {
    url: "/images/PMOP4036.jpg",
    ratio: "portrait",
    offset: "-8%",
    rotate: -2,
    zIndex: 10,
  },
  {
    url: "/images/PMOP4072.jpg",
    ratio: "square",
    offset: "12%",
    rotate: 3,
    zIndex: 20,
  },
  {
    url: "/images/PMOP4092.jpg",
    ratio: "landscape",
    offset: "-2%",
    rotate: -1,
    zIndex: 15,
  },
  {
    url: "/images/PMOP4237.jpg",
    ratio: "portrait",
    offset: "6%",
    rotate: 2,
    zIndex: 25,
  },
  {
    url: "/images/PMOP4303.jpg",
    ratio: "square",
    offset: "-10%",
    rotate: -4,
    zIndex: 10,
  },
  {
    url: "/images/PMOP4431.jpg",
    ratio: "portrait",
    offset: "8%",
    rotate: 1,
    zIndex: 30,
  },
  {
    url: "/images/PMOP4526.jpg",
    ratio: "portrait",
    offset: "-5%",
    rotate: -3,
    zIndex: 15,
  },
  {
    url: "/images/Stry_PMOP4112.jpg",
    ratio: "square",
    offset: "10%",
    rotate: 4,
    zIndex: 40,
  },
  {
    url: "/images/w1.jpg",
    ratio: "landscape",
    offset: "12%",
    rotate: -12,
    zIndex: 28,
  },
];

const GalleryItem: React.FC<{ img: ImageConfig; idx: number }> = ({
  img,
  idx,
}) => {
  const ratioClasses = {
    portrait: "w-[70vw] md:w-[400px] aspect-[4/5]",
    square: "w-[65vw] md:w-[450px] aspect-square",
    landscape: "w-[85vw] md:w-[650px] aspect-[16/9]",
  };

  return (
    <div
      className={`flex-shrink-0 relative overflow-hidden rounded-[24px] md:rounded-[48px] bg-white shadow-2xl transition-transform duration-700 group -mx-8 md:-mx-16 hover:z-[60]`}
      style={{
        transform: `translateY(${img.offset}) rotate(${img.rotate}deg)`,
        zIndex: img.zIndex,
      }}
    >
      <div
        className={`overflow-hidden bg-[#F2EFE9] ${ratioClasses[img.ratio]}`}
      >
        <img
          src={img.url}
          alt={`Wedding Moment ${idx + 1}`}
          className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-700 translate-y-4 group-hover:translate-y-0">
          <span className="font-script text-white text-5xl md:text-7xl">
            0{idx + 1}
          </span>
        </div>
      </div>
      <div className="absolute inset-4 md:inset-6 border border-white/20 rounded-[16px] md:rounded-[36px] opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-700 scale-95 group-hover:scale-100 pointer-events-none"></div>
    </div>
  );
};

const Gallery: React.FC<GalleryProps> = ({ t }) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Dynamic calculation of scrollable width
  const ghostRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportW, setViewportW] = useState(0);

  useLayoutEffect(() => {
    // Need to wait for layout to ensure widths are correct
    const updateScrollRange = () => {
      if (ghostRef.current) {
        setViewportW(window.innerWidth);
        // Calculate total scrollable width needed
        // Scroll limit: total width of content - viewport width
        // We add some buffer or ensure we measure correctly
        const totalWidth = ghostRef.current.scrollWidth;
        const vw = window.innerWidth;
        setScrollRange(totalWidth - vw + vw * 0.1); // Add a 10vw buffer for ease
      }
    };

    updateScrollRange();

    // Resize observer or simple event listener
    window.addEventListener("resize", updateScrollRange);
    return () => window.removeEventListener("resize", updateScrollRange);
  }, []);

  // Map 0 -> 1 vertical scroll progress to 0 -> -scrollRange horizontal translation
  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);

  // Parallax for particles (slower than main scroll)
  const particleX = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);

  // Line drawing effect
  const pathLength = useTransform(smoothProgress, [0, 0.9], [0, 1]);

  return (
    <div ref={targetRef} className="relative h-[400vh] bg-[#F8F6F2]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center z-10 bg-[#F8F6F2]">
        {/* Background Ornaments */}
        <div className="absolute inset-0 flex items-center justify-around pointer-events-none opacity-[0.03] z-0 overflow-hidden">
          <span className="font-script text-[40vw] text-gold whitespace-nowrap select-none">
            Forever
          </span>
          <span className="font-script text-[40vw] text-gold whitespace-nowrap ml-[100vw] select-none">
            Journeys
          </span>
        </div>

        {/* Floating Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-[8dvh] md:top-[12dvh] text-center w-full z-50 px-6"
        >
          <h2 className="font-script text-6xl md:text-8xl text-gold mb-3 italic leading-tight">
            {t.title}
          </h2>
          <div className="w-12 md:w-20 h-[1px] bg-gold mx-auto mb-3 md:mb-5 opacity-30"></div>
          <p className="text-taupe text-[9px] md:text-[11px] italic tracking-[0.4em] uppercase font-light">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Particle Layer (Parallax) */}
        <motion.div
          style={{ x: particleX }}
          className="absolute inset-0 z-20 pointer-events-none w-[200vw]"
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gold/20 backdrop-blur-[1px]"
              style={{
                width: Math.random() * 20 + 10 + "px",
                height: Math.random() * 20 + 10 + "px",
                top: Math.random() * 100 + "%",
                left: i * 15 + Math.random() * 10 + "vw",
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* The Track */}
        <div className="relative h-full flex items-center overflow-visible z-10 w-max">
          {/* Connecting SVG Line */}
          <svg className="absolute top-0 left-0 w-[5000px] h-full pointer-events-none z-0 overflow-visible opacity-20">
            <motion.path
              d="M 0 500 Q 500 200 1000 500 T 2000 500 T 3000 500 T 4000 500 T 5000 500"
              fill="none"
              stroke="#C8A96A"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={pathLength} // Framer motion simplifies this!
            />
          </svg>

          <motion.div
            ref={ghostRef}
            style={{ x }}
            className="flex items-center h-full px-[10vw] gap-4 will-change-transform"
          >
            {IMAGES.map((img, idx) => (
              <GalleryItem key={idx} img={img} idx={idx} />
            ))}

            {/* Final Card */}
            <div className="flex-shrink-0 ml-20 md:ml-40 pr-[20vw]">
              <div className="glass-card px-16 md:px-28 py-20 md:py-32 rounded-[60px] md:rounded-[90px] border border-gold/20 shadow-2xl backdrop-blur-2xl group cursor-default text-center">
                <span className="text-gold/40 text-xs tracking-[0.8em] uppercase mb-8 block">
                  Our Future
                </span>
                <p className="font-script text-5xl md:text-9xl text-gold group-hover:scale-105 transition-transform duration-1000 whitespace-nowrap">
                  To be continued...
                </p>
                <div className="mt-12 md:mt-16 w-24 h-[1px] bg-gold mx-auto opacity-30"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom indicator */}
        <div className="absolute bottom-[6dvh] md:bottom-[10dvh] left-1/2 -translate-x-1/2 flex items-center gap-8 opacity-40">
          <div className="w-12 md:w-20 h-[1px] bg-gold"></div>
          <span className="text-[9px] md:text-[11px] uppercase tracking-[0.6em] text-taupe font-bold">
            Scroll to Unfold
          </span>
          <div className="w-12 md:w-20 h-[1px] bg-gold"></div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
