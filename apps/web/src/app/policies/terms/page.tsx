import type { Metadata } from "next";
import PolicyLayout from "@/components/layout/PolicyLayout";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms & Conditions" lastUpdated="August 20, 2026">
      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using the AAKSHI website, you agree to be bound by these Terms and
          Conditions. If you do not agree, please do not use our services.
        </p>
      </section>
      <section>
        <h2>2. Products & Pricing</h2>
        <p>
          All product images are for illustrative purposes. We strive for accuracy but colors may
          vary slightly. Prices are in INR and include applicable taxes unless stated otherwise.
        </p>
      </section>
      <section>
        <h2>3. Orders & Payment</h2>
        <p>
          We reserve the right to refuse or cancel orders. Payment is processed securely through
          Razorpay, Stripe, or Cash on Delivery.
        </p>
      </section>
      <section>
        <h2>4. Intellectual Property</h2>
        <p>
          All content on this website including text, images, logos, and designs is the property
          of AAKSHI and protected by copyright laws.
        </p>
      </section>
    </PolicyLayout>
  );
}
