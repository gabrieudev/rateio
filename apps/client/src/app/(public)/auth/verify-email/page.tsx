"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import { Mail, Clock } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      toast.error("Nenhum email fornecido. Redirecionando para login...");
    }
  }, [email]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (!email) return;
    setIsLoading(true);
    try {
      await axiosInstance.post("/auth/resend-verification", { email });
      toast.success(
        "Email de verificação reenviado! Por favor, verifique sua caixa de entrada.",
      );
      setCountdown(30);
    } catch {
      toast.error("Falha ao reenviar o email. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Verifique seu email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="flex justify-center">
            <Mail className="h-12 w-12 text-primary" />
          </div>
          <p className="text-muted-foreground">
            Enviamos um email de verificação para{" "}
            <span className="font-medium text-foreground">{email}</span>. Por
            favor, verifique sua caixa de entrada e clique no link para ativar
            sua conta.
          </p>
          <div className="space-y-2">
            <Button
              onClick={handleResend}
              disabled={countdown > 0 || isLoading || !email}
              className="w-full"
            >
              {isLoading ? (
                "Sending..."
              ) : countdown > 0 ? (
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Reenvio disponível em{" "}
                  {countdown}s
                </span>
              ) : (
                "Reenviar email"
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              Não recebeu o email? Verifique sua pasta de spam.
            </p>
          </div>
          <div className="pt-4">
            <Link
              href="/auth/login"
              className="text-sm text-primary hover:underline"
            >
              Retornar ao login
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
