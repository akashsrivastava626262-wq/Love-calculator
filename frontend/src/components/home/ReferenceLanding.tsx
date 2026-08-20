'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart, Sparkles, Shield, Gem, Gift, ArrowRight, Ribbon,
} from 'lucide-react';

const HERO_MODEL =
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=85';
const HERO_INSET =
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=85';
const FLOWER =
  'https://images.unsplash.com/photo-1490750967868-88ecb4474c04?w=200';

function DecorativeOrnaments() {
  const items = [
    { icon: Heart, className: 'top-[12%] left-[4%] text-rose-gold/40', delay: 0 },
    { icon: Sparkles, className: 'top-[20%] right-[8%] text-gold/50', delay: 0.5 },
    { icon: Heart, className: 'bottom-[30%] left-[8%] text-rose-gold/30', delay: 1 },
    { icon: Sparkles, className: 'top-[55%] right-[3%] text-rose-gold/35', delay: 1.5 },
    { icon: Ribbon, className: 'bottom-[15%] right-[12%] text-gold/40', delay: 0.8 },
  ];

  return (
    <>
      {items.map(({ icon: Icon, className, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute pointer-events-none ${className}`}
          animate={{ y: [0, -8, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay }}
        >
          <Icon className="w-4 h-4 md:w-5 md:h-5" />
        </motion.div>
      ))}
    </>
  );
}

function LogoFlourish() {
  return (
    <svg viewBox="0 0 220 20" className="w-52 md:w-64 h-5 text-rose-gold mt-1" fill="none" aria-hidden>
      <path d="M10 14 Q110 2 210 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="110" cy="8" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function FloatingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="absolute -right-1 md:right-2 top-[18%] z-30 w-[150px] md:w-[175px] animate-float"
    >
      <div className="glass-card rounded-full aspect-square flex flex-col items-center justify-center text-center p-4 shadow-xl shadow-rose-gold/15">
        <Heart className="w-5 h-5 text-rose-gold fill-rose-gold/20 mb-2" />
        <p className="font-display text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-rose-gold leading-tight">
          Shine More,
          <br />
          Worry Less.
        </p>
        <p className="text-[8px] md:text-[9px] text-rose-gold/70 mt-2 leading-snug px-2">
          Anti-Tarnish Beauty That Lasts
        </p>
        <Sparkles className="w-3 h-3 text-gold mt-2 animate-sparkle" />
      </div>
    </motion.div>
  );
}

export function ReferenceHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-blush/40 to-nude/30">
      <DecorativeOrnaments />

      {/* Soft ambient blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-rose-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blush/60 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 md:px-8 py-10 md:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-6 items-center min-h-[580px] md:min-h-[640px]">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
          >
            {/* Main brand tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-rose-gold text-base md:text-xl font-medium leading-snug mb-3 max-w-md"
            >
              ✨ Jewellery That Loves Every Version of You
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-foreground/60 text-xs md:text-sm leading-relaxed mb-8 max-w-md font-light"
            >
              Premium Artificial, Korean &amp; Anti-Tarnish Jewellery Designed to Shine Through Every Moment.
            </motion.p>

            {/* Inset product — glass card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative w-full max-w-[220px] mb-8 mx-auto lg:mx-0"
            >
              <div className="glass-card rounded-3xl p-2 shadow-lg">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image src={HERO_INSET} alt="AAKSHI Korean bow earrings" fill className="object-cover" sizes="220px" priority />
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full overflow-hidden border-2 border-warm-white shadow-md hidden md:block">
                <Image src={FLOWER} alt="" fill className="object-cover" sizes="56px" />
              </div>
              <Sparkles className="absolute -top-2 -left-2 w-5 h-5 text-gold animate-sparkle" />
            </motion.div>

            <p className="font-script text-rose-gold text-xl md:text-2xl mb-4 capitalize">
              Made to Shine. Made for You.
            </p>

            <div className="mb-3">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-rose-gold tracking-[0.08em] leading-none font-semibold">
                AAKSHI
              </h1>
              <LogoFlourish />
            </div>

            <p className="text-[10px] md:text-[11px] font-semibold tracking-[0.4em] text-rose-gold/90 uppercase mb-4">
              Artificial &nbsp;•&nbsp; Korean &nbsp;•&nbsp; Anti-Tarnish
            </p>

            <p className="font-script text-rose-gold/90 text-lg md:text-xl mb-8 capitalize">
              Jewellery that stays as beautiful as you.
            </p>

            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-rose-gold to-rose-dark text-warm-white text-xs md:text-sm font-semibold tracking-[0.15em] uppercase px-8 md:px-10 py-4 rounded-full shadow-lg shadow-rose-gold/30 hover:shadow-xl hover:shadow-rose-gold/40 hover:scale-[1.02] transition-all duration-300"
            >
              Shop the Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right — model */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative mx-auto lg:ml-auto lg:mr-0 max-w-lg w-full">
              {/* Glass frame */}
              <div className="glass-card rounded-[2rem] p-3 md:p-4 shadow-2xl shadow-rose-gold/10">
                <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden">
                  <Image
                    src={HERO_MODEL}
                    alt="Fashion model wearing AAKSHI Korean anti-tarnish jewellery"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-gold/10 via-transparent to-blush/20" />
                </div>
              </div>
              <FloatingBadge />

              {/* Decorative jewellery dots */}
              <div className="absolute -left-4 top-1/3 w-3 h-3 rounded-full bg-gold/60 shadow-sm animate-sparkle hidden md:block" />
              <div className="absolute -right-2 bottom-1/4 w-2 h-2 rounded-full bg-rose-gold/50 animate-sparkle hidden md:block" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: Shield, title: 'Anti Tarnish', subtitle: 'Long Lasting Shine' },
  { icon: Gem, title: 'Premium Quality', subtitle: 'Finest Craftsmanship' },
  { icon: Heart, title: 'Korean Designs', subtitle: 'Trendy. Minimal. Timeless.' },
  { icon: Sparkles, title: 'Made For You', subtitle: 'Because You Deserve It' },
  { icon: Gift, title: 'Perfect For Every You', subtitle: 'Everyday To Every Occasion' },
];

export function ReferenceTrustBar() {
  return (
    <section className="relative px-4 pb-10 md:pb-16 -mt-2">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-3xl p-6 md:p-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
            {FEATURES.map(({ icon: Icon, title, subtitle }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`flex flex-col items-center text-center px-2 ${
                  i < FEATURES.length - 1 ? 'md:border-r md:border-blush-deep/60' : ''
                }`}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-blush to-cream flex items-center justify-center mb-3 shadow-sm border border-warm-white">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-rose-gold" strokeWidth={1.5} />
                </div>
                <p className="text-[9px] md:text-[10px] font-bold tracking-[0.18em] uppercase text-rose-gold mb-1">
                  {title}
                </p>
                <p className="text-[9px] md:text-[10px] text-foreground/55 leading-snug">
                  {subtitle}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function BrandIntroSection() {
  return (
    <section className="relative py-16 md:py-24 text-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-blush/30 to-cream" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <Sparkles className="w-5 h-5 text-gold mx-auto mb-4 animate-sparkle" />
        <p className="text-rose-gold text-xl md:text-3xl font-display mb-3 leading-snug">
          Not just jewellery, it&apos;s your{' '}
          <span className="font-script text-2xl md:text-4xl capitalize">Aakshi</span>
        </p>
        <p className="text-[10px] md:text-xs font-semibold tracking-[0.45em] uppercase text-rose-gold/70">
          Girlish. Timeless. Yours.
        </p>
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(3)].map((_, i) => (
            <Heart key={i} className="w-3 h-3 text-rose-gold/40 fill-rose-gold/20" />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
