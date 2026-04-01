import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects';
import AnimatedTitle from '../shared/AnimatedTitle';
import Magnetic from '../shared/Magnetic';
import './Works.css';

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const sectionRef = useRef();

  useEffect(() => {
    const isLiteMode =
      window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isLiteMode) return;

    // Robust, non-blocking entrance animations
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.modern-project-card');
      
      cards.forEach((card) => {
        const visual = card.querySelector('.card-visual');
        const content = card.querySelector('.card-content');
        
        // Simple, clean reveals that ensure content is always visible
        gsap.from(visual, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });

        gsap.from(content, {
          opacity: 0,
          y: 40,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="works-unique" id="works">
      {/* Background Marquee - Fixed & Low Prominence */}
      <div className="works-marquee-wrapper">
        <div className="works-marquee-static">Projects • Experience • Solutions • Works • </div>
      </div>

      <div className="container">
        <header className="works-header" style={{ marginBottom: '5rem' }}>
          <AnimatedTitle text="Selected Works" mode="reveal" />
        </header>
        
        <div className="projects-display">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`modern-project-card ${index % 2 === 1 ? 'card-reverse' : ''}`}
            >
              <div className="card-inner">
                {/* Visual Frame - Uniform Across All Cards */}
                <div className="card-visual gpu-accel">
                  <div className="image-container">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      sizes="(max-width: 768px) 100vw, (max-width: 1100px) 90vw, 50vw"
                    />
                  </div>
                </div>

                {/* Content Block */}
                <div className="card-content">
                  <h3 className="project-headline">{project.title}</h3>
                  <p className="project-brief">{project.description}</p>
                  
                  <div className="project-tech-stack">
                    <div className="tech-tags-wrapper">
                      {project.technologies?.slice(0, 4).map((tech, i) => (
                        <span key={i} className="tech-tag-item">{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div className="card-btn-wrap">
                    <Magnetic>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary clickable">
                        Explore Project
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
