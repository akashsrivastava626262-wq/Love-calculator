'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function FlashSaleCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const end = new Date();
    end.setHours(end.getHours() + 48);

    const timer = setInterval(() => {
      const diff = end.getTime() - Date.now();
      if (diff <= 0) { clearInterval(timer); return; }
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-primary via-primary/90 to-accent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-white text-center md:text-left">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">⚡ Flash Sale</h2>
            <p className="text-white/80">Hurry! Limited time offers on trending jewelry</p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="bg-white/20 backdrop-blur rounded-xl p-4 text-center min-w-[80px]">
                <div className="text-3xl font-bold text-white">{String(item.value).padStart(2, '0')}</div>
                <div className="text-xs text-white/70">{item.label}</div>
              </div>
            ))}
          </div>

          <Link href="/shop?isFlashSale=true">
            <Button variant="gold" size="lg">Shop Flash Sale</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
