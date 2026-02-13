import React, { useState } from "react";
import { translations } from "./translations";
import { Language } from "./types";
import Hero from "./components/Hero";
import Couple from "./components/Couple";
import Gallery from "./components/Gallery";
import EventInfo from "./components/EventInfo";
import VideoSection from "./components/VideoSection";
import Countdown from "./components/Countdown";
import AudioControl from "./components/AudioControl";
import LanguageToggle from "./components/LanguageToggle";
import Closing from "./components/Closing";
import Gift from "./components/Gift";
import WeddingWish from "./components/WeddingWish";
import Rsvp from "./components/Rsvp";
import { motion } from "framer-motion";

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>("ID");
  const [isMuted, setIsMuted] = useState(true);
  const t = translations[lang];

  return (
    <div className="relative min-h-screen selection:bg-[#C8A96A] selection:text-white bg-[#F8F6F2]">
      <AudioControl isMuted={isMuted} setIsMuted={setIsMuted} />
      <LanguageToggle currentLang={lang} setLang={setLang} />

      <Hero t={t.hero} />

      <div className="relative">
        {/* Story Section */}
        <section
          id="couple"
          className="py-20 md:py-32 max-w-[1100px] mx-auto px-4 md:px-0"
        >
          <Couple t={t.couple} />
        </section>

        {/* Video Section - Full Width between Story and Gallery */}
        {/* <section id="video" className="w-full">
          <VideoSection t={t.video} />
        </section> */}

        {/* Gallery Section */}
        <section id="gallery" className="w-full">
          <Gallery t={t.gallery} />
        </section>

        <div className="max-w-[1100px] mx-auto px-4 md:px-0">
          <div className="section-divider max-w-[300px] mx-auto"></div>

          <motion.section
            id="countdown"
            className="py-20 bg-[#E6E3DE]/20 rounded-[48px] my-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} // approximates top 85-90%
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Countdown t={t.countdown} targetDate="2026-02-28T10:00:00" />
          </motion.section>
        </div>

        {/* Event section outside max-w container so map can go full width */}
        <section id="event" className="py-20 md:py-32 overflow-x-clip">
          <EventInfo t={t.event} />
        </section>

        {/* RSVP Section */}
        <Rsvp t={t.rsvp} />

        {/* Wedding Wish Section */}
        <WeddingWish t={t.weddingWish} />

        <div className="max-w-[1100px] mx-auto px-4 md:px-0">
          <div className="section-divider max-w-[300px] mx-auto opacity-10"></div>

          <section id="gift" className="w-full">
            <Gift t={t.gift} />
          </section>

          <div className="section-divider max-w-[300px] mx-auto opacity-10"></div>

          <section id="closing" className="w-full">
            <Closing t={t.closing} />
          </section>
        </div>
      </div>

      <footer className="py-20 text-center border-t border-gold/10">
        <div className="w-16 h-[1px] bg-gold mx-auto mb-8"></div>
        <p className="font-script text-4xl text-gold mb-4">Salomo & Maysi</p>
        <p className="text-taupe text-[10px] tracking-[0.3em] uppercase">
          &copy; 2026 • February 28 • The Emerald Garden
        </p>
      </footer>
    </div>
  );
};

export default App;
