import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { TeddyAsking } from '../illustrations/TeddyAsking';
import { TeddyCouple } from '../illustrations/TeddyCouple';
import { Heart, Sparkles, RotateCcw, Smile, MailOpen, Volume2, VolumeX } from 'lucide-react';

interface LovePrankHeroProps {
  onExploreMore?: () => void;
}

export const LovePrankHero: React.FC<LovePrankHeroProps> = ({ onExploreMore }) => {
  const [hasSaidYes, setHasSaidYes] = useState<boolean>(false);
  const [noAttempts, setNoAttempts] = useState<number>(0);
  const [noBtnPos, setNoBtnPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [envelopeOpen, setEnvelopeOpen] = useState<boolean>(false);
  const [hugCount, setHugCount] = useState<number>(0);
  const [hugMessage, setHugMessage] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // Sound synthesizer using Web Audio API (gentle chime/giggle)
  const playChime = (type: 'dodge' | 'yes' | 'hug') => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'dodge') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'yes') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        osc.frequency.setValueAtTime(1046.5, ctx.currentTime + 0.3); // C6
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
        osc.start();
        osc.stop(ctx.currentTime + 0.55);
      } else if (type === 'hug') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(392, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(587.33, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch {
      // Audio might be muted by browser policy before user interaction
    }
  };

  // Runaway logic for "No" button
  const escapeNoButton = () => {
    playChime('dodge');
    setNoAttempts((prev) => prev + 1);

    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const btn = noButtonRef.current.getBoundingClientRect();

    // Available boundaries with safe margins inside the card
    const margin = 20;
    const maxX = Math.max(20, container.width - btn.width - margin);
    const maxY = Math.max(20, container.height - btn.height - margin);

    // Pick random location that is noticeably far from current position
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;

    // Adjust relative to center
    newX = newX - container.width / 2 + btn.width / 2;
    newY = newY - container.height / 2 + btn.height / 2;

    // Clamp coordinates safely
    const maxBoundX = container.width / 2 - btn.width / 2 - 16;
    const maxBoundY = container.height / 2 - btn.height / 2 - 16;
    newX = Math.max(-maxBoundX, Math.min(maxBoundX, newX));
    newY = Math.max(-maxBoundY, Math.min(maxBoundY, newY));

    setNoBtnPos({ x: newX, y: newY });
  };

  // Trigger celebration on Yes!
  const handleYesClick = () => {
    setHasSaidYes(true);
    playChime('yes');

    // Confetti blast
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FB7185', '#FDA4AF', '#F43F5E', '#FDE047', '#C084FC'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FB7185', '#FDA4AF', '#F43F5E'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FB7185', '#F43F5E', '#FDE047'],
        });
      }, 350);
    } catch (e) {
      console.warn('Confetti effect trigger:', e);
    }
  };

  // Virtual Hug interaction
  const handleVirtualHug = () => {
    playChime('hug');
    setHugCount((prev) => prev + 1);

    const messages = [
      'Sending a super warm fluffy bear hug! 🧸✨',
      'Cuddle squeeze delivered! You are so loved! 🌸',
      'Warmest embrace loaded with extra sweet sprinkles! 💖',
      'Bear squeeze level 100/100 unlocked! 🥰',
      'Floating hearts and sweet fuzzy hugs your way! 💌',
    ];
    const nextMsg = messages[hugCount % messages.length];
    setHugMessage(nextMsg);
  };

  // Restart / Play Again
  const handleRestart = () => {
    setHasSaidYes(false);
    setNoAttempts(0);
    setNoBtnPos({ x: 0, y: 0 });
    setEnvelopeOpen(false);
    setHugCount(0);
    setHugMessage('');
  };

  // Playful attempt reaction messages
  const getAttemptMessage = () => {
    if (noAttempts === 0) return null;
    if (noAttempts === 1) return 'Wait, did you misclick? 🥺';
    if (noAttempts === 2) return 'Nice try! But the button is too fast! 🏃💨';
    if (noAttempts === 3) return 'Look at that fluffy teddy face, how can you say No? 🧸';
    if (noAttempts === 4) return 'The button has ninja reflexes! 🥷💗';
    if (noAttempts === 5) return 'Running away faster than your doubts! 😂';
    if (noAttempts === 6) return 'Even the universe is whispering: click Yes! 🌌';
    if (noAttempts >= 7) return `Attempt #${noAttempts}: The button refuses to let you reject me! 💖`;
    return null;
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Sound toggle button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 bg-white/80 rounded-full border border-rose-100 shadow-2xs transition-colors"
          title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{soundEnabled ? 'Sound On' : 'Muted'}</span>
        </button>
      </div>

      {!hasSaidYes ? (
        /* ================= STATE 1: ASKING STAGE ================= */
        <div
          ref={containerRef}
          className="relative bg-white/95 rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl shadow-rose-100/60 border border-rose-100 flex flex-col items-center text-center overflow-hidden min-h-[500px]"
        >
          {/* Decorative subtle hearts */}
          <div className="absolute top-4 left-6 text-rose-200 text-xl select-none" aria-hidden="true">
            💌
          </div>
          <div className="absolute top-6 right-6 text-rose-200 text-xl select-none" aria-hidden="true">
            ✨
          </div>

          {/* Heading */}
          <div className="mb-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight flex items-center justify-center gap-2">
              <span>Hey You!</span>
              <span className="text-rose-500 animate-gentle-bounce">💌</span>
            </h1>
          </div>

          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-rose-600 mt-2 mb-6">
            Do you love me? 🥺💗
          </p>

          {/* Cute Teddy Asking Illustration */}
          <div className="my-2 transition-transform duration-300 hover:scale-105">
            <TeddyAsking size={240} />
          </div>

          {/* Attempt notice message banner */}
          <div className="min-h-[28px] mt-2 mb-4">
            {noAttempts > 0 && (
              <p className="text-sm font-medium text-rose-600 bg-rose-50 px-4 py-1.5 rounded-full inline-block border border-rose-100 animate-fadeIn">
                {getAttemptMessage()}
              </p>
            )}
          </div>

          {/* Buttons Area */}
          <div className="relative w-full max-w-md h-24 flex items-center justify-center gap-6 mt-4">
            {/* Yes Button (Grows slightly with attempts to make it irresistible!) */}
            <button
              onClick={handleYesClick}
              style={{
                transform: `scale(${Math.min(1.25, 1 + noAttempts * 0.04)})`,
              }}
              className="z-10 px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-rose-400/30 hover:shadow-rose-400/50 transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Yes!</span>
              <span>💖</span>
            </button>

            {/* Escaping No Button */}
            <button
              ref={noButtonRef}
              onMouseEnter={escapeNoButton}
              onTouchStart={(e) => {
                e.preventDefault();
                escapeNoButton();
              }}
              onClick={escapeNoButton}
              style={{
                transform: `translate(${noBtnPos.x}px, ${noBtnPos.y}px)`,
                transition: 'transform 0.18s cubic-bezier(0.2, 0.9, 0.3, 1.2)',
              }}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-base rounded-2xl shadow-sm border border-slate-200 select-none cursor-pointer flex items-center gap-2 whitespace-nowrap active:scale-95"
            >
              <span>No</span>
              <span>🙈</span>
            </button>
          </div>

          {/* Footer note inside card */}
          <div className="mt-8 text-xs text-slate-500 flex items-center gap-2">
            <span>Tip: Try catching the "No" button if you dare</span>
            <span aria-hidden="true">·</span>
            <span>Attempts: {noAttempts}</span>
          </div>
        </div>
      ) : (
        /* ================= STATE 2: CELEBRATION & SURPRISE LETTER ================= */
        <div className="bg-white/95 rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl shadow-rose-100/60 border border-rose-100 flex flex-col items-center text-center overflow-hidden animate-fadeIn">
          {/* Header celebration */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-sm font-semibold mb-3 border border-rose-100">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span>Yaaay! She/He said YES! 🎉</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
            I Knew It! Forever &amp; Always! 💖
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-lg mt-2 mb-6">
            Look at this cuddly teddy couple celebrating our love!
          </p>

          {/* Teddy Couple Illustration */}
          <div className="my-3 hover:scale-105 transition-transform duration-300">
            <TeddyCouple size={260} />
          </div>

          {/* Attempt Stats Badge */}
          <div className="my-3 px-5 py-2 bg-pink-50 rounded-2xl border border-pink-100 text-xs sm:text-sm text-pink-700 font-medium">
            {noAttempts > 0 ? (
              <span>You tried to say "No" {noAttempts} time{noAttempts > 1 ? 's' : ''}, but your heart couldn't resist! 😂💕</span>
            ) : (
              <span>First-try Yes! True love at first sight! 💘</span>
            )}
          </div>

          {/* Interactive Surprise Envelope */}
          <div className="w-full max-w-xl my-6">
            <div
              onClick={() => setEnvelopeOpen(!envelopeOpen)}
              className="cursor-pointer group relative bg-gradient-to-br from-rose-50 to-pink-50 p-6 sm:p-8 rounded-3xl border-2 border-dashed border-rose-200 hover:border-rose-300 transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-base sm:text-lg">
                  <MailOpen className="w-5 h-5 text-rose-500" />
                  <span>{envelopeOpen ? 'Confession Letter Opened 💌' : 'Tap To Open Secret Love Letter 💌'}</span>
                </div>
                <span className="text-xs text-rose-500 font-medium underline">
                  {envelopeOpen ? 'Fold' : 'Unfold'}
                </span>
              </div>

              {!envelopeOpen ? (
                <div className="py-6 flex flex-col items-center justify-center text-slate-500 text-sm">
                  <span className="text-3xl mb-2 animate-bounce">💌</span>
                  <p className="font-medium text-rose-900">There is a secret handwritten note waiting inside for you...</p>
                  <p className="text-xs text-rose-500 mt-1">Click to break the heart wax seal</p>
                </div>
              ) : (
                <div className="bg-white p-6 sm:p-7 rounded-2xl border border-rose-100 shadow-inner text-left font-sans text-slate-700 leading-relaxed space-y-4 animate-fadeIn">
                  <div className="text-xs uppercase tracking-wider text-rose-400 font-semibold border-b border-rose-100 pb-2">
                    A Sincere Message From The Heart
                  </div>
                  <p className="text-sm sm:text-base text-slate-700">
                    Dearest one, from the day we started talking, every moment has felt brighter, softer, and filled with endless smiles. Your laughter is my favorite melody, and just knowing you exist makes the world a warmer place. 🥺💕
                  </p>
                  <p className="text-sm sm:text-base text-slate-700">
                    I spent hours making this website, choosing the softest teddy bears and writing these words just for you...
                  </p>

                  {/* EXACT PLOT TWIST PUNCHLINE */}
                  <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
                    <p className="text-lg sm:text-xl font-bold text-amber-900 tracking-wide font-display">
                      "Yrr me to tumhe dost smjhta tha 😂😭💀"
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      Friendzoned with 100% love and comedic precision! Send this to your crush right now!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Virtual Hug Interaction */}
          <div className="w-full max-w-md my-4 p-5 bg-rose-50/70 rounded-2xl border border-rose-100 flex flex-col items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={handleVirtualHug}
                className="px-5 py-2.5 bg-white hover:bg-rose-50 text-rose-700 font-semibold rounded-xl border border-rose-200 shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Send Virtual Hug 🤗</span>
              </button>
              <div className="text-xs text-rose-700 font-medium">
                Hugs sent: <strong className="font-bold text-rose-900 text-base">{hugCount}</strong>
              </div>
            </div>

            {hugMessage && (
              <p className="text-xs text-rose-600 mt-2 font-medium animate-fadeIn">
                {hugMessage}
              </p>
            )}
          </div>

          {/* Action buttons: Restart & Explore More */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <button
              onClick={handleRestart}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Prank Again / Reset</span>
            </button>

            {onExploreMore && (
              <button
                onClick={onExploreMore}
                className="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Smile className="w-3.5 h-3.5" />
                <span>Explore Love &amp; Friendship Quizzes</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
