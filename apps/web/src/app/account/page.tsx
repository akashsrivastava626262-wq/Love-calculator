"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Package, Heart, MapPin, RotateCcw, Gift, Users } from "lucide-react";
import { useAuthStore } from "@/lib/store";

const menuItems = [
  { label: "Profile", href: "/account", icon: User },
  { label: "Orders", href: "/account/orders", icon: Package },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
  { label: "Returns", href: "/account/returns", icon: RotateCcw },
  { label: "Reward Points", href: "/account/rewards", icon: Gift },
  { label: "Referral Program", href: "/account/referral", icon: Users },
];

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground mb-4">Please sign in to view your account</p>
        <Link href="/auth/login" className="text-primary hover:underline">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium">My Account</h1>
        <p className="text-muted-foreground mt-1">Welcome back, {user.name || user.email}</p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-accent transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => { logout(); router.push("/"); }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-500 hover:bg-red-50 w-full"
          >
            Sign Out
          </button>
        </nav>

        <div className="md:col-span-3 bg-white rounded-xl border border-border p-6">
          <h2 className="font-serif text-xl font-medium mb-6">Profile Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground">Name</label>
              <p className="font-medium">{user.name || "—"}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Reward Points</label>
              <p className="font-medium text-primary">{user.rewardPoints || 0} points</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Referral Code</label>
              <p className="font-medium">{user.referralCode || "—"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
