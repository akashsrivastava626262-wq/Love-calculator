"use client";

import { Sparkles } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-xs sm:text-sm">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <Sparkles className="h-3.5 w-3.5 hidden sm:block" />
        <span>
          ✨ Free Shipping on Orders Above ₹999 | Use Code{" "}
          <strong className="font-semibold">WELCOME10</strong> for 10% Off
        </span>
        <Sparkles className="h-3.5 w-3.5 hidden sm:block" />
      </div>
    </div>
  );
}
