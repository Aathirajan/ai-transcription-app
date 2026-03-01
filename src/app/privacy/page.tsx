'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Mail, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
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
            Privacy Policy
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
                <Shield className="w-5 h-5 text-[#E94560]" />
              </div>
              <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
            </div>
            <p className="text-[#A0A0B0] leading-relaxed">
              FreeTranscriptAI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our transcription service. By using FreeTranscriptAI, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="card p-8 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#00D9A5]/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#00D9A5]" />
              </div>
              <h2 className="text-xl font-semibold text-white">2. Information We Collect</h2>
            </div>
            <div className="text-[#A0A0B0] leading-relaxed space-y-4">
              <h3 className="text-white font-medium">Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Account information (when you sign up): name, email address</li>
                <li>Google account information (if using Google OAuth)</li>
                <li>Payment information (processed securely through Stripe)</li>
              </ul>
              <h3 className="text-white font-medium mt-4">Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Device information: browser type, operating system, device identifiers</li>
                <li>Usage data: pages visited, features used, session duration</li>
                <li>IP address and approximate location</li>
              </ul>
              <h3 className="text-white font-medium mt-4">Content You Upload</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Audio and video files you upload for transcription</li>
                <li>YouTube URLs you provide</li>
                <li>Transcription results (stored securely for your access)</li>
              </ul>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#E94560]/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#E94560]" />
              </div>
              <h2 className="text-xl font-semibold text-white">3. How We Use Your Information</h2>
            </div>
            <div className="text-[#A0A0B0] leading-relaxed space-y-3">
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our transcription services</li>
                <li>Process your payments and manage subscriptions</li>
                <li>Improve and personalize your experience</li>
                <li>Send you service-related communications</li>
                <li>Detect and prevent fraud, abuse, and security issues</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">4. Data Storage and Security</h2>
            <div className="text-[#A0A0B0] leading-relaxed space-y-4">
              <p>Your data is stored on secure servers with industry-standard encryption. We implement appropriate technical and organizational measures to protect your personal information, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SSL/TLS encryption for data in transit</li>
                <li>Encrypted storage for sensitive data</li>
                <li>Regular security audits and monitoring</li>
                <li>Access controls and authentication requirements</li>
              </ul>
              <p className="mt-4">
                Audio and video files are processed in memory and are not permanently stored on our servers after transcription is complete. Transcription results are stored securely and can be accessed by you at any time through your account.
              </p>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">5. Third-Party Services</h2>
            <div className="text-[#A0A0B0] leading-relaxed space-y-4">
              <p>We use third-party services to operate our platform:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Deepgram</strong> - Audio transcription services</li>
                <li><strong>Stripe</strong> - Payment processing</li>
                <li><strong>Google</strong> - OAuth authentication</li>
                <li><strong>YouTube (via Invidious)</strong> - Audio extraction for YouTube videos</li>
                <li><strong>Google AdSense</strong> - Advertising (for free tier users)</li>
              </ul>
              <p className="mt-4">
                Each of these providers has their own privacy policies governing their use of your data. We encourage you to review their privacy policies.
              </p>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">6. Cookies and Tracking Technologies</h2>
            <div className="text-[#A0A0B0] leading-relaxed space-y-4">
              <p>We use cookies and similar tracking technologies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Keep you logged in</li>
                <li>Remember your preferences</li>
                <li>Analyze site traffic and usage</li>
                <li>Personalize content and advertisements</li>
              </ul>
              <p className="mt-4">
                You can control cookies through your browser settings. For more details, see our Cookie Policy.
              </p>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">7. Your Rights</h2>
            <div className="text-[#A0A0B0] leading-relaxed space-y-4">
              <p>Under applicable data protection laws, you have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate personal data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at privacy@freetranscriptai.com.
              </p>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-[#A0A0B0] leading-relaxed">
              Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us so we can delete such information.
            </p>
          </section>

          <section className="card p-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">9. Changes to This Policy</h2>
            <p className="text-[#A0A0B0] leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#E94560]/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#E94560]" />
              </div>
              <h2 className="text-xl font-semibold text-white">10. Contact Us</h2>
            </div>
            <p className="text-[#A0A0B0] leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:<br />
              <a href="mailto:privacy@freetranscriptai.com" className="text-[#E94560] hover:underline">
                privacy@freetranscriptai.com
              </a>
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
