export default function Logo({ className = '' }) {
  return (
    <svg viewBox="0 0 260 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Sun */}
      <circle cx="120" cy="45" r="28" fill="var(--color-primary-container)" />
      {/* Back Wave */}
      <path d="M 60 70 Q 100 50 140 70 T 220 65 L 220 100 L 60 100 Z" fill="var(--color-on-secondary-container)" />
      {/* Front Wave */}
      <path d="M 50 85 Q 90 65 130 85 T 230 75 L 230 100 L 50 100 Z" fill="var(--color-secondary-container)" />
      {/* Accent Wave */}
      <path d="M 50 95 Q 100 80 150 95 T 240 85 L 240 100 L 50 100 Z" fill="var(--color-secondary)" />
      {/* Palm Trunk */}
      <path d="M 65 95 C 70 60 80 40 100 35 L 105 35 C 85 45 78 65 75 95 Z" fill="var(--color-on-secondary-container)" />
      {/* Coconuts */}
      <circle cx="92" cy="42" r="5" fill="var(--color-on-secondary-container)" />
      <circle cx="102" cy="40" r="4" fill="var(--color-on-secondary-container)" />
      {/* Leaves */}
      <path d="M 100 35 C 70 20 50 35 50 35 C 65 25 85 28 100 35 Z" fill="var(--color-on-secondary-container)" />
      <path d="M 100 35 C 120 15 145 25 145 25 C 130 20 110 25 100 35 Z" fill="var(--color-on-secondary-container)" />
      <path d="M 100 35 C 90 10 105 5 105 5 C 105 15 105 25 100 35 Z" fill="var(--color-secondary-container)" />
      <path d="M 100 35 C 65 45 50 65 50 65 C 65 50 85 45 100 35 Z" fill="var(--color-secondary-container)" />
      <path d="M 100 35 C 130 45 155 55 155 55 C 140 45 120 42 100 35 Z" fill="var(--color-secondary-container)" />
      {/* Text */}
      <text x="85" y="82" fontFamily="var(--font-family)" fontWeight="800" fontSize="34" fill="var(--color-on-secondary-container)" stroke="var(--color-surface-container-lowest)" strokeWidth="4" paintOrder="stroke fill" letterSpacing="-0.02em">SAYULITA</text>
      <text x="165" y="98" fontFamily="var(--font-family)" fontWeight="500" fontSize="14" fill="var(--color-on-secondary-container)" letterSpacing="0.05em">Travels</text>
    </svg>
  );
}
