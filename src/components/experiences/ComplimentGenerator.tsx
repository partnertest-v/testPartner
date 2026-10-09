import React, { useState } from 'react';
import { Compliment } from '../../types';
import { Copy, Check, Sparkles, RefreshCw, Share2 } from 'lucide-react';

const complimentsData: Compliment[] = [
  {
    id: '1',
    category: 'sweet',
    text: 'You have that rare, calming presence that makes even the most chaotic day feel safe and soft.',
    emoji: '🌸',
  },
  {
    id: '2',
    category: 'sweet',
    text: 'If my thoughts were flowers, I would be walking through an infinite garden of you.',
    emoji: '🌷',
  },
  {
    id: '3',
    category: 'sweet',
    text: 'Your laugh is honestly my favorite song in the entire world. Never keep it quiet.',
    emoji: '🎶',
  },
  {
    id: '4',
    category: 'funny',
    text: 'I would willingly give you the crispy corner piece of a brownie, and that is high treason against my stomach.',
    emoji: '🍫',
  },
  {
    id: '5',
    category: 'funny',
    text: 'Are you a Wi-Fi signal? Because whenever you walk in, I instantly connect and ignore everyone else.',
    emoji: '📶',
  },
  {
    id: '6',
    category: 'funny',
    text: 'You are cooler than the other side of the pillow on a hot summer night.',
    emoji: '🧊',
  },
  {
    id: '7',
    category: 'poetic',
    text: 'In a world obsessed with loud storms, your gentle soul is the sweetest starlight.',
    emoji: '✨',
  },
  {
    id: '8',
    category: 'poetic',
    text: 'You don’t just walk through life; you leave little constellations of joy wherever your feet touch.',
    emoji: '🌌',
  },
  {
    id: '9',
    category: 'friendship',
    text: 'You are the only person I would answer an unscheduled phone call for without panicking.',
    emoji: '📞',
  },
  {
    id: '10',
    category: 'friendship',
    text: 'If we were stranded on a deserted island, I know for a fact we would just end up gossiping and laughing until rescue.',
    emoji: '🏝️',
  },
  {
    id: '11',
    category: 'sweet',
    text: 'You make everyday moments feel like soft polaroid memories that I want to keep forever.',
    emoji: '📸',
  },
];

export const ComplimentGenerator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const filtered = complimentsData.filter((c) =>
    selectedCategory === 'all' ? true : c.category === selectedCategory
  );

  const handleNextCompliment = () => {
    let nextIdx = (currentIndex + 1) % filtered.length;
    if (nextIdx === currentIndex && filtered.length > 1) {
      nextIdx = (nextIdx + 1) % filtered.length;
    }
    setCurrentIndex(nextIdx);
    setCopied(false);
  };

  const currentCompliment = filtered[currentIndex % filtered.length] || complimentsData[0];

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`"${currentCompliment.text}" ${currentCompliment.emoji}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg shadow-rose-100/50 border border-rose-100 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Instant Heart Melter</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2">
          Cute Compliment Dispenser 💌
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
          Generate an authentic, heartwarming compliment to copy and send to your favorite person right now.
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-rose-50/70 rounded-2xl max-w-md mx-auto mb-8 border border-rose-100">
          {[
            { id: 'all', label: 'All Vibes' },
            { id: 'sweet', label: 'Sweet & Warm 🌸' },
            { id: 'funny', label: 'Cheeky & Fun 😂' },
            { id: 'poetic', label: 'Poetic ✨' },
            { id: 'friendship', label: 'Besties 🤝' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentIndex(0);
                setCopied(false);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white text-rose-700 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Compliment Card */}
        <div className="relative bg-gradient-to-br from-rose-50/60 to-pink-50/40 p-8 sm:p-10 rounded-3xl border border-rose-100 mb-6 shadow-inner transition-all">
          <span className="text-4xl block mb-4 animate-gentle-bounce">
            {currentCompliment.emoji}
          </span>
          <p className="text-lg sm:text-xl font-medium text-slate-800 leading-relaxed font-sans italic">
            "{currentCompliment.text}"
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleNextCompliment}
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Another One!</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl border border-slate-200 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy to Send'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
