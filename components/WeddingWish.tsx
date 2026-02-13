import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Heart, MessageCircle } from "lucide-react";
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: Timestamp;
}

interface WeddingWishProps {
  t: {
    title: string;
    subtitle: string;
    nameLabel: string;
    messageLabel: string;
    placeholder: string;
    submitButton: string;
    successMessage: string;
    emptyMessage: string;
  };
}

const WeddingWish: React.FC<WeddingWishProps> = ({ t }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "wishes"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const wishesData: Wish[] = [];
      snapshot.forEach((doc) => {
        wishesData.push({ id: doc.id, ...doc.data() } as Wish);
      });
      setWishes(wishesData);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "wishes"), {
        name: name.trim(),
        message: message.trim(),
        timestamp: Timestamp.now(),
      });
      setName("");
      setMessage("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error adding wish:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section id="wishes" className="py-20 md:py-32 bg-gradient-to-b from-[#F8F6F2] to-[#E8E4DF]/30">
      <div className="max-w-[800px] mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-5 h-5 text-[#C8A96A]" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#8B7355]">
              Wedding Wish
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#2C2C2C] mb-3">
            {t.title}
          </h2>
          <p className="text-[#8B7355] text-sm">{t.subtitle}</p>
        </motion.div>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg shadow-[#C8A96A]/5 mb-10 border border-[#C8A96A]/10"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs tracking-wider uppercase text-[#8B7355] mb-2">
                {t.nameLabel}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.placeholder}
                className="w-full px-4 py-3 bg-[#F8F6F2] border border-[#C8A96A]/20 rounded-xl text-[#2C2C2C] placeholder-[#8B7355]/50 focus:outline-none focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/10 transition-all"
                maxLength={50}
              />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-[#8B7355] mb-2">
                {t.messageLabel}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.placeholder}
                rows={4}
                className="w-full px-4 py-3 bg-[#F8F6F2] border border-[#C8A96A]/20 rounded-xl text-[#2C2C2C] placeholder-[#8B7355]/50 focus:outline-none focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/10 transition-all resize-none"
                maxLength={500}
              />
              <p className="text-right text-[10px] text-[#8B7355]/60 mt-1">
                {message.length}/500
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || !message.trim()}
              className="w-full py-4 bg-gradient-to-r from-[#C8A96A] to-[#B8975F] text-white rounded-xl font-medium text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#C8A96A]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t.submitButton}
                </>
              )}
            </button>
          </form>

          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-center"
            >
              <p className="text-green-700 text-sm">{t.successMessage}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Wishes List */}
        <div className="space-y-4">
          {wishes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 text-[#8B7355]/60"
            >
              <Heart className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">{t.emptyMessage}</p>
            </motion.div>
          ) : (
            wishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#C8A96A]/10 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8A96A] to-[#B8975F] flex items-center justify-center text-white font-serif text-lg flex-shrink-0">
                    {wish.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-[#2C2C2C] truncate">
                        {wish.name}
                      </h4>
                      <span className="text-[10px] text-[#8B7355]/60 whitespace-nowrap ml-2">
                        {formatDate(wish.timestamp)}
                      </span>
                    </div>
                    <p className="text-[#5A5A5A] text-sm leading-relaxed">
                      {wish.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default WeddingWish;
