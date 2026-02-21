import { PrivateRouteProvider } from "@/providers/private-route";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrivateRouteProvider>
      <main>{children}</main>
    </PrivateRouteProvider>
  );
}
