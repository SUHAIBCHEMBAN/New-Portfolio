import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects';
import AnimatedTitle from '../shared/AnimatedTitle';
import './Works.css';

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const sectionRef = useRef();

  useEffect(() => {
    const isLiteMode =
      window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isLiteMode) {
      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray('.work-item-modern');
        items.forEach((item) => {
          gsap.from(item, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          });
        });
      }, sectionRef);
      return () => ctx.revert();
    }

    const ctx = gsap.context(() => {
      gsap.from('.works-header-modern > *', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.works-header-modern',
          start: 'top 85%',
        }
      });

      const items = gsap.utils.toArray('.work-item-modern');
      items.forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          y: 100,
          scale: 0.95,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        });

        // Image Parallax removed to keep the entire laptop image fully visible without cropping
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="works-modern-section" id="works">
      <div className="works-container">
        
        <header className="works-header-modern">
          <AnimatedTitle text="Selected Works" mode="split" />
          <div className="works-badge-modern">
            <span className="dot"></span>
            <span className="text">[{projects.length}] RECENT PROJECTS</span>
          </div>
        </header>
        
        <div className="works-grid-modern">
          {projects.map((project, index) => (
            <article key={project.id} className="work-item-modern clickable">
              <a href={project.liveUrl || '#works'} target={project.liveUrl ? '_blank' : undefined} rel={project.liveUrl ? 'noopener noreferrer' : undefined}>
                <div className="work-item-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="work-item-overlay">
                    <span className="view-text">View Project ↗</span>
                  </div>
                </div>
                <div className="work-item-info">
                  <div className="work-item-meta">
                    <span className="work-number">{(index + 1).toString().padStart(2, '0')}</span>
                    <span className="work-category">{project.category}</span>
                  </div>
                  <h3 className="work-item-title">{project.title}</h3>
                  <p className="work-item-tech">{project.technologies?.slice(0, 3).join(' • ')}</p>
                </div>
              </a>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
