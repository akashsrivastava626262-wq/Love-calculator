"use client";

import { useCartStore, useAuthStore, useWishlistStore } from "@/lib/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export { useCartStore, useAuthStore, useWishlistStore };
