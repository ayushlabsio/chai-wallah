"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/shop/checkout"); // Redirect to checkout or home
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center py-20 px-6">
      <div className="max-w-md w-full bg-cream p-10 border border-tea-dark/10 shadow-xl shadow-tea-dark/5">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-tea-dark mb-2">Welcome Back</h1>
          <p className="text-warm-gray text-sm">Please log in to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold text-tea-dark mb-2" htmlFor="email">
              Email
            </label>
            <input 
              id="email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-b border-tea-dark/20 bg-transparent py-2 text-tea-dark focus:outline-none focus:border-tea-dark transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold text-tea-dark mb-2" htmlFor="password">
              Password
            </label>
            <input 
              id="password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-b border-tea-dark/20 bg-transparent py-2 text-tea-dark focus:outline-none focus:border-tea-dark transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-tea-dark hover:bg-tea-green text-cream py-4 uppercase tracking-widest text-xs font-semibold transition-colors disabled:opacity-50 mt-8"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-warm-gray">
          Don't have an account?{" "}
          <Link href="/signup" className="text-tea-dark font-medium hover:underline">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
