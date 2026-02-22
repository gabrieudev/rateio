"use client";

import SocialLogin from "@/components/social-login";
import Link from "next/link";
import { AuthLayout } from "../components/auth-layout";
import SignupForm from "../components/signup-form";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Criar uma conta"
      subtitle="Cadastre-se gratuitamente e comece a organizar suas despesas"
    >
      <div className="space-y-4">
        <SocialLogin method="signup" />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Ou continue com
            </span>
          </div>
        </div>
        <SignupForm />
        <p className="text-center text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link
            href="/auth/login"
            className="text-primary hover:underline font-medium"
          >
            Faça login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
