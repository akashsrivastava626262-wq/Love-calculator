import type { Metadata } from "next";
import PolicyLayout from "@/components/layout/PolicyLayout";

export const metadata: Metadata = { title: "Shipping Policy" };

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping Policy" lastUpdated="August 20, 2026">
      <section>
        <h2>Shipping Methods</h2>
        <p>
          We offer Standard Shipping (5-7 business days) and Express Shipping (2-3 business days)
          across India. Free standard shipping is available on orders above ₹999.
        </p>
      </section>
      <section>
        <h2>Processing Time</h2>
        <p>
          Orders are processed within 1-2 business days. You will receive a tracking number via
          email once your order has been shipped.
        </p>
      </section>
      <section>
        <h2>Shipping Costs</h2>
        <p>
          Standard Shipping: ₹99 (Free above ₹999). Express Shipping: ₹199. International
          shipping is currently not available.
        </p>
      </section>
    </PolicyLayout>
  );
}
