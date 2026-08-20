'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart, Sparkles, Shield, Gem, Gift, User,
} from 'lucide-react';

/* Luxury campaign model — soft blush styling, pearl & gold jewellery, editorial pose */
const HERO_MODEL =
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1600&q=90';
const JEWELRY_PROP =
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=85';
const FLOWERS =
  'https://images.unsplash.com/photo-1490750967868-88ecb4474c04?w=300&q=85';

function BowSeparator() {
  return (
    <div className="flex items-center gap-2 w-full max-w-[280px] my-4" aria-hidden>
      <Sparkles className="w-3 h-3 text-rose-gold/60 shrink-0 animate-sparkle" />
      <div className="flex-1 h-px bg-mauve/25" />
      <svg viewBox="0 0 24 16" className="w-6 h-4 text-rose-gold shrink-0" fill="currentColor">
        <path d="M12 2 C10 6, 6 8, 4 10 C6 10, 10 9, 12 12 C14 9, 18 10, 20 10 C18 8, 14 6, 12 2Z" opacity="0.7" />
      </svg>
      <div className="flex-1 h-px bg-mauve/25" />
      <Sparkles className="w-3 h-3 text-rose-gold/60 shrink-0 animate-sparkle" />
    </div>
  );
}

function AakshiLogo({ size = 'hero' }: { size?: 'hero' | 'header' }) {
  const textSize = size === 'hero'
    ? 'text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem]'
    : 'text-2xl md:text-3xl';

  return (
    <div className={`relative inline-block ${textSize} font-display font-semibold text-mauve leading-none tracking-[0.02em]`}>
      <span className="absolute -top-3 left-[0.05em] text-[10px] md:text-xs text-rose-gold/80">✦</span>
      aaksh
      <span className="relative">
        i
        <Heart
          className="absolute -top-[0.55em] left-1/2 -translate-x-1/2 w-[0.22em] h-[0.22em] text-rose-gold fill-rose-gold/25"
          strokeWidth={2}
        />
      </span>
    </div>
  );
}

function ScallopedBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="absolute top-[12%] md:top-[10%] right-[2%] md:right-[8%] z-30 w-[130px] md:w-[155px] animate-float"
    >
      <div className="scalloped-badge relative aspect-square flex flex-col items-center justify-center text-center p-3 md:p-4">
        <Heart className="w-4 h-4 text-mauve fill-mauve/15 mb-1.5" strokeWidth={1.5} />
        <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.08em] text-mauve leading-tight">
          Shine More,
          <br />
          Worry Less.
        </p>
        <p className="text-[7px] md:text-[8px] text-mauve/70 mt-1.5 leading-snug px-1">
          Antitarnish Beauty That Lasts
        </p>
        <span className="text-[8px] text-rose-gold mt-1">✦</span>
      </div>
    </motion.div>
  );
}

function JewelryProp() {
  return (
    <div className="absolute bottom-[18%] left-[2%] md:left-[4%] z-20 hidden sm:block w-[90px] md:w-[110px]">
      <div
        className="relative bg-white/90 p-1.5 shadow-md"
        style={{
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          clipPath: 'polygon(0% 15%, 8% 0%, 92% 0%, 100% 15%, 100% 85%, 92% 100%, 8% 100%, 0% 85%)',
        }}
      >
        <div className="relative aspect-square rounded-full overflow-hidden">
          <Image src={JEWELRY_PROP} alt="" fill className="object-cover" sizes="110px" />
        </div>
      </div>
      <div className="absolute -top-6 -right-4 w-16 h-16 opacity-80 pointer-events-none">
        <Image src={FLOWERS} alt="" fill className="object-cover rounded-full" sizes="64px" />
      </div>
    </div>
  );
}

export function ReferenceHero() {
  return (
    <section className="relative overflow-hidden bg-cream min-h-[520px] md:min-h-[580px] lg:min-h-[620px]">
      {/* Background model — right side, campaign photography */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/95 via-40% to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-blush/30 via-transparent to-cream/20 z-10" />
        <div className="absolute top-0 right-0 w-full md:w-[62%] lg:w-[58%] h-full">
          <Image
            src={HERO_MODEL}
            alt="Fashion model wearing Aakshi Korean pearl and gold jewellery in soft blush tones"
            fill
            className="object-cover object-[center_15%] md:object-[center_10%]"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-cream/80 md:to-cream/90" />
        </div>
      </div>

      <JewelryProp />
      <ScallopedBadge />

      {/* Left content */}
      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <div className="flex items-center min-h-[520px] md:min-h-[580px] lg:min-h-[620px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-xl py-16 md:py-20 text-center md:text-left"
          >
            <p className="font-script text-rose-gold text-lg md:text-xl mb-3 md:mb-4">
              Made to shine. Made for you. <span className="text-rose-gold/80">♡</span>
            </p>

            <AakshiLogo size="hero" />

            <BowSeparator />

            <p className="text-[9px] md:text-[10px] font-semibold tracking-[0.35em] text-mauve/85 uppercase mb-3">
              Artificial.&nbsp; Korean.&nbsp; Antitarnish.
            </p>

            <p className="font-script text-rose-gold text-base md:text-lg mb-8">
              Jewellery that stays as beautiful as you. <span className="text-rose-gold/80">♡</span>
            </p>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-mauve text-white text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase px-8 py-3.5 rounded-lg shadow-md shadow-mauve/20 hover:bg-mauve-dark transition-colors"
            >
              Shop Now
              <span className="text-gold-light text-xs">✦</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: Shield, title: 'Antitarnish', subtitle: 'Long Lasting Shine' },
  { icon: Gem, title: 'Premium Quality', subtitle: 'Finest Craftsmanship' },
  { icon: Heart, title: 'Korean Designs', subtitle: 'Trendy. Minimal. You.' },
  { icon: User, title: 'Made For You', subtitle: 'Because You Deserve It' },
  { icon: Gift, title: 'Perfect For Every You', subtitle: 'Everyday to Every Occasion' },
];

export function ReferenceTrustBar() {
  return (
    <section className="relative z-30 px-4 -mt-10 md:-mt-14 mb-0">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(125,78,91,0.1)] px-4 py-6 md:px-8 md:py-7"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6 md:gap-y-0">
            {FEATURES.map(({ icon: Icon, title, subtitle }, i) => (
              <div
                key={title}
                className={`flex flex-col items-center text-center px-2 ${
                  i < FEATURES.length - 1 ? 'md:border-r md:border-blush-deep/70' : ''
                } ${i % 2 === 0 && i < 4 ? 'border-r border-blush-deep/50 md:border-r' : ''}`}
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-rose-gold mb-2.5" strokeWidth={1.25} />
                <p className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] uppercase text-mauve mb-0.5">
                  {title}
                </p>
                <p className="text-[8px] md:text-[9px] text-mauve/55 leading-snug capitalize">
                  {subtitle}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function BrandIntroSection() {
  return (
    <section className="relative py-14 md:py-20 text-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-blush/40 to-cream" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <p className="text-mauve text-lg md:text-2xl font-display mb-4 leading-relaxed">
          Not just jewellery, it&apos;s your{' '}
          <span className="font-script text-2xl md:text-3xl text-rose-gold">aakshi</span>
          <span className="text-rose-gold ml-1">♡</span>
        </p>
        <p className="text-[9px] md:text-[10px] font-semibold tracking-[0.4em] uppercase text-mauve/70">
          Girlish. Timeless. Yours. <span className="text-rose-gold">♥</span>
        </p>
      </motion.div>
    </section>
  );
}
