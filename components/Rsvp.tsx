import React, { useState } from "react";
import { MessageCircle, Check, Users, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TranslationSet } from "../types";

interface RsvpProps {
  t: TranslationSet["rsvp"];
}

const Rsvp: React.FC<RsvpProps> = ({ t }) => {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [numberOfPerson, setNumberOfPerson] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappMessage = `Halo, saya ingin mengkonfirmasi kehadiran untuk pernikahan Salomo & Maysi.

*Nama:* ${name}
*Kehadiran:* ${attendance}
*Jumlah Orang:* ${attendance === t.attendanceOptions.coming ? numberOfPerson : 0}
${message ? `*Pesan:* ${message}` : ""}

Terima kasih!`;

    const encoded = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/6282294307966?text=${encoded}`, "_blank");
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName("");
      setAttendance("");
      setNumberOfPerson("");
      setMessage("");
    }, 3000);
  };

  const isFormValid = name.trim() && attendance && (attendance !== t.attendanceOptions.coming || numberOfPerson);

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

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/60 backdrop-blur-md border border-white/60 rounded-3xl p-12 shadow-sm w-full max-w-xl text-center"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-serif text-[#C8A96A] mb-2">
                Terima Kasih!
              </h3>
              <p className="text-[#5A5A5A]">
                Konfirmasi Anda telah terkirim via WhatsApp
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-md border border-white/60 rounded-3xl p-8 md:p-12 shadow-sm w-full max-w-xl space-y-6"
            >
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm uppercase tracking-widest text-[#8B7E74] font-medium">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full px-5 py-3 rounded-xl border border-[#E6E3DE] bg-white/80 text-[#1C1C1C] placeholder:text-[#8B7E74]/60 focus:outline-none focus:border-[#C8A96A] transition-colors"
                  required
                />
              </div>

              {/* Attendance Field */}
              <div className="space-y-2">
                <label className="text-sm uppercase tracking-widest text-[#8B7E74] font-medium">
                  {t.attendanceLabel}
                </label>
                <select
                  value={attendance}
                  onChange={(e) => {
                    setAttendance(e.target.value);
                    if (e.target.value !== t.attendanceOptions.coming) {
                      setNumberOfPerson("");
                    }
                  }}
                  className="w-full px-5 py-3 rounded-xl border border-[#E6E3DE] bg-white/80 text-[#1C1C1C] focus:outline-none focus:border-[#C8A96A] transition-colors appearance-none cursor-pointer"
                  required
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

              {/* Number of Person - Conditional */}
              <AnimatePresence>
                {attendance === t.attendanceOptions.coming && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <label className="flex items-center gap-2 text-sm uppercase tracking-widest text-[#8B7E74] font-medium">
                      <Users className="w-4 h-4" />
                      {t.numberOfPersonLabel}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={numberOfPerson}
                      onChange={(e) => setNumberOfPerson(e.target.value)}
                      placeholder={t.numberOfPersonPlaceholder}
                      className="w-full px-5 py-3 rounded-xl border border-[#E6E3DE] bg-white/80 text-[#1C1C1C] placeholder:text-[#8B7E74]/60 focus:outline-none focus:border-[#C8A96A] transition-colors"
                      required={attendance === t.attendanceOptions.coming}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message Field - Optional */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm uppercase tracking-widest text-[#8B7E74] font-medium">
                  <MessageSquare className="w-4 h-4" />
                  Pesan (Opsional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tulis pesan untuk pengantin..."
                  rows={3}
                  className="w-full px-5 py-3 rounded-xl border border-[#E6E3DE] bg-white/80 text-[#1C1C1C] placeholder:text-[#8B7E74]/60 focus:outline-none focus:border-[#C8A96A] transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid}
                className="w-full py-4 rounded-xl bg-[#C8A96A] text-white font-bold text-sm tracking-[0.2em] uppercase hover:bg-[#b8994f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                {t.sendButton}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Rsvp;
