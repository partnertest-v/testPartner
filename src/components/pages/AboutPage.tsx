import React from 'react';
import { TeddyAsking } from '../illustrations/TeddyAsking';
import { TeddyCouple } from '../illustrations/TeddyCouple';
import { Heart, Sparkles, Shield, Smile } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const contactEmail = (import.meta as any).env?.VITE_CONTACT_EMAIL || 'hello@fluffyhearts.app';

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-lg shadow-rose-100/50 border border-rose-100">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-semibold mb-3 border border-rose-100">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Our Wholesome Story</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            About FluffyHearts 🧸
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Spreading genuine smiles, playful romantic pranks, and warm cozy vibes across the internet.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Why We Built This Experience
            </h2>
            <p>
              In a digital world that often feels rushed and stressful, we believe in the power of lighthearted fun. <strong>FluffyHearts</strong> was created to give friends, crushes, and couples a gentle, wholesome reason to laugh together.
            </p>
            <p>
              From the viral escaping "No" button that playfully dodges your pointer, to the sweet confession letter with its relatable comic twist (<em>"Yrr me to tumhe dost smjhta tha"</em>), every feature is designed with care, respect, and adorable aesthetics.
            </p>
          </div>
          <div className="flex justify-center">
            <TeddyCouple size={220} />
          </div>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-rose-100">
          <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100/80">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 mb-3">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-base mb-1">Genuine Wholesome Fun</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zero mean-spirited humor, zero deceptive tricks. Every quiz and interaction is crafted to evoke smiles and celebrate warmth.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100/80">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-base mb-1">Privacy &amp; Safety First</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never harvest personal contacts or ask for intrusive personal credentials. What you play here stays in your session.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100/80">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-base mb-1">Crafted With Detail</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Responsive physics, accessible contrast, custom animations, and clean, high-performance web engineering.
            </p>
          </div>
        </div>

        {/* Contact / Ownership transparency note */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
          <p className="font-semibold text-slate-800 text-sm mb-1">Creator &amp; Publisher Notice</p>
          <p>
            FluffyHearts is an independent web entertainment initiative. We are continuously improving our interactive tools and welcoming user suggestions. If you have questions or ideas, reach out to our team at{' '}
            <a href={`mailto:${contactEmail}`} className="text-rose-600 font-semibold hover:underline">
              {contactEmail}
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};
