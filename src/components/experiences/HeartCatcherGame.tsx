import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy, Heart } from 'lucide-react';

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  icon: string;
  points: number;
}

export const HeartCatcherGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem('fluffy_heart_highscore')) || 0;
    } catch {
      return 0;
    }
  });
  const [items, setItems] = useState<FallingItem[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const itemCounter = useRef(0);

  // Timer loop
  useEffect(() => {
    if (!isPlaying) return;

    if (timeLeft <= 0) {
      setIsPlaying(false);
      setItems([]);
      if (score > highScore) {
        setHighScore(score);
        try {
          localStorage.setItem('fluffy_heart_highscore', String(score));
        } catch {}
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, highScore]);

  // Spawn and movement loop
  useEffect(() => {
    if (!isPlaying) return;

    const gameInterval = setInterval(() => {
      // Move items down
      setItems((prevItems) => {
        const moved = prevItems
          .map((item) => ({ ...item, y: item.y + item.speed }))
          .filter((item) => item.y < 360); // remove when offscreen

        // Spawn new item randomly
        if (Math.random() < 0.35 && moved.length < 8) {
          const emojis = [
            { icon: '💖', pts: 10, spd: 3.5 },
            { icon: '🧸', pts: 20, spd: 4.2 },
            { icon: '🌸', pts: 5, spd: 2.8 },
            { icon: '💌', pts: 15, spd: 3.8 },
            { icon: '✨', pts: 10, spd: 3.2 },
          ];
          const choice = emojis[Math.floor(Math.random() * emojis.length)];
          const newItem: FallingItem = {
            id: ++itemCounter.current,
            x: Math.floor(Math.random() * 82) + 8, // percentage 8% to 90%
            y: 0,
            speed: choice.spd,
            icon: choice.icon,
            points: choice.pts,
          };
          return [...moved, newItem];
        }

        return moved;
      });
    }, 50);

    return () => clearInterval(gameInterval);
  }, [isPlaying]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(25);
    setItems([]);
    setIsPlaying(true);
  };

  const handleCatch = (id: number, points: number) => {
    if (!isPlaying) return;
    setScore((prev) => prev + points);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg shadow-rose-100/50 border border-rose-100 text-center">
        <div className="flex items-center justify-between mb-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1 text-amber-600">
            <Trophy className="w-4 h-4" />
            <span>High Score: {highScore}</span>
          </div>
          <div className="flex items-center gap-1 text-rose-600">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Current Score: {score}</span>
          </div>
          <div className="font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg">
            Time: {timeLeft}s
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-1">
          Catch Falling Teddy Hearts 🧸💖
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
          Tap or click the falling hearts, letters, and teddy bears before they float away!
        </p>

        {/* Game Arena */}
        <div
          ref={gameAreaRef}
          className="relative w-full h-[360px] bg-gradient-to-b from-rose-50/70 via-pink-50/30 to-amber-50/40 rounded-3xl border-2 border-dashed border-rose-200 overflow-hidden select-none mb-6"
        >
          {!isPlaying ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-2xs p-6">
              <span className="text-4xl mb-3">🧺</span>
              <p className="font-bold text-slate-800 text-lg mb-1">
                {timeLeft === 0 ? 'Game Over!' : 'Ready to Catch Some Love?'}
              </p>
              <p className="text-xs text-slate-500 max-w-xs mb-5">
                {timeLeft === 0
                  ? `You caught a whopping ${score} points of pure affection!`
                  : 'Fast reflexes unlock the highest romance score.'}
              </p>
              <button
                onClick={startGame}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                {timeLeft === 0 ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{timeLeft === 0 ? 'Play Again' : 'Start 25s Challenge'}</span>
              </button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleCatch(item.id, item.points)}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}px`,
                  }}
                  className="absolute -translate-x-1/2 p-2 text-2xl sm:text-3xl hover:scale-125 transition-transform active:scale-90 cursor-pointer animate-float-slow"
                  title={`+${item.points} pts`}
                >
                  {item.icon}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
