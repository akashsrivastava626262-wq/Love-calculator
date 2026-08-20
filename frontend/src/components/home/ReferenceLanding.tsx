'use client';

import Image from 'next/image';
import Link from 'next/link';

const HERO_MODEL =
  'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80';

const FEATURES = [
  { emoji: '🛡️', title: 'ANTI TARNISH', subtitle: 'Long Lasting Shine' },
  { emoji: '💎', title: 'PREMIUM QUALITY', subtitle: 'Finest Craftsmanship' },
  { emoji: '🤍', title: 'KOREAN DESIGNS', subtitle: 'Trendy & Minimal' },
  { emoji: '🎀', title: 'MADE FOR YOU', subtitle: 'Because You Deserve It' },
  { emoji: '🎁', title: 'PERFECT FOR EVERY YOU', subtitle: 'Every Occasion' },
];

export function ReferenceHero() {
  return (
    <section className="bg-gradient-to-r from-[#fff6f3] to-[#fffdfd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="text-center lg:text-left">
            <p className="font-script text-3xl md:text-4xl text-rose-400 mb-6">
              Made to shine. Made for you. ♡
            </p>

            <h1 className="font-display text-[72px] sm:text-[90px] md:text-[110px] leading-none text-rose-700 mb-6 lowercase">
              aakshi
            </h1>

            <div className="border-b border-rose-200 w-full max-w-sm mx-auto lg:mx-0 mb-6" />

            <p className="tracking-[0.35em] md:tracking-[6px] uppercase text-gray-700 text-sm md:text-lg">
              Artificial • Korean • Anti-Tarnish
            </p>

            <p className="font-script text-3xl md:text-4xl text-gray-700 mt-5">
              Jewellery that stays as beautiful as you.
            </p>

            <Link
              href="/shop"
              className="inline-block mt-10 bg-rose-600 hover:bg-rose-700 px-10 py-4 text-white rounded-xl text-lg shadow-lg transition"
            >
              Shop Now ✨
            </Link>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="relative aspect-[4/5] md:aspect-[3/4] w-full max-w-lg mx-auto rounded-2xl overflow-hidden">
              <Image
                src={HERO_MODEL}
                alt="Model wearing Aakshi Korean jewellery"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 45vw"
                priority
              />
            </div>

            <div className="absolute right-2 md:right-5 top-10 md:top-14 bg-white rounded-full border-2 border-rose-200 w-40 h-40 md:w-48 md:h-48 flex items-center justify-center shadow-lg">
              <div className="text-center px-4 md:px-6">
                <h3 className="text-rose-600 font-semibold text-sm md:text-base leading-snug">
                  SHINE MORE,
                  <br />
                  WORRY LESS.
                </h3>
                <p className="mt-3 text-xs md:text-sm text-gray-600">
                  Anti-Tarnish Beauty That Lasts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReferenceTrustBar() {
  return (
    <section className="relative -mt-8 px-4 z-10">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {FEATURES.map(({ emoji, title, subtitle }) => (
            <div key={title}>
              <div className="text-3xl md:text-4xl">{emoji}</div>
              <h4 className="mt-3 font-semibold text-sm md:text-base text-gray-800">{title}</h4>
              <p className="text-gray-500 text-xs md:text-sm mt-1">{subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BrandIntroSection() {
  return (
    <section className="py-16 md:py-20 text-center px-4">
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-gray-800 leading-tight">
        Not just jewellery,{' '}
        <span className="text-rose-600 italic">
          it&apos;s your Aakshi ♡
        </span>
      </h2>
      <p className="mt-4 tracking-[0.35em] md:tracking-[7px] uppercase text-gray-500 text-xs md:text-sm">
        Girlish • Timeless • Yours
      </p>
    </section>
  );
}
