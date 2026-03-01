'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Mic, Zap, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E94560] to-[#FF6B6B] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">
              FreeTranscript<span className="text-[#E94560]">AI</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[#A0A0B0] hover:text-white transition-colors">
              Home
            </Link>
            <Link href="#features" className="text-[#A0A0B0] hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#faq" className="text-[#A0A0B0] hover:text-white transition-colors">
              FAQ
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-[#1A1A2E] animate-pulse" />
            ) : session ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12121A] border border-[#2A2A3E]">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4 text-[#A0A0B0]" />
                  )}
                  <span className="text-sm text-[#A0A0B0]">{session.user?.name}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="p-2 rounded-xl hover:bg-[#1A1A2E] transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-5 h-5 text-[#A0A0B0]" />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/api/auth/signin"
                  className="hidden sm:block px-4 py-2 text-[#A0A0B0] hover:text-white transition-colors"
                >
                  Log in
                </Link>
              </>
            )}
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#E94560] to-[#FF6B6B] text-white font-semibold hover:shadow-lg hover:shadow-[#E94560]/30 transition-all hover:-translate-y-0.5">
              <Zap className="w-4 h-4" />
              <span>Get Pro</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
