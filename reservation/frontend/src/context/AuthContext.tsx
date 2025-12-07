import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/services/api";
import type {
  AuthContextType,
  User,
  LoginRequest,
  SignupRequest,
} from "@/types";

/**
 * Authentication Context
 * Manages user authentication state across the application
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Provider Component
 * Wraps the app and provides authentication functionality
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user session on mount
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  /**
   * Login user with email and password
   */
  const login = async (credentials: LoginRequest): Promise<User> => {
    setLoading(true);
    try {
      const user = await authService.login(credentials);
      setUser(user);
      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register new user account
   */
  const signup = async (data: SignupRequest): Promise<User> => {
    setLoading(true);
    try {
      const user = await authService.signup(data);
      setUser(user);
      return user;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout current user
   */
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use authentication context
 * Must be used within AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
