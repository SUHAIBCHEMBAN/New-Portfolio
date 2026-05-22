import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '../shared/Magnetic';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from('.hero-badge-modern', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' })
        .from('.hero-title-modern .animate-up', {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
          clipPath: 'inset(100% 0% 0% 0%)'
        }, '-=0.6')
        .from('.hero-desc-modern', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from('.hero-cta-modern', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.hero-img-arched', {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out'
        }, '-=1');

      gsap.to('.hero-img-arched img', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      
      gsap.to('.hero-name-massive', {
        x: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero" id="home">
      <div className="hero-grid-bg"></div>
      
      <div className="hero-name-massive">
        SUHAIB CHEMBAN
      </div>

      <div className="hero-content-modern">
        <div className="hero-left-modern">
          <div className="hero-badge-modern">
            <span className="dot"></span>
            Available for freelance
          </div>
          
          <h1 className="hero-title-modern">
            <div className="line"><span className="animate-up">Digital</span></div>
            <div className="line"><span className="animate-up">Experience</span></div>
            <div className="line word-slider animate-up">
              <div className="word-slider-inner">
                <span className="text-accent">Architect.</span>
                <span className="text-accent">Developer.</span>
                <span className="text-accent">Designer.</span>
                <span className="text-accent">Creator.</span>
                <span className="text-accent">Architect.</span>
              </div>
            </div>
          </h1>
          
          <p className="hero-desc-modern">
            I engineer high-performance, award-winning digital experiences that merge cutting-edge technology with premium cinematic aesthetics.
          </p>
          
          <div className="hero-cta-modern">
            <Magnetic>
              <a href="#works" className="btn btn-primary clickable">View Projects ↗</a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn-outline clickable">Start a Project</a>
            </Magnetic>
          </div>
        </div>

        <div className="hero-right-modern">
          <div className="hero-img-arched">
            <img src="/assets/profile.webp" alt="Suhaib Chemban" />
            <div className="hero-img-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
