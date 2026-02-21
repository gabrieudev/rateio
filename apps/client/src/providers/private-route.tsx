"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "./auth-context";

interface Props {
  children: ReactNode;
}

export const PrivateRouteProvider = ({ children }: Props) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Você precisa estar logado para acessar esta página.");
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return <div>Carregando...</div>;

  return <>{children}</>;
};
