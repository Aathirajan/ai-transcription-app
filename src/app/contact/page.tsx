'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, Clock, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setLoading(false);
    setSubmitted(true);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'For general inquiries and support',
      contact: 'support@freetranscriptai.com',
      color: 'bg-[#E94560]/10',
      iconColor: 'text-[#E94560]',
    },
    {
      icon: MessageSquare,
      title: 'Billing Questions',
      description: 'For payment and subscription issues',
      contact: 'billing@freetranscriptai.com',
      color: 'bg-[#00D9A5]/10',
      iconColor: 'text-[#00D9A5]',
    },
    {
      icon: Clock,
      title: 'Response Time',
      description: 'We typically respond within 24 hours',
      contact: 'Mon-Fri, 9 AM - 6 PM UTC',
      color: 'bg-[#FFB830]/10',
      iconColor: 'text-[#FFB830]',
    },
  ];

  const subjects = [
    'General Inquiry',
    'Technical Support',
    'Billing Question',
    'Feature Request',
    'Bug Report',
    'Partnership',
    'Press',
    'Other',
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#E94560]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#00D9A5]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#A0A0B0] hover:text-white transition-colors mb-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-[#A0A0B0] max-w-2xl mx-auto">
            Have questions or need help? We&apos;re here to assist you. Fill out the form below or reach us directly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {contactMethods.map((method, index) => (
              <div key={index} className="card p-6">
                <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center mb-4`}>
                  <method.icon className={`w-6 h-6 ${method.iconColor}`} />
                </div>
                <h3 className="text-white font-semibold mb-1">{method.title}</h3>
                <p className="text-[#A0A0B0] text-sm mb-2">{method.description}</p>
                <p className={`text-sm font-medium ${method.iconColor}`}>
                  {method.contact.includes('@') ? (
                    <a href={`mailto:${method.contact}`} className="hover:underline">
                      {method.contact}
                    </a>
                  ) : (
                    method.contact
                  )}
                </p>
              </div>
            ))}

            {/* FAQ Link */}
            <div className="card p-6 bg-gradient-to-br from-[#12121A] to-[#1a1a2e]">
              <h3 className="text-white font-semibold mb-2">Need Quick Help?</h3>
              <p className="text-[#A0A0B0] text-sm mb-4">
                Check our FAQ section for answers to common questions.
              </p>
              <a
                href="/#faq"
                className="inline-flex items-center gap-2 text-[#E94560] hover:underline text-sm font-medium"
              >
                View FAQ →
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#00D9A5]/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-[#00D9A5]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                  <p className="text-[#A0A0B0] mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-6 py-3 rounded-xl bg-[#E94560] text-white font-medium hover:bg-[#d63d56] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-[#2A2A3E] text-white placeholder-[#6B6B7B] focus:outline-none focus:border-[#E94560] transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-[#2A2A3E] text-white placeholder-[#6B6B7B] focus:outline-none focus:border-[#E94560] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-[#2A2A3E] text-white focus:outline-none focus:border-[#E94560] transition-colors"
                    >
                      <option value="" className="bg-[#0A0A0F]">Select a subject</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject} className="bg-[#0A0A0F]">
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-[#2A2A3E] text-white placeholder-[#6B6B7B] focus:outline-none focus:border-[#E94560] transition-colors resize-none"
                      placeholder="Describe your question or issue in detail..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#E94560] to-[#FF6B6B] text-white font-semibold hover:shadow-lg hover:shadow-[#E94560]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card p-4">
                <h4 className="text-white font-medium mb-2">Response Time</h4>
                <p className="text-[#A0A0B0] text-sm">
                  We aim to respond to all inquiries within 24 hours during business days.
                </p>
              </div>
              <div className="card p-4">
                <h4 className="text-white font-medium mb-2">Emergency Support</h4>
                <p className="text-[#A0A0B0] text-sm">
                  For urgent technical issues, please include &quot;URGENT&quot; in the subject line.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
