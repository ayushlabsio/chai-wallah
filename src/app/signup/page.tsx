"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        email,
        mobileNumber,
        user_type: "user", // Default to normal user
        createdAt: new Date().toISOString(),
      });

      router.push("/shop/checkout");
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center py-20 px-6">
      <div className="max-w-md w-full bg-cream p-10 border border-tea-dark/10 shadow-xl shadow-tea-dark/5">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-tea-dark mb-2">Create Account</h1>
          <p className="text-warm-gray text-sm">Join us for a mindful tea experience</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold text-tea-dark mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input 
              id="fullName"
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full border-b border-tea-dark/20 bg-transparent py-2 text-tea-dark focus:outline-none focus:border-tea-dark transition-colors"
              placeholder="John Doe"
            />
          </div>

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
            <label className="block text-xs uppercase tracking-widest font-semibold text-tea-dark mb-2" htmlFor="mobileNumber">
              Mobile Number
            </label>
            <input 
              id="mobileNumber"
              type="tel" 
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              className="w-full border-b border-tea-dark/20 bg-transparent py-2 text-tea-dark focus:outline-none focus:border-tea-dark transition-colors"
              placeholder="+1 234 567 890"
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
              minLength={6}
              className="w-full border-b border-tea-dark/20 bg-transparent py-2 text-tea-dark focus:outline-none focus:border-tea-dark transition-colors"
              placeholder="At least 6 characters"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-tea-dark hover:bg-tea-green text-cream py-4 uppercase tracking-widest text-xs font-semibold transition-colors disabled:opacity-50 mt-8"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-warm-gray">
          Already have an account?{" "}
          <Link href="/login" className="text-tea-dark font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
