import React from 'react';

export const FloatingHeartsBg: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Soft background radial blushes */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-pink-200/25 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-20 right-1/4 w-[28rem] h-[28rem] bg-rose-200/25 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-amber-100/40 rounded-full blur-2xl" />

      {/* Floating gentle pastel heart particles */}
      <div className="absolute top-[15%] left-[8%] animate-float-slow opacity-30 text-rose-300 text-3xl">
        💖
      </div>
      <div className="absolute top-[40%] left-[5%] animate-float-slow [animation-delay:1.5s] opacity-25 text-pink-400 text-2xl">
        🌸
      </div>
      <div className="absolute top-[70%] left-[10%] animate-float-slow [animation-delay:2.5s] opacity-35 text-rose-300 text-xl">
        ✨
      </div>
      <div className="absolute top-[20%] right-[8%] animate-float-slow [animation-delay:0.8s] opacity-30 text-rose-300 text-2xl">
        💌
      </div>
      <div className="absolute top-[55%] right-[6%] animate-float-slow [animation-delay:2s] opacity-25 text-pink-400 text-3xl">
        🧸
      </div>
      <div className="absolute top-[80%] right-[12%] animate-float-slow [animation-delay:3s] opacity-30 text-rose-300 text-2xl">
        💗
      </div>
    </div>
  );
};
