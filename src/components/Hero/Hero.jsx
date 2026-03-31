import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { personalInfo } from '../../data/personal';
import Magnetic from '../shared/Magnetic';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Premium Entrance Animation Only (No scroll-triggered translation)
      tl.from(".hero-greeting", { 
        opacity: 0, 
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(".title-top", {
        y: 100,
        opacity: 0,
        rotateX: -20,
        duration: 1.2,
        ease: "expo.out"
      }, "-=0.4")
      .from(".title-bottom", {
        y: 100,
        opacity: 0,
        rotateX: 20,
        duration: 1.2,
        ease: "expo.out"
      }, "-=1.0")
      .from(".hero-tagline, .hero-cta", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2
      }, "-=0.6");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const nameParts = personalInfo.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <section ref={heroRef} className="hero" id="home">
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <span className="hero-greeting">Digital Architect & Developer</span>
        
        <h1 className="hero-title">
          <span className="title-top">{firstName}</span>
          <span className="title-bottom">{lastName}</span>
        </h1>

        <p className="hero-tagline">
          Crafting high-performance digital experiences through innovative code and award-winning design.
        </p>

        <div className="hero-cta">
          <Magnetic>
            <a href="#works" className="btn btn-primary clickable">View Selected Works</a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="btn btn-outline clickable">Start a Project</a>
          </Magnetic>
        </div>
      </div>

      <div className="scroll-indicator" onClick={scrollToNext}>
        <span>Scroll Down</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
