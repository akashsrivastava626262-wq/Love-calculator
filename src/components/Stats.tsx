const stats = [
  { value: "2,500+", label: "Homes Built", description: "Completed projects nationwide" },
  { value: "98%", label: "Client Satisfaction", description: "Based on post-project surveys" },
  { value: "15+", label: "Years Experience", description: "Industry-leading expertise" },
  { value: "$1.2B+", label: "Project Value", description: "Total construction managed" },
];

export default function Stats() {
  return (
    <section id="about" className="relative overflow-hidden bg-navy-900 py-24">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 bg-navy-900/90" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">
            By the Numbers
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A Legacy of Excellence
          </h2>
          <p className="mt-4 text-lg text-navy-300">
            Transparency is at the core of everything we do. Here's what our track
            record looks like.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm"
            >
              <p className="font-display text-4xl font-bold text-brand-400 lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-lg font-semibold text-white">{stat.label}</p>
              <p className="mt-1 text-sm text-navy-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
