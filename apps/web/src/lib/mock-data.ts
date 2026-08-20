import type { Product } from "./api";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Rose Gold Pearl Drop Earrings",
    slug: "rose-gold-pearl-drop-earrings",
    description: "Exquisite rose gold plated pearl drop earrings featuring premium anti-tarnish coating.",
    shortDescription: "Premium anti-tarnish pearl drop earrings",
    price: 899,
    compareAtPrice: 1499,
    sku: "AAK-EAR-001",
    stock: 50,
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80"],
    material: "18K Rose Gold Plated, Freshwater Pearl",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    averageRating: 4.9,
    reviewCount: 128,
    category: { name: "Earrings", slug: "earrings" },
  },
  {
    id: "2",
    name: "Korean Minimalist Hoop Set",
    slug: "korean-minimalist-hoop-set",
    description: "Trendy Korean-inspired minimalist hoop earrings set.",
    shortDescription: "Korean trend minimalist hoop set",
    price: 699,
    compareAtPrice: 999,
    sku: "AAK-EAR-002",
    stock: 75,
    images: ["https://images.unsplash.com/photo-1588444837495-c6c1e887a071?w=800&q=80"],
    isFeatured: true,
    isTrending: true,
    averageRating: 4.8,
    reviewCount: 96,
    category: { name: "Earrings", slug: "earrings" },
  },
  {
    id: "3",
    name: "Layered Gold Chain Necklace",
    slug: "layered-gold-chain-necklace",
    description: "Elegant triple-layered gold chain necklace with delicate pendants.",
    shortDescription: "Triple layered anti-tarnish necklace",
    price: 1299,
    compareAtPrice: 1999,
    sku: "AAK-NEK-001",
    stock: 40,
    images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80"],
    isBestSeller: true,
    isFeatured: true,
    averageRating: 4.9,
    reviewCount: 215,
    category: { name: "Necklaces", slug: "necklaces" },
  },
  {
    id: "4",
    name: "Crystal Solitaire Ring",
    slug: "crystal-solitaire-ring",
    description: "Stunning crystal solitaire ring with adjustable band.",
    shortDescription: "Adjustable crystal solitaire ring",
    price: 599,
    compareAtPrice: 899,
    sku: "AAK-RNG-001",
    stock: 60,
    images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80"],
    isNewArrival: true,
    averageRating: 4.7,
    reviewCount: 64,
    category: { name: "Rings", slug: "rings" },
  },
  {
    id: "5",
    name: "Charm Bracelet Stack",
    slug: "charm-bracelet-stack",
    description: "Delicate charm bracelet stack with heart, star, and moon charms.",
    shortDescription: "Anti-tarnish charm bracelet stack",
    price: 799,
    compareAtPrice: 1199,
    sku: "AAK-BRC-001",
    stock: 45,
    images: ["https://images.unsplash.com/photo-1611591432578-014a0b017a0b?w=800&q=80"],
    isBestSeller: true,
    averageRating: 4.8,
    reviewCount: 89,
    category: { name: "Bracelets", slug: "bracelets" },
  },
  {
    id: "6",
    name: "Delicate Anklet Duo",
    slug: "delicate-anklet-duo",
    description: "Set of two delicate anklets with tiny charms.",
    shortDescription: "Summer essential anklet duo",
    price: 499,
    compareAtPrice: 799,
    sku: "AAK-ANK-001",
    stock: 55,
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"],
    isTrending: true,
    averageRating: 4.6,
    reviewCount: 42,
    category: { name: "Anklets", slug: "anklets" },
  },
  {
    id: "7",
    name: "Bridal Pearl Set",
    slug: "bridal-pearl-set",
    description: "Complete bridal jewelry set including necklace, earrings, and maang tikka.",
    shortDescription: "Complete bridal pearl jewelry set",
    price: 2999,
    compareAtPrice: 4999,
    sku: "AAK-SET-001",
    stock: 20,
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"],
    isFeatured: true,
    averageRating: 5.0,
    reviewCount: 37,
    category: { name: "Layered Sets", slug: "layered-sets" },
  },
  {
    id: "8",
    name: "Office Chic Stud Earrings",
    slug: "office-chic-stud-earrings",
    description: "Understated stud earrings perfect for professional settings.",
    shortDescription: "Professional stud earrings",
    price: 449,
    compareAtPrice: 699,
    sku: "AAK-EAR-003",
    stock: 80,
    images: ["https://images.unsplash.com/photo-1573408301185-914fe6340337?w=800&q=80"],
    averageRating: 4.7,
    reviewCount: 53,
    category: { name: "Earrings", slug: "earrings" },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((p) => p.slug === slug);
}

export function filterProducts(params: {
  category?: string;
  collection?: string;
  bestSeller?: boolean;
  trending?: boolean;
  newArrival?: boolean;
  search?: string;
  sort?: string;
}): Product[] {
  let filtered = [...mockProducts];

  if (params.category) {
    filtered = filtered.filter((p) => p.category?.slug === params.category);
  }
  if (params.bestSeller) {
    filtered = filtered.filter((p) => p.isBestSeller);
  }
  if (params.trending) {
    filtered = filtered.filter((p) => p.isTrending);
  }
  if (params.newArrival) {
    filtered = filtered.filter((p) => p.isNewArrival);
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  switch (params.sort) {
    case "price-asc":
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
      break;
    case "price-desc":
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
      break;
    case "popular":
      filtered.sort((a, b) => b.averageRating - a.averageRating);
      break;
    default:
      break;
  }

  return filtered;
}
