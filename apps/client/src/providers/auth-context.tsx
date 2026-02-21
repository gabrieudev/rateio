"use client";

import axiosInstance from "@/lib/axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ACCESS_TOKEN } from "../lib/constants";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async (): Promise<User | null> => {
    try {
      const res = await axiosInstance.get<User>("/user/me");
      return res.data;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadUser = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setLoading(false);
        return;
      }

      const currentUser = await getCurrentUser();
      if (currentUser) setUser(currentUser);
      else localStorage.removeItem(ACCESS_TOKEN);

      setLoading(false);
    };
    loadUser();
  }, []);

  const login = (token: string) => {
    if (typeof window === "undefined") return;

    localStorage.setItem(ACCESS_TOKEN, token);
    getCurrentUser().then((u) => {
      if (u) setUser(u);
    });
  };

  const logout = () => {
    if (typeof window === "undefined") return;

    localStorage.removeItem(ACCESS_TOKEN);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
