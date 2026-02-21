"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/auth-context";

export default function OAuthRedirectClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (token) {
      (async () => {
        const u = await login(token);
        if (u) router.replace("/profile");
        else {
          router.replace("/auth/login");
        }
      })();
    } else if (error) {
      import("sonner").then((mod) => mod.toast.error(error));
      router.replace("/auth/login");
    } else {
      router.replace("/auth/login");
    }
  }, [searchParams, router, login]);

  return <div>Redirecionando...</div>;
}
