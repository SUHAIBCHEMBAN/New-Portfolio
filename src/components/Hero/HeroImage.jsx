export default function HeroImage() {
  return (
    <svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" className="hero-illustration">
      <defs>
        <linearGradient id="screen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#1e293b', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0f172a', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#00d4ff', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Background decoration */}
      <circle cx="300" cy="225" r="200" fill="url(#accent-grad)" opacity="0.1" />
      <circle cx="300" cy="225" r="150" fill="url(#accent-grad)" opacity="0.1" />
      
      {/* Laptop Base */}
      <rect x="100" y="350" width="400" height="20" rx="4" fill="#64748b" />
      <path d="M100 350 L500 350 L520 370 L80 370 Z" fill="#94a3b8" />
      
      {/* Screen */}
      <rect x="110" y="100" width="380" height="240" rx="8" fill="#334155" />
      <rect x="120" y="110" width="360" height="220" fill="url(#screen-grad)" />
      
      {/* Code Window */}
      <rect x="140" y="130" width="220" height="150" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
      {/* Window Controls */}
      <circle cx="155" cy="145" r="4" fill="#ef4444" />
      <circle cx="170" cy="145" r="4" fill="#eab308" />
      <circle cx="185" cy="145" r="4" fill="#22c55e" />
      
      {/* Code Lines */}
      <rect x="155" y="165" width="80" height="6" rx="2" fill="#c084fc" />
      <rect x="155" y="180" width="120" height="6" rx="2" fill="#94a3b8" />
      <rect x="175" y="195" width="100" height="6" rx="2" fill="#38bdf8" />
      <rect x="175" y="210" width="80" height="6" rx="2" fill="#94a3b8" />
      <rect x="155" y="225" width="40" height="6" rx="2" fill="#c084fc" />
      
      {/* Floating Elements (Parallax feel) */}
      <g transform="translate(380, 160)">
        <rect x="0" y="0" width="100" height="140" rx="6" fill="#1e293b" stroke="#00d4ff" strokeWidth="2" opacity="0.9" />
        <rect x="10" y="10" width="30" height="30" rx="15" fill="#00d4ff" opacity="0.2" />
        <rect x="10" y="50" width="80" height="6" rx="2" fill="#94a3b8" />
        <rect x="10" y="65" width="60" height="6" rx="2" fill="#94a3b8" />
        <rect x="10" y="80" width="70" height="6" rx="2" fill="#94a3b8" />
        
        {/* Checkmark */}
        <circle cx="70" cy="110" r="15" fill="#22c55e" opacity="0.2" />
        <path d="M63 110 L68 115 L77 105" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      
      {/* Phone/Mobile */}
      <rect x="420" y="280" width="60" height="100" rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="2" transform="rotate(-10 450 330)" />
      
    </svg>
  );
}
