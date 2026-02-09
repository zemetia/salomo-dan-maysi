import React from "react";
import { motion } from "framer-motion";

interface CoupleProps {
  t: {
    title: string;
    theBride: string;
    theGroom: string;
    brideDesc: string;
    groomDesc: string;
  };
}

const Couple: React.FC<CoupleProps> = ({ t }) => {
  const brideUrl = "/images/couple/bride.png";
  const groomUrl = "/images/couple/groom.png";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 overflow-hidden">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-script text-6xl md:text-7xl text-gold">
          {t.title}
        </h2>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 max-w-7xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Groom Section (First) */}
        <div className="flex flex-col items-center text-center group">
          <motion.div variants={itemVariants} className="mb-8 space-y-2">
            <h3 className="font-script text-5xl text-[#1C1C1C] tracking-wide">
              {t.theGroom}
            </h3>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold font-bold">
              The Groom
            </p>
            <p className="text-taupe text-sm italic opacity-80 max-w-xs">
              {t.groomDesc}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative w-[85vw] max-w-md md:w-[60vh] h-[65vh] md:h-[85vh] overflow-hidden rounded-t-full bg-[#F2EFE9]"
          >
            <img
              src={groomUrl}
              alt="The Groom"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Ornament (Middle) */}
        <motion.div
          variants={itemVariants}
          className="hidden md:flex flex-col items-center self-stretch justify-center opacity-60"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-gold to-transparent"></div>
          <span className="font-script text-4xl text-gold my-4">&</span>
          <div className="w-[1px] h-24 bg-gradient-to-t from-transparent via-gold to-transparent"></div>
        </motion.div>

        {/* Bride Section (Second) */}
        <div className="flex flex-col items-center text-center group">
          <motion.div variants={itemVariants} className="mb-8 space-y-2">
            <h3 className="font-script text-5xl text-[#1C1C1C] tracking-wide">
              {t.theBride}
            </h3>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold font-bold">
              The Bride
            </p>
            <p className="text-taupe text-sm italic opacity-80 max-w-xs">
              {t.brideDesc}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative w-[85vw] max-w-md md:w-[60vh] h-[65vh] md:h-[85vh] overflow-hidden rounded-t-full bg-[#F2EFE9]"
          >
            <img
              src={brideUrl}
              alt="The Bride"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Couple;
