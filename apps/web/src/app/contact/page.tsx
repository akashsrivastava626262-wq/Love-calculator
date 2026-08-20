"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contactApi } from "@/lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await contactApi.send(form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-medium">Contact Us</h1>
        <p className="mt-3 text-muted-foreground">We&apos;d love to hear from you</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50">
            <Mail className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Email Support</h3>
              <p className="text-sm text-muted-foreground mt-1">support@aakshi.com</p>
              <p className="text-xs text-muted-foreground mt-1">Response within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50">
            <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">WhatsApp</h3>
              <p className="text-sm text-muted-foreground mt-1">+91 98765 43210</p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline mt-1 inline-block"
              >
                Chat with us →
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50">
            <Phone className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Phone</h3>
              <p className="text-sm text-muted-foreground mt-1">Mon-Sat, 10 AM - 7 PM IST</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Location</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Mumbai, Maharashtra, India
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Name</label>
            <Input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <Input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Phone</label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Subject</label>
            <Input
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Message</label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="flex w-full rounded-lg border border-border bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            />
          </div>
          <Button type="submit" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send Message"}
          </Button>
          {status === "success" && (
            <p className="text-sm text-primary text-center">Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-500 text-center">Failed to send. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}
