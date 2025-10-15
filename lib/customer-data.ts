import { Transaction } from "./data";

// Multi-tenant structure
export interface Tenant {
  id: string;
  name: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  isActive: boolean;
  createdAt: Date;
  subscriptionTier: "basic" | "premium" | "enterprise";
  features: string[];
}

// Customer profile
export interface Customer {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  address?: string;
  dateOfBirth?: Date;
  registeredDate: Date;
  totalPurchases: number;
  totalSpent: number;
  loyaltyPoints: number;
  creditLimit: number;
  currentCredit: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
  isActive: boolean;
  notes?: string;
}

// Credit/Loan tracking
export interface CreditAccount {
  id: string;
  customerId: string;
  tenantId: string;
  principalAmount: number;
  currentBalance: number;
  interestRate: number;
  dueDate: Date;
  status: "active" | "paid" | "overdue" | "defaulted";
  createdDate: Date;
  lastPaymentDate?: Date;
  paymentHistory: CreditPayment[];
}

export interface CreditPayment {
  id: string;
  creditAccountId: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  processedBy: string;
  notes?: string;
}

// Loyalty/Rewards system
export interface LoyaltyTransaction {
  id: string;
  customerId: string;
  tenantId: string;
  type: "earn" | "redeem" | "expire" | "adjustment";
  points: number;
  transactionId?: string;
  reason: string;
  date: Date;
  expiryDate?: Date;
}

export interface Reward {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  pointsCost: number;
  cashValue: number;
  isActive: boolean;
  category: string;
  stock?: number;
}

// Customer tier benefits
export const tierBenefits = {
  bronze: {
    name: "Bronze",
    pointsMultiplier: 1,
    creditLimit: 500,
    discountPercent: 0,
    minSpend: 0,
  },
  silver: {
    name: "Silver",
    pointsMultiplier: 1.5,
    creditLimit: 2000,
    discountPercent: 5,
    minSpend: 5000,
  },
  gold: {
    name: "Gold",
    pointsMultiplier: 2,
    creditLimit: 5000,
    discountPercent: 10,
    minSpend: 15000,
  },
  platinum: {
    name: "Platinum",
    pointsMultiplier: 3,
    creditLimit: 10000,
    discountPercent: 15,
    minSpend: 50000,
  },
};

// Sample tenants
export const sampleTenants: Tenant[] = [
  {
    id: "tenant-1",
    name: "Main Store",
    businessName: "Juan's Sari-Sari Store",
    ownerName: "Juan Dela Cruz",
    email: "juan@sarisari.com",
    phone: "09171234567",
    address: "123 Main St, Barangay San Jose",
    city: "Manila",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    subscriptionTier: "premium",
    features: ["pos", "inventory", "analytics", "customers", "credit"],
  },
  {
    id: "tenant-2",
    name: "Branch 2",
    businessName: "Maria's Grocery",
    ownerName: "Maria Santos",
    email: "maria@grocery.com",
    phone: "09189876543",
    address: "456 Market St, Barangay Maligaya",
    city: "Quezon City",
    isActive: true,
    createdAt: new Date("2024-06-01"),
    subscriptionTier: "basic",
    features: ["pos", "inventory"],
  },
];

// Sample customers
export const sampleCustomers: Customer[] = [
  {
    id: "cust-1",
    tenantId: "tenant-1",
    firstName: "Pedro",
    lastName: "Reyes",
    email: "pedro@email.com",
    phone: "09171111111",
    address: "Block 1 Lot 2, Barangay San Jose",
    registeredDate: new Date("2025-01-01"),
    totalPurchases: 45,
    totalSpent: 12500,
    loyaltyPoints: 1250,
    creditLimit: 2000,
    currentCredit: 500,
    tier: "silver",
    isActive: true,
  },
  {
    id: "cust-2",
    tenantId: "tenant-1",
    firstName: "Ana",
    lastName: "Garcia",
    phone: "09182222222",
    address: "Block 3 Lot 5, Barangay San Jose",
    registeredDate: new Date("2025-02-15"),
    totalPurchases: 120,
    totalSpent: 35000,
    loyaltyPoints: 3500,
    creditLimit: 5000,
    currentCredit: 1200,
    tier: "gold",
    isActive: true,
  },
  {
    id: "cust-3",
    tenantId: "tenant-1",
    firstName: "Jose",
    lastName: "Martinez",
    phone: "09183333333",
    registeredDate: new Date("2025-03-01"),
    totalPurchases: 15,
    totalSpent: 2300,
    loyaltyPoints: 230,
    creditLimit: 500,
    currentCredit: 0,
    tier: "bronze",
    isActive: true,
  },
  {
    id: "cust-4",
    tenantId: "tenant-1",
    firstName: "Rosa",
    lastName: "Villanueva",
    email: "rosa@email.com",
    phone: "09184444444",
    dateOfBirth: new Date("1985-05-20"),
    registeredDate: new Date("2024-11-01"),
    totalPurchases: 250,
    totalSpent: 75000,
    loyaltyPoints: 7500,
    creditLimit: 10000,
    currentCredit: 3500,
    tier: "platinum",
    isActive: true,
    notes: "VIP customer, birthday discount applied",
  },
];

// Sample credit accounts
export const sampleCreditAccounts: CreditAccount[] = [
  {
    id: "credit-1",
    customerId: "cust-1",
    tenantId: "tenant-1",
    principalAmount: 500,
    currentBalance: 500,
    interestRate: 0,
    dueDate: new Date("2025-11-01"),
    status: "active",
    createdDate: new Date("2025-10-01"),
    paymentHistory: [],
  },
  {
    id: "credit-2",
    customerId: "cust-2",
    tenantId: "tenant-1",
    principalAmount: 1500,
    currentBalance: 1200,
    interestRate: 2,
    dueDate: new Date("2025-10-20"),
    status: "active",
    createdDate: new Date("2025-09-20"),
    lastPaymentDate: new Date("2025-10-10"),
    paymentHistory: [
      {
        id: "pay-1",
        creditAccountId: "credit-2",
        amount: 300,
        paymentDate: new Date("2025-10-10"),
        paymentMethod: "Cash",
        processedBy: "admin",
      },
    ],
  },
  {
    id: "credit-3",
    customerId: "cust-4",
    tenantId: "tenant-1",
    principalAmount: 3500,
    currentBalance: 3500,
    interestRate: 1.5,
    dueDate: new Date("2025-10-25"),
    status: "active",
    createdDate: new Date("2025-09-25"),
    paymentHistory: [],
  },
];

// Sample rewards
export const sampleRewards: Reward[] = [
  {
    id: "reward-1",
    tenantId: "tenant-1",
    name: "₱50 Discount Voucher",
    description: "Get ₱50 off your next purchase",
    pointsCost: 500,
    cashValue: 50,
    isActive: true,
    category: "Discount",
    stock: 100,
  },
  {
    id: "reward-2",
    tenantId: "tenant-1",
    name: "₱100 Discount Voucher",
    description: "Get ₱100 off your next purchase",
    pointsCost: 1000,
    cashValue: 100,
    isActive: true,
    category: "Discount",
    stock: 50,
  },
  {
    id: "reward-3",
    tenantId: "tenant-1",
    name: "Free Coke 1.5L",
    description: "Redeem for a free Coke 1.5L",
    pointsCost: 300,
    cashValue: 65,
    isActive: true,
    category: "Free Product",
    stock: 30,
  },
  {
    id: "reward-4",
    tenantId: "tenant-1",
    name: "₱200 Discount Voucher",
    description: "Get ₱200 off your next purchase",
    pointsCost: 2000,
    cashValue: 200,
    isActive: true,
    category: "Discount",
    stock: 20,
  },
];

export function calculateTier(totalSpent: number): Customer["tier"] {
  if (totalSpent >= tierBenefits.platinum.minSpend) return "platinum";
  if (totalSpent >= tierBenefits.gold.minSpend) return "gold";
  if (totalSpent >= tierBenefits.silver.minSpend) return "silver";
  return "bronze";
}

export function calculatePointsEarned(
  amount: number,
  tier: Customer["tier"]
): number {
  const multiplier = tierBenefits[tier].pointsMultiplier;
  return Math.floor(amount * multiplier);
}

export function getTierDiscount(tier: Customer["tier"]): number {
  return tierBenefits[tier].discountPercent;
}
