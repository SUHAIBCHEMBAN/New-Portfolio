import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedTitle — Kinetic Typography Engine
 * 
 * Modes:
 *  - "reveal"  : Words masked inside overflow:hidden divs, slide UP into view (classic editorial reveal)
 *  - "split"   : Each CHARACTER animates in a stagger (kinetic char-level)
 *  - "word"    : Word-by-word stagger with blur + Y transform
 *  - "skew"    : Words skew + slide in with perspective
 * 
 * Default mode is auto-selected based on word count.
 */
export default function AnimatedTitle({
  text,
  className = '',
  as: Component = 'h2',
  mode = 'auto', // 'auto' | 'reveal' | 'split' | 'word' | 'skew'
  delay = 0,
  gradient = true, // Whether to apply gradient to the last word
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    // Determine mode
    const words = text.split(' ');
    let resolvedMode = mode;
    if (mode === 'auto') {
      if (words.length === 1) resolvedMode = 'split';
      else if (words.length === 2) resolvedMode = 'skew';
      else resolvedMode = 'reveal';
    }

    const ctx = gsap.context(() => {
      if (resolvedMode === 'reveal') {
        // Each word is inside a .word-mask, the inner .word-inner slides UP into view
        const wordInners = el.querySelectorAll('.word-inner');
        gsap.set(wordInners, { y: '110%', rotationZ: 3 });
        gsap.to(wordInners, {
          y: '0%',
          rotationZ: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: 'expo.out',
          delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });

      } else if (resolvedMode === 'split') {
        // Character-level kinetic entrance
        const chars = el.querySelectorAll('.char');
        gsap.set(chars, { y: 60, opacity: 0, rotationX: -80, transformOrigin: 'top center' });
        gsap.to(chars, {
          y: 0,
          opacity: 1,
          rotationX: 0,
          stagger: 0.04,
          duration: 0.9,
          ease: 'back.out(1.4)',
          delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });

      } else if (resolvedMode === 'word') {
        // Word-by-word: blur + translate Y
        const wordEls = el.querySelectorAll('.word-inner');
        gsap.set(wordEls, { y: 40, opacity: 0, filter: 'blur(12px)' });
        gsap.to(wordEls, {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.12,
          duration: 1.2,
          ease: 'power3.out',
          delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });

      } else if (resolvedMode === 'skew') {
        // Skew + slide for 2-word titles — cinematic feel
        const wordInners = el.querySelectorAll('.word-inner');
        if (wordInners.length >= 1) {
          gsap.set(wordInners[0], { x: -60, skewX: -12, opacity: 0 });
          gsap.to(wordInners[0], {
            x: 0, skewX: 0, opacity: 1,
            duration: 1.2, ease: 'expo.out', delay,
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
          });
        }
        if (wordInners.length >= 2) {
          gsap.set(wordInners[1], { x: 60, skewX: 12, opacity: 0 });
          gsap.to(wordInners[1], {
            x: 0, skewX: 0, opacity: 1,
            duration: 1.2, ease: 'expo.out', delay: delay + 0.15,
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
          });
        }
      } else if (resolvedMode === 'scatter') {
        const chars = el.querySelectorAll('.char');
        gsap.set(chars, { opacity: 0, y: 30 });
        
        // Initial entrance
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 1,
          ease: 'power4.out',
          delay
        });

        // Scroll scatter effect
        chars.forEach((char, i) => {
          // Asymmetric scatter for chaos
          const xDir = (Math.random() - 0.5) * 800;
          const yDir = (Math.random() - 0.3) * 600;
          const rotate = (Math.random() - 0.5) * 360;

          gsap.to(char, {
            x: xDir,
            y: yDir,
            rotation: rotate,
            opacity: 0,
            scale: 0.5,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 5%',
              end: 'bottom+=500 top',
              scrub: 1,
            }
          });
        });
      }
    }, el);

    return () => ctx.revert();
  }, [text, mode, delay]);

  const words = text.split(' ');

  // For 'split' mode we render individual characters
  const resolvedMode = mode === 'auto'
    ? (words.length === 1 ? 'split' : words.length === 2 ? 'skew' : 'reveal')
    : mode;

  return (
    <Component
      ref={containerRef}
      className={`section-title animated-title ${className}`}
      aria-label={text}
    >
      {words.map((word, wi) => {
        const isLast = wi === words.length - 1;
        const isFirst = wi === 0;

        if (resolvedMode === 'split') {
          return (
            <span
              key={wi}
              className="word-mask"
              style={{ display: 'inline-block', marginRight: wi !== words.length - 1 ? '0.3em' : 0 }}
            >
              {word.split('').map((char, ci) => (
                <span
                  key={ci}
                  className={`char gpu-accel ${isLast && gradient ? 'gradient-text' : ''}`}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </span>
              ))}
            </span>
          );
        }

        return (
          <span
            key={wi}
            className="word-mask"
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom',
              marginRight: wi !== words.length - 1 ? '0.3em' : 0,
            }}
            aria-hidden="true"
          >
            <span
              className={`word-inner gpu-accel ${isLast && gradient ? 'gradient-text' : ''}`}
              style={{ display: 'inline-block' }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Component>
  );
}
