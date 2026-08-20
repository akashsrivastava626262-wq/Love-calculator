'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { Reveal, StaggerItem, StaggerReveal } from '@/components/motion/Reveal';
import { DEMO_CATEGORIES, DEMO_PRODUCTS, COLLECTIONS } from '@/lib/types';
import { motionTransition } from '@/lib/motion';

/* ─── Giva-style hero slides ─── */
const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1600&q=85',
    eyebrow: 'New Season',
    title: 'Korean Jewellery That Shines',
    subtitle: 'Anti-tarnish artificial pieces designed for everyday elegance',
    cta: 'Shop Korean',
    href: '/shop?collection=korean',
    align: 'left' as const,
  },
  {
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=85',
    eyebrow: 'Best Sellers',
    title: 'Exceptional Anytime Jewellery',
    subtitle: 'Trending earrings, necklaces & accessories loved across India',
    cta: 'Explore Best Sellers',
    href: '/shop?isBestSeller=true',
    align: 'center' as const,
  },
  {
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=85',
    eyebrow: 'Gift Ready',
    title: 'Made to Gift, Made to Keep',
    subtitle: 'Premium packaging · Free shipping · COD available',
    cta: 'Shop Gifts',
    href: '/shop?collection=gift',
    align: 'left' as const,
  },
];

const TRUST_ITEMS = [
  { icon: Sparkles, label: 'Anti-Tarnish', sub: 'Long lasting shine' },
  { icon: Truck, label: 'Free Shipping', sub: 'On all orders' },
  { icon: RefreshCw, label: 'Easy Returns', sub: '7-day policy' },
  { icon: Shield, label: 'Premium Quality', sub: 'Fine craftsmanship' },
];

const GIFT_OCCASIONS = [
  { label: 'Birthday', emoji: '🎂', href: '/shop?collection=gift' },
  { label: 'Anniversary', emoji: '💕', href: '/shop?collection=wedding' },
  { label: 'Self Love', emoji: '✨', href: '/shop?isNewArrival=true' },
  { label: 'Festive', emoji: '🪔', href: '/shop?collection=ethnic' },
  { label: 'Daily Wear', emoji: '🌸', href: '/shop?collection=daily-wear' },
  { label: 'Best Friend', emoji: '🎀', href: '/shop?collection=korean' },
];

function GivaHeroCarousel() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    reduced ? [] : [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  return (
    <section className="relative bg-white">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {HERO_SLIDES.map((slide, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 relative">
              <div className="relative aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] max-h-[520px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent sm:from-black/40" />
                <div
                  className={`absolute inset-0 flex items-center px-6 sm:px-12 md:px-20 ${
                    slide.align === 'center' ? 'justify-center text-center' : 'justify-start text-left'
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="max-w-lg text-white"
                  >
                    <p className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-pink-200 mb-2 sm:mb-3">
                      {slide.eyebrow}
                    </p>
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-3">
                      {slide.title}
                    </h1>
                    <p className="text-sm sm:text-base text-white/85 mb-6 max-w-md leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <Link
                      href={slide.href}
                      className="inline-flex items-center gap-2 bg-giva-gradient text-white text-sm font-semibold px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                    >
                      {slide.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel controls */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === selected ? 'w-8 bg-white' : 'w-1.5 bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function GivaTrustStrip() {
  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
            <StaggerItem key={label}>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-giva-pink-light flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-giva-pink" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

function GivaCategoryCircles() {
  const [emblaRef] = useEmblaCarousel({ align: 'start', dragFree: true, containScroll: 'trimSnaps' });

  return (
    <section className="py-10 md:py-14 bg-giva-cream">
      <Reveal className="max-w-7xl mx-auto px-4 mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 text-center">
          Shop by Category
        </h2>
        <p className="text-center text-gray-500 text-sm mt-2">Korean, ethnic & everyday jewellery</p>
      </Reveal>

      <div className="overflow-hidden px-4" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6 max-w-7xl mx-auto">
          {DEMO_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="flex-[0_0_auto] group text-center w-[88px] sm:w-[100px]"
            >
              <div className="relative w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] mx-auto rounded-full overflow-hidden ring-2 ring-white shadow-md group-hover:ring-giva-pink/40 transition-all duration-300 group-hover:scale-105">
                <Image src={cat.image || ''} alt={cat.name} fill className="object-cover" sizes="84px" />
              </div>
              <p className="mt-3 text-xs sm:text-sm font-medium text-gray-700 group-hover:text-giva-pink transition-colors line-clamp-2">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function GivaProductRow({
  title,
  subtitle,
  href,
  filter,
  limit = 8,
}: {
  title: string;
  subtitle?: string;
  href: string;
  filter: 'bestSeller' | 'newArrival';
  limit?: number;
}) {
  const products = DEMO_PRODUCTS.filter((p) =>
    filter === 'bestSeller' ? p.isBestSeller : p.isNewArrival
  ).slice(0, limit);

  const [emblaRef] = useEmblaCarousel({ align: 'start', dragFree: true, containScroll: 'trimSnaps' });

  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <Reveal className="flex items-end justify-between mb-6 md:mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
          </div>
          <Link
            href={href}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-giva-pink hover:gap-2 transition-all"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>

        <div className="overflow-hidden -mx-1 px-1" ref={emblaRef}>
          <div className="flex gap-4">
            {products.map((product, i) => (
              <div key={product._id} className="flex-[0_0_46%] sm:flex-[0_0_32%] md:flex-[0_0_24%] lg:flex-[0_0_20%] min-w-0">
                <ProductCard product={product} index={i} variant="giva" />
              </div>
            ))}
          </div>
        </div>

        <Link
          href={href}
          className="sm:hidden mt-6 flex items-center justify-center gap-1 text-sm font-semibold text-giva-pink"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

function GivaCollectionBanners() {
  const featured = COLLECTIONS.slice(0, 4);

  return (
    <section className="py-10 md:py-14 bg-giva-cream">
      <Reveal className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900">Curated Collections</h2>
        <p className="text-gray-500 text-sm mt-2">Handpicked styles for every moment</p>
      </Reveal>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {featured.map((col, i) => (
          <Reveal key={col.slug} delay={i * 0.08}>
            <Link
              href={`/shop?collection=${col.slug}`}
              className="group block relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
            >
              <Image src={col.image} alt={col.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="25vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-semibold text-sm md:text-base">{col.name}</p>
                <p className="text-white/70 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Shop now <ArrowRight className="w-3 h-3" />
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function GivaGiftingSection() {
  return (
    <section className="py-10 md:py-14 bg-white">
      <Reveal className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <p className="text-giva-pink text-xs font-semibold tracking-[0.2em] uppercase mb-2">Gifting</p>
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900">
          Gifts for Every Occasion
        </h2>
        <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
          Thoughtful Korean & anti-tarnish jewellery — perfect for her, perfect for you
        </p>
      </Reveal>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 sm:grid-cols-6 gap-3 md:gap-4">
        {GIFT_OCCASIONS.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.05}>
            <Link
              href={item.href}
              className="group flex flex-col items-center p-4 md:p-5 rounded-2xl bg-giva-cream border border-transparent hover:border-giva-pink/20 hover:bg-giva-pink-light/30 transition-all duration-300"
            >
              <span className="text-2xl md:text-3xl mb-2 group-hover:scale-110 transition-transform">{item.emoji}</span>
              <span className="text-xs md:text-sm font-medium text-gray-700 text-center">{item.label}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function GivaPromoBand() {
  return (
    <section className="py-12 md:py-16 bg-giva-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,white_0%,transparent_50%)]" />
      <Reveal className="relative max-w-4xl mx-auto px-4 text-center text-white">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-3">
          Shine More, Worry Less
        </h2>
        <p className="text-white/90 text-sm md:text-base mb-8 max-w-lg mx-auto">
          Premium anti-tarnish artificial jewellery with Korean designs — because you deserve everyday luxury.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-white text-giva-pink font-semibold px-8 py-3.5 rounded-full hover:shadow-lg transition-all"
          >
            Shop All Jewellery
          </Link>
          <Link
            href="/shop?isNewArrival=true"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/80 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-all"
          >
            New Arrivals
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function GivaBrandStory() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <Reveal>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=85"
              alt="Aakshi jewellery collection"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-giva-pink text-xs font-semibold tracking-[0.2em] uppercase mb-3">About Aakshi</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 mb-4 leading-snug">
            Korea-Inspired Jewellery for the Modern Girl
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Aakshi brings you trendy, minimal, anti-tarnish artificial jewellery — designed to shine through
            every moment. From everyday studs to statement festive pieces, discover girlish elegance that lasts.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Free shipping · COD available · Easy returns · Premium quality craftsmanship.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-giva-pink font-semibold hover:gap-3 transition-all"
          >
            Our Story <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Public exports (used by page.tsx) ─── */
export function ReferenceHero() {
  return <GivaHeroCarousel />;
}

export function ReferenceTrustBar() {
  return <GivaTrustStrip />;
}

export function BrandIntroSection() {
  return (
    <>
      <GivaCategoryCircles />
      <GivaProductRow
        title="Best Sellers"
        subtitle="Most loved by our community"
        href="/shop?isBestSeller=true"
        filter="bestSeller"
      />
      <GivaCollectionBanners />
      <GivaProductRow
        title="New Arrivals"
        subtitle="Fresh styles just dropped"
        href="/shop?isNewArrival=true"
        filter="newArrival"
        limit={6}
      />
      <GivaGiftingSection />
      <GivaPromoBand />
      <GivaBrandStory />
    </>
  );
}
