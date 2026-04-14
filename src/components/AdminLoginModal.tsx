"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface AdminLoginModalProps {
  onLogin: (success: boolean) => void;
}

export function AdminLoginModal({ onLogin }: AdminLoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      onLogin(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Heavy Blur Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-1000" />

      {/* macOS Style Modal */}
      <div className={`relative w-full max-w-[340px] bg-white/10 backdrop-blur-2xl rounded-[36px] p-8 shadow-2xl border border-white/20 transition-all duration-300 ${error ? 'animate-shake' : ''}`}>
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/30 shadow-2xl mb-6 bg-white/10">
            <Image
              src="/admin-avatar.png"
              alt="Admin"
              width={200}
              height={200}
              className="object-cover scale-150"
            />
          </div>

          <h2 className="text-white text-xl font-medium mb-8 tracking-wide">Administrator</h2>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/40 outline-none focus:bg-white/20 transition-all text-sm backdrop-blur-md"
                autoFocus
              />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/40 outline-none focus:bg-white/20 transition-all text-sm pr-12 backdrop-blur-md"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all flex items-center justify-center"
                aria-label="Submit"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </form>


        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-10px); }
          80% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
}
