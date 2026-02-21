"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SocialLogin from "@/components/social-login";
import SignupForm from "./components/signup-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="border-none shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Criar uma conta
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Cadastre-se usando uma conta de rede social ou preencha o formulário
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <Link href="/auth/login" className="text-primary hover:underline">
              Faça login
            </Link>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
