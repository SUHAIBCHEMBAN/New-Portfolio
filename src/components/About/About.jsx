import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../../data/skills';
import AboutImage from './AboutImage';
import AnimatedTitle from '../shared/AnimatedTitle';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const safeSkills = Array.isArray(skills) ? skills : [];

  useEffect(() => {
    const isLiteMode =
      window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isLiteMode) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-block', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 85%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="container">
        <header className="about-header">
          <AnimatedTitle text="About" mode="split" />
        </header>

        <div className="about-grid">
          {/* Block 1: Bio */}
          <div className="about-block bio-block">
            <h3 className="block-title">01 — Background</h3>
            <div className="bio-content">
              <p className="lead-paragraph">
                I am a Full-Stack Developer specializing in high-performance web applications and premium digital experiences.
              </p>
              <p>
                Based in Kerala, India, my foundation is built on Python and JavaScript ecosystems. From engineering robust backend systems with Django to crafting fluid, responsive interfaces in React, I bridge the gap between complex logic and beautiful design.
              </p>
              <p>
                My approach is deeply analytical yet highly creative—treating code not just as instructions, but as the architecture of a brand's digital presence.
              </p>
            </div>
          </div>

          {/* Block 2: Visual */}
          <div className="about-block image-block">
            <div className="about-image-wrapper">
              <AboutImage />
            </div>
          </div>

          {/* Block 3: Arsenal */}
          <div className="about-block skills-block">
            <h3 className="block-title">02 — Arsenal</h3>
            <div className="skills-content">
              {safeSkills.map((category, idx) => (
                <div key={idx} className="skill-group">
                  <h4 className="skill-group-title">{category.category}</h4>
                  <div className="skill-tags">
                    {category.items?.map((skill, sIdx) => (
                      <span key={sIdx} className="skill-tag">{skill.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
