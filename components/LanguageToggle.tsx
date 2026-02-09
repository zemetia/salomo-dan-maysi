
import React from 'react';
import { Language } from '../types';

interface LanguageToggleProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, setLang }) => {
  return (
    <div className="fixed top-8 right-8 z-[100] flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase font-medium">
      <button
        onClick={() => setLang('EN')}
        className={`transition-colors py-1 ${
          currentLang === 'EN' ? 'text-gold border-b border-gold' : 'text-taupe hover:text-[#1C1C1C]'
        }`}
      >
        EN
      </button>
      <span className="text-[#E6E3DE]">|</span>
      <button
        onClick={() => setLang('ID')}
        className={`transition-colors py-1 ${
          currentLang === 'ID' ? 'text-gold border-b border-gold' : 'text-taupe hover:text-[#1C1C1C]'
        }`}
      >
        ID
      </button>
    </div>
  );
};

export default LanguageToggle;
