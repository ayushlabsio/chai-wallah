"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { CartDrawer } from "./CartDrawer";
import { useAuthStore } from "@/store/useAuthStore";

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { initializeAuthListener } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = initializeAuthListener();
    return () => unsubscribe();
  }, [initializeAuthListener]);

  const isAdminRouter = pathname?.startsWith("/admin");

  if (isAdminRouter) {
    return <main className="flex-1 min-h-screen bg-paper">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1 mix-blend-normal isolate relative z-0">
        {children}
      </main>
      <CartDrawer />
    </>
  );
}
