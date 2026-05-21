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
      // Top content reveal
      gsap.from('.about-lead', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-top-content',
          start: 'top 85%',
        }
      });

      // Description text reveal
      gsap.from('.about-description p', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-text-col',
          start: 'top 80%',
        }
      });

      // Skills grid stagger
      gsap.from('.skill-category', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 85%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="about-container">
        <div className="about-top-content">
          <div className="about-header-modern">
            <AnimatedTitle text="Behind the code" mode="split" />
          </div>
          <div className="about-lead about-fade-up">
            <p>I am a <span className="text-accent">Full-Stack Developer</span> specializing in high-performance web applications and premium digital experiences.</p>
          </div>
        </div>

        <div className="about-main-layout">
          <div className="about-image-col about-fade-up">
            <div className="about-image-modern">
              <AboutImage />
              <div className="about-badge">EST. 2023</div>
            </div>
          </div>

          <div className="about-text-col">
            <div className="about-description about-fade-up">
              <p>Based in Kerala, India, my foundation is built on Python and JavaScript ecosystems. From engineering robust backend systems with Django to crafting fluid, responsive interfaces in React, I bridge the gap between complex logic and beautiful design.</p>
              <p>My approach is deeply analytical yet highly creative—treating code not just as instructions, but as the architecture of a brand's digital presence.</p>
            </div>
            
            <div className="about-skills-modern about-fade-up">
              <h3 className="skills-title">Technical Arsenal</h3>
              <div className="skills-grid">
                {safeSkills.map((category, idx) => (
                  <div key={idx} className="skill-category">
                    <div className="skill-cat-header">
                      <span className="skill-cat-num">0{idx + 1}</span>
                      <h4>{category.category}</h4>
                    </div>
                    <div className="skill-list">
                      {category.items?.map((skill, sIdx) => (
                        <span key={sIdx}>{skill.name}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
