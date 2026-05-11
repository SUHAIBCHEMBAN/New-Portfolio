import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects';
import AnimatedTitle from '../shared/AnimatedTitle';
import Magnetic from '../shared/Magnetic';
import './Works.css';

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const sectionRef = useRef();
  const [hoveredProject, setHoveredProject] = useState(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const isLiteMode =
      window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isLiteMode) {
      const ctx = gsap.context(() => {
        const rows = gsap.utils.toArray('.works-list-row');
        rows.forEach((row) => {
          gsap.from(row, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
            }
          });
        });
      }, sectionRef);
      return () => ctx.revert();
    }

    const ctx = gsap.context(() => {
      // Reveal rows
      const rows = gsap.utils.toArray('.works-list-row');
      rows.forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
          }
        });
      });

      // Hover image cursor follow
      const moveCursor = (e) => {
        if (!cursorRef.current) return;
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', moveCursor);
      return () => {
        window.removeEventListener('mousemove', moveCursor);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="works-list-section" id="works">
      <div className="container">
        <header className="works-list-header">
          <AnimatedTitle text="Selected Works" mode="split" />
          <div className="works-list-meta">
            <span className="works-count">[{projects.length}]</span>
            <span className="works-label">Recent Projects</span>
          </div>
        </header>
        
        <div className="works-list-container">
          <div className="works-list-headings">
            <div className="col-idx">ID</div>
            <div className="col-title">Project</div>
            <div className="col-role">Category</div>
            <div className="col-tech">Stack</div>
            <div className="col-link">Link</div>
          </div>

          {projects.map((project, index) => (
            <div
              key={project.id}
              className="works-list-row clickable"
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="col-idx">
                {(index + 1).toString().padStart(2, '0')}
              </div>
              <div className="col-title">
                <h3>{project.title}</h3>
                <img src={project.image} alt={project.title} className="works-mobile-img" />
              </div>
              <div className="col-role">
                {project.category}
              </div>
              <div className="col-tech">
                {project.technologies?.slice(0, 3).join(' / ')}
              </div>
              <div className="col-link">
                 {project.liveUrl && (
                   <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="works-external-link">
                     Visit ↗
                   </a>
                 )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover Image Reveal */}
      <div 
        ref={cursorRef} 
        className={`works-hover-reveal ${hoveredProject ? 'active' : ''}`}
      >
        <div className="works-hover-inner">
          {projects.map(p => (
            <img 
              key={p.id}
              src={p.image} 
              alt={p.title} 
              className={`works-hover-img ${hoveredProject?.id === p.id ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
