import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../../data/personal';
import Magnetic from '../shared/Magnetic';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.from('.hero-top-bar > *', { opacity: 0, y: -8, duration: 0.6, stagger: 0.1, ease: 'power2.out' })
        .from('.hero-name .name-char', {
          yPercent: 110,
          rotationZ: 3,
          duration: 1.1,
          stagger: 0.03,
          ease: 'expo.out'
        }, '-=0.3')
        .from('.hero-divider', { scaleX: 0, duration: 0.8, ease: 'power3.out', transformOrigin: 'left' }, '-=0.5')
        .from('.hero-info-bar > *', { opacity: 0, y: 10, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.4');

      gsap.to('.scroll-line', {
        scaleY: 1.4, y: 18, opacity: 0,
        repeat: -1, duration: 1.6, ease: 'power1.inOut'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const nameParts = personalInfo.name.toUpperCase().split(' ');

  return (
    <section ref={heroRef} className="hero" id="home">

      {/* Top Bar */}
      <div className="hero-top-bar">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Available for Work
        </div>
        <div className="hero-top-meta">
          <span>Full Stack Developer</span>
          <span className="hero-top-divider">—</span>
          <span>Kerala, India</span>
        </div>
        <span className="hero-year">© {new Date().getFullYear()}</span>
      </div>

      {/* Massive Name */}
      <div className="hero-name-wrapper">
        <h1 className="hero-name">
          {nameParts.map((word, wi) => (
            <div key={wi} className={`hero-name-row ${wi % 2 === 1 ? 'name-row-right' : ''}`}>
              {word.split('').map((char, ci) => (
                <span key={ci} className="name-char" style={{ display: 'inline-block' }}>{char}</span>
              ))}
            </div>
          ))}
        </h1>
      </div>

      {/* Divider */}
      <div className="hero-divider">
        <div className="hero-marquee-track">
          {['Full Stack Dev', '·', 'UI/UX', '·', 'React', '·', 'Django', '·', 'Web Design', '·', 'Open to Work', '·',
            'Full Stack Dev', '·', 'UI/UX', '·', 'React', '·', 'Django', '·', 'Web Design', '·', 'Open to Work', '·'].map((item, i) => (
            <span key={i} className="hero-marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* Info Bar */}
      <div className="hero-info-bar">
        <p className="hero-tagline">
          Designing &amp; engineering high-impact digital experiences for the next generation.
        </p>
        <div className="hero-cta">
          <Magnetic>
            <a href="#works" className="btn btn-primary clickable">View Work ↗</a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="btn btn-outline clickable">Start a Project</a>
          </Magnetic>
        </div>
      </div>

      {/* Scroll */}
      <div className="scroll-indicator" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <div className="scroll-line"></div>
      </div>

    </section>
  );
}
