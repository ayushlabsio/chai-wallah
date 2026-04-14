"use client";

import { useStore } from "@/store/useStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const { user, loading } = useAuthStore();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  // Form State
  const [address, setAddress] = useState({
    fullName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    setMounted(true);
    if (user && address.email === "") {
      setAddress(prev => ({ ...prev, email: user.email || "" }));
    }
  }, [user]);

  // Protect route
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (!mounted || loading || !user) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setPlacingOrder(true);
    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        userEmail: user.email,
        items: cart,
        shippingAddress: address,
        totalAmount: total,
        status: "pending",
        createdAt: serverTimestamp()
      });
      
      clearCart();
      setOrderSuccess(true);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-paper pt-32 pb-20 px-6 flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-cream p-10 border border-tea-dark/10 shadow-xl shadow-tea-dark/5 text-center">
          <div className="w-16 h-16 bg-tea-light rounded-full flex items-center justify-center mx-auto mb-6 text-tea-dark">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
          <h1 className="font-serif text-3xl text-tea-dark mb-4">Order Placed</h1>
          <p className="text-warm-gray text-sm mb-8">Thank you for your purchase. We will notify you when your calm is shipped.</p>
          <Link href="/" className="inline-block border border-tea-dark px-8 py-3 text-xs uppercase tracking-widest text-tea-dark hover:bg-tea-dark hover:text-cream transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Left Col: Address Form */}
        <div className="flex-1">
          <h1 className="font-serif text-3xl text-tea-dark mb-8">Checkout</h1>
          
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
            <div>
              <h2 className="text-sm uppercase tracking-widest font-semibold text-tea-dark mb-4 border-b border-tea-dark/10 pb-2">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-warm-gray mb-2">Email Address</label>
                  <input type="email" value={address.email} disabled className="w-full border border-tea-dark/20 p-3 bg-tea-dark/5 text-tea-dark" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm uppercase tracking-widest font-semibold text-tea-dark mb-4 border-b border-tea-dark/10 pb-2">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-warm-gray mb-2">Full Name</label>
                  <input required type="text" value={address.fullName} onChange={e => setAddress({...address, fullName: e.target.value})} className="w-full border border-tea-dark/20 bg-transparent p-3 text-tea-dark focus:outline-none focus:border-tea-dark" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-warm-gray mb-2">Street Address</label>
                  <input required type="text" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="w-full border border-tea-dark/20 bg-transparent p-3 text-tea-dark focus:outline-none focus:border-tea-dark" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-warm-gray mb-2">City</label>
                    <input required type="text" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="w-full border border-tea-dark/20 bg-transparent p-3 text-tea-dark focus:outline-none focus:border-tea-dark" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-warm-gray mb-2">State</label>
                    <input required type="text" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="w-full border border-tea-dark/20 bg-transparent p-3 text-tea-dark focus:outline-none focus:border-tea-dark" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-warm-gray mb-2">ZIP / Postal Code</label>
                  <input required type="text" value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} className="w-full border border-tea-dark/20 bg-transparent p-3 text-tea-dark focus:outline-none focus:border-tea-dark" />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Right Col: Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-cream p-8 border border-tea-dark/10 sticky top-32">
            <h2 className="text-sm uppercase tracking-widest font-semibold text-tea-dark mb-6 border-b border-tea-dark/10 pb-2">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 bg-tea-dark/5 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    <span className="absolute -top-2 -right-2 bg-tea-dark text-cream text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 flex justify-between">
                    <div>
                      <h4 className="font-serif text-tea-dark text-sm leading-tight mb-1">{item.name}</h4>
                      <div className="text-xs text-warm-gray">{item.category}</div>
                    </div>
                    <div className="text-sm font-medium text-tea-dark">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
              
              {cart.length === 0 && (
                <p className="text-sm text-warm-gray italic">Your cart is empty.</p>
              )}
            </div>

            <div className="border-t border-tea-dark/10 pt-4 space-y-2 mb-6">
              <div className="flex justify-between text-sm text-warm-gray">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-warm-gray">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="border-t border-tea-dark/10 pt-4 mb-8 flex justify-between text-tea-dark items-end">
              <span className="text-sm uppercase tracking-widest font-semibold">Total</span>
              <span className="font-serif text-2xl">₹{total.toFixed(2)}</span>
            </div>

            <button 
              form="checkout-form"
              type="submit"
              disabled={placingOrder || cart.length === 0}
              className="w-full bg-tea-dark hover:bg-tea-green text-cream py-4 uppercase tracking-widest text-xs font-semibold transition-colors disabled:opacity-50"
            >
              {placingOrder ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
