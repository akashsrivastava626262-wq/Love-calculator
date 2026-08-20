import { Shield, Droplets, Heart, Sparkles, Lock, RotateCcw } from "lucide-react";

const badges = [
  { icon: Sparkles, label: "Anti-Tarnish Quality" },
  { icon: Droplets, label: "Waterproof Collection" },
  { icon: Heart, label: "Skin Friendly" },
  { icon: Shield, label: "Premium Plating" },
  { icon: Lock, label: "Secure Payments" },
  { icon: RotateCcw, label: "Easy Returns" },
];

export function TrustBadges() {
  return (
    <section className="py-8 border-y border-border bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-2 p-3 rounded-xl trust-badge"
            >
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium text-foreground/80">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Sparkles,
    title: "Anti-Tarnish Technology",
    description: "Our proprietary coating ensures your jewelry stays shiny for years.",
  },
  {
    icon: Shield,
    title: "Premium Quality Materials",
    description: "18K gold plating on hypoallergenic stainless steel base.",
  },
  {
    icon: Heart,
    title: "Affordable Luxury",
    description: "Premium-looking jewelry at prices that make luxury accessible.",
  },
  {
    icon: Lock,
    title: "Secure Shopping",
    description: "256-bit SSL encryption and trusted payment gateways.",
  },
  {
    icon: Droplets,
    title: "Fast Delivery",
    description: "Express shipping across India with real-time tracking.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free returns. No questions asked.",
  },
];

export function WhyChooseAakshi() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-medium">Why Choose AAKSHI</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            We combine premium quality with accessible pricing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 border border-border card-hover"
            >
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-medium mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
