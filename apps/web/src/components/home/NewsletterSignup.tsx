"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterApi } from "@/lib/api";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await newsletterApi.subscribe(email);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-16 lg:py-20 hero-gradient">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl lg:text-4xl font-medium">
          Join the AAKSHI Family
        </h2>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          Subscribe for exclusive offers, new arrivals, and styling tips
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white"
          />
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-sm text-primary">Thank you for subscribing! ✨</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-red-500">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
}
