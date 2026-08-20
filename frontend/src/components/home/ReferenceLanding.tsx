'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { AnimatedBackground } from '@/components/motion/AnimatedBackground';
import { Reveal, StaggerItem, StaggerReveal } from '@/components/motion/Reveal';
import {
  fadeUp, slideFromRight, scaleIn, motionTransition, easeOut,
} from '@/lib/motion';

const HERO_MODEL =
  'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80';

const FLOATING_JEWELRY = [
  {
    src: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&q=80',
    alt: 'Pearl earrings',
    className: 'top-[8%] -left-2 md:left-4 w-16 h-16 md:w-20 md:h-20',
    delay: 0,
  },
  {
    src: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&q=80',
    alt: 'Gold necklace',
    className: 'bottom-[25%] -left-4 md:left-0 w-14 h-14 md:w-[4.5rem] md:h-[4.5rem]',
    delay: 0.5,
  },
  {
    src: 'https://images.unsplash.com/photo-1605100804763-247fc67fa2b3?w=200&q=80',
    alt: 'Crystal ring',
    className: 'top-[20%] -right-2 md:right-24 w-12 h-12 md:w-16 md:h-16',
    delay: 1,
  },
];

const FEATURES = [
  { emoji: '🛡️', title: 'ANTI TARNISH', subtitle: 'Long Lasting Shine' },
  { emoji: '💎', title: 'PREMIUM QUALITY', subtitle: 'Finest Craftsmanship' },
  { emoji: '🤍', title: 'KOREAN DESIGNS', subtitle: 'Trendy & Minimal' },
  { emoji: '🎀', title: 'MADE FOR YOU', subtitle: 'Because You Deserve It' },
  { emoji: '🎁', title: 'PERFECT FOR EVERY YOU', subtitle: 'Every Occasion' },
];

function FloatingJewelry() {
  const reduced = useReducedMotion();

  return (
    <>
      {FLOATING_JEWELRY.map(({ src, alt, className, delay }, i) => (
        <motion.div
          key={alt}
          className={`absolute hidden sm:block rounded-2xl overflow-hidden shadow-lg border-2 border-white/80 ${className}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + delay, duration: 0.6, ease: easeOut }}
        >
          <div className={`relative w-full h-full ${reduced ? '' : 'animate-float-gentle'}`} style={{ animationDelay: `${i * 0.7}s` }}>
            <Image src={src} alt={alt} fill className="object-cover" sizes="80px" />
          </div>
        </motion.div>
      ))}
    </>
  );
}

export function ReferenceHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#fff6f3] to-[#fffdfd]">
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — staggered copy */}
          <StaggerReveal className="text-center lg:text-left">
            <StaggerItem>
              <p className="font-script text-3xl md:text-4xl text-rose-400 mb-6">
                Made to shine. Made for you. ♡
              </p>
            </StaggerItem>

            <StaggerItem>
              <h1 className="font-display text-[72px] sm:text-[90px] md:text-[110px] leading-none text-rose-700 mb-6 lowercase">
                aakshi
              </h1>
            </StaggerItem>

            <StaggerItem>
              <div className="border-b border-rose-200 w-full max-w-sm mx-auto lg:mx-0 mb-6" />
            </StaggerItem>

            <StaggerItem>
              <p className="tracking-[0.35em] md:tracking-[6px] uppercase text-gray-700 text-sm md:text-lg">
                Artificial • Korean • Anti-Tarnish
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="font-script text-3xl md:text-4xl text-gray-700 mt-5">
                Jewellery that stays as beautiful as you.
              </p>
            </StaggerItem>

            <StaggerItem>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/shop"
                  className="inline-block mt-10 bg-rose-600 hover:bg-rose-700 px-10 py-4 text-white rounded-xl text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/25"
                >
                  Shop Now ✨
                </Link>
              </motion.div>
            </StaggerItem>
          </StaggerReveal>

          {/* Right — animated model + badge */}
          <Reveal variants={slideFromRight} className="relative">
            <FloatingJewelry />

            <motion.div
              className="relative aspect-[4/5] md:aspect-[3/4] w-full max-w-lg mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-rose-200/40 ring-1 ring-rose-100"
              whileHover={{ scale: 1.01 }}
              transition={motionTransition(0, 0.4)}
            >
              <div className={`relative w-full h-full ${reduced ? '' : 'animate-hero-ken-burns'}`}>
                <Image
                  src={HERO_MODEL}
                  alt="Model wearing Aakshi Korean jewellery"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/10 via-transparent to-white/10 pointer-events-none" />
            </motion.div>

            <motion.div
              className="absolute right-2 md:right-5 top-10 md:top-14 bg-white rounded-full border-2 border-rose-200 w-40 h-40 md:w-48 md:h-48 flex items-center justify-center shadow-lg z-20"
              initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: easeOut }}
              whileHover={{ scale: 1.05, boxShadow: '0 16px 40px rgba(225,29,72,0.15)' }}
            >
              <div className={`text-center px-4 md:px-6 ${reduced ? '' : 'animate-float-gentle'}`}>
                <Heart className="w-5 h-5 text-rose-500 fill-rose-100 mx-auto mb-1" />
                <h3 className="text-rose-600 font-semibold text-sm md:text-base leading-snug">
                  SHINE MORE,
                  <br />
                  WORRY LESS.
                </h3>
                <p className="mt-3 text-xs md:text-sm text-gray-600">
                  Anti-Tarnish Beauty That Lasts
                </p>
                <Sparkles className="w-3 h-3 text-rose-400 mx-auto mt-2 opacity-70" />
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ReferenceTrustBar() {
  return (
    <section className="relative -mt-8 px-4 z-10">
      <Reveal variants={scaleIn}>
        <motion.div
          className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-rose-50"
          whileHover={{ boxShadow: '0 24px 60px rgba(225,29,72,0.1)' }}
          transition={{ duration: 0.4 }}
        >
          <StaggerReveal className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {FEATURES.map(({ emoji, title, subtitle }) => (
              <StaggerItem key={title}>
                <motion.div
                  className="group py-2 rounded-2xl transition-colors hover:bg-rose-50/60"
                  whileHover={{ y: -4 }}
                  transition={motionTransition(0, 0.3)}
                >
                  <motion.div
                    className="text-3xl md:text-4xl inline-block"
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {emoji}
                  </motion.div>
                  <h4 className="mt-3 font-semibold text-sm md:text-base text-gray-800">{title}</h4>
                  <p className="text-gray-500 text-xs md:text-sm mt-1">{subtitle}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </motion.div>
      </Reveal>
    </section>
  );
}

export function BrandIntroSection() {
  return (
    <section className="py-16 md:py-20 text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-50/40 to-transparent pointer-events-none" />
      <Reveal className="relative z-10">
        <motion.h2
          className="font-display text-4xl sm:text-5xl md:text-6xl text-gray-800 leading-tight"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={motionTransition(0, 0.7)}
        >
          Not just jewellery,{' '}
          <motion.span
            className="text-rose-600 italic inline-block"
            whileHover={{ scale: 1.02 }}
          >
            it&apos;s your Aakshi ♡
          </motion.span>
        </motion.h2>
        <motion.p
          className="mt-4 tracking-[0.35em] md:tracking-[7px] uppercase text-gray-500 text-xs md:text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={motionTransition(0.2, 0.6)}
        >
          Girlish • Timeless • Yours
        </motion.p>
      </Reveal>
    </section>
  );
}
