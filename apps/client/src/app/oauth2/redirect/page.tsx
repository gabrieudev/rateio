"use client";
export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-context";
export default function OAuth2RedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (token) {
      login(token);
      router.replace("/profile");
    } else if (error) {
      toast.error(error);
      router.replace("/login");
    } else {
      router.replace("/login");
    }
  }, [searchParams, router, login]);

  return <div>Redirecionando...</div>;
}
