import React, { useState } from 'react';
import { QuizQuestion, QuizResult } from '../../types';
import { Heart, RotateCcw, Share2, CheckCircle2 } from 'lucide-react';
import { TeddyCouple } from '../illustrations/TeddyCouple';

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'How do you both handle sharing the last slice of pizza or fries?',
    subtitle: 'Food is the ultimate foundation of true romance!',
    options: [
      { text: 'We split it down to the exact millimeter with love 💕', score: 25 },
      { text: 'I eagerly give it to them because seeing them smile is worth it 🥺', score: 25 },
      { text: 'We do rock-paper-scissors in high stakes combat ✊✌️✋', score: 18 },
      { text: 'I pretend I am not looking and stealthily eat it 🍕', score: 12 },
    ],
  },
  {
    id: 2,
    question: 'When one of you is having a rough day, what is the go-to comfort?',
    subtitle: 'Empathy & cuddle readiness index',
    options: [
      { text: 'Tight silent teddy hugs + their favorite dessert + blanket burrito 🧸', score: 25 },
      { text: 'Sending 20 silly memes until they burst into giggles 😂', score: 22 },
      { text: 'Listening patiently to everything without giving unsolicited fixes 🎧', score: 25 },
      { text: 'Going on an impromptu night walk with sweet boba tea 🧋', score: 20 },
    ],
  },
  {
    id: 3,
    question: 'What is your ideal Saturday night together?',
    subtitle: 'Vibe alignment check',
    options: [
      { text: 'Cozy movie marathon, fairy lights, popcorn, and falling asleep on the couch 🍿', score: 25 },
      { text: 'Trying a cozy new cafe or street food stall while holding hands 🍜', score: 22 },
      { text: 'Playing co-op video games and cheering loudly together 🎮', score: 20 },
      { text: 'Stargazing on a roof with a warm playlist playing softly ✨', score: 25 },
    ],
  },
  {
    id: 4,
    question: 'How do you communicate when texting throughout the day?',
    subtitle: 'Digital heartbeat rhythm',
    options: [
      { text: 'Continuous stream of thoughts, random cute photos, and "look at this dog" 🐕', score: 25 },
      { text: 'Warm good morning/night check-ins and heartfelt voice notes 🎙️', score: 24 },
      { text: 'A mixture of teasing, reaction emojis, and sudden profound philosophy 💭', score: 20 },
      { text: 'We reply whenever, but when we talk in person it is 100% magnetic 🌟', score: 18 },
    ],
  },
  {
    id: 5,
    question: 'What is the secret superpower in your relationship?',
    subtitle: 'The magic glue that keeps things sparkling',
    options: [
      { text: 'Unspoken telepathy — one look across a crowded room and we know everything 👀', score: 25 },
      { text: 'Zero fear of being completely goofy and weird around each other 🤪', score: 25 },
      { text: 'Unshakable loyalty and always having each other\'s back no matter what 🛡️', score: 24 },
      { text: 'Infinite patience, warm forehead kisses, and mutual respect 💖', score: 25 },
    ],
  },
];

export const CompatibilityQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectOption = (score: number) => {
    const updated = [...selectedAnswers, score];
    setSelectedAnswers(updated);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const calculateResult = (): QuizResult => {
    const totalScore = selectedAnswers.reduce((a, b) => a + b, 0);
    const maxScore = questions.length * 25;
    const percentage = Math.round((totalScore / maxScore) * 100);

    if (percentage >= 90) {
      return {
        percentage,
        badge: 'Soulmate Telepathy 🌟',
        title: 'Infinite Cuddle Harmony!',
        description: 'You two possess rare, magnetic chemistry. Your communication is playful yet deeply supportive, and you naturally bring warmth to each other\'s days.',
        advice: 'Keep planning spontaneous little surprises and never stop laughing at each other\'s silliest jokes.',
      };
    } else if (percentage >= 75) {
      return {
        percentage,
        badge: 'Golden Teddy Bond 🧸',
        title: 'Deeply Sweet & Harmonious!',
        description: 'A genuine, joyful connection filled with trust and affection. You balance comfort and playful teasing in just the right proportions.',
        advice: 'Carve out regular tech-free date nights where you just talk and listen without distractions.',
      };
    } else {
      return {
        percentage: Math.max(65, percentage),
        badge: 'Charming Sparks & Growth 🌱',
        title: 'Exciting Dynamic with Cute Quirks!',
        description: 'You bring distinct energies that keep things lively. While you have different styles of expressing love, the spark between you is undeniable.',
        advice: 'Learn each other\'s primary love languages to make sure your care is felt loud and clear.',
      };
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setIsCompleted(false);
    setCopied(false);
  };

  const handleShare = () => {
    const res = calculateResult();
    const shareText = `We scored ${res.percentage}% on the FluffyHearts Love Compatibility Quiz! Check yours: ${window.location.href}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const currentQ = questions[currentQuestionIndex];
  const result = isCompleted ? calculateResult() : null;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg shadow-rose-100/50 border border-rose-100">
        {!isCompleted ? (
          <div>
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span className="font-semibold text-rose-600">
                {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-rose-100/60 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
                {currentQ.question}
              </h2>
              {currentQ.subtitle && (
                <p className="text-sm text-slate-500 mt-1">{currentQ.subtitle}</p>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(opt.score)}
                  className="w-full text-left p-4 rounded-2xl border border-rose-100 hover:border-rose-300 bg-rose-50/30 hover:bg-rose-50 transition-all font-medium text-slate-700 text-sm sm:text-base flex items-center justify-between group cursor-pointer"
                >
                  <span>{opt.text}</span>
                  <span className="opacity-0 group-hover:opacity-100 text-rose-500 transition-opacity ml-2 shrink-0">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result View */
          <div className="text-center animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-semibold mb-3">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{result?.badge}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2">
              {result?.title}
            </h3>

            {/* Score Ring / Gauge */}
            <div className="my-6 flex flex-col items-center justify-center">
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white shadow-lg shadow-rose-300/40">
                <div className="text-center">
                  <span className="text-3xl sm:text-4xl font-black">{result?.percentage}%</span>
                  <span className="block text-[11px] font-medium tracking-wide uppercase opacity-90">
                    Match Score
                  </span>
                </div>
              </div>
            </div>

            <div className="my-3">
              <TeddyCouple size={160} />
            </div>

            <div className="bg-rose-50/70 p-5 rounded-2xl border border-rose-100 text-left my-6 space-y-3">
              <p className="text-sm text-slate-700 leading-relaxed">
                {result?.description}
              </p>
              <div className="pt-2 border-t border-rose-200/60">
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wide">
                  Relationship Insight:
                </span>
                <p className="text-xs text-rose-900 mt-0.5">{result?.advice}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleShare}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Result Copied!' : 'Share Score with Bae'}</span>
              </button>
              <button
                onClick={handleRestart}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
