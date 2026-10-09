import React, { useEffect, useRef } from 'react';
import { getAdSenseConfig } from './AdSenseConfig';

interface AdUnitProps {
  slotType: 'home' | 'content' | 'footer';
  customSlotId?: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({
  slotType,
  customSlotId,
  adFormat = 'auto',
  className = '',
}) => {
  const config = getAdSenseConfig();
  const adRef = useRef<HTMLModElement>(null);
  const isPushed = useRef(false);

  const slotId =
    customSlotId || (slotType === 'home' ? config.slotHome : config.slotContent);

  useEffect(() => {
    if (config.isConfigured && adRef.current && !isPushed.current) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        isPushed.current = true;
      } catch (err) {
        // Safe catch for environment where script is blocked by browser ad blocker
        console.warn('Google AdSense initialization notice:', err);
      }
    }
  }, [config.isConfigured]);

  // If live publisher ID is configured
  if (config.isConfigured) {
    return (
      <div
        className={`my-8 flex flex-col items-center justify-center overflow-hidden transition-all ${className}`}
        aria-label="Advertisement"
      >
        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium mb-1">
          Advertisement
        </span>
        <div className="w-full min-h-[100px] flex items-center justify-center bg-slate-50/50 rounded-xl border border-slate-200/40">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client={config.clientId}
            data-ad-slot={slotId}
            data-ad-format={adFormat}
            data-full-width-responsive="true"
          />
        </div>
      </div>
    );
  }

  // Preview & Policy Compliant Placeholder (Reserved Layout Space to prevent Cumulative Layout Shift)
  return (
    <aside
      className={`my-8 flex flex-col items-center justify-center px-4 py-5 rounded-2xl bg-white/70 border border-pink-200/60 shadow-xs max-w-3xl mx-auto w-full transition-all ${className}`}
      aria-label="AdSense Reserved Space"
    >
      <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-1">
        <span>Google AdSense Reserved Placement</span>
        <span aria-hidden="true">·</span>
        <span className="text-pink-600 font-mono text-[11px]">Slot {slotType}</span>
      </div>
      <p className="text-xs text-slate-500 text-center max-w-md">
        Space reserved to prevent layout shift. Connect your approved Google AdSense publisher ID in{' '}
        <code className="text-pink-700 bg-pink-50 px-1 py-0.5 rounded text-[11px]">.env</code> to display live ads.
      </p>
    </aside>
  );
};
