export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AAKSHI",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://aakshi.com",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://aakshi.com"}/logo.png`,
    description: "Premium Korean & Anti-Tarnish Jewelry Designed For Modern Women",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9876543210",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://instagram.com/aakshi",
      "https://facebook.com/aakshi",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema({ product }: {
  product: {
    name: string;
    description: string;
    price: number | string;
    images: string[];
    sku: string;
    averageRating: number;
    reviewCount: number;
  };
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    brand: { "@type": "Brand", name: "AAKSHI" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: product.reviewCount > 0 ? {
      "@type": "AggregateRating",
      ratingValue: product.averageRating,
      reviewCount: product.reviewCount,
    } : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
