'use client';

import { motion } from 'framer-motion';
import { Zap, X, Star } from 'lucide-react';
import UpgradeButton from './UpgradeButton';

interface UpgradeBannerProps {
  onClose?: () => void;
}

const FEATURES = [
  'No advertisements',
  'Priority processing',
  'Unlimited transcripts',
  'Export to DOCX & PDF',
  'Faster speed',
];

export default function UpgradeBanner({ onClose }: UpgradeBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-elevated overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-light)]/50 to-transparent opacity-50" />

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all z-10"
          aria-label="Close banner"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0">
            <Zap className="w-7 h-7 text-white" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="heading-md text-[var(--text-primary)]">Upgrade to Pro</h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-[var(--warning-bg)] text-[var(--warning)] rounded-full">
                <Star className="w-3 h-3 fill-current" />
                Popular
              </span>
            </div>
            <p className="body-md mb-4">
              Remove ads, get faster processing, and unlock unlimited transcripts.
            </p>

            <div className="flex flex-wrap gap-2">
              {FEATURES.map((feature) => (
                <span
                  key={feature}
                  className="badge"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3 lg:pl-6">
            <div className="text-left lg:text-right">
              <span className="text-3xl font-bold text-[var(--text-primary)]">$9.99</span>
              <span className="text-[var(--text-tertiary)]">/month</span>
            </div>
            <UpgradeButton className="w-full lg:w-auto" />
            <p className="text-xs text-[var(--text-muted)]">7-day money-back guarantee</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}