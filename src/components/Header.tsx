"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const { cart, setCartDrawerOpen } = useStore();
  const { user } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const showLogin = pathname !== "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference text-cream transition-all duration-300 pointer-events-none">
      <Link href="/" className="font-serif text-2xl font-bold tracking-wider pointer-events-auto">
        CHAI WALLAH
      </Link>
      
      <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium pointer-events-auto">
        <Link href="/#about" className="hover:text-tea-light transition-colors">Story</Link>
        <Link href="/#collection" className="hover:text-tea-light transition-colors">Collection</Link>
        <Link href="/#contact" className="hover:text-tea-light transition-colors">Contact</Link>
      </nav>

      <div className="flex items-center gap-6 pointer-events-auto">
        {showLogin && (
          <Link href={user ? "/shop/profile" : "/login"} className="hover:text-tea-light transition-colors group flex items-center">
            {/* User SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="hidden md:block text-xs uppercase tracking-widest font-semibold">{user ? 'Account' : 'Login'}</span>
          </Link>
        )}
        
        <button 
          onClick={() => setCartDrawerOpen(true)}
          className="relative hover:text-tea-light transition-colors flex items-center"
        >
          {/* Cart/Bag SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span className="hidden md:block text-xs uppercase tracking-widest font-semibold">Cart</span>
          
          {mounted && cartQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-tea-light text-tea-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartQuantity}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
