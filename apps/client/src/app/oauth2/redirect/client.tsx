"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthRedirectClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (token) {
      try {
        localStorage.setItem("ACCESS_TOKEN", token);
      } catch {}
      router.replace("/profile");
    } else if (error) {
      import("sonner").then((mod) => mod.toast.error(error));
      router.replace("/login");
    } else {
      router.replace("/login");
    }
  }, [searchParams, router]);

  return <div>Redirecionando...</div>;
}
