import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorEnabled =
    typeof window !== 'undefined' &&
    !window.matchMedia('(hover: none)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    if (!cursorEnabled) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: 'none'
      });
      
      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: 'power3.out'
      });
    };

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    const handleHover = (e) => {
      const target = e.target.closest('a, button, .clickable, .modern-project-card');
      if (target) {
        const isProject = target.classList.contains('modern-project-card');
        
        gsap.to(follower, {
          scale: isProject ? 4.5 : 3,
          duration: 0.3,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          mixBlendMode: 'difference',
          borderWidth: isProject ? '0px' : '1.5px'
        });

        if (isProject) {
          setCursorText('VIEW');
        }
      } else {
        gsap.to(follower, {
          scale: 1,
          duration: 0.3,
          backgroundColor: 'transparent',
          mixBlendMode: 'difference',
          borderWidth: '1.5px'
        });
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleHover);
    document.body.addEventListener('mouseenter', onMouseEnter);
    document.body.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleHover);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      document.body.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [cursorEnabled]);

  if (!cursorEnabled) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        className="custom-cursor-dot" 
        style={{ opacity: isHovering ? 1 : 0 }}
      />
      <div 
        ref={followerRef} 
        className="custom-cursor-follower"
        style={{ opacity: isHovering ? 1 : 0 }}
      >
        <span className="cursor-text">{cursorText}</span>
      </div>
    </>
  );
}
