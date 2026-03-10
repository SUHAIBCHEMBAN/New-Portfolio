import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroImage from './HeroImage';
import AnimatedTitle from '../shared/AnimatedTitle';
import { personalInfo } from '../../data/personal';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();
  const taglineRef = useRef();
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Animate out
      gsap.to(taglineRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.5,
        onComplete: () => {
          setCurrentTaglineIndex((prev) => (prev + 1) % personalInfo.tagline.length);
          gsap.fromTo(
            taglineRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5 }
          );
        }
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a master timeline for the initial reveal
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });

      // Build out the high-end initial load sequence
      tl.from(".hero-greeting", {
        opacity: 0,
        y: 20
      })
      .from(imageRef.current, {
        opacity: 0,
        scale: 1.1,
        clipPath: 'circle(0% at 50% 50%)', // Stylish circular wipe
        duration: 2
      }, "-=1.2")
      .from(taglineRef.current, {
        opacity: 0,
        y: 20
      }, "-=1.5")
      .from(".hero-description", {
        opacity: 0,
        y: 20
      }, "-=1.4")
      .from(".hero-cta .btn", {
        opacity: 0,
        y: 20,
        stagger: 0.1
      }, "-=1.4");

      // Awwwards-style Parallax Scrolling Effect
      // 1. Hero Content Parallax (Moves up and fades)
      gsap.to(contentRef.current, {
        y: -150, // More aggressive parallax
        filter: "blur(10px)",
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5 // Smooth scrubbing
        }
      });

      // 2. Hero Image Parallax (Moves up at a different rate, creating depth)
      gsap.to(imageRef.current, {
        y: -50,
        scale: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
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
      <div className="hero-container">
        <div ref={contentRef} className="hero-content gpu-accel">
          <p className="hero-greeting">Hi, I'm</p>
          <AnimatedTitle 
            as="h1" 
            text={personalInfo.name} 
            className="hero-title"
            mode="skew"
            gradient={true}
          />
          <p ref={taglineRef} className="hero-tagline gradient-text">{personalInfo.tagline[currentTaglineIndex]}</p>
          <p className="hero-description">{personalInfo.bio[0]}</p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">
              Get In Touch
            </a>
            <a href="#works" className="btn btn-outline">
              View Work
            </a>
          </div>
        </div>

        <div ref={imageRef} className="hero-image-container gpu-accel">
          <HeroImage />
        </div>
      </div>

      <div className="scroll-indicator" onClick={scrollToNext}>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
