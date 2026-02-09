
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
  t: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    toBigDay: string;
  };
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, t }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const Item = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center">
      <span className="text-4xl md:text-6xl font-serif text-[#1C1C1C] mb-2">{String(value).padStart(2, '0')}</span>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-taupe font-medium">{label}</span>
    </div>
  );

  return (
    <div className="text-center">
      <p className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-10 font-medium">{t.toBigDay}</p>
      <div className="flex justify-center gap-6 md:gap-16">
        <Item label={t.days} value={timeLeft.days} />
        <Item label={t.hours} value={timeLeft.hours} />
        <Item label={t.minutes} value={timeLeft.minutes} />
        <Item label={t.seconds} value={timeLeft.seconds} />
      </div>
    </div>
  );
};

export default Countdown;
