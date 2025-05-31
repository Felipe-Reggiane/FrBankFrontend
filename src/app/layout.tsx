"use client";

import { LayoutWrapper } from "@/components";
import "./globals.css";
import { DrawerProvider } from "@/context/DrawerContext";

import { Roboto } from "next/font/google";
import { usePathname } from "next/navigation";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Escolha os pesos que deseja usar
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const canShowLayoutWrapper = pathname !== "/" && pathname !== "/register";
  return (
    <html lang="en">
      <body
        className={`${roboto.className}`}
        style={{
          overflowX: "hidden",
        }}
      >
        <DrawerProvider>
          {canShowLayoutWrapper ? (
            <LayoutWrapper> {children}</LayoutWrapper>
          ) : (
            children
          )}
        </DrawerProvider>
      </body>
    </html>
  );
}
