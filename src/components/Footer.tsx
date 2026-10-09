import React from 'react';
import { PageId } from '../types';
import { Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-rose-100/80 pt-12 pb-16 mt-16 text-slate-600 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Purpose */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-lg font-display">
              <span>FluffyHearts</span>
              <span>🧸</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Wholesome interactive romance, viral friendship pranks, and joyful daily affirmations created to bring smiles to everyday conversations.
            </p>
            <div className="text-xs text-rose-500 font-medium flex items-center gap-1">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>for friends &amp; crushes</span>
            </div>
          </div>

          {/* Interactive Experiences */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Fun Experiences
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-rose-600 cursor-pointer">
                  Viral Escaping "No" Prank
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('compatibility')} className="hover:text-rose-600 cursor-pointer">
                  Love Compatibility Quiz
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('personality')} className="hover:text-rose-600 cursor-pointer">
                  Cute Spirit Animal Test
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('friendzone')} className="hover:text-rose-600 cursor-pointer">
                  Friendzone or Soulmate?
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('games')} className="hover:text-rose-600 cursor-pointer">
                  Catch Falling Teddy Hearts
                </button>
              </li>
            </ul>
          </div>

          {/* Daily & Community */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Sweet Notes &amp; Community
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <button onClick={() => handleNav('compliments')} className="hover:text-rose-600 cursor-pointer">
                  Random Compliment Dispenser
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('daily')} className="hover:text-rose-600 cursor-pointer">
                  Daily Love Affirmations
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-rose-600 cursor-pointer">
                  About Our Project
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-rose-600 cursor-pointer">
                  Contact Support Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Policies &amp; Transparency
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <button onClick={() => handleNav('privacy')} className="hover:text-rose-600 cursor-pointer">
                  Privacy Policy &amp; Cookies
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('terms')} className="hover:text-rose-600 cursor-pointer">
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('disclaimer')} className="hover:text-rose-600 cursor-pointer">
                  Entertainment Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('adsense-guide')} className="text-rose-600 font-semibold hover:underline cursor-pointer">
                  AdSense Readiness Audit
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {currentYear} FluffyHearts. All rights reserved. Intended for entertainment.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('privacy')} className="hover:underline cursor-pointer">
              Privacy
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => handleNav('terms')} className="hover:underline cursor-pointer">
              Terms
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => handleNav('contact')} className="hover:underline cursor-pointer">
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
