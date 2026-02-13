import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { TranslationSet } from "../types";

interface RsvpProps {
  t: TranslationSet["rsvp"];
}

const Rsvp: React.FC<RsvpProps> = ({ t }) => {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [numberOfPerson, setNumberOfPerson] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Halo, saya ingin mengkonfirmasi kehadiran untuk pernikahan Salomo & Maysi.

Nama: ${name}
Kehadiran: ${attendance}
Jumlah Orang: ${numberOfPerson}

Terima kasih!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6282294307966?text=${encoded}`, "_blank");
  };

  return (
    <div className="w-full relative py-20 px-6">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-100/40 via-transparent to-transparent"></div>

      <div className="max-w-[1100px] mx-auto flex flex-col items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-6 max-w-2xl"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-[#C8A96A]">
            {t.title}
          </h2>
          <p className="text-[#5A5A5A] leading-relaxed font-light text-lg">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white/60 backdrop-blur-md border border-white/60 rounded-3xl p-8 md:p-12 shadow-sm w-full max-w-xl space-y-6"
        >
          <div className="space-y-2">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full px-5 py-3 rounded-xl border border-[#E6E3DE] bg-white/80 text-[#1C1C1C] placeholder:text-[#8B7E74]/60 focus:outline-none focus:border-[#C8A96A] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm uppercase tracking-widest text-[#8B7E74] font-medium">
              {t.attendanceLabel}
            </label>
            <select
              required
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-[#E6E3DE] bg-white/80 text-[#1C1C1C] focus:outline-none focus:border-[#C8A96A] transition-colors appearance-none"
            >
              <option value="" disabled>
                {t.attendanceLabel}
              </option>
              <option value={t.attendanceOptions.coming}>
                {t.attendanceOptions.coming}
              </option>
              <option value={t.attendanceOptions.notComing}>
                {t.attendanceOptions.notComing}
              </option>
              <option value={t.attendanceOptions.uncertain}>
                {t.attendanceOptions.uncertain}
              </option>
            </select>
          </div>

          <div className="space-y-2">
            <input
              type="number"
              required
              min={1}
              value={numberOfPerson}
              onChange={(e) => setNumberOfPerson(e.target.value)}
              placeholder={t.numberOfPersonPlaceholder}
              className="w-full px-5 py-3 rounded-xl border border-[#E6E3DE] bg-white/80 text-[#1C1C1C] placeholder:text-[#8B7E74]/60 focus:outline-none focus:border-[#C8A96A] transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#C8A96A] text-white font-bold text-sm tracking-[0.2em] uppercase hover:bg-[#b8994f] transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            {t.sendButton}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Rsvp;
