import ProductClient from './ProductClient';
import { DEMO_PRODUCTS } from '@/lib/types';

export function generateStaticParams() {
  return DEMO_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default function ProductPage() {
  return <ProductClient />;
}
