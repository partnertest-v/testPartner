import React, { useState } from 'react';
import { CutePanda } from '../illustrations/CutePanda';
import { RotateCcw, Sparkles } from 'lucide-react';

interface AnimalResult {
  name: string;
  emoji: string;
  tagline: string;
  traits: string[];
  loveLanguage: string;
  bestMatch: string;
  description: string;
}

const animalResults: Record<string, AnimalResult> = {
  panda: {
    name: 'The Cozy Sleepy Panda',
    emoji: '🐼',
    tagline: 'Master of warm blanket burritos and late-night snacks',
    traits: ['Peaceful & non-dramatic', 'Expresses love through food & presence', 'Needs 9 hours of cuddles daily'],
    loveLanguage: 'Quality Time & Physical Touch',
    bestMatch: 'Fluffy Loyal Teddy',
    description: 'You express affection quietly and gently. For you, the ultimate date is ordering delicious takeout, wearing warm fuzzy socks, and holding hands while watching your favorite show.',
  },
  teddy: {
    name: 'The Fluffy Loyal Teddy',
    emoji: '🧸',
    tagline: 'Unconditional warmth, heartfelt check-ins, and bone-crushing hugs',
    traits: ['Remembers tiny details', 'Fiercely protective and caring', 'Wears heart directly on sleeve'],
    loveLanguage: 'Words of Affirmation & Thoughtful Gifts',
    bestMatch: 'Cozy Sleepy Panda',
    description: 'You are the rock in your partner\'s life. You never hesitate to send a comforting morning message or bring them their favorite coffee when they are stressed.',
  },
  otter: {
    name: 'The Playful River Otter',
    emoji: '🦦',
    tagline: 'Holds hands while sleeping so you never drift apart',
    traits: ['Adventurous & curious', 'Loves goofy insider jokes', 'Always down for midnight drives'],
    loveLanguage: 'Playful Acts of Service & Shared Adventures',
    bestMatch: 'Bubbly Bunny',
    description: 'You keep romance vibrant, fun, and forever young. Every day with you feels like an exciting chapter with endless laughter and spontaneous memories.',
  },
  bunny: {
    name: 'The Bubbly Golden Bunny',
    emoji: '🐰',
    tagline: 'Radiating pure sunshine, gentle giggles, and sweet handwritten notes',
    traits: ['Expressive and animated', 'Leaves sweet surprise notes', 'Brings warmth into any room'],
    loveLanguage: 'Affectionate Compliments & Cute Surprises',
    bestMatch: 'Playful River Otter',
    description: 'Your romance is overflowing with bubbly enthusiasm. You celebrate anniversaries, monthly milestones, and find joy in making ordinary moments extraordinary.',
  },
};

const quizQuestions = [
  {
    id: 1,
    title: 'Your ideal spontaneous date is:',
    options: [
      { text: 'A cozy blanket nest with pizza and warm cocoa', type: 'panda' },
      { text: 'Surprising them with their favorite flowers and a heartfelt card', type: 'teddy' },
      { text: 'An impromptu road trip to an amusement park or arcade', type: 'otter' },
      { text: 'Baking strawberry cupcakes together while singing silly songs', type: 'bunny' },
    ],
  },
  {
    id: 2,
    title: 'When your crush walks into the room, your internal reaction is:',
    options: [
      { text: 'Quiet warmth and wanting to save them a cozy seat next to me', type: 'panda' },
      { text: 'My heart skips a beat and I instantly check if they look happy', type: 'teddy' },
      { text: 'Thinking of a funny prank or teasing joke to make them laugh', type: 'otter' },
      { text: 'Beaming with a huge smile and waving excitedly', type: 'bunny' },
    ],
  },
  {
    id: 3,
    title: 'Your favorite way to say "I love you" without words:',
    options: [
      { text: 'Sharing my dessert and letting them rest their head on my shoulder', type: 'panda' },
      { text: 'A long, lingering hug where neither of us wants to let go', type: 'teddy' },
      { text: 'Tucking my fingers into theirs and linking pinkies tightly', type: 'otter' },
      { text: 'Hiding a cute sticky note with a drawing in their bag', type: 'bunny' },
    ],
  },
  {
    id: 4,
    title: 'How do you handle disagreement in romance?',
    options: [
      { text: 'Give each other a calm pause, then talk softly over snacks', type: 'panda' },
      { text: 'Reassure them immediately that our love is safe and talk it out', type: 'teddy' },
      { text: 'Diffuse tension with gentle humor, then problem-solve as a team', type: 'otter' },
      { text: 'Offer a peace offering hug and express feelings honestly', type: 'bunny' },
    ],
  },
];

export const PersonalityQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (type: string) => {
    const updated = [...answers, type];
    setAnswers(updated);

    if (currentStep + 1 < quizQuestions.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const getResult = (): AnimalResult => {
    // Count frequencies
    const counts: Record<string, number> = {};
    answers.forEach((t) => {
      counts[t] = (counts[t] || 0) + 1;
    });

    let topType = 'teddy';
    let max = -1;
    for (const [k, v] of Object.entries(counts)) {
      if (v > max) {
        max = v;
        topType = k;
      }
    }
    return animalResults[topType] || animalResults.teddy;
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setCompleted(false);
  };

  const currentQ = quizQuestions[currentStep];
  const result = completed ? getResult() : null;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg shadow-rose-100/50 border border-rose-100">
        {!completed ? (
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
              <span>Question {currentStep + 1} of {quizQuestions.length}</span>
              <span className="font-semibold text-rose-600">Cute Personality Match</span>
            </div>

            <div className="w-full h-2 bg-rose-100/60 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6">
              {currentQ.title}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(opt.type)}
                  className="w-full text-left p-4 rounded-2xl border border-rose-100 hover:border-rose-300 bg-rose-50/30 hover:bg-rose-50 transition-all font-medium text-slate-700 text-sm sm:text-base flex items-center justify-between cursor-pointer"
                >
                  <span>{opt.text}</span>
                  <span className="text-rose-400">♥</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center animate-fadeIn">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Your Romantic Spirit Animal</span>
            </div>

            <h3 className="text-3xl font-extrabold text-slate-800">
              {result?.name} {result?.emoji}
            </h3>

            <p className="text-sm text-rose-600 font-medium mt-1 mb-4">
              "{result?.tagline}"
            </p>

            <div className="my-2 flex justify-center">
              <CutePanda size={160} />
            </div>

            <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-100 text-left my-5 space-y-3">
              <p className="text-sm text-slate-700 leading-relaxed">
                {result?.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-rose-200/50 text-xs">
                <div>
                  <span className="font-bold text-rose-800 uppercase block">Love Language:</span>
                  <span className="text-slate-700 font-medium">{result?.loveLanguage}</span>
                </div>
                <div>
                  <span className="font-bold text-rose-800 uppercase block">Best Soul Match:</span>
                  <span className="text-slate-700 font-medium">{result?.bestMatch}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm flex items-center gap-2 mx-auto transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Take Quiz Again</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
