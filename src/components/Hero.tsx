import { ArrowRightIcon, CheckIcon } from "./icons";

const highlights = [
  "Licensed & insured contractors",
  "Transparent pricing from day one",
  "Dedicated project manager",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-navy-950">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt="Modern luxury home exterior at dusk"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-400" />
            <span className="text-sm font-medium text-brand-300">
              Trusted by 2,500+ homeowners nationwide
            </span>
          </div>

          <h1 className="animate-fade-up animation-delay-200 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Build the Home
            <br />
            <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
              You've Always Imagined
            </span>
          </h1>

          <p className="animate-fade-up animation-delay-400 mt-6 max-w-2xl text-lg leading-relaxed text-navy-200 sm:text-xl">
            From groundbreaking to final walkthrough — Cornerstone connects you with
            vetted builders, architects, and designers for a seamless, transparent
            home-building experience.
          </p>

          <div className="animate-fade-up animation-delay-600 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#signup"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand-500/30 transition-all hover:bg-brand-400 hover:shadow-brand-400/40"
            >
              Start Your Project
              <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              View Our Work
            </a>
          </div>

          <ul className="animate-fade-in animation-delay-600 mt-12 flex flex-col gap-3 sm:flex-row sm:gap-8">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-navy-200">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/20 text-brand-400">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block">
          <a
            href="#services"
            className="flex flex-col items-center gap-2 text-navy-400 transition-colors hover:text-navy-200"
          >
            <span className="text-xs font-medium uppercase tracking-widest">Explore</span>
            <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
