"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import axios from "axios";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignupForm() {
  const router = useRouter();

  const sendVerificationEmail = async (
    name: string,
    email: string,
    token: string,
  ) => {
    await axios.post("/api/send-email", {
      to: email,
      subject: "Confirmação de Email",
      template: "confirmEmail",
      data: {
        name: name,
        link: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-email?token=${token}&callbackUrl=${encodeURIComponent(`${window.location.origin}/auth/login`)}`,
      },
    });
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const resp = await axiosInstance.post("/auth/signup", data);
      toast.success("Conta criada! Por favor, verifique seu email.");
      router.push(`/auth/verify-email?email=${encodeURIComponent(data.email)}`);
      await sendVerificationEmail(
        data.name,
        data.email,
        resp.data.emailVerificationToken,
      );
    } catch (error: unknown) {
      let message = "Algo deu errado. Por favor, tente novamente.";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="exemplo@exemplo.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button type="submit" className="w-full">
            Criar Conta
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
