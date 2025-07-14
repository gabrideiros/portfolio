import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return;
  
    if (!password.trim()) {
      setError("Please enter a password");
      return false;
    }
  
    setIsLoading(true);
    setError("");
  
    try {
      const response = await apiClient.login(password);
  
      if (response.success && response.token) {
        navigate("/admin/dashboard");
      } else {
        setError(response.message || "Authentication failed");
        setPassword("");
        return false;
      }
    } catch (err) {
      setError("Network error. Please try again later.");
      console.error("Login error:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
    
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Lock className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Access</h1>
        </div>

        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>
              Please enter your admin password to access the dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} id="login-form" className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="h-12 pr-12"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-10 w-10 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                form="login-form"
                className="w-full h-12 shadow-sm"
                disabled={isLoading || !password.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Access Dashboard
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Portfolio Admin Panel</p>
        </div>
      </div>
    </div>
  );
}
