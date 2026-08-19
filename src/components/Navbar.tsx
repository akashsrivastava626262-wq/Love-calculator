import { useState } from "react";
import { Logo, MenuIcon, CloseIcon } from "./icons";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-navy-950/80 px-5 py-3 shadow-xl shadow-navy-950/20 backdrop-blur-xl">
          <a href="#" className="flex items-center gap-3">
            <Logo className="h-9 w-9" />
            <span className="font-display text-xl font-semibold tracking-tight text-white">
              Cornerstone
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-navy-200 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-navy-100 transition-colors hover:text-white"
            >
              Log In
            </a>
            <a
              href="#signup"
              className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-400 hover:shadow-brand-400/30"
            >
              Sign Up
            </a>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-navy-200 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {mobileOpen && (
          <div className="mt-2 rounded-2xl border border-white/10 bg-navy-950/95 p-5 shadow-xl backdrop-blur-xl lg:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy-200 transition-colors hover:bg-white/5 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <hr className="my-3 border-white/10" />
              <a
                href="#login"
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy-200 transition-colors hover:bg-white/5 hover:text-white"
              >
                Log In
              </a>
              <a
                href="#signup"
                className="mt-1 rounded-lg bg-brand-500 px-3 py-2.5 text-center text-sm font-semibold text-white"
              >
                Sign Up
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
