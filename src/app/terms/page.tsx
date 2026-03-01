'use client';

import { motion } from 'framer-motion';
import { FileText, AlertTriangle, CheckCircle, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#E94560]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#00D9A5]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-[#A0A0B0] hover:text-white transition-colors mb-4"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-[#A0A0B0]">Last updated: March 1, 2026</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-invert max-w-none"
        >
          <section className="card p-8 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#E94560]/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#E94560]" />
              </div>
              <h2 className="text-xl font-semibold text-white">1. Acceptance of Terms</h2>
            </div>
            <p className="text-[#A0A0B0] leading-relaxed">
              By accessing and using FreeTranscriptAI (the &quot;Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this Service.
            </p>
          </section>

          <section className="card p-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
            <div className="text-[#A0A0B0] leading-relaxed space-y-4">
              <p>FreeTranscriptAI provides audio and video transcription services, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Transcription of uploaded audio/video files (MP4, MP3, WAV, MOV, M4A)</li>
                <li>Transcription of YouTube videos via URL</li>
                <li>Export of transcripts in various formats (TXT, SRT)</li>
                <li>Pro features for subscribed users</li>
              </ul>
              <p className="mt-4">
                We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice.
              </p>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#00D9A5]/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#00D9A5]" />
              </div>
              <h2 className="text-xl font-semibold text-white">3. User Accounts and Eligibility</h2>
            </div>
            <div className="text-[#A0A0B0] leading-relaxed space-y-4">
              <p>To use our Service, you must:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Be at least 13 years of age</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
              <p className="mt-4">
                You may also use the Service as a guest without creating an account, though some features may be limited.
              </p>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">4. Acceptable Use</h2>
            <div className="text-[#A0A0B0] leading-relaxed space-y-4">
              <p>You agree NOT to use the Service to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Upload or transmit any content that is illegal, harmful, or offensive</li>
                <li>Infringe on intellectual property rights of others</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use the Service for any illegal purpose</li>
                <li>Upload viruses, malware, or other harmful code</li>
                <li>Harass, abuse, or threaten others</li>
                <li>Spam or conduct repetitive requests to overload our servers</li>
              </ul>
              <p className="mt-4">
                Violation of these terms may result in termination of your account and access to the Service.
              </p>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">5. Content and Intellectual Property</h2>
            <div className="text-[#A0A0B0] leading-relaxed space-y-4">
              <h3 className="text-white font-medium">Your Content</h3>
              <p>
                You retain ownership of any audio/video files you upload and the resulting transcripts. You grant us permission to process your files for the purpose of providing transcription services.
              </p>
              <h3 className="text-white font-medium mt-4">Our Content</h3>
              <p>
                The Service itself, including all software, algorithms, design, and content (except for your content), is the intellectual property of FreeTranscriptAI and is protected by copyright and other intellectual property laws.
              </p>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#E94560]/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#E94560]" />
              </div>
              <h2 className="text-xl font-semibold text-white">6. Subscription and Payments</h2>
            </div>
            <div className="text-[#A0A0B0] leading-relaxed space-y-4">
              <h3 className="text-white font-medium">Free Tier</h3>
              <p>
                The free tier allows up to 5 transcriptions per month with limited features. We display advertisements to free users to support the Service.
              </p>
              <h3 className="text-white font-medium mt-4">Pro Subscription</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Monthly subscription: $9.99 USD/month</li>
                <li>Billed automatically through Stripe</li>
                <li>Unlimited transcriptions</li>
                <li>No advertisements</li>
                <li>Priority processing</li>
                <li>Additional export formats (DOCX, PDF)</li>
              </ul>
              <p className="mt-4">
                You can cancel your subscription at any time. Refunds are handled according to our refund policy. Access to Pro features will continue until the end of your billing period.
              </p>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">7. Disclaimers and Limitation of Liability</h2>
            <div className="text-[#A0A0B0] leading-relaxed space-y-4">
              <p>
                <strong>THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND.</strong> We do not guarantee:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>100% accuracy of transcriptions</li>
                <li>Uninterrupted or error-free service</li>
                <li>Availability at all times</li>
              </ul>
              <p className="mt-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE, REGARDLESS OF THE CAUSE OF ACTION.
              </p>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#E94560]/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#E94560]" />
              </div>
              <h2 className="text-xl font-semibold text-white">8. Indemnification</h2>
            </div>
            <p className="text-[#A0A0B0] leading-relaxed">
              You agree to indemnify, defend, and hold harmless FreeTranscriptAI and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, or expenses arising out of your use of the Service, your violation of these Terms, or your violation of any rights of a third party.
            </p>
          </section>

          <section className="card p-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">9. Termination</h2>
            <div className="text-[#A0A0B0] leading-relaxed space-y-4">
              <p>We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violation of these Terms</li>
                <li>Illegal or harmful activities</li>
                <li>Non-payment of subscription fees</li>
                <li>Extended period of inactivity</li>
              </ul>
              <p className="mt-4">
                Upon termination, your right to use the Service immediately ceases. All provisions of these Terms which by their nature should survive termination shall survive.
              </p>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">10. Governing Law</h2>
            <p className="text-[#A0A0B0] leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which FreeTranscriptAI operates, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the courts of that jurisdiction.
            </p>
          </section>

          <section className="card p-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">11. Changes to Terms</h2>
            <p className="text-[#A0A0B0] leading-relaxed">
              We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on this page and updating the &quot;Last updated&quot; date. Your continued use of the Service after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="card p-8">
            <h2 className="text-xl font-semibold text-white mb-4">12. Contact Information</h2>
            <p className="text-[#A0A0B0] leading-relaxed">
              For questions or concerns about these Terms, please contact us at:<br />
              <a href="mailto:legal@freetranscriptai.com" className="text-[#E94560] hover:underline">
                legal@freetranscriptai.com
              </a>
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
