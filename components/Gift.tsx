import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { TranslationSet } from "../types";

interface GiftProps {
  t: TranslationSet["gift"];
}

const BankCard = ({
  logo,
  accountNumber,
  name,
  copyLabel,
  copiedLabel,
}: {
  logo: string;
  accountNumber: string;
  name: string;
  copyLabel: string;
  copiedLabel: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white/60 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center gap-6"
    >
      <div className="h-10 flex items-center justify-center w-full">
        <img src={logo} alt="Bank Logo" className="h-full object-contain" />
      </div>

      <div className="space-y-2 w-full">
        <div
          className="flex items-center justify-center gap-3 group cursor-pointer w-full"
          onClick={handleCopy}
          title={copyLabel}
        >
          <h3 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] group-hover:text-[#C8A96A] transition-colors tabular-nums">
            {accountNumber}
          </h3>
          <Copy className="w-4 h-4 text-gray-400 group-hover:text-[#C8A96A] transition-colors" />
        </div>
        <p className="text-sm uppercase tracking-widest text-[#8B7E74] font-medium">
          {name}
        </p>
      </div>

      <button
        onClick={handleCopy}
        className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-2 ${
          copied
            ? "bg-[#C8A96A] text-white shadow-md"
            : "bg-white text-[#8B7E74] border border-[#E6E3DE] hover:border-[#C8A96A] hover:text-[#C8A96A]"
        }`}
      >
        {copied ? (
          <>
            <Check className="w-3 h-3" /> {copiedLabel}
          </>
        ) : (
          copyLabel
        )}
      </button>
    </motion.div>
  );
};

const Gift: React.FC<GiftProps> = ({ t }) => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <BankCard
            logo="/images/Bank_Negara_Indonesia_logo_(2004).svg.png"
            accountNumber="3616171818"
            name={t.bniName}
            copyLabel={t.copyText}
            copiedLabel={t.copiedText}
          />
          <BankCard
            logo="/images/bca.svg"
            accountNumber="8255305154"
            name={t.bcaName}
            copyLabel={t.copyText}
            copiedLabel={t.copiedText}
          />
        </div>
      </div>
    </div>
  );
};

export default Gift;
