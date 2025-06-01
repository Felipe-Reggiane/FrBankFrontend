"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function useAuthGuard(requireAuth: boolean) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthPage = pathname === "/" || pathname === "/register";

    if (requireAuth && !isAuthenticated) {
      router.replace("/");
    } else if (!requireAuth && isAuthenticated && isAuthPage) {
      router.replace("/home");
    }
  }, [isAuthenticated, pathname, requireAuth, router]);
}
