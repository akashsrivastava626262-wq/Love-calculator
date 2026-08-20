import Image from "next/image";

export function HeroImage() {
  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none lg:ml-auto">
      {/* Decorative backdrop */}
      <div
        className="absolute -inset-4 sm:-inset-6 bg-gradient-to-br from-primary/15 via-accent/40 to-champagne/30 rounded-[2rem] blur-2xl"
        aria-hidden
      />
      <div
        className="absolute top-8 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-primary/10 rounded-full blur-xl"
        aria-hidden
      />
      <div
        className="absolute bottom-12 -left-6 w-20 h-20 sm:w-28 sm:h-28 bg-accent/50 rounded-full blur-xl"
        aria-hidden
      />

      {/* Main image frame */}
      <div className="relative z-10 overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] shadow-[0_24px_64px_rgba(183,110,121,0.18)] border border-white/60">
        <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full min-h-[320px] sm:min-h-[400px] lg:min-h-[480px]">
          <Image
            src="/hero-model.jpg"
            alt="Elegant model wearing AAKSHI Korean-style necklace and earrings"
            fill
            priority
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 540px"
            className="object-cover object-[center_15%] sm:object-[center_12%] lg:object-[center_10%]"
          />
          {/* Soft overlay for brand cohesion */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none"
            aria-hidden
          />
        </div>

        {/* Floating accent badge */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-white/80 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-foreground/80">
              Anti-Tarnish · Korean Collection
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
