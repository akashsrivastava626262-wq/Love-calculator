'use client';

import { useReducedMotion } from 'framer-motion';

const ORBS = [
  { className: 'top-[8%] left-[5%] w-72 h-72 bg-rose-200/40', delay: '0s', duration: '18s' },
  { className: 'top-[40%] left-[15%] w-48 h-48 bg-pink-100/50', delay: '2s', duration: '22s' },
  { className: 'bottom-[10%] left-[30%] w-64 h-64 bg-rose-100/45', delay: '4s', duration: '20s' },
  { className: 'top-[15%] right-[20%] w-80 h-80 bg-rose-100/35', delay: '1s', duration: '24s' },
  { className: 'bottom-[20%] right-[8%] w-56 h-56 bg-pink-200/30', delay: '3s', duration: '19s' },
];

const SPARKLES: { top: string; left?: string; right?: string; size: number; delay: string }[] = [
  { top: '18%', left: '12%', size: 6, delay: '0s' },
  { top: '32%', left: '28%', size: 4, delay: '1.2s' },
  { top: '55%', left: '8%', size: 5, delay: '2.4s' },
  { top: '22%', right: '32%', size: 5, delay: '0.8s' },
  { top: '48%', right: '18%', size: 4, delay: '1.8s' },
  { top: '70%', right: '40%', size: 6, delay: '3s' },
];

export function AnimatedBackground() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Shifting gradient mesh */}
      <div
        className={`absolute inset-0 bg-mesh-gradient opacity-80 ${reduced ? '' : 'animate-mesh-shift'}`}
      />

      {/* Soft floating orbs — CSS only for GPU performance */}
      {!reduced && ORBS.map((orb, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-3xl animate-orb-float ${orb.className}`}
          style={{ animationDelay: orb.delay, animationDuration: orb.duration }}
        />
      ))}

      {/* Subtle sparkle dots */}
      {!reduced && SPARKLES.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-rose-300/60 animate-sparkle-pulse"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-rose-50/30" />
    </div>
  );
}
