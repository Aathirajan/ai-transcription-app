'use client';

import { motion } from 'framer-motion';
import { FileAudio, Link2, Zap, Shield, Clock, Globe, Star, CheckCircle, ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import UpgradeButton from '@/components/UpgradeButton';
import AdSense from '@/components/AdSense';

const FEATURES = [
  {
    icon: FileAudio,
    title: 'Multiple Format Support',
    description: 'Upload MP4, MP3, WAV, MOV, or M4A files. We support all major audio and video formats.',
  },
  {
    icon: Link2,
    title: 'YouTube Integration',
    description: 'Simply paste a YouTube link and we\'ll extract and transcribe the audio automatically.',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    description: 'Get your transcripts in minutes, not hours. Our AI works quickly to deliver results.',
  },
  {
    icon: Globe,
    title: 'Multi-language',
    description: 'Support for multiple languages and accents. Accurate transcription for diverse content.',
  },
];

const TRUST_BADGES = [
  { icon: Shield, label: 'No Credit Card Required' },
  { icon: Clock, label: 'Instant Processing' },
  { icon: Zap, label: '99% Accuracy' },
];

const FAQ = [
  {
    question: 'Is it really free?',
    answer: 'Yes! Our basic transcription service is 100% free. We show ads during processing to support our service. You can upgrade to Pro to remove ads and get faster processing.',
  },
  {
    question: 'What file formats do you support?',
    answer: 'We support MP4, MP3, WAV, MOV, and M4A formats. Maximum file size is 500MB per upload.',
  },
  {
    question: 'Can I transcribe YouTube videos?',
    answer: 'Absolutely! Just paste any YouTube URL and we\'ll extract the audio and transcribe it for you.',
  },
  {
    question: 'How accurate is the transcription?',
    answer: 'Our AI-powered transcription achieves 99% accuracy for clear audio. Accuracy may vary based on audio quality and background noise.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No! You can start transcribing immediately without registration. Create an account to save your transcripts and access them later.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Trust Badges */}
      <section className="py-12 border-y border-[#2A2A3E] bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
            {TRUST_BADGES.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#12121A] flex items-center justify-center">
                  <badge.icon className="w-5 h-5 text-[#E94560]" />
                </div>
                <span className="text-[#A0A0B0]">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need to <span className="gradient-text">Transcribe</span>
            </h2>
            <p className="text-[#A0A0B0] max-w-2xl mx-auto">
              Powerful features to make transcription easy, fast, and accessible for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E94560]/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#E94560]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-[#A0A0B0]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h2>
            <p className="text-[#A0A0B0] max-w-2xl mx-auto">
              Start free, upgrade when you need more. No hidden fees, no surprises.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
              <p className="text-[#A0A0B0] mb-6">Perfect for occasional use</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">₹0</span>
                <span className="text-[#A0A0B0]">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['5 transcriptions/month', 'Ad-supported', 'Basic accuracy', 'TXT & SRT export'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[#A0A0B0]">
                    <CheckCircle className="w-4 h-4 text-[#00D9A5]" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border border-[#2A2A3E] text-white font-medium hover:border-[#E94560] transition-colors">
                Get Started
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="card p-8 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#FFB830]/20 text-[#FFB830] text-sm font-medium flex items-center gap-1">
                <Star className="w-3 h-3" />
                Popular
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
              <p className="text-[#A0A0B0] mb-6">For power users</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$9.99</span>
                <span className="text-[#A0A0B0]">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Unlimited transcriptions', 'No advertisements', 'Priority processing', 'DOCX & PDF export', 'Faster speed', 'Save transcripts'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[#A0A0B0]">
                    <CheckCircle className="w-4 h-4 text-[#00D9A5]" />
                    {item}
                  </li>
                ))}
              </ul>
              <UpgradeButton />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-[#0A0A0F]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {FAQ.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{item.question}</h3>
                <p className="text-[#A0A0B0]">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0A0F] to-[#12121A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to <span className="gradient-text">Transcribe</span>?
            </h2>
            <p className="text-[#A0A0B0] mb-8 max-w-xl mx-auto">
              Start converting your audio and video to text for free. No credit card required.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#E94560] to-[#FF6B6B] text-white font-semibold hover:shadow-lg hover:shadow-[#E94560]/30 transition-all"
            >
              Start Transcribing Free
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Ad Section */}
      <section className="py-8 bg-[#0A0A0F] border-t border-[#2A2A3E]">
        <div className="max-w-4xl mx-auto px-4">
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
