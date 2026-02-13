import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, User, Users, MessageSquare, Send, Check } from "lucide-react";

interface RSVPProps {
  t: {
    title: string;
    subtitle: string;
    nameLabel: string;
    attendanceLabel: string;
    attendanceOptions: {
      present: string;
      absent: string;
    };
    guestCountLabel: string;
    messageLabel: string;
    submitButton: string;
    successMessage: string;
    whatsappMessage: string;
  };
  coupleNames: {
    groom: string;
    bride: string;
  };
  whatsappNumber: string;
}

const RSVP: React.FC<RSVPProps> = ({ t, coupleNames, whatsappNumber }) => {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"present" | "absent" | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attendance) return;

    const whatsappText = encodeURIComponent(
      `Halo ${coupleNames.groom} & ${coupleNames.bride},\n\n` +
      `${t.whatsappMessage}\n\n` +
      `*Nama:* ${name}\n` +
      `*Kehadiran:* ${attendance === "present" ? t.attendanceOptions.present : t.attendanceOptions.absent}\n` +
      `*Jumlah Tamu:* ${attendance === "present" ? guestCount : 0}\n` +
      `${message ? `*Pesan:* ${message}` : ""}`
    );

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
    window.open(whatsappUrl, "_blank");
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="rsvp" className="py-20 md:py-32 bg-[#2C2C2C] text-white">
      <div className="max-w-[600px] mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <CalendarCheck className="w-5 h-5 text-[#C8A96A]" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#C8A96A]">
              RSVP
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">
            {t.title}
          </h2>
          <p className="text-white/60 text-sm">{t.subtitle}</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                {t.successMessage}
              </h3>
              <p className="text-white/60 text-sm">
                WhatsApp akan terbuka untuk mengirim konfirmasi
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#C8A96A] mb-3">
                  <User className="w-4 h-4" />
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20 transition-all"
                  required
                />
              </div>

              {/* Attendance */}
              <div>
                <label className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#C8A96A] mb-3">
                  <CalendarCheck className="w-4 h-4" />
                  {t.attendanceLabel}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance("present")}
                    className={`py-3 px-4 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                      attendance === "present"
                        ? "bg-[#C8A96A] border-[#C8A96A] text-white"
                        : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    {t.attendanceOptions.present}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance("absent")}
                    className={`py-3 px-4 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                      attendance === "absent"
                        ? "bg-[#C8A96A] border-[#C8A96A] text-white"
                        : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-lg">✕</span>
                    {t.attendanceOptions.absent}
                  </button>
                </div>
              </div>

              {/* Guest Count - Only show if attending */}
              {attendance === "present" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#C8A96A] mb-3">
                    <Users className="w-4 h-4" />
                    {t.guestCountLabel}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-xl font-medium">
                      {guestCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                      className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Message */}
              <div>
                <label className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#C8A96A] mb-3">
                  <MessageSquare className="w-4 h-4" />
                  {t.messageLabel}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tulis pesan untuk pengantin..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20 transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!name.trim() || !attendance}
                className="w-full py-4 bg-[#C8A96A] text-white rounded-xl font-medium text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#B8975F] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
              >
                <Send className="w-4 h-4" />
                {t.submitButton}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RSVP;
