"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User, sampleUsers } from "@/lib/auth-data";

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permissionId: string) => boolean;
  addUser: (user: Omit<User, "id" | "createdAt">) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(sampleUsers);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("cloudpos_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password && u.isActive
    );

    if (foundUser) {
      const updatedUser = { ...foundUser, lastLogin: new Date() };
      setUser(updatedUser);
      localStorage.setItem("cloudpos_user", JSON.stringify(updatedUser));

      // Update last login in users array
      setUsers(users.map(u => u.id === foundUser.id ? updatedUser : u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cloudpos_user");
  };

  const hasPermission = (permissionId: string): boolean => {
    if (!user) return false;
    const { permissions } = require("@/lib/auth-data");
    return permissions[user.role].some((p: any) => p.id === permissionId);
  };

  const addUser = (newUser: Omit<User, "id" | "createdAt">) => {
    const user: User = {
      ...newUser,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setUsers([...users, user]);
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, ...updates } : u)));

    // Update current user if they're updating themselves
    if (user && user.id === userId) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("cloudpos_user", JSON.stringify(updatedUser));
    }
  };

  const deleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        logout,
        isAuthenticated: !!user,
        hasPermission,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
