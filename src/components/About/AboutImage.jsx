import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaUser } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function AboutImage() {
  const frameRef = useRef();

  useEffect(() => {
    const isLiteMode =
      window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isLiteMode) return;

    const ctx = gsap.context(() => {
      // Premium clip-path reveal
      gsap.fromTo(".about-image-inner img", 
        { 
          clipPath: "inset(100% 0% 0% 0%)",
          scale: 1.2
        },
        { 
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.5, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: frameRef.current,
            start: "top 85%"
          }
        }
      );
    }, frameRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate center relative position -1 to 1
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    // Tilt effect
    gsap.to(frameRef.current, {
      rotationY: x * 20, // Rotate Y based on X mouse
      rotationX: -y * 20, // Rotate X based on Y mouse (inverted)
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.5
    });
  };

  const handleMouseLeave = () => {
    gsap.to(frameRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: "power2.out",
      duration: 0.8
    });
  };

  return (
    <div 
      className="about-image-container" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={frameRef}
    >
      <img 
        src="/assets/profile.PNG" 
        alt="Suhaib - Full Stack Developer" 
        className="about-profile-photo" 
      />
    </div>
  );
}
