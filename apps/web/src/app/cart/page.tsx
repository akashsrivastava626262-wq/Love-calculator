"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-serif text-2xl font-medium mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Discover our beautiful collection</p>
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <h1 className="font-serif text-3xl font-medium mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 bg-white rounded-xl border border-border"
            >
              <Link href={`/products/${item.product.slug}`} className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.product.slug}`}>
                  <h3 className="font-medium text-sm hover:text-primary truncate">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="text-primary font-semibold mt-1">
                  {formatPrice(item.product.price)}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center border border-border rounded-full">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 hover:text-primary"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 hover:text-primary"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-muted-foreground hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="font-semibold text-sm">
                {formatPrice(Number(item.product.price) * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-border p-6 sticky top-24">
            <h2 className="font-serif text-xl font-medium mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (GST 18%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Input placeholder="Coupon code" className="flex-1" />
              <Button variant="outline" size="sm">Apply</Button>
            </div>

            <Button className="w-full mt-6" size="lg" asChild>
              <Link href="/checkout">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Link
              href="/shop"
              className="block text-center text-sm text-muted-foreground hover:text-primary mt-4"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
