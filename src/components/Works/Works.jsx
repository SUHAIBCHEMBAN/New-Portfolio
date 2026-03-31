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
  const marqueeRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee Scroll
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        }
      });

      // Project Card Reveals
      const cards = gsap.utils.toArray('.modern-project-card');
      cards.forEach((card, i) => {
        const visual = card.querySelector('.card-visual');
        const content = card.querySelector('.card-content');
        
        gsap.fromTo(visual, 
          { clipPath: 'inset(100% 0 0 0)', scale: 1.2 },
          { 
            clipPath: 'inset(0% 0 0 0)', 
            scale: 1, 
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 60%',
            }
          }
        );

        gsap.fromTo(content, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 60%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="works-unique" id="works">
      <div ref={marqueeRef} className="works-marquee">
        Work • Projects • Design • Development • Code • 
      </div>

      <div className="container">
        <AnimatedTitle text="Selected Works" mode="reveal" />
        
        <div ref={containerRef} className="projects-display">
          {projects.map((project, index) => (
            <div key={project.id} className="modern-project-card">
              <div className="card-inner">
                <div className="card-visual gpu-accel">
                  <div className="image-container">
                    <img src={project.image} alt={project.title} />
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="project-headline">{project.title}</h3>
                  <p className="project-brief">{project.description}</p>
                  
                  <div className="project-tech-stack">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span key={i} className="tech-item">{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div className="card-action">
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
