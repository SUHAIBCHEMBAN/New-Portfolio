import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { personalInfo } from '../../data/personal';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Very simple, robust fade-in entrance
      gsap.from(".hero-content > *", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const [firstName, lastName] = personalInfo.name.split(' ');

  return (
    <section ref={heroRef} className="hero" id="home">
      <div className="hero-content container">
        <span className="hero-greeting">Lead Digital Architect</span>
        
        <h1 className="hero-title">
          <span className="title-top">{firstName}</span>
          <span className="title-bottom">{lastName}</span>
        </h1>

        <p className="hero-tagline">
          Designing and engineering high-impact digital experiences for the next generation.
        </p>

        <div className="hero-cta">
          <a href="#works" className="btn btn-primary">Selected Works</a>
          <a href="#contact" className="btn btn-outline">Start Project</a>
        </div>
      </div>

      <div className="scroll-indicator" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
