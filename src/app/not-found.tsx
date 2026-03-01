import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0A0A0F]">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#1A1A2E] flex items-center justify-center">
          <Search className="w-12 h-12 text-[#E94560]" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-2">404</h1>
        <h2 className="text-xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-[#A0A0B0] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#E94560] to-[#FF6B6B] text-white font-medium hover:shadow-lg hover:shadow-[#E94560]/30 transition-all"
        >
          <Home className="w-4 h-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
