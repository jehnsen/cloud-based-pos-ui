"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ProtectedRoute } from "@/components/admin/protected-route";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requiredPermission="view_dashboard">
      <div className="flex h-screen overflow-hidden">
        <aside className="w-64 hidden md:block">
          <AdminSidebar />
        </aside>
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
