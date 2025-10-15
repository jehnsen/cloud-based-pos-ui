"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, products as initialProducts } from "@/lib/data";

interface InventoryContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  updateStock: (productId: string, quantity: number) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (newProduct: Omit<Product, "id">) => {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
    };
    setProducts([...products, product]);
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts(
      products.map((p) => (p.id === productId ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  const updateStock = (productId: string, quantity: number) => {
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, stock: p.stock + quantity } : p
      )
    );
  };

  return (
    <InventoryContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
}
