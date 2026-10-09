import React, { useState } from 'react';
import { PageId } from '../types';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'experiences', label: 'Quizzes & Games' },
    { id: 'daily', label: 'Daily Notes' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="text-xl sm:text-2xl font-black tracking-tight text-slate-800 hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer font-display"
        >
          <span>FluffyHearts</span>
          <span className="text-xl">🧸</span>
        </button>

        {/* Zone 2: 4–5 single-line clean text links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
                currentPage === link.id
                  ? 'text-rose-600 border-rose-500 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleLinkClick('home')}
            className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl shadow-xs hover:shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Play Love Prank 💌
          </button>
        </div>

        {/* Mobile menu hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-rose-600 cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-rose-100 px-4 py-4 space-y-2 shadow-lg animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                currentPage === link.id
                  ? 'bg-rose-50 text-rose-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-rose-100">
            <button
              onClick={() => handleLinkClick('home')}
              className="w-full py-2.5 text-center text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl cursor-pointer"
            >
              Play Love Prank 💌
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
