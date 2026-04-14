"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Link from "next/link";

interface UserProfile {
  fullName: string;
  email: string;
  mobileNumber: string;
  user_type: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [user, authLoading, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-tea-dark border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-paper py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-tea-dark/10 pb-8 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-tea-green mb-4 block">Dashboard</span>
            <h1 className="font-serif text-5xl md:text-6xl text-tea-dark">Profile</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="text-xs uppercase tracking-widest font-semibold text-warm-gray hover:text-red-500 transition-colors border-b border-transparent hover:border-red-500/50 pb-1"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-xs uppercase tracking-widest font-bold text-tea-dark opacity-40 mb-8">Personal Details</h2>
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-warm-gray mb-1">Full Name</label>
                  <p className="text-xl font-serif text-tea-dark">{profile?.fullName || "—"}</p>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-warm-gray mb-1">Email Address</label>
                  <p className="text-xl font-serif text-tea-dark">{profile?.email || user.email}</p>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-warm-gray mb-1">Mobile Number</label>
                  <p className="text-xl font-serif text-tea-dark">{profile?.mobileNumber || "—"}</p>
                </div>
              </div>
            </section>

            <section className="pt-8 border-t border-tea-dark/5">
              <h2 className="text-xs uppercase tracking-widest font-bold text-tea-dark opacity-40 mb-8">Account Information</h2>
              <div className="flex flex-wrap gap-12">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-warm-gray mb-1">Account Type</label>
                  <span className="px-3 py-1 rounded-full bg-tea-dark/5 text-tea-dark text-[10px] uppercase tracking-widest font-bold inline-block mt-1">
                    {profile?.user_type || "User"}
                  </span>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-warm-gray mb-1">Member Since</label>
                  <p className="text-sm font-medium text-tea-dark mt-1">
                    {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }) : "—"}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Quick Actions / Sidebar */}
          <div className="space-y-6">
            <div className="bg-cream p-8 border border-tea-dark/5 shadow-sm">
              <h3 className="text-xs uppercase tracking-widest font-bold text-tea-dark mb-6">Quick Links</h3>
              <nav className="flex flex-col gap-4">
                <Link href="/shop/products" className="text-sm text-warm-gray hover:text-tea-dark transition-colors flex items-center justify-between group">
                  Back to Shop
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
                <Link href="/shop/checkout" className="text-sm text-warm-gray hover:text-tea-dark transition-colors flex items-center justify-between group">
                  My Cart
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
