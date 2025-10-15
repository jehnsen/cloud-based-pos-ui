"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  BarChart3,
  Store,
  Settings,
  LogOut,
  UserCircle,
  CreditCard,
  Award,
  Building2,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    permission: "view_dashboard",
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: UserCircle,
    permission: "view_dashboard",
  },
  {
    title: "Credit/Loans",
    href: "/admin/credit",
    icon: CreditCard,
    permission: "view_dashboard",
  },
  {
    title: "Rewards",
    href: "/admin/rewards",
    icon: Award,
    permission: "view_dashboard",
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
    permission: "manage_products",
  },
  {
    title: "Inventory",
    href: "/admin/inventory",
    icon: Store,
    permission: "manage_inventory",
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: FileText,
    permission: "view_reports",
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    permission: "view_reports",
  },
  {
    title: "Intelligence",
    href: "/admin/intelligence",
    icon: TrendingUp,
    permission: "view_dashboard",
  },
  {
    title: "Tenants",
    href: "/admin/tenants",
    icon: Building2,
    permission: "manage_users",
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
    permission: "manage_users",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout, hasPermission } = useAuth();

  const filteredMenuItems = menuItems.filter((item) =>
    hasPermission(item.permission)
  );

  return (
    <div className="flex flex-col h-full bg-card border-r">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
            <Store className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Cloud POS</h2>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </Link>
      </div>

      <Separator />

      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-3">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <Separator />

      <div className="p-4 space-y-3">
        <div className="px-3 py-2 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">Logged in as</p>
          <p className="font-semibold text-sm">{user?.fullName}</p>
          <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
        </div>

        <Link href="/">
          <Button variant="outline" className="w-full" size="sm">
            <Store className="h-4 w-4 mr-2" />
            Go to POS
          </Button>
        </Link>

        <Button
          variant="ghost"
          className="w-full"
          size="sm"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
