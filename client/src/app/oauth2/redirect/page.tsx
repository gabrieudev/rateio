"use client";

import { useAuth } from "@/app/providers/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function OAuth2Redirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (token) {
      login(token);
      router.push("/profile");
    } else if (error) {
      toast.error(error);
      router.push("/login");
    } else {
      router.push("/login");
    }
  }, [searchParams, router, login]);

  return <div>Redirecting...</div>;
}
