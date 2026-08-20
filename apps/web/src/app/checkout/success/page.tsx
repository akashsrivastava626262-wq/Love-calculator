import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-lg">
      <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
      <h1 className="font-serif text-3xl font-medium mb-2">Order Confirmed!</h1>
      <p className="text-muted-foreground mb-8">
        Thank you for shopping with AAKSHI. You will receive a confirmation email shortly.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild>
          <Link href="/account/orders">Track Order</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
