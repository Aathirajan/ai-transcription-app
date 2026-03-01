'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

interface UpgradeButtonProps {
  priceId?: string;
  className?: string;
}

export default function UpgradeButton({ priceId, className = '' }: UpgradeButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to start checkout');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className={`py-3 px-6 rounded-xl bg-gradient-to-r from-[#E94560] to-[#FF6B6B] text-white font-semibold hover:shadow-lg hover:shadow-[#E94560]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? 'Processing...' : 'Upgrade to Pro - $9.99/mo'}
    </button>
  );
}
