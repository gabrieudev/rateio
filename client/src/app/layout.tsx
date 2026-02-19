import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers/auth-context";
import { Toaster } from "sonner";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Rateio",
  description: "Rateio",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
