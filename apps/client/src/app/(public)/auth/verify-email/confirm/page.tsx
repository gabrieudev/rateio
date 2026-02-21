"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error",
  );
  const [message, setMessage] = useState(
    token ? "" : "Nenhum token de verificação fornecido.",
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    const verifyEmail = async () => {
      try {
        await axiosInstance.get(`/auth/verify-email?token=${token}`);
        setStatus("success");
        setMessage("Seu email foi verificado com sucesso!");
        toast.success("Email verified!");
      } catch {
        setStatus("error");
        setMessage(
          "A verificação falhou. O link pode estar expirado ou inválido.",
        );
        toast.error("Verificação falhou");
      }
    };

    verifyEmail();
  }, [token]);

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
            Verificação de Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="flex justify-center">
            {status === "loading" && (
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            )}
            {status === "success" && (
              <CheckCircle className="h-12 w-12 text-green-500" />
            )}
            {status === "error" && (
              <XCircle className="h-12 w-12 text-destructive" />
            )}
          </div>
          <p className="text-muted-foreground">{message}</p>
          {status === "success" && (
            <Button
              onClick={() => router.push("/auth/login")}
              className="w-full"
            >
              Ir para Login
            </Button>
          )}
          {status === "error" && (
            <Button
              onClick={() => router.push("/auth/verify-email")}
              variant="outline"
              className="w-full"
            >
              Voltar para verificação
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
