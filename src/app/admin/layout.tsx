"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminLoginModal } from "@/components/AdminLoginModal";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check session storage for existing auth
    const authStatus = sessionStorage.getItem("admin_auth");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleLogin = (success: boolean) => {
    if (success) {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
    }
  };

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    if (isActive) {
      return "px-4 py-3 text-sm font-medium tracking-wide rounded-sm bg-tea-dark/5 text-tea-dark hover:bg-tea-dark/10 transition-colors";
    }
    return "px-4 py-3 text-sm font-medium tracking-wide rounded-sm text-warm-gray hover:bg-tea-dark/5 hover:text-tea-dark transition-colors";
  };

  // While checking authentication, show a blank screen to avoid flickering
  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-paper" />;
  }

  return (
    <div className="relative min-h-screen">
      {/* Admin Content - Blurred and non-interactive if not authenticated */}
      <div className={`flex min-h-screen bg-paper text-tea-dark selection:bg-tea-light selection:text-tea-dark font-sans ${!isAuthenticated ? 'blur-[4px] pointer-events-none select-none overflow-hidden' : ''}`}>
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-tea-dark/10 flex flex-col pt-8 pb-6 px-6 sticky top-0 h-screen shadow-sm z-10">
          <div className="mb-12">
            <Link href="/" className="font-serif text-2xl font-bold tracking-wider text-tea-dark hover:opacity-80 transition-opacity">
              CHAI WALLAH
            </Link>
            <div className="text-[10px] uppercase tracking-widest text-tea-green font-semibold mt-2">Admin Panel</div>
          </div>

          <nav className="flex-1 flex flex-col gap-2">
            <Link
              href="/admin"
              className={getLinkClass("/admin")}
            >
              Inventory
            </Link>
            <Link
              href="/admin/products/new"
              className={getLinkClass("/admin/products/new")}
            >
              Add Product
            </Link>
            <Link
              href="/admin/categories"
              className={getLinkClass("/admin/categories")}
            >
              Categories
            </Link>
            <div className="px-4 py-3 text-sm font-medium tracking-wide rounded-sm text-warm-gray opacity-50 cursor-not-allowed">
              Orders
            </div>
            <div className="px-4 py-3 text-sm font-medium tracking-wide rounded-sm text-warm-gray opacity-50 cursor-not-allowed">
              Analytics
            </div>
            <div className="px-4 py-3 text-sm font-medium tracking-wide rounded-sm text-warm-gray opacity-50 cursor-not-allowed">
              Settings
            </div>
          </nav>

          <div className="mt-auto border-t border-tea-dark/10 pt-6">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-tea-dark/10 flex items-center justify-center text-sm font-bold">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold">Admin User</span>
                <span className="text-[10px] text-warm-gray">Store Manager</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative max-w-[1400px] mx-auto w-full">
          {/* Dynamic decorative backdrop subtle glassmorphism */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-tea-green/10 rounded-full blur-3xl -z-10 pointer-events-none opacity-50" />
          <div className="absolute bottom-0 left-[20%] w-[500px] h-[500px] bg-warm-gray/10 rounded-full blur-3xl -z-10 pointer-events-none opacity-60" />

          {children}
        </main>
      </div>

      {/* Show login modal on top if not authenticated */}
      {!isAuthenticated && (
        <AdminLoginModal onLogin={handleLogin} />
      )}
    </div>
  );
}
