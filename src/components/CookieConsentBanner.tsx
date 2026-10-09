import React, { useState, useEffect } from 'react';
import { CookiePreferences } from '../types';
import { ShieldCheck, X } from 'lucide-react';

interface CookieConsentBannerProps {
  onConsentChange: (preferences: CookiePreferences) => void;
  onNavigateToPrivacy: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onConsentChange,
  onNavigateToPrivacy,
}) => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [adConsent, setAdConsent] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('fluffy_cookie_preferences');
      if (!stored) {
        // Small delay so user sees page smoothly without layout shock
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const savePreferences = (essential: boolean, analytics: boolean, advertising: boolean) => {
    const prefs: CookiePreferences = {
      essential,
      analytics,
      advertising,
      hasConsented: true,
    };
    try {
      localStorage.setItem('fluffy_cookie_preferences', JSON.stringify(prefs));
    } catch {}
    onConsentChange(prefs);
    setVisible(false);
  };

  const handleAcceptAll = () => {
    savePreferences(true, true, true);
  };

  const handleEssentialOnly = () => {
    savePreferences(true, false, false);
  };

  const handleSaveCustom = () => {
    savePreferences(true, analyticsConsent, adConsent);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t border-rose-200/80 shadow-2xl animate-fadeIn"
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1 pr-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-rose-500" />
            <span>Your Privacy &amp; Cookie Choices 🍪</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            We use essential cookies to remember your high scores and game settings. With your consent, we and advertising partners like Google AdSense also use cookies to deliver relevant advertising and analyze traffic. Read our{' '}
            <button
              onClick={onNavigateToPrivacy}
              className="text-rose-600 font-semibold underline hover:text-rose-700 cursor-pointer"
            >
              Privacy Policy
            </button>.
          </p>

          {showDetails && (
            <div className="pt-2 mt-2 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-700">
              <label className="flex items-center gap-1.5 opacity-75 cursor-not-allowed">
                <input type="checkbox" checked disabled className="rounded text-rose-600" />
                <span>Essential (Always Active)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={adConsent}
                  onChange={(e) => setAdConsent(e.target.checked)}
                  className="rounded text-rose-600 cursor-pointer"
                />
                <span>Advertising &amp; Personalization</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsConsent}
                  onChange={(e) => setAnalyticsConsent(e.target.checked)}
                  className="rounded text-rose-600 cursor-pointer"
                />
                <span>Performance &amp; Diagnostics</span>
              </label>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
          {showDetails ? (
            <button
              onClick={handleSaveCustom}
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Save Preferences
            </button>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium underline cursor-pointer"
            >
              Customize
            </button>
          )}

          <button
            onClick={handleEssentialOnly}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl transition-colors cursor-pointer"
          >
            Essential Only
          </button>

          <button
            onClick={handleAcceptAll}
            className="px-4 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};
