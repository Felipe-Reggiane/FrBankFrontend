"use client";

import { LayoutWrapper } from "@/components";
import "./globals.css";
import { DrawerProvider } from "@/context/DrawerContext";

import { Roboto } from "next/font/google";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/" || pathname === "/register";
  const isNotFoundPage = pathname === "/not-found";

  const canShowLayoutWrapper = !isAuthPage && !isNotFoundPage;
  return (
    <html lang="en">
      <body
        className={`${roboto.className}`}
        style={{
          overflowX: "hidden",
        }}
      >
        <AuthProvider>
          <DrawerProvider>
            {canShowLayoutWrapper ? (
              <LayoutWrapper> {children}</LayoutWrapper>
            ) : (
              children
            )}
          </DrawerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
