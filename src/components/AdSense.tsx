'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

export default function AdSense({
  adSlot,
  adFormat = 'auto',
  className = ''
}: AdSenseProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const existingScript = document.querySelector('script[data-adsbygoogle]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX'}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.setAttribute('data-adsbygoogle', 'true');
      document.head.appendChild(script);
    }

    // Initialize ad
    try {
      ((window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || []).push({});
    } catch (e) {
      // Ignore initialization errors
    }
  }, []);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX';

  if (!process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID) {
    return null; // Don't render if not configured
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: 'block', minHeight: '90px' }}
      data-ad-client={clientId}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
}
