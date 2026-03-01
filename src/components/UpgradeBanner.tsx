'use client';

import { motion } from 'framer-motion';
import { Zap, X, ArrowRight, Star } from 'lucide-react';
import UpgradeButton from './UpgradeButton';

interface UpgradeBannerProps {
  onClose?: () => void;
}

export default function UpgradeBanner({ onClose }: UpgradeBannerProps) {
  const features = [
    'No advertisements',
    'Priority processing',
    'Unlimited transcripts',
    'Export to DOCX & PDF',
    'Faster transcription speed',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#E94560]/10 to-[#FF6B6B]/5" />

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#1A1A2E] transition-colors"
        >
          <X className="w-4 h-4 text-[#A0A0B0]" />
        </button>
      )}

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E94560] to-[#FF6B6B] flex items-center justify-center flex-shrink-0">
            <Zap className="w-8 h-8 text-white" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-white">Upgrade to Pro</h3>
              <span className="px-2 py-0.5 text-xs font-medium bg-[#FFB830]/20 text-[#FFB830] rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" />
                Popular
              </span>
            </div>
            <p className="text-[#A0A0B0] mb-4">
              Remove ads, get faster processing, and unlock unlimited transcripts.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {features.map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1.5 text-sm bg-[#1A1A2E] text-[#A0A0B0] rounded-lg"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3">
            <div className="text-left lg:text-right">
              <span className="text-3xl font-bold text-white">$9.99</span>
              <span className="text-[#A0A0B0]">/month</span>
            </div>
            <UpgradeButton />
            <p className="text-xs text-[#A0A0B0]">7-day money-back guarantee</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
