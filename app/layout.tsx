import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { InventoryProvider } from "@/contexts/inventory-context";
import { TenantProvider } from "@/contexts/tenant-context";
import { CustomerProvider } from "@/contexts/customer-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloud POS - Multi-Tenant System",
  description: "Cloud-based POS with multi-tenant support, customer management, and rewards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TenantProvider>
            <InventoryProvider>
              <CustomerProvider>
                {children}
              </CustomerProvider>
            </InventoryProvider>
          </TenantProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
