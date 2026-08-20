export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: { _id: string; name: string; slug: string };
  collection: string;
  tags: string[];
  images: { url: string; alt?: string; isPrimary?: boolean }[];
  videos?: string[];
  price: number;
  originalPrice: number;
  discount: number;
  stock: number;
  colors?: string[];
  sizes?: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  flashSaleEnd?: string;
  averageRating: number;
  reviewCount: number;
  faq?: { question: string; answer: string }[];
  reviews?: Review[];
  frequentlyBoughtWith?: Product[];
}

export interface Review {
  _id: string;
  user: { name: string; avatar?: string };
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  createdAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  video?: string;
  link?: string;
  ctaText?: string;
  type: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  items: Array<{
    name: string;
    image?: string;
    quantity: number;
    price: number;
  }>;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  trackingNumber?: string;
  estimatedDelivery?: string;
  statusHistory?: Array<{ status: string; note?: string; timestamp: string }>;
  createdAt: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  publishedAt?: string;
  author?: { name: string };
}

export const BRAND = {
  name: 'AAKSHI',
  tagline: 'Elegance That Adorns Every Girl',
  colors: {
    primary: '#FF5CA8',
    secondary: '#FFD6E8',
    accent: '#D4AF37',
    background: '#FFF9FC',
    text: '#1F2937',
  },
};

export const TRUST_BADGES = [
  { icon: 'shield', label: 'Secure Payments' },
  { icon: 'refresh', label: 'Easy Returns' },
  { icon: 'truck', label: 'Free Shipping' },
  { icon: 'award', label: 'Premium Quality' },
  { icon: 'headphones', label: '24x7 Support' },
];

export const COLLECTIONS = [
  { slug: 'korean', name: 'Korean Fashion', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' },
  { slug: 'ethnic', name: 'Ethnic Festive', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400' },
  { slug: 'wedding', name: 'Wedding Collection', image: 'https://images.unsplash.com/photo-1515562141203-758a88b404cf?w=400' },
  { slug: 'daily-wear', name: 'Daily Wear', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400' },
  { slug: 'gift', name: 'Gift Collection', image: 'https://images.unsplash.com/photo-1605100804763-247fc67fa2b3?w=400' },
  { slug: 'celebrity', name: 'Celebrity Inspired', image: 'https://images.unsplash.com/photo-1617038260897-41a1a14a8cae?w=400' },
];

export const DEMO_PRODUCTS: Product[] = [
  {
    _id: '1', name: 'Rose Gold Pearl Drop Earrings', slug: 'rose-gold-pearl-drop-earrings',
    description: 'Stunning rose gold pearl drop earrings perfect for any occasion.',
    category: { _id: '1', name: 'Earrings', slug: 'earrings' },
    collection: 'korean', tags: ['earrings', 'pearl'], images: [{ url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600', alt: 'Pearl Earrings' }],
    price: 299, originalPrice: 599, discount: 50, stock: 100, averageRating: 4.8, reviewCount: 124, isBestSeller: true, isFeatured: true,
  },
  {
    _id: '2', name: 'Crystal Hoop Earrings Set', slug: 'crystal-hoop-earrings-set',
    description: 'Trendy crystal hoop earrings set for everyday glam.',
    category: { _id: '1', name: 'Earrings', slug: 'earrings' },
    collection: 'trending', tags: ['earrings', 'crystal'], images: [{ url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600', alt: 'Hoop Earrings' }],
    price: 249, originalPrice: 499, discount: 50, stock: 80, averageRating: 4.7, reviewCount: 89, isNewArrival: true,
  },
  {
    _id: '3', name: 'Ethnic Jhumka Earrings', slug: 'ethnic-jhumka-earrings',
    description: 'Beautiful traditional jhumka earrings for festive occasions.',
    category: { _id: '1', name: 'Earrings', slug: 'earrings' },
    collection: 'ethnic', tags: ['earrings', 'ethnic'], images: [{ url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600', alt: 'Jhumka' }],
    price: 399, originalPrice: 799, discount: 50, stock: 60, averageRating: 4.9, reviewCount: 201, isBestSeller: true,
  },
  {
    _id: '4', name: 'Layered Gold Chain Necklace', slug: 'layered-gold-chain-necklace',
    description: 'Elegant layered gold chain necklace for a premium look.',
    category: { _id: '2', name: 'Necklaces', slug: 'necklaces' },
    collection: 'daily-wear', tags: ['necklace', 'chain'], images: [{ url: 'https://images.unsplash.com/photo-1605100804763-247fc67fa2b3?w=600', alt: 'Chain Necklace' }],
    price: 449, originalPrice: 899, discount: 50, stock: 75, averageRating: 4.6, reviewCount: 156, isFeatured: true,
  },
  {
    _id: '5', name: 'Korean Heart Pendant Necklace', slug: 'korean-heart-pendant-necklace',
    description: 'Adorable K-style heart pendant necklace.',
    category: { _id: '2', name: 'Necklaces', slug: 'necklaces' },
    collection: 'korean', tags: ['necklace', 'korean'], images: [{ url: 'https://images.unsplash.com/photo-1617038260897-41a1a14a8cae?w=600', alt: 'Heart Necklace' }],
    price: 349, originalPrice: 699, discount: 50, stock: 90, averageRating: 4.8, reviewCount: 178, isNewArrival: true, isBestSeller: true,
  },
  {
    _id: '6', name: 'Traditional Temple Jewelry Set', slug: 'traditional-temple-jewelry-set',
    description: 'Exquisite temple jewelry set for weddings and festivals.',
    category: { _id: '4', name: 'Ethnic Collection', slug: 'ethnic-collection' },
    collection: 'ethnic', tags: ['ethnic', 'temple'], images: [{ url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600', alt: 'Temple Set' }],
    price: 1299, originalPrice: 2499, discount: 48, stock: 30, averageRating: 5.0, reviewCount: 67, isFeatured: true, isBestSeller: true,
  },
  {
    _id: '7', name: 'Gold Plated Cuban Chain', slug: 'gold-plated-cuban-chain',
    description: 'Bold gold plated cuban chain for a statement look.',
    category: { _id: '5', name: 'Chains', slug: 'chains' },
    collection: 'trending', tags: ['chain', 'gold'], images: [{ url: 'https://images.unsplash.com/photo-1515562141203-758a88b404cf?w=600', alt: 'Cuban Chain' }],
    price: 399, originalPrice: 799, discount: 50, stock: 55, averageRating: 4.5, reviewCount: 93, isBestSeller: true,
  },
  {
    _id: '8', name: 'Pearl Charm Bracelet', slug: 'pearl-charm-bracelet',
    description: 'Delicate pearl charm bracelet for everyday elegance.',
    category: { _id: '6', name: 'Bracelets', slug: 'bracelets' },
    collection: 'daily-wear', tags: ['bracelet', 'pearl'], images: [{ url: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=600', alt: 'Pearl Bracelet' }],
    price: 299, originalPrice: 599, discount: 50, stock: 70, averageRating: 4.7, reviewCount: 112, isNewArrival: true,
  },
];

export const DEMO_CATEGORIES: Category[] = [
  { _id: '1', name: 'Earrings', slug: 'earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' },
  { _id: '2', name: 'Necklaces', slug: 'necklaces', image: 'https://images.unsplash.com/photo-1605100804763-247fc67fa2b3?w=400' },
  { _id: '3', name: 'Korean Jewelry', slug: 'korean-jewelry', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400' },
  { _id: '4', name: 'Ethnic Collection', slug: 'ethnic-collection', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400' },
  { _id: '5', name: 'Chains', slug: 'chains', image: 'https://images.unsplash.com/photo-1515562141203-758a88b404cf?w=400' },
  { _id: '6', name: 'Bracelets', slug: 'bracelets', image: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=400' },
  { _id: '7', name: 'Rings', slug: 'rings', image: 'https://images.unsplash.com/photo-1605100804763-247fc67fa2b3?w=400' },
  { _id: '8', name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1617038260897-41a1a14a8cae?w=400' },
];
