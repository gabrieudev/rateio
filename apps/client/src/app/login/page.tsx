"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../providers/auth-context";
import SocialLogin from "@/components/social-login";
import LoginForm from "./components/login-form";

export default function LoginPage() {
  const { authenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      router.push("/");
    }
  }, [authenticated, router]);

  return (
    <div className="login-container text-center">
      <div className="login-content bg-white shadow-lg rounded-lg w-[500px] inline-block mt-[30px] p-[35px]">
        <h1 className="login-title text-2xl font-medium text-gray-700 mb-[30px]">
          Entrar
        </h1>
        <SocialLogin method="signin" />
        <div className="or-separator border-b border-gray-200 py-2 relative my-5 mb-[30px]">
          <span className="or-text absolute left-[46%] top-0 bg-white px-2 text-gray-500">
            OU
          </span>
        </div>
        <LoginForm />
        <span className="signup-link text-sm text-gray-600">
          Novo usuário?{" "}
          <Link href="/signup" className="text-blue-500">
            Cadastre-se!
          </Link>
        </span>
      </div>
    </div>
  );
}
