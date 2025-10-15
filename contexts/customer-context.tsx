"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Customer,
  CreditAccount,
  CreditPayment,
  LoyaltyTransaction,
  Reward,
  sampleCustomers,
  sampleCreditAccounts,
  sampleRewards,
  calculateTier,
  calculatePointsEarned,
} from "@/lib/customer-data";

interface CustomerContextType {
  customers: Customer[];
  creditAccounts: CreditAccount[];
  rewards: Reward[];
  loyaltyTransactions: LoyaltyTransaction[];
  addCustomer: (customer: Omit<Customer, "id" | "registeredDate" | "totalPurchases" | "totalSpent" | "loyaltyPoints" | "currentCredit" | "tier">) => Customer;
  updateCustomer: (customerId: string, updates: Partial<Customer>) => void;
  deleteCustomer: (customerId: string) => void;
  getCustomerById: (customerId: string) => Customer | undefined;
  addCreditAccount: (account: Omit<CreditAccount, "id" | "createdDate" | "paymentHistory">) => void;
  addCreditPayment: (creditAccountId: string, payment: Omit<CreditPayment, "id" | "creditAccountId">) => void;
  getCreditAccountsByCustomer: (customerId: string) => CreditAccount[];
  earnLoyaltyPoints: (customerId: string, points: number, reason: string, transactionId?: string) => void;
  redeemPoints: (customerId: string, rewardId: string) => boolean;
  getCustomerLoyaltyHistory: (customerId: string) => LoyaltyTransaction[];
  updateCustomerTier: (customerId: string) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [creditAccounts, setCreditAccounts] = useState<CreditAccount[]>(
    sampleCreditAccounts
  );
  const [rewards] = useState<Reward[]>(sampleRewards);
  const [loyaltyTransactions, setLoyaltyTransactions] = useState<
    LoyaltyTransaction[]
  >([]);

  const addCustomer = (
    newCustomer: Omit<
      Customer,
      | "id"
      | "registeredDate"
      | "totalPurchases"
      | "totalSpent"
      | "loyaltyPoints"
      | "currentCredit"
      | "tier"
    >
  ): Customer => {
    const customer: Customer = {
      ...newCustomer,
      id: `cust-${Date.now()}`,
      registeredDate: new Date(),
      totalPurchases: 0,
      totalSpent: 0,
      loyaltyPoints: 0,
      currentCredit: 0,
      tier: "bronze",
    };
    setCustomers([...customers, customer]);
    return customer;
  };

  const updateCustomer = (customerId: string, updates: Partial<Customer>) => {
    setCustomers(
      customers.map((c) => (c.id === customerId ? { ...c, ...updates } : c))
    );
  };

  const deleteCustomer = (customerId: string) => {
    setCustomers(customers.filter((c) => c.id !== customerId));
  };

  const getCustomerById = (customerId: string) => {
    return customers.find((c) => c.id === customerId);
  };

  const addCreditAccount = (
    account: Omit<CreditAccount, "id" | "createdDate" | "paymentHistory">
  ) => {
    const newAccount: CreditAccount = {
      ...account,
      id: `credit-${Date.now()}`,
      createdDate: new Date(),
      paymentHistory: [],
    };
    setCreditAccounts([...creditAccounts, newAccount]);

    // Update customer's current credit
    const customer = customers.find((c) => c.id === account.customerId);
    if (customer) {
      updateCustomer(account.customerId, {
        currentCredit: customer.currentCredit + account.currentBalance,
      });
    }
  };

  const addCreditPayment = (
    creditAccountId: string,
    payment: Omit<CreditPayment, "id" | "creditAccountId">
  ) => {
    const newPayment: CreditPayment = {
      ...payment,
      id: `pay-${Date.now()}`,
      creditAccountId,
    };

    setCreditAccounts(
      creditAccounts.map((account) => {
        if (account.id === creditAccountId) {
          const newBalance = account.currentBalance - payment.amount;
          const newStatus =
            newBalance <= 0
              ? "paid"
              : new Date() > account.dueDate
              ? "overdue"
              : "active";

          return {
            ...account,
            currentBalance: Math.max(0, newBalance),
            lastPaymentDate: payment.paymentDate,
            status: newStatus,
            paymentHistory: [...account.paymentHistory, newPayment],
          };
        }
        return account;
      })
    );

    // Update customer's current credit
    const account = creditAccounts.find((a) => a.id === creditAccountId);
    if (account) {
      const customer = customers.find((c) => c.id === account.customerId);
      if (customer) {
        updateCustomer(account.customerId, {
          currentCredit: Math.max(0, customer.currentCredit - payment.amount),
        });
      }
    }
  };

  const getCreditAccountsByCustomer = (customerId: string) => {
    return creditAccounts.filter((a) => a.customerId === customerId);
  };

  const earnLoyaltyPoints = (
    customerId: string,
    points: number,
    reason: string,
    transactionId?: string
  ) => {
    const customer = customers.find((c) => c.id === customerId);
    if (!customer) return;

    const transaction: LoyaltyTransaction = {
      id: `loyalty-${Date.now()}`,
      customerId,
      tenantId: customer.tenantId,
      type: "earn",
      points,
      transactionId,
      reason,
      date: new Date(),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    };

    setLoyaltyTransactions([...loyaltyTransactions, transaction]);
    updateCustomer(customerId, {
      loyaltyPoints: customer.loyaltyPoints + points,
    });
  };

  const redeemPoints = (customerId: string, rewardId: string): boolean => {
    const customer = customers.find((c) => c.id === customerId);
    const reward = rewards.find((r) => r.id === rewardId);

    if (!customer || !reward) return false;
    if (customer.loyaltyPoints < reward.pointsCost) return false;

    const transaction: LoyaltyTransaction = {
      id: `loyalty-${Date.now()}`,
      customerId,
      tenantId: customer.tenantId,
      type: "redeem",
      points: -reward.pointsCost,
      reason: `Redeemed: ${reward.name}`,
      date: new Date(),
    };

    setLoyaltyTransactions([...loyaltyTransactions, transaction]);
    updateCustomer(customerId, {
      loyaltyPoints: customer.loyaltyPoints - reward.pointsCost,
    });

    return true;
  };

  const getCustomerLoyaltyHistory = (customerId: string) => {
    return loyaltyTransactions.filter((t) => t.customerId === customerId);
  };

  const updateCustomerTier = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId);
    if (!customer) return;

    const newTier = calculateTier(customer.totalSpent);
    if (newTier !== customer.tier) {
      updateCustomer(customerId, { tier: newTier });
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        creditAccounts,
        rewards,
        loyaltyTransactions,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        getCustomerById,
        addCreditAccount,
        addCreditPayment,
        getCreditAccountsByCustomer,
        earnLoyaltyPoints,
        redeemPoints,
        getCustomerLoyaltyHistory,
        updateCustomerTier,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
}
