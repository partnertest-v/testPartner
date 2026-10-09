import React from 'react';

interface TeddyAskingProps {
  className?: string;
  size?: number;
}

export const TeddyAsking: React.FC<TeddyAskingProps> = ({ className = '', size = 260 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md transition-transform duration-300"
      >
        <defs>
          {/* Gradients for warm fluffy look */}
          <linearGradient id="furGradient" x1="50" y1="30" x2="210" y2="230" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D97736" />
            <stop offset="0.5" stopColor="#B45309" />
            <stop offset="1" stopColor="#854D0E" />
          </linearGradient>
          <linearGradient id="innerEarGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FDBA74" />
            <stop offset="1" stopColor="#F43F5E" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="muzzleGrad" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#FEF3C7" />
            <stop offset="1" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="sweaterGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FB7185" />
            <stop offset="1" stopColor="#E11D48" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer gentle ambient circle */}
        <circle cx="130" cy="130" r="115" fill="#FFE4E6" fillOpacity="0.45" />

        {/* Ears */}
        {/* Left Ear */}
        <circle cx="75" cy="72" r="32" fill="url(#furGradient)" />
        <circle cx="77" cy="72" r="19" fill="url(#innerEarGrad)" />
        {/* Right Ear */}
        <circle cx="185" cy="72" r="32" fill="url(#furGradient)" />
        <circle cx="183" cy="72" r="19" fill="url(#innerEarGrad)" />

        {/* Body & Sweater */}
        <ellipse cx="130" cy="195" rx="68" ry="52" fill="url(#sweaterGrad)" />
        {/* Sweater Collar */}
        <path
          d="M 100 156 Q 130 172 160 156 Q 163 166 156 172 Q 130 184 104 172 Z"
          fill="#FFF1F2"
          opacity="0.95"
        />
        {/* Cute heart on sweater */}
        <path
          d="M 130 186 C 126 178 116 178 116 188 C 116 197 130 205 130 205 C 130 205 144 197 144 188 C 144 178 134 178 130 186 Z"
          fill="#FFF1F2"
        />

        {/* Head */}
        <circle cx="130" cy="120" r="64" fill="url(#furGradient)" />

        {/* Muzzle */}
        <ellipse cx="130" cy="136" rx="34" ry="25" fill="url(#muzzleGrad)" />

        {/* Nose */}
        <ellipse cx="130" cy="126" rx="10" ry="7" fill="#451A03" />
        <ellipse cx="127" cy="124" rx="3" ry="2" fill="#FFFFFF" opacity="0.8" />

        {/* Mouth */}
        <path
          d="M 130 133 L 130 142 M 122 142 Q 130 148 130 142 Q 130 148 138 142"
          stroke="#451A03"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Big Sparkling Eyes (Shy & Loving) */}
        {/* Left Eye */}
        <circle cx="102" cy="108" r="9.5" fill="#1C1917" />
        <circle cx="99" cy="105" r="3.5" fill="#FFFFFF" />
        <circle cx="104" cy="111" r="1.5" fill="#FFFFFF" />

        {/* Right Eye */}
        <circle cx="158" cy="108" r="9.5" fill="#1C1917" />
        <circle cx="155" cy="105" r="3.5" fill="#FFFFFF" />
        <circle cx="160" cy="111" r="1.5" fill="#FFFFFF" />

        {/* Rosy Blushing Cheeks */}
        <ellipse cx="88" cy="132" rx="14" ry="9" fill="#FB7185" opacity="0.65" />
        <ellipse cx="172" cy="132" rx="14" ry="9" fill="#FB7185" opacity="0.65" />

        {/* Paws holding the letter envelope */}
        {/* Paws */}
        <circle cx="86" cy="190" r="16" fill="url(#furGradient)" />
        <circle cx="86" cy="190" r="10" fill="#FDE68A" opacity="0.85" />

        <circle cx="174" cy="190" r="16" fill="url(#furGradient)" />
        <circle cx="174" cy="190" r="10" fill="#FDE68A" opacity="0.85" />

        {/* Small letter envelope held in paws */}
        <g transform="translate(102, 178)">
          <rect width="56" height="38" rx="5" fill="#FFFFFF" stroke="#FECDD3" strokeWidth="1.5" />
          <path d="M 0 0 L 28 20 L 56 0" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" />
          {/* Heart seal */}
          <path
            d="M 28 21 C 25.5 16 19 16 19 22 C 19 28 28 33 28 33 C 28 33 37 28 37 22 C 37 16 30.5 16 28 21 Z"
            fill="#E11D48"
          />
        </g>
      </svg>
    </div>
  );
};
