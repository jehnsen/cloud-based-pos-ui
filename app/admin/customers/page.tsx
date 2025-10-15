"use client";

import { useState } from "react";
import { useCustomer } from "@/contexts/customer-context";
import { useTenant } from "@/contexts/tenant-context";
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
import { Plus, Pencil, Eye, CreditCard, Award, Search } from "lucide-react";
import { Customer, tierBenefits } from "@/lib/customer-data";
import { Pagination } from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10;

export default function CustomersPage() {
  const { customers, addCustomer, updateCustomer, getCreditAccountsByCustomer } = useCustomer();
  const { currentTenant } = useTenant();
  const [search, setSearch] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    creditLimit: "500",
  });

  // Filter customers by current tenant
  const tenantCustomers = customers.filter(
    (c) => c.tenantId === currentTenant?.id
  );

  const filteredCustomers = tenantCustomers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search)
  );

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAdd = () => {
    if (!currentTenant) return;

    addCustomer({
      tenantId: currentTenant.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email || undefined,
      phone: formData.phone,
      address: formData.address || undefined,
      creditLimit: parseInt(formData.creditLimit),
      isActive: true,
    });

    setIsAddDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      creditLimit: "500",
    });
  };

  const openViewDialog = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewDialogOpen(true);
  };

  const getTierColor = (tier: Customer["tier"]) => {
    switch (tier) {
      case "platinum":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "gold":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "silver":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-orange-100 text-orange-800 border-orange-300";
    }
  };

  const customerStats = {
    total: tenantCustomers.length,
    bronze: tenantCustomers.filter((c) => c.tier === "bronze").length,
    silver: tenantCustomers.filter((c) => c.tier === "silver").length,
    gold: tenantCustomers.filter((c) => c.tier === "gold").length,
    platinum: tenantCustomers.filter((c) => c.tier === "platinum").length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customer Management</h1>
          <p className="text-muted-foreground">
            Manage your customer relationships
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Bronze</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {customerStats.bronze}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Silver</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {customerStats.silver}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Gold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {customerStats.gold}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Platinum</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {customerStats.platinum}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Credit Balance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {customer.firstName} {customer.lastName}
                      </p>
                      {customer.email && (
                        <p className="text-xs text-muted-foreground">
                          {customer.email}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    <Badge className={getTierColor(customer.tier)}>
                      {customer.tier.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>₱{customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-yellow-500" />
                      {customer.loyaltyPoints}
                    </div>
                  </TableCell>
                  <TableCell>
                    {customer.currentCredit > 0 ? (
                      <Badge variant="destructive">
                        ₱{customer.currentCredit.toFixed(2)}
                      </Badge>
                    ) : (
                      <Badge variant="secondary">No Credit</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openViewDialog(customer)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredCustomers.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={filteredCustomers.length}
            />
          )}
        </CardContent>
      </Card>

      {/* Add Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Create a new customer profile
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </div>
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
              />
            </div>
            <div>
              <Label htmlFor="address">Address (Optional)</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="creditLimit">Credit Limit</Label>
              <Input
                id="creditLimit"
                type="number"
                value={formData.creditLimit}
                onChange={(e) =>
                  setFormData({ ...formData, creditLimit: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd}>Add Customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Customer Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Name</Label>
                  <p className="font-medium">
                    {selectedCustomer.firstName} {selectedCustomer.lastName}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="font-medium">{selectedCustomer.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">
                    {selectedCustomer.email || "Not provided"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Tier</Label>
                  <Badge className={getTierColor(selectedCustomer.tier)}>
                    {selectedCustomer.tier.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Total Purchases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {selectedCustomer.totalPurchases}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Total Spent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      ₱{selectedCustomer.totalSpent.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Loyalty Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-yellow-600">
                      {selectedCustomer.loyaltyPoints}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Label className="text-muted-foreground mb-2 block">
                  Tier Benefits
                </Label>
                <div className="bg-muted p-4 rounded-md space-y-2">
                  <p className="text-sm">
                    Points Multiplier:{" "}
                    <strong>
                      {tierBenefits[selectedCustomer.tier].pointsMultiplier}x
                    </strong>
                  </p>
                  <p className="text-sm">
                    Credit Limit:{" "}
                    <strong>
                      ₱{tierBenefits[selectedCustomer.tier].creditLimit}
                    </strong>
                  </p>
                  <p className="text-sm">
                    Discount:{" "}
                    <strong>
                      {tierBenefits[selectedCustomer.tier].discountPercent}%
                    </strong>
                  </p>
                </div>
              </div>

              {selectedCustomer.currentCredit > 0 && (
                <div>
                  <Label className="text-muted-foreground mb-2 block">
                    Credit Information
                  </Label>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Outstanding Balance
                          </p>
                          <p className="text-2xl font-bold text-destructive">
                            ₱{selectedCustomer.currentCredit.toFixed(2)}
                          </p>
                        </div>
                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
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
