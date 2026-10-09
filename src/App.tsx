/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { PageId, CookiePreferences } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingHeartsBg } from './components/illustrations/FloatingHeartsBg';
import { LovePrankHero } from './components/prank/LovePrankHero';
import { CompatibilityQuiz } from './components/experiences/CompatibilityQuiz';
import { PersonalityQuiz } from './components/experiences/PersonalityQuiz';
import { FriendzoneQuiz } from './components/experiences/FriendzoneQuiz';
import { ComplimentGenerator } from './components/experiences/ComplimentGenerator';
import { DailyMessageGenerator } from './components/experiences/DailyMessageGenerator';
import { HeartCatcherGame } from './components/experiences/HeartCatcherGame';
import { ExperiencesHubPage } from './components/pages/ExperiencesHubPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { TermsPage } from './components/pages/TermsPage';
import { DisclaimerPage } from './components/pages/DisclaimerPage';
import { AdSenseChecklistPage } from './components/pages/AdSenseChecklistPage';
import { AdUnit } from './components/adsense/AdUnit';
import { AdSenseScript } from './components/adsense/AdSenseScript';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { Heart, Sparkles, HelpCircle, ShieldCheck, ArrowRight, Smile } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [cookiePrefs, setCookiePrefs] = useState<CookiePreferences>(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('fluffy_cookie_preferences') : null;
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return {
      essential: true,
      analytics: true,
      advertising: true,
      hasConsented: false,
    };
  });

  const handleConsentChange = useCallback((prefs: CookiePreferences) => {
    setCookiePrefs(prefs);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FFF5F7] text-slate-800 font-sans">
      {/* Official AdSense Script Loader (respects user cookie consent) */}
      <AdSenseScript advertisingConsent={cookiePrefs.advertising} />

      {/* Ambient background particles */}
      <FloatingHeartsBg />

      {/* Top Bar Navigation */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {currentPage === 'home' && (
          <div>
            {/* 1. Main Prank Hero Experience */}
            <LovePrankHero onExploreMore={() => handleNavigate('experiences')} />

            {/* 2. Ad Placement 1 (Cleanly below hero, far away from interactive Yes/No buttons) */}
            <div className="max-w-4xl mx-auto px-4">
              <AdUnit slotType="home" adFormat="auto" />
            </div>

            {/* 3. How The Experience Works */}
            <section className="max-w-5xl mx-auto px-4 py-12">
              <div className="text-center max-w-xl mx-auto mb-10">
                <span className="text-xs uppercase tracking-wider font-bold text-rose-600 block mb-1">
                  Simple &amp; Hilarious
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                  How The FluffyHearts Prank Works 🧸
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  Send this link to someone special and prepare for uncontrollable laughter.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-rose-100/90 shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center font-bold text-rose-700 text-sm mb-4">
                    01
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-1">Share The Link</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Send the website link with a cute message like "Hey, I have a quick question for you... 🥺"
                  </p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-rose-100/90 shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-pink-100 flex items-center justify-center font-bold text-pink-700 text-sm mb-4">
                    02
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-1">The Impossible "No"</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Whenever they attempt to tap or hover the "No" button, it dodges them with ninja reflexes!
                  </p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-rose-100/90 shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center font-bold text-amber-800 text-sm mb-4">
                    03
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-1">Celebration Blast</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When they give up and click "Yes!", confetti erupts and the cute teddy couple celebrates.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-rose-100/90 shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center font-bold text-emerald-800 text-sm mb-4">
                    04
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-1">The Plot Twist</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The secret letter opens to reveal: <em>"Yrr me to tumhe dost smjhta tha 😂😭💀"</em>
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Interactive Quizzes & Tools Spotlight */}
            <section className="max-w-5xl mx-auto px-4 py-8">
              <div className="bg-gradient-to-br from-white via-rose-50/40 to-white rounded-3xl p-8 sm:p-10 border border-rose-100 shadow-md">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-rose-600">
                      Explore More Fun
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1">
                      More Than Just A Prank 🌸
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Discover thoughtful compatibility evaluations, funny quizzes, and daily compliments.
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate('experiences')}
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>View All Experiences</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Compatibility */}
                  <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                      </div>
                      <h3 className="font-bold text-slate-800 text-base mb-1">
                        Love Compatibility Quiz
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        5 questions evaluating snack sharing, movie tastes, and love languages to calculate harmony.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('compatibility')}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Take Compatibility Test</span>
                      <span>→</span>
                    </button>
                  </div>

                  {/* Card 2: Spirit Animal */}
                  <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-3">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-slate-800 text-base mb-1">
                        Cute Spirit Animal in Love
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        Discover if you're a Cozy Sleepy Panda, Loyal Teddy, River Otter, or Bubbly Bunny!
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('personality')}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Find Your Animal Match</span>
                      <span>→</span>
                    </button>
                  </div>

                  {/* Card 3: Compliments */}
                  <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                        <Smile className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-slate-800 text-base mb-1">
                        Compliment Dispenser
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        Tap to generate sweet, witty, or poetic compliments with a 1-click clipboard copy button.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('compliments')}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Dispense Compliments</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Ad Placement 2 (Between content sections) */}
            <div className="max-w-4xl mx-auto px-4">
              <AdUnit slotType="content" adFormat="auto" />
            </div>

            {/* 6. Why Laughter & Playful Romance Matter */}
            <section className="max-w-4xl mx-auto px-4 py-8">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-rose-100 shadow-sm space-y-4">
                <span className="text-xs uppercase tracking-wider font-bold text-rose-600 block">
                  The Science of Cute
                </span>
                <h2 className="text-2xl font-bold text-slate-800">
                  Why Shared Laughter Strengthens Bonds
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Psychological studies consistently show that playful banter and shared humor create psychological safety in relationships. When two people laugh together at an unexpected twist, endorphins are released and tension dissolves.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  FluffyHearts is built to be a lighthearted catalyst for conversation. Whether you’re breaking the ice with a crush, making your longtime partner giggle on a busy workday, or testing a friend’s sense of humor, cute moments like these leave lasting memories.
                </p>
              </div>
            </section>

            {/* 7. FAQ */}
            <section className="max-w-4xl mx-auto px-4 py-8 mb-8">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-rose-100 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-rose-500" />
                  <span>Frequently Asked Questions</span>
                </h2>

                <div className="space-y-5 text-sm text-slate-700">
                  <div className="border-b border-rose-100/60 pb-4">
                    <strong className="block text-slate-900 font-semibold mb-1">
                      Does the escaping "No" button work on mobile phones?
                    </strong>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Yes! On touch devices, the button senses touch initiation (`onTouchStart`) and instantly repositions itself within the card boundaries before a click can register, ensuring a smooth, funny experience across all screen sizes.
                    </p>
                  </div>

                  <div className="border-b border-rose-100/60 pb-4">
                    <strong className="block text-slate-900 font-semibold mb-1">
                      Can my crush actually click "No"?
                    </strong>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The button is programmed to dodge whenever approached! While the counter tracks every attempt, clicking "Yes" is the only way forward — leading to the celebratory confetti and the surprise confession letter.
                    </p>
                  </div>

                  <div>
                    <strong className="block text-slate-900 font-semibold mb-1">
                      Are these quizzes professional relationship evaluations?
                    </strong>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      No, all quizzes and games on FluffyHearts are strictly for comedic and recreational entertainment. See our{' '}
                      <button
                        onClick={() => handleNavigate('disclaimer')}
                        className="text-rose-600 font-medium underline cursor-pointer"
                      >
                        Entertainment Disclaimer
                      </button>{' '}
                      for details.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Dedicated Pages */}
        {currentPage === 'experiences' && (
          <ExperiencesHubPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'compatibility' && (
          <div>
            <CompatibilityQuiz />
            <div className="max-w-4xl mx-auto px-4">
              <AdUnit slotType="content" />
            </div>
          </div>
        )}

        {currentPage === 'personality' && (
          <div>
            <PersonalityQuiz />
            <div className="max-w-4xl mx-auto px-4">
              <AdUnit slotType="content" />
            </div>
          </div>
        )}

        {currentPage === 'friendzone' && (
          <div>
            <FriendzoneQuiz />
            <div className="max-w-4xl mx-auto px-4">
              <AdUnit slotType="content" />
            </div>
          </div>
        )}

        {currentPage === 'compliments' && (
          <div>
            <ComplimentGenerator />
            <div className="max-w-4xl mx-auto px-4">
              <AdUnit slotType="content" />
            </div>
          </div>
        )}

        {currentPage === 'daily' && (
          <div>
            <DailyMessageGenerator />
            <div className="max-w-4xl mx-auto px-4">
              <AdUnit slotType="content" />
            </div>
          </div>
        )}

        {currentPage === 'games' && (
          <div>
            <HeartCatcherGame />
            <div className="max-w-4xl mx-auto px-4">
              <AdUnit slotType="content" />
            </div>
          </div>
        )}

        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'privacy' && <PrivacyPolicyPage />}
        {currentPage === 'terms' && <TermsPage />}
        {currentPage === 'disclaimer' && <DisclaimerPage />}
        {currentPage === 'adsense-guide' && <AdSenseChecklistPage />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Cookie & Privacy Consent Banner */}
      <CookieConsentBanner
        onConsentChange={handleConsentChange}
        onNavigateToPrivacy={() => handleNavigate('privacy')}
      />
    </div>
  );
}
