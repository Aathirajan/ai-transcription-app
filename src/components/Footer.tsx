'use client';

import Link from 'next/link';
import { Mic, Twitter, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2A3E] bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E94560] to-[#FF6B6B] flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">
                FreeTranscript<span className="text-[#E94560]">AI</span>
              </span>
            </Link>
            <p className="text-[#A0A0B0] mb-4 max-w-md">
              Generate AI-powered transcripts for free. Supported by ads to keep our service free for everyone.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[#A0A0B0] hover:text-[#E94560] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#A0A0B0] hover:text-[#E94560] transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#A0A0B0] hover:text-[#E94560] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-[#A0A0B0] hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-[#A0A0B0] hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-[#A0A0B0] hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <a href="#" className="text-[#A0A0B0] hover:text-white transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-[#A0A0B0] hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#A0A0B0] hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-[#A0A0B0] hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#A0A0B0] hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2A2A3E] mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#A0A0B0] text-sm">
            © {new Date().getFullYear()} FreeTranscriptAI. All rights reserved.
          </p>
          <p className="text-[#A0A0B0] text-sm">
            Made with ❤️ for content creators
          </p>
        </div>
      </div>
    </footer>
  );
}
