"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { ACCESS_TOKEN } from "../../lib/constants";
import axiosInstance from "@/lib/axios";

interface AuthContextType {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async (): Promise<User> => {
    const response = await axiosInstance.get<User>("/user/me");
    return response.data;
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        localStorage.removeItem(ACCESS_TOKEN);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN, token);
    getCurrentUser()
      .then(setUser)
      .catch(() => {});
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setUser(null);
  };

  const value = {
    user,
    authenticated: !!user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
