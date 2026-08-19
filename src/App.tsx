import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AuthSection from "./components/AuthSection";

function CTA() {
  return (
    <section className="relative overflow-hidden bg-brand-600 py-20">
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 bg-brand-700/80" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Your Dream Home Is One Conversation Away
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100">
          Join over 2,500 families who chose Cornerstone for a building experience
          built on trust, quality, and complete transparency.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#signup"
            className="rounded-xl bg-white px-8 py-4 text-base font-semibold text-brand-700 shadow-xl transition-all hover:bg-brand-50"
          >
            Get Started Free
          </a>
          <a
            href="#contact"
            className="rounded-xl border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition-all hover:border-white hover:bg-white/10"
          >
            Schedule a Call
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Stats />
        <Portfolio />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <AuthSection />
    </>
  );
}
