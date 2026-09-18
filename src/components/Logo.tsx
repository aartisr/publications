import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const dimensions = sizeMap[size];

  return (
    <svg
      className={`${dimensions} ${className} transition-transform duration-300 hover:scale-105`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Aarti Sri Ravikumar Portfolio Logo"
    >
      <defs>
        {/* Core Gradients */}
        <linearGradient id="logo-gold" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="logo-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="logo-navy" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0B192C" />
          <stop offset="100%" stopColor="#1E3E62" />
        </linearGradient>
        <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background soft circle highlight */}
      <circle cx="50" cy="50" r="48" fill="#FAF8F5" stroke="#E2DCD5" strokeWidth="1" />

      {/* Main Structural Monogram "A" with Orbits and Nodes */}
      {/* Outer Orbit (Atmosphere/Planetary Curve) */}
      <path
        d="M20,70 C20,35 35,20 50,20 C65,20 80,35 80,70"
        stroke="url(#logo-navy)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="2 2"
        opacity="0.3"
      />

      {/* Left elegant leg of the 'A' */}
      <path
        d="M50,15 L22,75"
        stroke="url(#logo-navy)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right elegant leg of the 'A' */}
      <path
        d="M50,15 L78,75"
        stroke="url(#logo-gold)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Interlocking Golden Crossbar representing Climate & Data curves */}
      <path
        d="M31,55 C42,48 58,48 69,55"
        stroke="url(#logo-emerald)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Core Node / Data point (Computational Science) */}
      <circle cx="50" cy="15" r="5" fill="#0B192C" />
      <circle cx="22" cy="75" r="5" fill="#D97706" />
      <circle cx="78" cy="75" r="5" fill="#047857" />

      {/* Pulse effect over the peak node */}
      <circle cx="50" cy="15" r="9" stroke="#0B192C" strokeWidth="1" opacity="0.4" className="animate-pulse" />
    </svg>
  );
};
