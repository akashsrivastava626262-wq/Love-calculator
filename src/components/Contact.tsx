import { useState, type FormEvent } from "react";
import { PhoneIcon, MailIcon, MapPinIcon } from "./icons";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              Get in Touch
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              Our team is here to answer your questions and guide you through every
              step. Reach out for a free consultation — no obligation.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">Phone</p>
                  <a
                    href="tel:+18005551234"
                    className="text-navy-600 transition-colors hover:text-brand-600"
                  >
                    1-800-555-1234
                  </a>
                  <p className="text-sm text-navy-500">Mon–Fri, 8am–6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                  <MailIcon />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">Email</p>
                  <a
                    href="mailto:hello@cornerstone.build"
                    className="text-navy-600 transition-colors hover:text-brand-600"
                  >
                    hello@cornerstone.build
                  </a>
                  <p className="text-sm text-navy-500">We respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                  <MapPinIcon />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">Headquarters</p>
                  <p className="text-navy-600">
                    1200 Builder's Way, Suite 400
                    <br />
                    Austin, TX 78701
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-navy-100 bg-brand-50 p-6">
              <p className="font-semibold text-navy-900">24/7 Project Support</p>
              <p className="mt-1 text-sm text-navy-600">
                Active clients have access to round-the-clock support through our
                platform dashboard and dedicated hotline.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-navy-100 bg-navy-50 p-8 shadow-sm lg:p-10">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-navy-900">
                  Thank You!
                </h3>
                <p className="mt-2 text-navy-600">
                  We've received your message and will be in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-display text-xl font-bold text-navy-900">
                  Request a Free Consultation
                </h3>
                <p className="mt-1 text-sm text-navy-600">
                  Tell us about your project and we'll match you with the right team.
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-navy-700">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="mt-1.5 w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-navy-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-navy-700">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="mt-1.5 w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-navy-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="email" className="block text-sm font-medium text-navy-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1.5 w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-navy-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div className="mt-5">
                  <label htmlFor="projectType" className="block text-sm font-medium text-navy-700">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    className="mt-1.5 w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-navy-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  >
                    <option>New Home Construction</option>
                    <option>Renovation / Remodel</option>
                    <option>Interior Design</option>
                    <option>Architecture</option>
                    <option>Commercial</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="mt-5">
                  <label htmlFor="message" className="block text-sm font-medium text-navy-700">
                    Tell Us About Your Project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1.5 w-full resize-none rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-navy-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                    placeholder="Brief description, timeline, budget range..."
                  />
                </div>

                <button
                  type="submit"
                  className="mt-8 w-full rounded-xl bg-brand-500 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-400 hover:shadow-brand-400/30"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
