import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedTitle({
  text = "",
  className = '',
  as: Component = 'h2',
  mode = 'auto',
  delay = 0,
  gradient = true,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    if (!text) return;

    const words = text.split(' ');
    let resolvedMode = mode;
    if (mode === 'auto') {
      if (words.length === 1) resolvedMode = 'split';
      else if (words.length === 2) resolvedMode = 'skew';
      else resolvedMode = 'reveal';
    }

    const ctx = gsap.context(() => {
      // Simplified & Safened Scroll Animation
      const animateTarget = resolvedMode === 'split' ? '.char' : '.word-inner';
      const items = el.querySelectorAll(animateTarget);
      
      if (!items.length) return;

      // Ensure they show immediately if anything fails
      gsap.from(items, {
        opacity: 0,
        y: "110%",
        rotateX: resolvedMode === 'skew' ? 15 : 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          toggleActions: "play none none none"
        }
      });
    }, el);

    return () => ctx.revert();
  }, [text, mode, delay]);

  if (!text) return null;

  const words = text.split(' ');
  const resolvedMode = mode === 'auto'
    ? (words.length === 1 ? 'split' : words.length === 2 ? 'skew' : 'reveal')
    : mode;

  return (
    <Component
      ref={containerRef}
      className={`animated-title-unique ${className}`}
      style={{ overflow: 'hidden' }}
    >
      {words.map((word, wi) => (
        <span 
          key={wi} 
          className="word-mask" 
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.3em' }}
        >
          <span 
            className={`word-inner gpu-accel ${wi === words.length - 1 && gradient ? 'gradient-text' : ''}`}
            style={{ display: 'inline-block' }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
