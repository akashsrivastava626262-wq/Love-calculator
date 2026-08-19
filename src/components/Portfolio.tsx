import { useState } from "react";

const categories = ["All", "Modern", "Traditional", "Renovation", "Commercial"];

const projects = [
  {
    title: "The Aspen Residence",
    category: "Modern",
    location: "Aspen, CO",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    sqft: "4,200",
    year: "2025",
  },
  {
    title: "Lakefront Estate",
    category: "Traditional",
    location: "Lake Geneva, WI",
    image: "https://images.unsplash.com/photo-1605276374101-dee2a0ed3cd7?w=800&q=80",
    sqft: "6,800",
    year: "2024",
  },
  {
    title: "Urban Loft Conversion",
    category: "Renovation",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    sqft: "2,100",
    year: "2025",
  },
  {
    title: "Coastal Modern Villa",
    category: "Modern",
    location: "Malibu, CA",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    sqft: "5,500",
    year: "2024",
  },
  {
    title: "Heritage Home Restoration",
    category: "Renovation",
    location: "Charleston, SC",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    sqft: "3,400",
    year: "2023",
  },
  {
    title: "Corporate Headquarters",
    category: "Commercial",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    sqft: "45,000",
    year: "2025",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              Portfolio
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
              Completed Projects
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              Explore our showcase of beautifully crafted homes and spaces — each
              project a testament to quality and attention to detail.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  active === cat
                    ? "bg-navy-900 text-white shadow-lg"
                    : "bg-navy-50 text-navy-600 hover:bg-navy-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <article
              key={project.title}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="inline-block rounded-full bg-brand-500/90 px-3 py-0.5 text-xs font-semibold text-white">
                  {project.category}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">
                  {project.title}
                </h3>
                <div className="mt-2 flex items-center gap-4 text-sm text-navy-300">
                  <span>{project.location}</span>
                  <span className="h-1 w-1 rounded-full bg-navy-500" />
                  <span>{project.sqft} sq ft</span>
                  <span className="h-1 w-1 rounded-full bg-navy-500" />
                  <span>{project.year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
