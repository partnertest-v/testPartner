import React, { useState } from 'react';
import { Calendar, Heart, Sparkles, RefreshCcw } from 'lucide-react';

const dailyNotes = [
  {
    vibe: 'Gentle Sunlight ☀️',
    note: 'Reminder for today: You do not have to carry the whole world on your shoulders. Just being kind, gentle with yourself, and smiling is enough.',
    luckyElement: 'Strawberry Boba & Warm Blankets',
    prompt: 'Send someone a random "Thinking of you!" text before noon.',
  },
  {
    vibe: 'Sweet Cozy Cloud ☁️',
    note: 'Someone out there is smiling right now simply because they remembered a funny memory with you.',
    luckyElement: 'Warm Caramel Macchiato & Lavender',
    prompt: 'Listen to your favorite nostalgic playlist while getting ready.',
  },
  {
    vibe: 'Starry Starlight ✨',
    note: 'The love you give so freely to the world always finds a way back to you, often in the most unexpected and beautiful forms.',
    luckyElement: 'Soft oversized hoodie & Fairy lights',
    prompt: 'Take 5 deep breaths and forgive yourself for little imperfections.',
  },
  {
    vibe: 'Fluffy Teddy Hug 🧸',
    note: 'Do not measure your worth by how productive you were today. You are cherished simply because of your unique, tender heart.',
    luckyElement: 'Freshly baked cinnamon cookies & Rose tea',
    prompt: 'Give an extra warm hug or affectionate compliment to a friend.',
  },
  {
    vibe: 'Blooming Peach 🌸',
    note: 'Good things take time to bloom. The seeds of love and friendship you planted will yield the sweetest blossoms.',
    luckyElement: 'Pastel stationery & Sunrise walks',
    prompt: 'Write down three small things you felt genuinely grateful for today.',
  },
];

export const DailyMessageGenerator: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const [activeIdx, setActiveIdx] = useState(0);

  const current = dailyNotes[activeIdx % dailyNotes.length];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg shadow-rose-100/50 border border-rose-100 text-center">
        {/* Date badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-semibold mb-3 border border-rose-100">
          <Calendar className="w-3.5 h-3.5" />
          <span>{today}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2">
          Daily Sweet Whisper 💌
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
          A fresh, wholesome affirmation and love oracle to brighten your morning.
        </p>

        {/* Message Container */}
        <div className="bg-gradient-to-b from-rose-50/70 to-pink-50/40 p-6 sm:p-8 rounded-3xl border border-rose-100 mb-6 text-left space-y-4 shadow-inner">
          <div className="flex items-center justify-between pb-3 border-b border-rose-200/50">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wide">
              Today's Mood:
            </span>
            <span className="text-xs font-semibold text-rose-600">{current.vibe}</span>
          </div>

          <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-sans font-medium">
            "{current.note}"
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-rose-200/50 text-xs text-slate-600">
            <div>
              <strong className="text-rose-900 block font-semibold">Lucky Companion:</strong>
              <span>{current.luckyElement}</span>
            </div>
            <div>
              <strong className="text-rose-900 block font-semibold">Sweet Daily Quest:</strong>
              <span>{current.prompt}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveIdx((prev) => (prev + 1) % dailyNotes.length)}
          className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-xl text-xs sm:text-sm flex items-center gap-2 mx-auto transition-all cursor-pointer"
        >
          <RefreshCcw className="w-4 h-4 text-rose-500" />
          <span>Draw Another Daily Note</span>
        </button>
      </div>
    </div>
  );
};
