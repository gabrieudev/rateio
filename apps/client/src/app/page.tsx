"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart,
  FileText,
  Receipt,
  Scale,
  Settings,
  Shield,
  UserPlus,
  Users,
  Lock,
  History,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: Lock,
    title: "Autenticação segura",
    description:
      "Login com cookies http-only, protegendo seus dados contra acessos não autorizados.",
  },
  {
    icon: Users,
    title: "Grupos personalizados",
    description:
      "Crie grupos para diferentes contextos e convite participantes facilmente.",
  },
  {
    icon: Receipt,
    title: "Registro de despesas",
    description:
      "Adicione despesas com divisão igual ou personalizada entre os membros.",
  },
  {
    icon: Scale,
    title: "Balanço automático",
    description:
      "O sistema calcula saldos, pagamentos e pendências instantaneamente.",
  },
  {
    icon: History,
    title: "Histórico completo",
    description:
      "Visualize todas as transações e o balanço consolidado do grupo.",
  },
  {
    icon: Shield,
    title: "Encerramento de grupos",
    description: "Finalize grupos para manter um registro imutável dos gastos.",
  },
  {
    icon: Settings,
    title: "Controle de permissões",
    description: "Gerencie quem pode adicionar ou editar despesas no grupo.",
  },
  {
    icon: FileText,
    title: "Relatórios e paginação",
    description:
      "Acesse relatórios detalhados e despesas paginadas para melhor organização.",
  },
];

const steps = [
  {
    icon: UserPlus,
    title: "Crie sua conta",
    description: "Cadastre-se gratuitamente e faça login de forma segura.",
  },
  {
    icon: Users,
    title: "Crie um grupo",
    description: "Defina um nome para o grupo e convide os participantes.",
  },
  {
    icon: Receipt,
    title: "Registre despesas",
    description:
      "Adicione os gastos do grupo, informando valor e participantes.",
  },
  {
    icon: BarChart,
    title: "Acompanhe os saldos",
    description: "Visualize quem deve para quem e realize os acertos.",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative bg-background text-foreground min-h-screen overflow-x-hidden flex flex-col items-center justify-center px-4 py-8 m-x-auto">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md"
      >
        <div className="flex h-16 items-center justify-between px-6">
          {/* Lado esquerdo */}
          <div className="flex items-center gap-6">
            <Image
              src="/logo.png"
              alt="Rateio"
              width={40}
              height={10}
              className="object-contain"
            />

            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <a
                href="#features"
                className="transition-colors hover:text-primary"
              >
                Funcionalidades
              </a>
              <a
                href="#how-it-works"
                className="transition-colors hover:text-primary"
              >
                Como funciona
              </a>
            </nav>
          </div>

          {/* Lado direito fixo */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push("/auth/login")}
              variant="ghost"
              size="sm"
              className="cursor-pointer"
            >
              Entrar
            </Button>
            <Button
              onClick={() => router.push("/auth/signup")}
              size="sm"
              className="cursor-pointer"
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </motion.header>
      <main className="min-h-screen">
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="container">
            <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
              >
                Controle de despesas compartilhadas
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-muted-foreground max-w-2xl"
              >
                Divida gastos com amigos de forma simples e transparente. Ideal
                para viagens, moradias coletivas e eventos.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <Button
                  onClick={() => router.push("/auth/signup")}
                  size="lg"
                  className="gap-2 cursor-pointer"
                >
                  Começar agora <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            {/* Elemento decorativo */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />
          </div>
        </section>
        <section
          id="features"
          className="py-16 md:py-24 bg-muted/50 p-10 border border-muted/50 rounded-lg"
        >
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Funcionalidades pensadas para você
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tudo o que precisa para organizar finanças em grupo e evitar
                conflitos causados por cálculos manuais.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <feature.icon className="h-10 w-10 text-primary mb-2" />
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section id="how-it-works" className="py-16 md:py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Como funciona
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Em poucos passos você já pode começar a dividir despesas com seu
                grupo.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                      <div className="relative bg-primary text-primary-foreground rounded-full p-4">
                        <step.icon className="h-8 w-8" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>

                  {/* Linha conectora entre os passos (exceto último) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/4 left-full w-full h-0.5 bg-border -z-10 transform -translate-y-1/2" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-primary/5 p-10 border border-primary/20 rounded-lg">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-background p-8 md:p-12 text-center overflow-hidden"
            >
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Pronto para organizar suas finanças em grupo?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Junte-se a centenas de usuários que já estão utilizando o
                  Rateio para dividir despesas de forma justa e sem complicação.
                </p>
                <Button
                  onClick={() => router.push("/auth/login")}
                  size="lg"
                  className="gap-2 cursor-pointer"
                >
                  Experimente agora <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Círculos decorativos */}
              <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
