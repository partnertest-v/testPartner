import React, { useEffect } from 'react';
import { getAdSenseConfig } from './AdSenseConfig';

interface AdSenseScriptProps {
  advertisingConsent?: boolean;
}

export const AdSenseScript: React.FC<AdSenseScriptProps> = ({ advertisingConsent = true }) => {
  useEffect(() => {
    const config = getAdSenseConfig();

    // Only inject official script if valid publisher ID is supplied and user has consented
    if (!config.isConfigured || !advertisingConsent) {
      return;
    }

    const scriptId = 'google-adsense-script';
    if (document.getElementById(scriptId)) {
      return; // Already loaded once
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.clientId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';

    document.head.appendChild(script);

    return () => {
      // Don't unmount to avoid re-fetching
    };
  }, [advertisingConsent]);

  return null;
};
