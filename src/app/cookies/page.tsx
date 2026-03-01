'use client';

import { motion } from 'framer-motion';
import { Cookie, Settings, Eye, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CookiePolicy() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowCookieBanner(true);
    } else {
      const parsed = JSON.parse(consent);
      setPreferences(parsed);
    }
  }, []);

  const savePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowCookieBanner(false);
  };

  const acceptAll = () => {
    const fullConsent = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem('cookieConsent', JSON.stringify(fullConsent));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setPreferences(fullConsent);
    setShowCookieBanner(false);
  };

  const rejectNonEssential = () => {
    const minimalConsent = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem('cookieConsent', JSON.stringify(minimalConsent));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setPreferences(minimalConsent);
    setShowCookieBanner(false);
  };

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
            Cookie Policy
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
                <Cookie className="w-5 h-5 text-[#E94560]" />
              </div>
              <h2 className="text-xl font-semibold text-white">1. What Are Cookies</h2>
            </div>
            <p className="text-[#A0A0B0] leading-relaxed">
              Cookies are small text files that are stored on your device when you visit websites. They help the website remember your preferences and improve your browsing experience. Cookies can be &quot;persistent&quot; (remain on your device until you delete them) or &quot;session&quot; (deleted when you close your browser).
            </p>
          </section>

          <section className="card p-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">2. How We Use Cookies</h2>
            <div className="text-[#A0A0B0] leading-relaxed space-y-4">
              <p>We use cookies for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential/Necessary</strong> - Required for the Service to function properly</li>
                <li><strong>Functional</strong> - To remember your preferences and settings</li>
                <li><strong>Analytics</strong> - To understand how visitors use our Service</li>
                <li><strong>Marketing</strong> - To deliver relevant advertisements (via third parties)</li>
              </ul>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#00D9A5]/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-[#00D9A5]" />
              </div>
              <h2 className="text-xl font-semibold text-white">3. Types of Cookies We Use</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-medium mb-2">Essential Cookies</h3>
                <p className="text-[#A0A0B0] leading-relaxed text-sm">
                  These cookies are necessary for the website to function. They enable basic features like page navigation, secure areas access, and remembering your login state. The website cannot function properly without these cookies.
                </p>
                <div className="mt-2 text-sm text-[#00D9A5]">Always Active</div>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Analytics Cookies</h3>
                <p className="text-[#A0A0B0] leading-relaxed text-sm">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the site&apos;s performance and user experience.
                </p>
                <div className="mt-2 text-sm text-[#A0A0B0]">
                  Status: {preferences.analytics ? 'Active' : 'Inactive'}
                </div>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Marketing Cookies</h3>
                <p className="text-[#A0A0B0] leading-relaxed text-sm">
                  These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user. Our advertising partners may use these to build a profile of your interests.
                </p>
                <div className="mt-2 text-sm text-[#A0A0B0]">
                  Status: {preferences.marketing ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">4. Third-Party Cookies</h2>
            <div className="text-[#A0A0B0] leading-relaxed space-y-4">
              <p>Some cookies are placed by third-party services that appear on our pages:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Google Analytics</strong> - Website analytics and performance monitoring</li>
                <li><strong>Google AdSense</strong> - Contextual advertising (for free tier users)</li>
                <li><strong>Stripe</strong> - Payment processing and fraud prevention</li>
              </ul>
              <p className="mt-4">
                We do not control these third-party cookies. Please refer to the respective third-party privacy policies for more information about their cookie practices.
              </p>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#E94560]/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#E94560]" />
              </div>
              <h2 className="text-xl font-semibold text-white">5. Managing Your Cookie Preferences</h2>
            </div>
            <div className="text-[#A0A0B0] leading-relaxed space-y-4">
              <p>You have the right to decide whether to accept or reject cookies. You can:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Click &quot;Cookie Settings&quot; in our cookie banner to customize preferences</li>
                <li>Use your browser settings to block or delete cookies</li>
                <li>Opt-out of Google Analytics using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#E94560] hover:underline">Google Analytics Opt-out</a></li>
                <li>Opt-out of targeted advertising using <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-[#E94560] hover:underline">About Ads</a></li>
              </ul>
              <div className="mt-6 p-4 bg-[#12121A] rounded-lg border border-[#2A2A3E]">
                <h4 className="text-white font-medium mb-3">Update Your Preferences</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={preferences.necessary} disabled className="w-4 h-4 rounded accent-[#00D9A5]" />
                    <span className="text-[#A0A0B0]">Necessary (required)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#E94560]"
                    />
                    <span className="text-[#A0A0B0]">Analytics</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#E94560]"
                    />
                    <span className="text-[#A0A0B0]">Marketing</span>
                  </label>
                  <button
                    onClick={savePreferences}
                    className="mt-2 px-4 py-2 bg-[#E94560] text-white rounded-lg hover:bg-[#d63d56] transition-colors text-sm"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">6. Cookie Duration</h2>
            <div className="text-[#A0A0B0] leading-relaxed space-y-4">
              <p>Cookies we use have different expiration periods:</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2A2A3E]">
                    <th className="text-left py-2 text-white">Cookie Type</th>
                    <th className="text-left py-2 text-white">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#2A2A3E]">
                    <td className="py-2">Session</td>
                    <td className="py-2">Until browser closes</td>
                  </tr>
                  <tr className="border-b border-[#2A2A3E]">
                    <td className="py-2">Authentication</td>
                    <td className="py-2">30 days</td>
                  </tr>
                  <tr className="border-b border-[#2A2A3E]">
                    <td className="py-2">Preferences</td>
                    <td className="py-2">1 year</td>
                  </tr>
                  <tr>
                    <td className="py-2">Analytics</td>
                    <td className="py-2">2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="card p-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">7. Updates to This Policy</h2>
            <p className="text-[#A0A0B0] leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. We will post any changes on this page and update the &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="card p-8">
            <h2 className="text-xl font-semibold text-white mb-4">8. Contact Us</h2>
            <p className="text-[#A0A0B0] leading-relaxed">
              If you have questions about our use of cookies, please contact us at:<br />
              <a href="mailto:privacy@freetranscriptai.com" className="text-[#E94560] hover:underline">
                privacy@freetranscriptai.com
              </a>
            </p>
          </section>
        </motion.div>
      </div>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#12121A] border-t border-[#2A2A3E]">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Cookie className="w-5 h-5 text-[#E94560]" />
                <span className="text-white font-medium">Cookie Settings</span>
              </div>
              <p className="text-[#A0A0B0] text-sm">
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={rejectNonEssential}
                className="px-4 py-2 rounded-lg border border-[#2A2A3E] text-[#A0A0B0] hover:text-white hover:border-[#E94560] transition-colors text-sm"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={savePreferences}
                className="px-4 py-2 rounded-lg border border-[#2A2A3E] text-white hover:border-[#E94560] transition-colors text-sm"
              >
                Customize
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 rounded-lg bg-[#E94560] text-white hover:bg-[#d63d56] transition-colors text-sm"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
