import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './BackgroundDecor.css';

export default function BackgroundDecor() {
  const containerRef = useRef(null);

  useEffect(() => {
    const isLiteMode =
      window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isLiteMode || !containerRef.current) return;

    const shapes = containerRef.current.querySelectorAll('.decor-shape');
    const animations = [];
    
    shapes.forEach((shape, index) => {
      // Different parallax speeds for each shape
      const speed = 0.05 + (index * 0.02);
      
      animations.push(gsap.to(shape, {
        y: () => -(window.innerHeight * speed * 2), // Move up on scroll
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      }));

      // Subtle float animation
      animations.push(gsap.to(shape, {
        x: '+=20',
        y: '+=20',
        duration: 3 + index,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      }));
    });

    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="background-decor">
      <div className="decor-shape shape-1" />
      <div className="decor-shape shape-2" />
      <div className="decor-shape shape-3" />
      <div className="noise-overlay" />
    </div>
  );
}
