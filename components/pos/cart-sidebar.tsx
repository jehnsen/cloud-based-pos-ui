"use client";

import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { CheckoutDialog } from "./checkout-dialog";

export function CartSidebar() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <Card className="h-full flex flex-col sticky top-4">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Cart ({cart.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-3 pb-3 border-b">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.unit}</p>
                  <p className="text-sm font-semibold text-primary mt-1">
                    ₱{item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm font-semibold">
                    ₱{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </CardContent>
        <Separator />
        <CardFooter className="flex-col gap-3 pt-4">
          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span className="font-semibold">₱{getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary">₱{getCartTotal().toFixed(2)}</span>
            </div>
          </div>
          <div className="w-full space-y-2">
            <Button
              className="w-full"
              size="lg"
              disabled={cart.length === 0}
              onClick={() => setShowCheckout(true)}
            >
              Checkout
            </Button>
            <Button
              variant="outline"
              className="w-full"
              disabled={cart.length === 0}
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        </CardFooter>
      </Card>
      <CheckoutDialog
        open={showCheckout}
        onOpenChange={setShowCheckout}
        onComplete={() => {
          clearCart();
          setShowCheckout(false);
        }}
      />
    </>
  );
}
