import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../../data/personal';
import AnimatedTitle from '../shared/AnimatedTitle';
import './Resume.css';

gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  const sectionRef = useRef();

  useEffect(() => {
    const isLiteMode =
      window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isLiteMode) return;

    const ctx = gsap.context(() => {
      // Animate resume rows as they appear on scroll
      const rows = gsap.utils.toArray('.resume-row');
      rows.forEach((row) => {
        gsap.fromTo(row, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="resume" id="resume">
      <div className="container">
        <AnimatedTitle text="Professional Path" mode="reveal" />
        
        <div className="resume-list">
          {experience.map((job) => (
            <div key={job.id} className="resume-row">
              <div className="resume-row-inner g-accel">
                <div className="resume-year">{job.duration.split('—')[0]}—</div>
                
                <div className="resume-company">
                  {job.company}
                  <span>{job.position}</span>
                </div>

                <div className="resume-details">
                   {job.description[0]}
                </div>

                <div className="resume-tech">
                  {job.technologies.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
