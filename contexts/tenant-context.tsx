"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Tenant, sampleTenants } from "@/lib/customer-data";

interface TenantContextType {
  tenants: Tenant[];
  currentTenant: Tenant | null;
  setCurrentTenant: (tenant: Tenant) => void;
  addTenant: (tenant: Omit<Tenant, "id" | "createdAt">) => void;
  updateTenant: (tenantId: string, updates: Partial<Tenant>) => void;
  deleteTenant: (tenantId: string) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenants, setTenants] = useState<Tenant[]>(sampleTenants);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(
    sampleTenants[0]
  );

  const addTenant = (newTenant: Omit<Tenant, "id" | "createdAt">) => {
    const tenant: Tenant = {
      ...newTenant,
      id: `tenant-${Date.now()}`,
      createdAt: new Date(),
    };
    setTenants([...tenants, tenant]);
  };

  const updateTenant = (tenantId: string, updates: Partial<Tenant>) => {
    setTenants(
      tenants.map((t) => (t.id === tenantId ? { ...t, ...updates } : t))
    );
    if (currentTenant?.id === tenantId) {
      setCurrentTenant({ ...currentTenant, ...updates });
    }
  };

  const deleteTenant = (tenantId: string) => {
    setTenants(tenants.filter((t) => t.id !== tenantId));
    if (currentTenant?.id === tenantId) {
      setCurrentTenant(tenants[0] || null);
    }
  };

  return (
    <TenantContext.Provider
      value={{
        tenants,
        currentTenant,
        setCurrentTenant,
        addTenant,
        updateTenant,
        deleteTenant,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
}
