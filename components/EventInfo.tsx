import React from "react";
import { Calendar, MapPin, Navigation, ExternalLink } from "lucide-react";
import { Reveal } from "./Reveal";
import { motion } from "framer-motion";

interface EventDetails {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  addCalendar: string;
  openMaps: string;
}

interface EventInfoProps {
  t: {
    ceremony: EventDetails;
    reception: EventDetails;
    transitText: string;
  };
}

const EventCard: React.FC<{
  details: EventDetails;
  type: "ceremony" | "reception";
}> = ({ details, type }) => {
  const mapQuery = encodeURIComponent(`${details.venue}, ${details.address}`);

  return (
    <div className="mb-24 last:mb-0">
      <Reveal
        direction="up"
        className="bg-white/80 backdrop-blur-md shadow-[0_30px_60px_rgba(0,0,0,0.06)] rounded-[8px] py-16 md:py-24 px-8 md:px-16 border border-[#E6E3DE] relative overflow-hidden max-w-[850px] mx-auto transition-transform hover:scale-[1.01] duration-700"
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

        {/* Decorative Top Ornament */}
        <div className="flex justify-center mb-8 opacity-30">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C8A96A"
            strokeWidth="0.75"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center space-y-8 md:space-y-10">
          <h3 className="font-serif text-4xl md:text-5xl text-[#1C1C1C] uppercase tracking-[0.1em] font-light leading-tight">
            {details.title}
          </h3>

          <div className="space-y-4">
            <p className="font-serif text-3xl md:text-4xl text-gold tracking-[0.1em] font-medium">
              {details.date}
            </p>
            <p className="font-serif italic text-taupe text-lg md:text-xl tracking-widest lowercase opacity-90">
              {details.time}
            </p>
          </div>

          <div className="pt-4 space-y-4">
            <p className="text-xs md:text-[14px] uppercase tracking-[0.3em] text-[#1C1C1C] font-bold">
              {details.venue}
            </p>
            <p className="font-serif italic text-taupe text-sm md:text-base tracking-wide opacity-70 max-w-md mx-auto">
              {details.address}
            </p>
          </div>

          {/* Save the Date - inside the card */}
          <div className="pt-4">
            <button className="group flex items-center justify-center gap-4 border-b border-gold/30 text-taupe px-8 py-3 text-[11px] uppercase tracking-[0.4em] font-bold transition-all hover:text-gold hover:border-gold">
              <Calendar
                size={14}
                className="group-hover:scale-110 transition-transform"
              />
              {details.addCalendar}
            </button>
          </div>
        </div>
      </Reveal>

      {/* LUXURY ARTISAN MAP INTEGRATION - Full width using vw */}
      <Reveal direction="up" className="relative group mt-12">
        <div className="relative left-1/2 -translate-x-1/2" style={{ width: "92vw", maxWidth: "1400px" }}>
          {/* Gallery Matting Frame */}
          <div className="absolute -inset-2 md:-inset-4 border border-gold/10 rounded-[4px] pointer-events-none transition-all duration-1000 group-hover:border-gold/30"></div>

          {/* Main Canvas Container */}
          <div className="relative w-full rounded-[4px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.12)] bg-[#F2EFE9] border border-[#E6E3DE]" style={{ height: "clamp(300px, 50vw, 550px)" }}>
            {/* Custom Stylized Map View */}
            <iframe
              title={`Map for ${details.venue}`}
              width="100%"
              height="100%"
              frameBorder="0"
              src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${mapQuery}&t=&z=16&ie=UTF8&iwloc=B&output=embed`}
              className="transition-all duration-[2000ms] opacity-80 group-hover:opacity-100"
              style={{
                filter:
                  "sepia(30%) contrast(90%) brightness(105%) hue-rotate(-10deg) saturate(70%)",
                pointerEvents: "auto",
              }}
            ></iframe>

            {/* Artistic Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F2]/40 via-transparent to-transparent pointer-events-none"></div>

            {/* Pulsing Pin Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gold/20 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gold/30 rounded-full animate-pulse"></div>
                <div className="relative z-10 bg-gold p-2 rounded-full shadow-lg border-2 border-white">
                  <MapPin size={20} className="text-white" fill="white" />
                </div>
              </div>
            </div>

            {/* Floating Artisan Venue Card */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-auto md:right-auto md:top-10 md:left-10 z-20">
              <div className="bg-white/90 backdrop-blur-2xl p-6 md:p-8 rounded-[2px] border border-gold/20 shadow-2xl max-w-full md:max-w-[320px] text-left transform transition-all duration-1000 translate-y-0 group-hover:-translate-y-2 md:group-hover:translate-x-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-[1px] bg-gold opacity-40"></div>
                  <span className="text-[9px] uppercase tracking-[0.4em] text-gold font-black">
                    Location
                  </span>
                </div>

                <h4 className="font-serif text-xl md:text-2xl text-[#1C1C1C] mb-2 leading-tight">
                  {details.venue}
                </h4>

                <p className="text-taupe text-[11px] md:text-xs leading-relaxed mb-6 font-light italic opacity-90">
                  {details.address}
                </p>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
                        "_blank",
                      )
                    }
                    className="w-full flex items-center justify-between bg-[#1C1C1C] text-white px-5 py-3 rounded-[4px] text-[10px] uppercase tracking-[0.25em] font-bold transition-all hover:bg-gold hover:shadow-xl active:scale-[0.98]"
                  >
                    <span className="flex items-center gap-3">
                      <Navigation size={12} fill="currentColor" />
                      {details.openMaps}
                    </span>
                    <ExternalLink size={10} className="opacity-50" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

const TimelineConnector = ({ text }: { text: string }) => (
  <div className="relative flex flex-col items-center justify-center my-12 md:my-20 h-32 md:h-48">
    {/* The Golden Thread Line */}
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: "100%" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold to-transparent opacity-60"
    ></motion.div>

    {/* Transit Icon/Text */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="relative z-10 bg-[#F8F6F2] px-4 py-2 border border-gold/20 rounded-full shadow-sm"
    >
      <span className="font-serif italic text-taupe text-xs tracking-widest">
        {text}
      </span>
    </motion.div>
  </div>
);

const EventInfo: React.FC<EventInfoProps> = ({ t }) => {
  return (
    <div className="relative max-w-6xl mx-auto px-4 md:px-0">
      {/* Background Timeline Trace - subtle hint of connection */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gold/5 -translate-x-1/2 hidden md:block pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Ceremony */}
        <div className="w-full">
          <EventCard details={t.ceremony} type="ceremony" />
        </div>

        {/* Connector */}
        <TimelineConnector text={t.transitText} />

        {/* Reception */}
        <div className="w-full">
          <EventCard details={t.reception} type="reception" />
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
