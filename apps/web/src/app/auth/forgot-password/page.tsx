"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-medium">Reset Password</h1>
          <p className="mt-2 text-muted-foreground">
            Enter your email to receive a reset code
          </p>
        </div>

        {sent ? (
          <div className="text-center bg-white p-8 rounded-2xl border border-border">
            <p className="text-primary font-medium mb-2">Check your email</p>
            <p className="text-sm text-muted-foreground">
              If an account exists for {email}, you will receive an OTP shortly.
            </p>
            <Link href="/auth/login" className="inline-block mt-6 text-sm text-primary hover:underline">
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl border border-border">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Code"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
