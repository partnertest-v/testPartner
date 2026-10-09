import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface ResultStage {
  title: string;
  badge: string;
  verdict: string;
  humorLevel: string;
  advice: string;
}

const questions = [
  {
    q: 'When they text you, what is their opening greeting?',
    options: [
      { text: '"Brooo / Bro check this meme out"', score: 0 },
      { text: '"Heyyy (with 3 or more y\'s)"', score: 25 },
      { text: '"I saw this and instantly thought of you 🥺"', score: 30 },
      { text: '"Can you send me notes for tomorrow?"', score: -10 },
    ],
  },
  {
    q: 'What happens when you hang out one-on-one?',
    options: [
      { text: 'They talk for 2 hours about their other crushes 💀', score: -20 },
      { text: 'Comfortable silence, lots of eye contact, and gentle blushing', score: 30 },
      { text: 'You grab street food and act like 10-year-old chaotic partners-in-crime', score: 15 },
      { text: 'They bring 4 other friends along unannounced', score: -15 },
    ],
  },
  {
    q: 'Have they ever asked for your romantic advice?',
    options: [
      { text: '"What do you think is my ideal type? (while staring right at you)"', score: 30 },
      { text: '"How should I impress this person in my class?"', score: -25 },
      { text: '"Why is finding someone good so hard? Why can\'t everyone be like you?"', score: 20 },
      { text: 'We only talk about cats and upcoming holidays', score: 10 },
    ],
  },
  {
    q: 'When you take this website\'s escaping No button test, what do they do?',
    options: [
      { text: 'They laugh, click Yes immediately, and blush', score: 30 },
      { text: 'They scream "Yrr me to tumhe dost smjhta tha 😂💀"', score: 5 },
      { text: 'They spent 10 minutes trying to click No out of pure spite', score: -10 },
      { text: 'They sent back a heartfelt virtual teddy hug', score: 25 },
    ],
  },
];

export const FriendzoneQuiz: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const handleChoose = (pts: number) => {
    const nextScore = score + pts;
    setScore(nextScore);
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setDone(true);
    }
  };

  const getVerdict = (): ResultStage => {
    if (score >= 80) {
      return {
        title: 'Clear Soulmate Signals! 💘',
        badge: 'Zero Friendzone Detected',
        verdict: 'The tension is real. They are dropping hints heavier than an anvil. Time to confess before someone else does!',
        humorLevel: 'Dangerously Romantic',
        advice: 'Send them the love prank link right away and ask them on a real date.',
      };
    } else if (score >= 40) {
      return {
        title: 'Flirty Grey Zone ✨',
        badge: '50% Bestie / 50% Crush',
        verdict: 'You both vibe exceptionally well. The door is definitely open, but someone needs to take the bold first step to test the waters.',
        humorLevel: 'Sweet Butterfly Energy',
        advice: 'Try a slightly more romantic one-on-one hangout and see if the spark ignites!',
      };
    } else {
      return {
        title: 'Honorary Best Friend Forever 💀',
        badge: 'Yrr Me To Tumhe Dost Smjhta Tha!',
        verdict: 'Certified homie status. They treat you like family, complain about life with zero filter, and would probably wingman you anywhere.',
        humorLevel: '100% Comic Relief',
        advice: 'Cherish the legendary friendship — loyal besties are worth more than diamonds!',
      };
    }
  };

  const currentQ = questions[index];
  const verdict = done ? getVerdict() : null;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg shadow-rose-100/50 border border-rose-100">
        {!done ? (
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
              <span>Diagnosis Step {index + 1} of {questions.length}</span>
              <span className="font-semibold text-rose-600">Friendzone or Soulmate?</span>
            </div>

            <div className="w-full h-2 bg-rose-100/60 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all duration-300"
                style={{ width: `${((index + 1) / questions.length) * 100}%` }}
              />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6">
              {currentQ.q}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleChoose(opt.score)}
                  className="w-full text-left p-4 rounded-2xl border border-rose-100 hover:border-rose-300 bg-rose-50/30 hover:bg-rose-50 transition-all font-medium text-slate-700 text-sm sm:text-base flex items-center justify-between cursor-pointer"
                >
                  <span>{opt.text}</span>
                  <span className="text-rose-400">⚡</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center animate-fadeIn">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold mb-3">
              <span>{verdict?.badge}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2">
              {verdict?.title}
            </h3>

            <div className="my-6 p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-left space-y-3">
              <p className="text-sm text-slate-800 leading-relaxed font-medium">
                {verdict?.verdict}
              </p>
              <div className="pt-2 border-t border-amber-200 text-xs text-amber-900">
                <strong>Next Move:</strong> {verdict?.advice}
              </div>
            </div>

            <button
              onClick={() => {
                setIndex(0);
                setScore(0);
                setDone(false);
              }}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm flex items-center gap-2 mx-auto transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Diagnose Another Friend</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
