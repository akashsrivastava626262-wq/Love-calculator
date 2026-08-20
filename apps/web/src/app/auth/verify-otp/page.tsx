"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // OTP verification via API
    setTimeout(() => {
      setLoading(false);
      router.push("/account");
    }, 1000);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <h1 className="font-serif text-3xl font-medium">Verify Your Email</h1>
        <p className="mt-2 text-muted-foreground">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Input
            type="text"
            maxLength={6}
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="text-center text-2xl tracking-[0.5em] font-mono"
          />
          <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
            {loading ? "Verifying..." : "Verify Email"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          Didn&apos;t receive the code?{" "}
          <button className="text-primary hover:underline font-medium">Resend</button>
        </p>
        <Link href="/account" className="block mt-4 text-sm text-muted-foreground hover:text-primary">
          Skip for now →
        </Link>
      </div>
    </div>
  );
}
