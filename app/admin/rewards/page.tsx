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
import { Plus, Pencil, Gift, Award, TrendingUp } from "lucide-react";
import { Reward } from "@/lib/customer-data";

export default function RewardsPage() {
  const { rewards, addReward, updateReward, loyaltyTransactions, customers } = useCustomer();
  const { currentTenant } = useTenant();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pointsCost: "",
    category: "discount",
    value: "",
  });

  // Filter rewards by current tenant
  const tenantRewards = rewards.filter((r) => r.tenantId === currentTenant?.id);

  // Calculate redemption stats
  const redemptions = loyaltyTransactions.filter(
    (t) => t.type === "redeem" && t.tenantId === currentTenant?.id
  );

  const totalPointsRedeemed = redemptions.reduce(
    (sum, t) => sum + Math.abs(t.points),
    0
  );

  const totalCustomers = customers.filter(
    (c) => c.tenantId === currentTenant?.id
  ).length;

  const activeCustomers = customers.filter(
    (c) => c.tenantId === currentTenant?.id && c.loyaltyPoints > 0
  ).length;

  const avgPointsPerCustomer =
    customers
      .filter((c) => c.tenantId === currentTenant?.id)
      .reduce((sum, c) => sum + c.loyaltyPoints, 0) / totalCustomers || 0;

  const handleAdd = () => {
    if (!currentTenant) return;

    addReward({
      tenantId: currentTenant.id,
      name: formData.name,
      description: formData.description,
      pointsCost: parseInt(formData.pointsCost),
      category: formData.category as Reward["category"],
      value: parseFloat(formData.value),
      isActive: true,
    });

    setIsAddDialogOpen(false);
    resetForm();
  };

  const openEditDialog = (reward: Reward) => {
    setSelectedReward(reward);
    setFormData({
      name: reward.name,
      description: reward.description,
      pointsCost: reward.pointsCost.toString(),
      category: reward.category,
      value: reward.value.toString(),
    });
    setIsEditDialogOpen(true);
  };

  const handleEdit = () => {
    if (!selectedReward) return;

    updateReward(selectedReward.id, {
      name: formData.name,
      description: formData.description,
      pointsCost: parseInt(formData.pointsCost),
      category: formData.category as Reward["category"],
      value: parseFloat(formData.value),
    });

    setIsEditDialogOpen(false);
    resetForm();
    setSelectedReward(null);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      pointsCost: "",
      category: "discount",
      value: "",
    });
  };

  const getCategoryColor = (category: Reward["category"]) => {
    switch (category) {
      case "discount":
        return "bg-blue-100 text-blue-800";
      case "product":
        return "bg-green-100 text-green-800";
      case "voucher":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryLabel = (category: Reward["category"]) => {
    switch (category) {
      case "discount":
        return "Discount";
      case "product":
        return "Free Product";
      case "voucher":
        return "Voucher";
      default:
        return category;
    }
  };

  const getRewardValue = (reward: Reward) => {
    switch (reward.category) {
      case "discount":
        return `${reward.value}% OFF`;
      case "product":
        return `1x ${reward.name}`;
      case "voucher":
        return `₱${reward.value.toFixed(2)}`;
      default:
        return reward.value;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rewards Catalog</h1>
          <p className="text-muted-foreground">
            Manage loyalty rewards and redemptions
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Reward
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Rewards
            </CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tenantRewards.length}</div>
            <p className="text-xs text-muted-foreground">
              {tenantRewards.filter((r) => r.isActive).length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Points Redeemed
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPointsRedeemed}</div>
            <p className="text-xs text-muted-foreground">
              {redemptions.length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Customers
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">
              With loyalty points
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Points/Customer
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {avgPointsPerCustomer.toFixed(0)}
            </div>
            <p className="text-xs text-muted-foreground">Points available</p>
          </CardContent>
        </Card>
      </div>

      {/* Rewards Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reward Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Points Cost</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenantRewards.map((reward) => (
                <TableRow key={reward.id}>
                  <TableCell className="font-medium">{reward.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                    {reward.description}
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(reward.category)}>
                      {getCategoryLabel(reward.category)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-yellow-500" />
                      {reward.pointsCost}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {getRewardValue(reward)}
                  </TableCell>
                  <TableCell>
                    {reward.isActive ? (
                      <Badge variant="default">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(reward)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Redemptions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Redemptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Reward</TableHead>
                <TableHead>Points Used</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {redemptions.slice(0, 10).map((transaction) => {
                const customer = customers.find(
                  (c) => c.id === transaction.customerId
                );
                const reward = rewards.find(
                  (r) => r.id === transaction.rewardId
                );
                return (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {customer
                        ? `${customer.firstName} ${customer.lastName}`
                        : "Unknown"}
                    </TableCell>
                    <TableCell>{reward?.name || "Unknown Reward"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-yellow-500" />
                        {Math.abs(transaction.points)}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Reward Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Reward</DialogTitle>
            <DialogDescription>
              Create a new reward for your loyalty program
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Reward Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., 10% Discount"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe the reward..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="discount">Discount</option>
                  <option value="product">Free Product</option>
                  <option value="voucher">Voucher</option>
                </select>
              </div>
              <div>
                <Label htmlFor="pointsCost">Points Cost</Label>
                <Input
                  id="pointsCost"
                  type="number"
                  value={formData.pointsCost}
                  onChange={(e) =>
                    setFormData({ ...formData, pointsCost: e.target.value })
                  }
                  placeholder="100"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                step="0.01"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
                placeholder="Percentage or amount"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                For discount: enter percentage (e.g., 10 for 10%). For voucher:
                enter amount in ₱
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAdd}>Add Reward</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Reward Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Reward</DialogTitle>
            <DialogDescription>Update reward details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Reward Name</Label>
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
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <select
                  id="edit-category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="discount">Discount</option>
                  <option value="product">Free Product</option>
                  <option value="voucher">Voucher</option>
                </select>
              </div>
              <div>
                <Label htmlFor="edit-pointsCost">Points Cost</Label>
                <Input
                  id="edit-pointsCost"
                  type="number"
                  value={formData.pointsCost}
                  onChange={(e) =>
                    setFormData({ ...formData, pointsCost: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-value">Value</Label>
              <Input
                id="edit-value"
                type="number"
                step="0.01"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
                required
              />
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
    </div>
  );
}
