'use client';

import { motion } from 'framer-motion';
import { FileAudio, Link2, Zap, Shield, Clock, Globe, ArrowRight, Check, Star } from 'lucide-react';
import Hero from '@/components/Hero';
import UpgradeButton from '@/components/UpgradeButton';
import AdSense from '@/components/AdSense';

const FEATURES = [
  {
    icon: FileAudio,
    title: 'Multiple formats',
    description: 'Upload MP4, MP3, WAV, MOV, or M4A files up to 500MB.',
  },
  {
    icon: Link2,
    title: 'YouTube support',
    description: 'Paste any YouTube link and we&apos;ll extract and transcribe the audio.',
  },
  {
    icon: Zap,
    title: 'Instant results',
    description: 'Get accurate transcripts in minutes with AI-powered processing.',
  },
  {
    icon: Globe,
    title: 'Multi-language',
    description: 'Support for multiple languages and accents for global content.',
  },
];

const TRUST_POINTS = [
  { label: 'No signup required', icon: Shield },
  { label: 'Instant processing', icon: Zap },
  { label: '99% accuracy', icon: Clock },
];

const PRICING_FREE = [
  '5 transcriptions/month',
  'Ad-supported',
  'Basic accuracy',
  'TXT & SRT export',
];

const PRICING_PRO = [
  'Unlimited transcriptions',
  'No advertisements',
  'Priority processing',
  'DOCX & PDF export',
  'Faster speed',
  'Save transcripts',
];

const FAQ_ITEMS = [
  {
    question: 'Is it really free?',
    answer: 'Yes! Our basic transcription service is 100% free, supported by ads during processing. Upgrade to Pro for an ad-free experience with additional features.',
  },
  {
    question: 'What file formats do you support?',
    answer: 'We support MP4, MP3, WAV, MOV, and M4A formats. Maximum file size is 500MB per upload.',
  },
  {
    question: 'Can I transcribe YouTube videos?',
    answer: 'Absolutely! Just paste any YouTube URL and we&apos;ll extract the audio and transcribe it for you automatically.',
  },
  {
    question: 'How accurate is the transcription?',
    answer: 'Our AI-powered transcription achieves 99% accuracy for clear audio. Results may vary based on audio quality and background noise.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No! You can start transcribing immediately without registration. Create an account to save transcripts and access premium features.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Trust Badges */}
      <section className="py-12 border-y border-[var(--border-light)] bg-[var(--bg-secondary)]">
        <div className="container-full">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {TRUST_POINTS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-light)] flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[var(--accent-primary)]" />
                </div>
                <span className="text-[var(--text-secondary)] font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="display-md text-[var(--text-primary)] mb-4">
              Everything you need to <span className="italic text-[var(--accent-primary)]">transcribe</span>
            </h2>
            <p className="body-lg max-w-2xl mx-auto">
              Powerful features designed for creators, podcasters, and professionals who need reliable transcription.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-interactive p-6 md:p-8"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-[var(--accent-primary)]" />
                  </div>
                  <div>
                    <h3 className="heading-md text-[var(--text-primary)] mb-2">{feature.title}</h3>
                    <p className="body-md">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-28 bg-[var(--bg-secondary)]">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="display-md text-[var(--text-primary)] mb-4">
              Simple, <span className="italic text-[var(--accent-primary)]">transparent</span> pricing
            </h2>
            <p className="body-lg max-w-2xl mx-auto">
              Start free, upgrade when you need more. No hidden fees, no surprises.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="mb-6">
                <h3 className="heading-md text-[var(--text-primary)] mb-2">Free</h3>
                <p className="text-[var(--text-tertiary)]">Perfect for occasional use</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold text-[var(--text-primary)]">$0</span>
                <span className="text-[var(--text-tertiary)]">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {PRICING_FREE.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[var(--success-bg)] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[var(--success)]" />
                    </div>
                    <span className="text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="btn btn-secondary w-full">
                Get Started
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="card-elevated p-8 relative"
            >
              <div className="absolute -top-3 right-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-primary)] text-white text-sm font-medium">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  Popular
                </span>
              </div>
              <div className="mb-6">
                <h3 className="heading-md text-[var(--text-primary)] mb-2">Pro</h3>
                <p className="text-[var(--text-tertiary)]">For power users and professionals</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold text-[var(--text-primary)]">$9.99</span>
                <span className="text-[var(--text-tertiary)]">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {PRICING_PRO.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[var(--success-bg)] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[var(--success)]" />
                    </div>
                    <span className="text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
              <UpgradeButton />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-28">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="display-md text-[var(--text-primary)] mb-4">
              Frequently asked <span className="italic text-[var(--accent-primary)]">questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <h3 className="heading-md text-[var(--text-primary)] mb-3">{item.question}</h3>
                <p className="body-md">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-[var(--bg-secondary)]">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="display-md text-[var(--text-primary)] mb-6">
              Ready to <span className="italic text-[var(--accent-primary)]">start</span>?
            </h2>
            <p className="body-lg max-w-lg mx-auto mb-8">
              Transform your audio and video into accurate text transcripts — completely free.
            </p>
            <a
              href="/"
              className="btn btn-primary btn-lg inline-flex items-center gap-2"
            >
              Start Transcribing Free
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Ad Section */}
      <section className="py-8 border-t border-[var(--border-light)]">
        <div className="container-wide">
          <AdSense
            adSlot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_AD_SLOT || '1234567890'}
            adFormat="horizontal"
            className="mx-auto"
          />
        </div>
      </section>
    </div>
  );
}