import React from 'react';

interface CutePandaProps {
  className?: string;
  size?: number;
}

export const CutePanda: React.FC<CutePandaProps> = ({ className = '', size = 220 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        <circle cx="110" cy="110" r="95" fill="#F0FDF4" fillOpacity="0.6" />

        {/* Panda Ears */}
        <circle cx="62" cy="62" r="24" fill="#1E293B" />
        <circle cx="158" cy="62" r="24" fill="#1E293B" />

        {/* Body */}
        <ellipse cx="110" cy="165" rx="58" ry="44" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />

        {/* Black Arm patches & feet */}
        <ellipse cx="64" cy="155" rx="18" ry="24" fill="#1E293B" transform="rotate(-15 64 155)" />
        <ellipse cx="156" cy="155" rx="18" ry="24" fill="#1E293B" transform="rotate(15 156 155)" />
        <ellipse cx="80" cy="192" rx="16" ry="12" fill="#1E293B" />
        <ellipse cx="140" cy="192" rx="16" ry="12" fill="#1E293B" />

        {/* Head */}
        <ellipse cx="110" cy="105" rx="55" ry="46" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="2" />

        {/* Eye Patches */}
        <ellipse cx="82" cy="98" rx="16" ry="20" fill="#1E293B" transform="rotate(-18 82 98)" />
        <ellipse cx="138" cy="98" rx="16" ry="20" fill="#1E293B" transform="rotate(18 138 98)" />

        {/* Cute Eyes inside patches */}
        <circle cx="84" cy="98" r="6" fill="#FFFFFF" />
        <circle cx="85" cy="97" r="4.5" fill="#0F172A" />
        <circle cx="83.5" cy="95.5" r="2" fill="#FFFFFF" />

        <circle cx="136" cy="98" r="6" fill="#FFFFFF" />
        <circle cx="135" cy="97" r="4.5" fill="#0F172A" />
        <circle cx="136.5" cy="95.5" r="2" fill="#FFFFFF" />

        {/* Rosy Blushing Cheeks */}
        <ellipse cx="66" cy="116" rx="12" ry="7" fill="#FB7185" opacity="0.65" />
        <ellipse cx="154" cy="116" rx="12" ry="7" fill="#FB7185" opacity="0.65" />

        {/* Nose & Mouth */}
        <ellipse cx="110" cy="112" rx="7" ry="5" fill="#0F172A" />
        <path d="M 110 117 L 110 122 M 105 122 Q 110 126 115 122" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />

        {/* Little Heart or Flower held in paws */}
        <path
          d="M 110 148 C 106 142 98 142 98 150 C 98 157 110 164 110 164 C 110 164 122 157 122 150 C 122 142 114 142 110 148 Z"
          fill="#FB7185"
        />
      </svg>
    </div>
  );
};
