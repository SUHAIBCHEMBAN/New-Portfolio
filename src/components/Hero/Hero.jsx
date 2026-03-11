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
      // 1. Initial Load Reveal
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });

      tl.from(".hero-greeting", { opacity: 0, y: 20 })
      .from(taglineRef.current, { opacity: 0, y: 20 }, "-=1.2")
      .from(".hero-description", { opacity: 0, y: 20 }, "-=1")
      .from(".hero-cta .btn", { opacity: 0, y: 20, stagger: 0.1 }, "-=1");

      // 2. ANTIGRAVITY STYLE EXPANDING REVEAL
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=200%", // Longer duration for smoother feel
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true
        }
      });

      // Perspective fade for content
      revealTl.to(contentRef.current, {
        opacity: 0,
        y: -150,
        scale: 0.8,
        filter: "blur(20px)",
        ease: "power2.in"
      })
      .fromTo(".hero-reveal-box", 
        { 
          scale: 0.1, 
          borderRadius: "60px",
          opacity: 0,
          rotateX: 45 // 3D perspective tilt
        },
        { 
          scale: 1, 
          borderRadius: "0px", 
          opacity: 1,
          rotateX: 0,
          ease: "none"
        },
        "-=0.6"
      )
      .to(".reveal-content-preview", {
        opacity: 1,
        scale: 1,
        duration: 0.5
      }, "-=0.4")
      .to(".hero-reveal-box", {
        backgroundColor: "rgba(0,0,0,1)",
        duration: 0.3
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="hero no-image" id="home">
      <div className="hero-container full-width">
        <div ref={contentRef} className="hero-content gpu-accel">
          <p className="hero-greeting">Hi, I'm</p>
          <AnimatedTitle 
            as="h1" 
            text={personalInfo.name} 
            className="hero-title"
            mode="scatter"
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
      </div>

      <div className="hero-reveal-container">
        <div className="hero-reveal-box">
          <div className="reveal-content-preview">
            <span className="reveal-label">Discover</span>
            <h2 className="reveal-text">Who I Am</h2>
          </div>
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
