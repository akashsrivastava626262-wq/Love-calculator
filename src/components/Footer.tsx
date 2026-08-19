import { Logo } from "./icons";

const footerLinks = {
  Platform: [
    { label: "How It Works", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Pricing", href: "#contact" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#contact" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3">
              <Logo className="h-9 w-9" />
              <span className="font-display text-xl font-semibold text-white">
                Cornerstone
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-400">
              The premium platform for home construction, renovation, and design.
              Connecting homeowners with trusted professionals since 2010.
            </p>
            <div className="mt-6 flex gap-4">
              {["twitter", "linkedin", "instagram", "facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-navy-400 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label={social}
                >
                  <span className="text-xs font-bold uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-navy-300">
                {title}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-navy-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-navy-500">
            &copy; {new Date().getFullYear()} Cornerstone Build Co. All rights reserved.
          </p>
          <p className="text-sm text-navy-500">
            Licensed General Contractor &middot; License #GC-2847193
          </p>
        </div>
      </div>
    </footer>
  );
}
