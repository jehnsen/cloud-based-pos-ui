"use client";

import { useState } from "react";
import { useTenant } from "@/contexts/tenant-context";
import { useCustomer } from "@/contexts/customer-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Pencil,
  Store,
  Users,
  CreditCard,
  Award,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Tenant } from "@/lib/customer-data";

export default function TenantsPage() {
  const { tenants, addTenant, updateTenant, setCurrentTenant } = useTenant();
  const { customers, creditAccounts } = useCustomer();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    address: "",
    subscriptionTier: "basic",
  });

  const handleAdd = () => {
    addTenant({
      name: formData.name,
      businessName: formData.businessName,
      email: formData.email || undefined,
      phone: formData.phone,
      address: formData.address || undefined,
      subscriptionTier: formData.subscriptionTier as Tenant["subscriptionTier"],
      isActive: true,
    });

    setIsAddDialogOpen(false);
    resetForm();
  };

  const openEditDialog = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setFormData({
      name: tenant.name,
      businessName: tenant.businessName,
      email: tenant.email || "",
      phone: tenant.phone,
      address: tenant.address || "",
      subscriptionTier: tenant.subscriptionTier,
    });
    setIsEditDialogOpen(true);
  };

  const handleEdit = () => {
    if (!selectedTenant) return;

    updateTenant(selectedTenant.id, {
      name: formData.name,
      businessName: formData.businessName,
      email: formData.email || undefined,
      phone: formData.phone,
      address: formData.address || undefined,
      subscriptionTier: formData.subscriptionTier as Tenant["subscriptionTier"],
    });

    setIsEditDialogOpen(false);
    resetForm();
    setSelectedTenant(null);
  };

  const openViewDialog = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setIsViewDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      businessName: "",
      email: "",
      phone: "",
      address: "",
      subscriptionTier: "basic",
    });
  };

  const getTierColor = (tier: Tenant["subscriptionTier"]) => {
    switch (tier) {
      case "enterprise":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "premium":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "basic":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getTierLabel = (tier: Tenant["subscriptionTier"]) => {
    return tier.charAt(0).toUpperCase() + tier.slice(1);
  };

  const getTenantStats = (tenantId: string) => {
    const tenantCustomers = customers.filter((c) => c.tenantId === tenantId);
    const tenantCredits = creditAccounts.filter((a) => a.tenantId === tenantId);
    const totalRevenue = tenantCustomers.reduce(
      (sum, c) => sum + c.totalSpent,
      0
    );
    const totalCreditOutstanding = tenantCredits.reduce(
      (sum, a) => sum + a.currentBalance,
      0
    );

    return {
      customers: tenantCustomers.length,
      revenue: totalRevenue,
      creditOutstanding: totalCreditOutstanding,
      activeCredits: tenantCredits.filter((a) => a.status === "active").length,
    };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tenant Management</h1>
          <p className="text-muted-foreground">
            Manage vendors and store locations
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Tenant
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Tenants
            </CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tenants.length}</div>
            <p className="text-xs text-muted-foreground">
              {tenants.filter((t) => t.isActive).length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">Across all tenants</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₱
              {customers
                .reduce((sum, c) => sum + c.totalSpent, 0)
                .toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">All-time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Credit Outstanding
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₱
              {creditAccounts
                .reduce((sum, a) => sum + a.currentBalance, 0)
                .toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {creditAccounts.filter((a) => a.status === "active").length}{" "}
              accounts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tenants Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tenants</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Customers</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant) => {
                const stats = getTenantStats(tenant.id);
                return (
                  <TableRow key={tenant.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{tenant.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {tenant.businessName}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{tenant.phone}</p>
                        {tenant.email && (
                          <p className="text-xs text-muted-foreground">
                            {tenant.email}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTierColor(tenant.subscriptionTier)}>
                        {getTierLabel(tenant.subscriptionTier)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {stats.customers}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        ₱{stats.revenue.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {tenant.isActive ? (
                        <Badge
                          variant="default"
                          className="bg-green-100 text-green-800"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-red-100 text-red-800"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openViewDialog(tenant)}
                        >
                          <Store className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(tenant)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Tenant Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Tenant</DialogTitle>
            <DialogDescription>
              Create a new tenant/vendor account
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Tenant Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Sari-Sari Store 1"
                required
              />
            </div>
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
                placeholder="Maria's Store"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="09171234567"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="email@example.com"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address (Optional)</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Store address"
              />
            </div>
            <div>
              <Label htmlFor="subscriptionTier">Subscription Tier</Label>
              <select
                id="subscriptionTier"
                value={formData.subscriptionTier}
                onChange={(e) =>
                  setFormData({ ...formData, subscriptionTier: e.target.value })
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAdd}>Add Tenant</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Tenant Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Tenant</DialogTitle>
            <DialogDescription>Update tenant information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Tenant Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-businessName">Business Name</Label>
              <Input
                id="edit-businessName"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-subscriptionTier">Subscription Tier</Label>
              <select
                id="edit-subscriptionTier"
                value={formData.subscriptionTier}
                onChange={(e) =>
                  setFormData({ ...formData, subscriptionTier: e.target.value })
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Tenant Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tenant Details</DialogTitle>
          </DialogHeader>
          {selectedTenant && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Tenant Name</Label>
                  <p className="font-medium">{selectedTenant.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Business Name</Label>
                  <p className="font-medium">{selectedTenant.businessName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="font-medium">{selectedTenant.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">
                    {selectedTenant.email || "Not provided"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">
                    Subscription Tier
                  </Label>
                  <Badge
                    className={getTierColor(selectedTenant.subscriptionTier)}
                  >
                    {getTierLabel(selectedTenant.subscriptionTier)}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  {selectedTenant.isActive ? (
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800">Inactive</Badge>
                  )}
                </div>
              </div>

              {selectedTenant.address && (
                <div>
                  <Label className="text-muted-foreground">Address</Label>
                  <p className="font-medium">{selectedTenant.address}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Customers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {getTenantStats(selectedTenant.id).customers}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      ₱{getTenantStats(selectedTenant.id).revenue.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">
                      Credit Outstanding
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-orange-600">
                      ₱
                      {getTenantStats(selectedTenant.id).creditOutstanding.toFixed(
                        2
                      )}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Active Credits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {getTenantStats(selectedTenant.id).activeCredits}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => {
                    setCurrentTenant(selectedTenant.id);
                    setIsViewDialogOpen(false);
                  }}
                  className="w-full"
                >
                  Switch to This Tenant
                </Button>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
