import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../../data/personal';
import AnimatedTitle from '../shared/AnimatedTitle';
import './Resume.css';

gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  const sectionRef = useRef();
  const [openId, setOpenId] = useState(experience[0]?.id || null);

  useEffect(() => {
    const isLiteMode =
      window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isLiteMode) return;

    const ctx = gsap.context(() => {
      gsap.from('.resume-accordion-item', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.resume-accordion',
          start: 'top 85%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section ref={sectionRef} className="resume-section" id="resume">
      <div className="container">
        <header className="resume-header">
          <AnimatedTitle text="Experience" mode="split" />
          <a
            href="/assets/resume.pdf"
            download="Suhaib_Chemban_Resume.pdf"
            className="btn btn-outline clickable"
            title="Download Resume"
          >
            Download CV ↘
          </a>
        </header>

        <div className="resume-accordion">
          {experience.map((job) => {
            const isOpen = openId === job.id;
            return (
              <div key={job.id} className={`resume-accordion-item ${isOpen ? 'active' : ''}`}>
                <div 
                  className="resume-accordion-header clickable" 
                  onClick={() => toggleAccordion(job.id)}
                >
                  <div className="resume-col-left">
                    <span className="resume-year">{job.duration.split('—')[0]}—</span>
                    <h3 className="resume-company">{job.company}</h3>
                  </div>
                  <div className="resume-col-right">
                    <span className="resume-position">{job.position}</span>
                    <span className={`accordion-icon ${isOpen ? 'open' : ''}`}>+</span>
                  </div>
                </div>

                <div className="resume-accordion-body" style={{ height: isOpen ? 'auto' : '0', overflow: 'hidden' }}>
                  <div className="resume-body-inner">
                    <div className="resume-desc">
                      <ul>
                        {job.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="resume-tech-list">
                      {job.technologies.map((tech, idx) => (
                        <span key={idx} className="resume-tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
