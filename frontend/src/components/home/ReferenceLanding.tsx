'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Sparkles } from 'lucide-react';

const HERO_MODEL =
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&q=80';
const HERO_INSET =
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80';

function LogoFlourish() {
  return (
    <svg viewBox="0 0 200 24" className="w-48 md:w-56 h-6 text-mauve mx-auto" fill="none" aria-hidden>
      <path
        d="M8 18C40 6 80 4 100 12C120 20 160 18 192 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M95 12 L100 8 L105 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScallopedBadge() {
  return (
    <div className="absolute -right-2 md:right-4 top-1/4 z-20 w-[140px] md:w-[165px]">
      <div
        className="relative bg-announce text-mauve text-center px-4 py-5 shadow-lg"
        style={{
          borderRadius: '50%',
          clipPath:
            'polygon(50% 0%, 62% 6%, 75% 0%, 88% 6%, 100% 0%, 94% 14%, 100% 28%, 94% 42%, 100% 56%, 94% 70%, 100% 84%, 88% 94%, 75% 100%, 62% 94%, 50% 100%, 38% 94%, 25% 100%, 12% 94%, 0% 84%, 6% 70%, 0% 56%, 6% 42%, 0% 28%, 6% 14%, 0% 0%, 12% 6%, 25% 0%, 38% 6%)',
        }}
      >
        <Heart className="w-5 h-5 mx-auto mb-2 fill-mauve/30 text-mauve" />
        <p className="font-display text-[11px] md:text-xs font-semibold leading-tight uppercase tracking-wide">
          Shine More,
          <br />
          Worry Less.
        </p>
        <p className="text-[9px] md:text-[10px] mt-2 leading-snug text-mauve/80">
          Antitarnish Beauty That Lasts
        </p>
        <Sparkles className="w-3 h-3 mx-auto mt-2 text-mauve/60" />
      </div>
    </div>
  );
}

export function ReferenceHero() {
  return (
    <section className="bg-blush relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 pt-6 pb-4 md:pb-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[520px] md:min-h-[580px]">
          {/* Left content */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            <div className="relative w-full max-w-[200px] md:max-w-[240px] mb-6 mx-auto lg:mx-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-4 border-white">
                <Image
                  src={HERO_INSET}
                  alt="AAKSHI gold earrings"
                  fill
                  className="object-cover"
                  sizes="240px"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm hidden md:block">
                <Image
                  src="https://images.unsplash.com/photo-1490750967868-88ecb4474c04?w=200"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            </div>

            <p className="font-script text-mauve text-xl md:text-2xl mb-3">
              Made to shine. Made for you. ♡
            </p>

            <div className="mb-2">
              <h1 className="font-display text-6xl md:text-7xl lg:text-[5.5rem] text-mauve lowercase tracking-tight leading-none">
                aakshi
              </h1>
              <LogoFlourish />
            </div>

            <p className="text-[10px] md:text-xs font-medium tracking-[0.35em] text-mauve/90 uppercase mb-4 max-w-md">
              Artificial. Korean. Antitarnish.
            </p>

            <p className="font-script text-mauve text-lg md:text-xl mb-8">
              Jewellery that stays as beautiful as you. ♡
            </p>

            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-mauve text-white text-xs md:text-sm font-semibold tracking-[0.2em] uppercase px-10 py-3.5 rounded-md hover:bg-mauve-dark transition-colors shadow-md"
            >
              Shop Now ✦
            </Link>
          </div>

          {/* Right — model image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-[4/5] md:aspect-[3/4] max-h-[520px] md:max-h-[600px] mx-auto lg:mr-0 lg:ml-auto w-full max-w-md lg:max-w-none rounded-3xl overflow-hidden">
              <Image
                src={HERO_MODEL}
                alt="Model wearing AAKSHI jewellery"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 50vw"
                priority
              />
            </div>
            <ScallopedBadge />
          </div>
        </div>
      </div>
    </section>
  );
}

const TRUST_ITEMS = [
  {
    icon: '🛡️',
    title: 'Antitarnish',
    subtitle: 'Long Lasting Shine',
  },
  {
    icon: '💎',
    title: 'Premium Quality',
    subtitle: 'Finest Craftsmanship',
  },
  {
    icon: '♡',
    title: 'Korean Designs',
    subtitle: 'Trendy. Minimal. You.',
  },
  {
    icon: '✿',
    title: 'Made For You',
    subtitle: 'Because You Deserve It',
  },
  {
    icon: '🎁',
    title: 'Perfect For Every You',
    subtitle: 'Everyday to Every Occasion',
  },
];

export function ReferenceTrustBar() {
  return (
    <section className="bg-blush pb-8 md:pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-blush-dark/40 px-4 py-6 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-0 md:divide-x divide-blush-dark/50">
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center text-center px-2 md:px-4"
              >
                <span className="text-2xl md:text-3xl mb-2 text-mauve" aria-hidden>
                  {item.icon}
                </span>
                <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-mauve">
                  {item.title}
                </p>
                <p className="text-[9px] md:text-[10px] text-mauve/70 mt-1 leading-snug">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function BrandIntroSection() {
  return (
    <section className="bg-blush py-14 md:py-20 text-center px-4">
      <p className="text-mauve text-lg md:text-2xl mb-3">
        Not just jewellery, it&apos;s your{' '}
        <span className="font-script text-2xl md:text-3xl">aakshi</span> ♡
      </p>
      <p className="text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase text-mauve/80">
        Girlish. Timeless. Yours. ♡
      </p>
    </section>
  );
}
