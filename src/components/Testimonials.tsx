import { StarIcon } from "./icons";

const testimonials = [
  {
    quote:
      "Cornerstone made building our dream home feel effortless. The transparency dashboard kept us informed every step of the way, and the quality exceeded our expectations.",
    name: "Sarah & Michael Chen",
    role: "Custom Home — Portland, OR",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
  },
  {
    quote:
      "We renovated our entire kitchen and added a master suite. The project manager was incredible — on time, on budget, and the craftsmanship is outstanding.",
    name: "David Rodriguez",
    role: "Renovation — Miami, FL",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
  },
  {
    quote:
      "As first-time home builders, we were nervous. Cornerstone's vetted network of architects and contractors gave us complete confidence. We couldn't be happier.",
    name: "Emily & James Whitfield",
    role: "New Construction — Denver, CO",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
  },
];

const successStories = [
  {
    title: "From Blueprint to Move-In in 14 Months",
    description:
      "The Harrington family partnered with Cornerstone to build a 4,500 sq ft modern farmhouse. Using our integrated platform, they tracked every milestone and stayed 3% under budget.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
    metric: "14 months",
    metricLabel: "Total build time",
  },
  {
    title: "Historic Renovation, Modern Living",
    description:
      "A 1920s brownstone in Brooklyn was transformed into a contemporary family home while preserving its architectural heritage — all managed through one seamless platform.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
    metric: "40%",
    metricLabel: "Energy savings",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-brand-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Testimonials
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
            Stories from Happy Homeowners
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            Don't just take our word for it — hear from families who trusted
            Cornerstone with their most important investment.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="flex flex-col rounded-2xl border border-navy-100 bg-white p-8 shadow-sm"
            >
              <div className="flex gap-1 text-brand-500">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-base leading-relaxed text-navy-700">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-4 border-t border-navy-100 pt-6">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-12 w-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <cite className="not-italic font-semibold text-navy-900">{t.name}</cite>
                  <p className="text-sm text-navy-500">{t.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="text-center font-display text-2xl font-bold text-navy-900 sm:text-3xl">
            Success Stories
          </h3>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {successStories.map((story) => (
              <article
                key={story.title}
                className="group overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm"
              >
                <div className="grid sm:grid-cols-2">
                  <div className="relative h-56 overflow-hidden sm:h-auto">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8">
                    <p className="font-display text-3xl font-bold text-brand-500">
                      {story.metric}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                      {story.metricLabel}
                    </p>
                    <h4 className="mt-4 text-lg font-semibold text-navy-900">
                      {story.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600">
                      {story.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
