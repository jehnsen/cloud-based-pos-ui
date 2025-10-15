"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Store, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = login(username, password);

    if (success) {
      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-sari flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl backdrop-blur-sm bg-white/95 relative z-10">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="h-20 w-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Store className="h-12 w-12 text-white" />
            </div>
          </div>
          <div className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Cloud POS
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Sari-Sari Store Management System
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity text-white font-semibold h-11"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
            <p className="text-xs font-bold mb-2 text-orange-900">Demo Credentials:</p>
            <div className="text-xs space-y-1.5 text-gray-700">
              <div className="flex items-center justify-between">
                <span><strong className="text-orange-700">Admin:</strong> admin</span>
                <span className="text-muted-foreground">admin123</span>
              </div>
              <div className="flex items-center justify-between">
                <span><strong className="text-orange-700">Manager:</strong> manager</span>
                <span className="text-muted-foreground">manager123</span>
              </div>
              <div className="flex items-center justify-between">
                <span><strong className="text-orange-700">Cashier:</strong> cashier1</span>
                <span className="text-muted-foreground">cashier123</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
