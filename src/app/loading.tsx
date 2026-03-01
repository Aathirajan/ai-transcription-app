'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F]">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-[#E94560] animate-spin mx-auto mb-4" />
        <p className="text-[#A0A0B0]">Loading...</p>
      </div>
    </div>
  );
}
