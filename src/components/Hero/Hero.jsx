import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroImage from './HeroImage';
import { personalInfo } from '../../data/personal';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();
  const svgBgRef = useRef();
  const taglineRef = useRef();
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Animate out
      gsap.to(taglineRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          // Change text
          setCurrentTaglineIndex((prev) => (prev + 1) % personalInfo.tagline.length);
          // Animate in
          gsap.fromTo(
            taglineRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 }
          );
        }
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Content Parallax (Moves up faster)
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // 2. Hero Image Parallax (Moves down slightly)
      gsap.to(imageRef.current, {
        y: 100,
        scale: 0.9, // Subtle scaling effect
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // 3. Background Decoration Parallax
      gsap.to(svgBgRef.current, {
        y: 150,
        rotation: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      
      // Initial Reveal Animation
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });
      
      gsap.from(imageRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="hero" id="home">
      {/* Decorative SVG Background */}
      <div ref={svgBgRef} className="hero-svg-bg">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
              <stop id="stop1" stopColor="rgba(0, 212, 255, 0.2)" offset="0%"></stop>
              <stop id="stop2" stopColor="rgba(99, 102, 241, 0.2)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path fill="url(#sw-gradient)" d="M41.8,-53.4C53.7,-45.8,62.8,-32.9,67.6,-19.1C72.4,-5.2,72.9,9.5,67.8,22.8C62.7,36.1,51.9,47.9,39.3,55.7C26.7,63.5,12.2,67.3,-1.4,69.2C-15,71.1,-28.9,71.2,-41.2,64.1C-53.5,57,-64.1,42.8,-69.1,27.3C-74.1,11.8,-73.4,-4.9,-66.6,-19.6C-59.8,-34.3,-46.8,-46.9,-33.6,-53.9C-20.4,-60.9,-6.9,-62.3,6.2,-70.8L41.8,-53.4Z" width="100%" height="100%" transform="translate(250 250)" strokeWidth="0"></path>
        </svg>
      </div>

      <div className="hero-container">
        <div ref={contentRef} className="hero-content">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-title">{personalInfo.name}</h1>
          <p ref={taglineRef} className="hero-tagline gradient-text">{personalInfo.tagline[currentTaglineIndex]}</p>
          <p className="hero-description">{personalInfo.bio[0]}</p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">
              Get In Touch
            </a>
            <a href="#works" className="btn btn-outline">
              View My Work
            </a>
          </div>
        </div>

        {/* Replaced 3D Canvas with Static SVG Image */}
        <div ref={imageRef} className="hero-image-container">
          <HeroImage />
        </div>
      </div>

      <div className="scroll-indicator" onClick={scrollToNext}>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
}
