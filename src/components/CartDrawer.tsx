"use client";

import { useStore } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const { cart, cartDrawerOpen, setCartDrawerOpen, updateQuantity, removeFromCart } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-tea-dark/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${cartDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setCartDrawerOpen(false)}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-paper shadow-2xl z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.3,1,0.2,1)] flex flex-col ${cartDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-tea-dark/10">
          <h2 className="font-serif text-2xl text-tea-dark">Your Cart</h2>
          <button 
            onClick={() => setCartDrawerOpen(false)}
            className="text-tea-dark hover:text-tea-green transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-tea-dark/50">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
              <p className="font-serif text-xl">Your cart is empty.</p>
              <button 
                onClick={() => setCartDrawerOpen(false)}
                className="mt-6 border border-tea-dark px-6 py-2 text-xs uppercase tracking-widest text-tea-dark hover:bg-tea-dark hover:text-cream transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-20 h-24 bg-tea-dark/5 flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-lg text-tea-dark leading-tight">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-tea-dark/40 hover:text-tea-dark"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                  </div>
                  <span className="text-warm-gray text-xs mt-1">{item.category}</span>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center border border-tea-dark/20 text-tea-dark text-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-tea-dark/5 disabled:opacity-50"
                      >-</button>
                      <span className="px-2 w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-tea-dark/5"
                      >+</button>
                    </div>
                    <span className="text-tea-dark font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-tea-dark/10 bg-tea-dark/5">
            <div className="flex justify-between mb-4 text-tea-dark">
              <span className="font-serif text-xl">Subtotal</span>
              <span className="font-medium text-lg">₹{subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-warm-gray mb-6">Shipping and taxes calculated at checkout.</p>
            <Link 
              href="/shop/checkout" 
              onClick={() => setCartDrawerOpen(false)}
              className="block w-full text-center bg-tea-dark hover:bg-tea-green text-cream py-4 uppercase tracking-widest text-xs font-semibold transition-colors"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
