import { ShieldIcon } from "./icons";

const badges = [
  { label: "NAHB Certified", sublabel: "National Association" },
  { label: "LEED Accredited", sublabel: "Green Building" },
  { label: "BBB A+ Rating", sublabel: "Since 2012" },
  { label: "OSHA Compliant", sublabel: "Safety First" },
];

export default function TrustBar() {
  return (
    <section className="border-b border-navy-100 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="flex items-center gap-3 text-navy-700">
            <ShieldIcon className="h-8 w-8 text-brand-500" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-navy-500">
                Certified & Trusted
              </p>
              <p className="text-lg font-semibold text-navy-900">
                Industry-leading standards you can rely on
              </p>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 lg:w-auto lg:gap-8">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center rounded-xl border border-navy-100 bg-brand-50/50 px-4 py-3 text-center"
              >
                <span className="text-sm font-bold text-navy-800">{badge.label}</span>
                <span className="text-xs text-navy-500">{badge.sublabel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
