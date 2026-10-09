import React from 'react';

interface TeddyCoupleProps {
  className?: string;
  size?: number;
}

export const TeddyCouple: React.FC<TeddyCoupleProps> = ({ className = '', size = 280 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="bear1Grad" x1="40" y1="40" x2="160" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D97706" />
            <stop offset="1" stopColor="#92400E" />
          </linearGradient>
          <linearGradient id="bear2Grad" x1="120" y1="40" x2="240" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="1" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="snoutGrad" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#FEF3C7" />
            <stop offset="1" stopColor="#FDE68A" />
          </linearGradient>
        </defs>

        {/* Ambient background glow */}
        <circle cx="140" cy="140" r="125" fill="#FFE4E6" fillOpacity="0.5" />

        {/* Floating hearts above couple */}
        <g className="animate-pulse">
          <path
            d="M 140 38 C 134 26 118 26 118 40 C 118 54 140 66 140 66 C 140 66 162 54 162 40 C 162 26 146 26 140 38 Z"
            fill="#E11D48"
          />
          <path
            d="M 112 60 C 107 51 95 51 95 62 C 95 73 112 82 112 82 C 112 82 129 73 129 62 C 129 51 117 51 112 60 Z"
            fill="#FB7185"
            transform="rotate(-12 112 60)"
          />
          <path
            d="M 168 60 C 163 51 151 51 151 62 C 151 73 168 82 168 82 C 168 82 185 73 185 62 C 185 51 173 51 168 60 Z"
            fill="#FB7185"
            transform="rotate(12 168 60)"
          />
        </g>

        {/* Bear 1 (Left) Ears */}
        <circle cx="68" cy="100" r="24" fill="url(#bear1Grad)" />
        <circle cx="68" cy="100" r="14" fill="#FDE68A" opacity="0.6" />
        <circle cx="132" cy="94" r="22" fill="url(#bear1Grad)" />

        {/* Bear 2 (Right) Ears */}
        <circle cx="152" cy="94" r="22" fill="url(#bear2Grad)" />
        <circle cx="216" cy="100" r="24" fill="url(#bear2Grad)" />
        <circle cx="216" cy="100" r="14" fill="#FDE68A" opacity="0.6" />

        {/* Bow on Bear 2's right ear */}
        <g transform="translate(196, 86)">
          <path d="M 0 6 L 14 0 L 14 12 Z" fill="#FB7185" />
          <path d="M 28 6 L 14 0 L 14 12 Z" fill="#FB7185" />
          <circle cx="14" cy="6" r="4" fill="#E11D48" />
        </g>

        {/* Bodies cuddling */}
        <ellipse cx="102" cy="205" rx="48" ry="42" fill="url(#bear1Grad)" />
        <ellipse cx="178" cy="205" rx="48" ry="42" fill="url(#bear2Grad)" />

        {/* Bear 1 Head */}
        <circle cx="102" cy="142" r="48" fill="url(#bear1Grad)" />
        {/* Bear 2 Head */}
        <circle cx="178" cy="142" r="48" fill="url(#bear2Grad)" />

        {/* Bear 1 Face */}
        <ellipse cx="112" cy="154" rx="24" ry="18" fill="url(#snoutGrad)" />
        <ellipse cx="114" cy="146" rx="7" ry="5" fill="#451A03" />
        {/* Happy Smiling closed eyes for Bear 1 */}
        <path d="M 86 136 Q 94 130 102 136" stroke="#451A03" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 116 136 Q 124 130 132 136" stroke="#451A03" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 114 151 Q 114 158 122 158" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Rosy blush */}
        <ellipse cx="84" cy="152" rx="10" ry="6" fill="#FB7185" opacity="0.75" />

        {/* Bear 2 Face */}
        <ellipse cx="168" cy="154" rx="24" ry="18" fill="url(#snoutGrad)" />
        <ellipse cx="166" cy="146" rx="7" ry="5" fill="#451A03" />
        {/* Happy Smiling closed eyes for Bear 2 */}
        <path d="M 150 136 Q 158 130 166 136" stroke="#451A03" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 180 136 Q 188 130 196 136" stroke="#451A03" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 166 151 Q 166 158 158 158" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Rosy blush */}
        <ellipse cx="196" cy="152" rx="10" ry="6" fill="#FB7185" opacity="0.75" />

        {/* Hugging Arms intertwining */}
        <path
          d="M 90 190 Q 140 178 170 200"
          stroke="url(#bear1Grad)"
          strokeWidth="24"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 190 190 Q 140 178 110 200"
          stroke="url(#bear2Grad)"
          strokeWidth="22"
          strokeLinecap="round"
          fill="none"
        />
        {/* Paw pads touching */}
        <circle cx="140" cy="192" r="10" fill="#FDE68A" opacity="0.7" />
      </svg>
    </div>
  );
};
