"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, CreditCard, Truck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

const steps = [
  { id: 1, label: "Address", icon: MapPin },
  { id: 2, label: "Shipping", icon: Truck },
  { id: 3, label: "Payment", icon: CreditCard },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    fullName: "", phone: "", addressLine1: "", city: "", state: "", postalCode: "",
  });
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const subtotal = getSubtotal();
  const shipping = shippingMethod === "express" ? 199 : subtotal >= 999 ? 0 : 99;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground mb-4">Your cart is empty</p>
        <Button asChild><Link href="/shop">Shop Now</Link></Button>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    clearCart();
    router.push("/checkout/success");
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <h1 className="font-serif text-3xl font-medium mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center justify-center gap-4 mb-12">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                step >= s.id ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
              }`}
            >
              {step > s.id ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 h-0.5 ${step > s.id ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-white rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-serif text-xl font-medium mb-4">Delivery Address</h2>
              {(["fullName", "phone", "addressLine1", "city", "state", "postalCode"] as const).map((field) => (
                <div key={field}>
                  <label className="text-sm font-medium mb-1.5 block capitalize">
                    {field.replace(/([A-Z])/g, " $1").replace("address Line1", "Address")}
                  </label>
                  <Input
                    required
                    value={address[field]}
                    onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
                  />
                </div>
              ))}
              <Button onClick={() => setStep(2)} className="w-full mt-4">
                Continue to Shipping
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-serif text-xl font-medium mb-4">Shipping Method</h2>
              {[
                { id: "standard", label: "Standard Shipping", price: subtotal >= 999 ? "Free" : "₹99", time: "5-7 business days" },
                { id: "express", label: "Express Shipping", price: "₹199", time: "2-3 business days" },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                    shippingMethod === method.id ? "border-primary bg-accent/30" : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === method.id}
                      onChange={() => setShippingMethod(method.id)}
                    />
                    <div>
                      <p className="font-medium text-sm">{method.label}</p>
                      <p className="text-xs text-muted-foreground">{method.time}</p>
                    </div>
                  </div>
                  <span className="font-medium text-sm">{method.price}</span>
                </label>
              ))}
              <div className="flex gap-3 mt-4">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)} className="flex-1">Continue to Payment</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-serif text-xl font-medium mb-4">Payment Method</h2>
              {[
                { id: "razorpay", label: "Razorpay (UPI, Cards, Net Banking)" },
                { id: "stripe", label: "Stripe (Credit/Debit Card)" },
                { id: "cod", label: "Cash on Delivery" },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    paymentMethod === method.id ? "border-primary bg-accent/30" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                  />
                  <span className="text-sm font-medium">{method.label}</span>
                </label>
              ))}
              <div className="flex gap-3 mt-4">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={handlePlaceOrder} className="flex-1">
                  Place Order — {formatPrice(total)}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-xl border border-border p-6 sticky top-24">
            <h2 className="font-serif text-xl font-medium mb-4">Order Summary</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.product.images[0]} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xs font-medium">
                    {formatPrice(Number(item.product.price) * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
