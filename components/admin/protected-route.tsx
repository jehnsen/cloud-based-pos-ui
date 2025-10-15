"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

export function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, hasPermission } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
      router.push("/admin");
    }
  }, [isAuthenticated, requiredPermission, hasPermission, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return null;
  }

  return <>{children}</>;
}
