"use client";

import { Store, BarChart3, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 md:h-10 md:w-10 bg-primary rounded-lg flex items-center justify-center">
              <Store className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold">Cloud POS</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Sari-Sari Store System
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/sales">
              <Button variant="outline" size="sm" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Sales</span>
              </Button>
            </Link>
            <div className="relative lg:hidden">
              <Button variant="outline" size="sm" className="gap-2">
                <ShoppingBag className="h-4 w-4" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
