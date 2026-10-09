import React from 'react';
import { PageId } from '../../types';
import { TeddyAsking } from '../illustrations/TeddyAsking';
import { TeddyCouple } from '../illustrations/TeddyCouple';
import { CutePanda } from '../illustrations/CutePanda';
import { Heart, Sparkles, Gamepad2, MessageSquareHeart, Smile, Compass } from 'lucide-react';

interface ExperiencesHubPageProps {
  onNavigate: (page: PageId) => void;
}

export const ExperiencesHubPage: React.FC<ExperiencesHubPageProps> = ({ onNavigate }) => {
  const experiences = [
    {
      id: 'compatibility' as PageId,
      title: 'Love Compatibility Quiz',
      category: 'Romantic Test',
      duration: '2 min',
      description: '5 thoughtfully crafted questions on snack sharing, comfort cuddles, and communication to calculate your true harmony score.',
      icon: <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />,
      cta: 'Calculate Match Score',
    },
    {
      id: 'personality' as PageId,
      title: 'Cute Spirit Animal in Love',
      category: 'Personality Test',
      duration: '2 min',
      description: 'Are you a Cozy Sleepy Panda, a Fluffy Loyal Teddy, a Playful River Otter, or a Bubbly Bunny? Discover your romantic archetype.',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      cta: 'Find Your Animal Archetype',
    },
    {
      id: 'friendzone' as PageId,
      title: 'Friendzone or Soulmate?',
      category: 'Humor & Relatability',
      duration: '1 min',
      description: 'Test the subtle text signals, hangout vibes, and body language to decode whether you are in the friendzone or future soulmates.',
      icon: <Compass className="w-5 h-5 text-indigo-500" />,
      cta: 'Decode The Signals',
    },
    {
      id: 'compliments' as PageId,
      title: 'Random Compliment Dispenser',
      category: 'Sweet Notes',
      duration: 'Instant',
      description: 'Generate heartwarming, witty, or poetic compliments with a single click. Copy and send directly to someone special.',
      icon: <MessageSquareHeart className="w-5 h-5 text-pink-500" />,
      cta: 'Dispense Compliments',
    },
    {
      id: 'daily' as PageId,
      title: 'Daily Love Affirmations',
      category: 'Daily Oracle',
      duration: '1 min',
      description: 'A fresh, wholesome affirmation with your daily lucky companion and gentle reminder to take care of your heart.',
      icon: <Smile className="w-5 h-5 text-emerald-500" />,
      cta: 'Read Today\'s Note',
    },
    {
      id: 'games' as PageId,
      title: 'Catch Falling Teddy Hearts',
      category: 'Arcade Mini-Game',
      duration: '25 sec',
      description: 'Test your reflexes in this fast-paced casual game! Tap falling letters, hearts, and cuddly teddy bears to set high scores.',
      icon: <Gamepad2 className="w-5 h-5 text-purple-500" />,
      cta: 'Start 25s Challenge',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-semibold mb-3 border border-rose-100">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Interactive Entertainment Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          Quizzes, Games &amp; Cute Experiences 🧸
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Every tool has genuine interactions, calculated results, and heartwarming surprises. Choose an adventure below:
        </p>
      </div>

      {/* Grid of Experiences */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-white rounded-3xl p-6 border border-rose-100/90 shadow-md shadow-rose-100/30 hover:shadow-lg hover:border-rose-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                <span className="font-semibold text-rose-600">{exp.category}</span>
                <span aria-hidden="true">·</span>
                <span>{exp.duration}</span>
              </div>

              <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {exp.icon}
              </div>

              <h2 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-rose-600 transition-colors">
                {exp.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {exp.description}
              </p>
            </div>

            <button
              onClick={() => {
                onNavigate(exp.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-700 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{exp.cta}</span>
              <span>→</span>
            </button>
          </div>
        ))}
      </div>

      {/* Prank Banner Spotlight */}
      <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-rose-100/70 via-pink-100/60 to-amber-100/70 border border-rose-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs uppercase tracking-wider font-bold text-rose-700">
            Viral Prank Experience
          </span>
          <h3 className="text-2xl font-bold text-slate-900 font-display">
            The Escaping "No" Button &amp; Secret Plot Twist 💌
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 max-w-lg">
            Challenge your crush to say No, watch the button dodge their fingertips, and unlock the sweet friendship surprise.
          </p>
        </div>
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer shrink-0"
        >
          Try Love Prank Now
        </button>
      </div>
    </div>
  );
};
