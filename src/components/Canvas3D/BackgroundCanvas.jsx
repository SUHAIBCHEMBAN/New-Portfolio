import { useEffect, useState } from 'react';

export default function BackgroundCanvas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Performance Guard: Do not render 3D canvas on mobile devices
  if (isMobile) return <div className="mobile-bg-fallback" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, #000, #050505)', zIndex: 0 }} />;

  // Rest will return null for now to prioritize loading speed
  return null;
}
