import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const [isEscaped, setIsEscaped] = useState<boolean>(false);
  const [noBtnCoords, setNoBtnCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [envelopeOpen, setEnvelopeOpen] = useState<boolean>(false);
  const [hugCount, setHugCount] = useState<number>(0);
  const [hugMessage, setHugMessage] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const whatsappButtonRef = useRef<HTMLButtonElement>(null);

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

  // Safe boundaries calculation helper
  const calculateSafeBounds = (btnWidth: number, btnHeight: number) => {
    const vpWidth = window.innerWidth;
    const vpHeight = window.innerHeight;

    const padX = 16;
    const padTop = 76; // keep below header
    const padBottom = 24;

    const minX = padX;
    const maxX = Math.max(minX, vpWidth - btnWidth - padX);
    const minY = padTop;
    const maxY = Math.max(minY, vpHeight - btnHeight - padBottom);

    return { minX, maxX, minY, maxY, vpWidth, vpHeight };
  };

  // Keep button safely inside viewport on window resize or device orientation change
  useEffect(() => {
    if (!isEscaped) return;

    const handleResize = () => {
      const btn = noButtonRef.current;
      const btnWidth = btn?.offsetWidth || 110;
      const btnHeight = btn?.offsetHeight || 50;

      const { minX, maxX, minY, maxY } = calculateSafeBounds(btnWidth, btnHeight);

      setNoBtnCoords((prev) => ({
        x: Math.max(minX, Math.min(maxX, prev.x)),
        y: Math.max(minY, Math.min(maxY, prev.y)),
      }));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [isEscaped]);

  // Robust escape logic: Button ALWAYS remains visible in viewport, escapes to new random spot, never overlaps YES/WhatsApp
  const escapeNoButton = () => {
    playChime('dodge');
    setNoAttempts((prev) => prev + 1);

    const btn = noButtonRef.current;
    const btnWidth = btn?.offsetWidth || 110;
    const btnHeight = btn?.offsetHeight || 50;

    const { minX, maxX, minY, maxY, vpWidth, vpHeight } = calculateSafeBounds(btnWidth, btnHeight);

    // Collect obstacle bounding boxes to strictly avoid overlapping
    const obstacles: DOMRect[] = [];
    if (yesButtonRef.current) {
      obstacles.push(yesButtonRef.current.getBoundingClientRect());
    }
    if (whatsappButtonRef.current) {
      obstacles.push(whatsappButtonRef.current.getBoundingClientRect());
    }
    if (headingRef.current) {
      obstacles.push(headingRef.current.getBoundingClientRect());
    }

    let bestX = minX;
    let bestY = minY;
    let found = false;

    // Try finding a clean, non-overlapping location
    for (let i = 0; i < 35; i++) {
      const candX = minX + Math.random() * (maxX - minX);
      const candY = minY + Math.random() * (maxY - minY);

      // Ensure noticeable jump distance from current position
      if (isEscaped) {
        const dist = Math.hypot(candX - noBtnCoords.x, candY - noBtnCoords.y);
        if (dist < 100) continue;
      }

      // Check collision with obstacles (with 24px safety buffer)
      const buffer = 24;
      const collides = obstacles.some((obs) => {
        return !(
          candX + btnWidth + buffer < obs.left ||
          candX > obs.right + buffer ||
          candY + btnHeight + buffer < obs.top ||
          candY > obs.bottom + buffer
        );
      });

      if (!collides) {
        bestX = candX;
        bestY = candY;
        found = true;
        break;
      }
    }

    // Fallback if tight screen: Pick quadrant farthest from YES button
    if (!found) {
      const yesRect = yesButtonRef.current?.getBoundingClientRect();
      if (yesRect) {
        bestX = yesRect.left > vpWidth / 2 ? minX + 24 : maxX - 24;
        bestY = yesRect.top > vpHeight / 2 ? minY + 24 : maxY - 24;
      } else {
        bestX = minX + Math.random() * (maxX - minX);
        bestY = minY + Math.random() * (maxY - minY);
      }
    }

    // Strictly clamp within visible viewport
    bestX = Math.max(minX, Math.min(maxX, bestX));
    bestY = Math.max(minY, Math.min(maxY, bestY));

    setNoBtnCoords({ x: bestX, y: bestY });
    setIsEscaped(true);
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
    setIsEscaped(false);
    setNoBtnCoords({ x: 0, y: 0 });
    setEnvelopeOpen(false);
    setHugCount(0);
    setHugMessage('');
  };

  // WhatsApp share action
  const handleWhatsAppShare = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://fluffyhearts.app';
    const message = `😂 Bhai, ek mazedaar test hai! Dekhte hain tum NO button pakad paate ho ya nahi! 💗🧸\n\nTry karo aur apna result dekho:\n${currentUrl}`;
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
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
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 bg-white/80 rounded-full border border-rose-100 shadow-2xs transition-colors cursor-pointer"
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
          className="relative bg-white/95 rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl shadow-rose-100/60 border border-rose-100 flex flex-col items-center text-center min-h-[500px]"
        >
          {/* Decorative subtle ambient stamps */}
          <div className="absolute top-4 left-6 text-rose-200 text-xl select-none" aria-hidden="true">
            💌
          </div>
          <div className="absolute top-6 right-6 text-rose-200 text-xl select-none" aria-hidden="true">
            ✨
          </div>

          {/* Heading */}
          <div className="mb-2">
            <h1
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight flex items-center justify-center gap-2"
            >
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
          <div className="relative w-full max-w-md min-h-[72px] flex items-center justify-center gap-6 mt-4">
            {/* Yes Button (Grows slightly with attempts to make it irresistible!) */}
            <button
              ref={yesButtonRef}
              onClick={handleYesClick}
              style={{
                transform: `scale(${Math.min(1.22, 1 + noAttempts * 0.035)})`,
              }}
              className="z-10 px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-rose-400/30 hover:shadow-rose-400/50 transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Yes!</span>
              <span>💖</span>
            </button>

            {/* In-flow NO button (before first escape) */}
            {!isEscaped && (
              <button
                ref={noButtonRef}
                onMouseEnter={escapeNoButton}
                onPointerDown={(e) => {
                  e.preventDefault();
                  escapeNoButton();
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  escapeNoButton();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  escapeNoButton();
                }}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-base rounded-2xl shadow-sm border border-slate-200 select-none cursor-pointer flex items-center gap-2 whitespace-nowrap active:scale-95 touch-none"
              >
                <span>No</span>
                <span>🙈</span>
              </button>
            )}

            {/* Reserved spacer when escaped to prevent layout shifts */}
            {isEscaped && (
              <div
                className="w-[108px] h-[48px] opacity-0 pointer-events-none select-none shrink-0"
                aria-hidden="true"
              />
            )}
          </div>

          {/* Footer note inside card */}
          <div className="mt-6 text-xs text-slate-500 flex items-center gap-2">
            <span>Tip: Try catching the "No" button if you dare</span>
            <span aria-hidden="true">·</span>
            <span>Attempts: {noAttempts}</span>
          </div>

          {/* ================= WHATSAPP SHARE BUTTON ================= */}
          <div className="mt-8 pt-6 border-t border-rose-100 w-full flex flex-col items-center">
            <button
              ref={whatsappButtonRef}
              onClick={handleWhatsAppShare}
              className="px-7 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2.5 cursor-pointer select-none"
              title="Share prank with friends on WhatsApp"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>💚 Dosto ko bhejo</span>
            </button>
            <p className="text-xs text-slate-500 mt-2">
              Send this challenge to your friends or crush on WhatsApp!
            </p>
          </div>
        </div>
      ) : (
        /* ================= STATE 2: CELEBRATION & SURPRISE LETTER ================= */
        <div className="bg-white/95 rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl shadow-rose-100/60 border border-rose-100 flex flex-col items-center text-center animate-fadeIn">
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

          {/* WhatsApp Share in Celebration */}
          <div className="my-4">
            <button
              onClick={handleWhatsAppShare}
              className="px-7 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2.5 cursor-pointer select-none"
              title="Share prank with friends on WhatsApp"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>💚 Dosto ko bhejo</span>
            </button>
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

      {/* ================= ESCAPED NO BUTTON (RENDERED IN PORTAL TO BODY) ================= */}
      {/* Guarantees the button is ALWAYS visible in the viewport, never clipped, never hidden under any card */}
      {isEscaped && !hasSaidYes && typeof document !== 'undefined' && createPortal(
        <button
          ref={noButtonRef}
          onMouseEnter={escapeNoButton}
          onPointerDown={(e) => {
            e.preventDefault();
            escapeNoButton();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            escapeNoButton();
          }}
          onClick={(e) => {
            e.preventDefault();
            escapeNoButton();
          }}
          style={{
            position: 'fixed',
            left: `${noBtnCoords.x}px`,
            top: `${noBtnCoords.y}px`,
            zIndex: 9999,
            transition: 'left 0.22s cubic-bezier(0.2, 0.9, 0.3, 1.2), top 0.22s cubic-bezier(0.2, 0.9, 0.3, 1.2)',
          }}
          className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-base rounded-2xl shadow-lg border border-slate-300 select-none cursor-pointer flex items-center gap-2 whitespace-nowrap active:scale-95 touch-none"
          aria-label="No button (escapes when approached)"
        >
          <span>No</span>
          <span>🙈</span>
        </button>,
        document.body
      )}
    </div>
  );
};
