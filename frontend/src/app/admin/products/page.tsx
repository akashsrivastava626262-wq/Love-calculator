'use client';

import { DEMO_PRODUCTS } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function AdminProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-bold">Product Management</h1>
        <div className="flex gap-2">
          <Button>Add Product</Button>
          <Button variant="outline">Bulk Import</Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-secondary/30 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/30">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {DEMO_PRODUCTS.map((p) => (
              <tr key={p._id} className="border-t border-secondary/20">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4">{p.category.name}</td>
                <td className="p-4">{formatPrice(p.price)}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4"><span className="text-emerald-600">Active</span></td>
                <td className="p-4">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link href="/admin" className="text-primary text-sm mt-4 inline-block">← Back to Dashboard</Link>
    </div>
  );
}
