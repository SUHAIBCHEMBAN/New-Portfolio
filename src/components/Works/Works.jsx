import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaExternalLinkAlt, FaGithub, FaEye } from 'react-icons/fa';
import { projects, categories } from '../../data/projects';
import AnimatedTitle from '../shared/AnimatedTitle';
import './Works.css';

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const sectionRef = useRef();
  const titleRef = useRef();
  const cardsRef = useRef([]);

  useEffect(() => {
    // Smooth filter transition
    const filtered = activeFilter === 'All' 
      ? projects 
      : projects.filter(project => project.category === activeFilter);
    
    setFilteredProjects(filtered);
  }, [activeFilter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        // Main Title Animation
        gsap.from(".works-title-bg", {
          opacity: 0,
          x: -100,
          duration: 1.5,
          scrollTrigger: {
            trigger: ".works-header",
            start: "top 80%",
          }
        });

        // Sticky Reveal Animation
        const cards = cardsRef.current.slice(0, filteredProjects.length).filter(c => c);
        
        cards.forEach((card, i) => {
          const visual = card.querySelector('.card-visual');
          const content = card.querySelector('.card-content');
          const image = card.querySelector('.image-container img');

          // Correct Layering
          gsap.set(card, { zIndex: i + 1 });

          // Entrance animation for content
          const entranceTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          });

          entranceTl.fromTo(visual, 
            { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.2, ease: "expo.out" }
          ).fromTo(content,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            "-=0.7"
          );

          // Card Outgoing Animation (as it gets covered)
          if (i < cards.length - 1) {
            gsap.to(card, {
              scale: 0.9,
              opacity: 0.3,
              filter: "blur(5px)",
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top 100%",
                end: "top 20%",
                scrub: true
              }
            });
          }

          // Image Parallax
          gsap.to(image, {
            translateY: "15%",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        });
      });

      // Mobile Animations
      mm.add("(max-width: 768px)", () => {
        gsap.utils.toArray('.modern-project-card').forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section ref={sectionRef} className="works-unique section" id="works">
      {/* Background Decor */}
      <div className="works-bg-glow"></div>
      
      <div className="container works-header-container">
        <div className="works-header" ref={titleRef}>
          <div className="works-title-bg">PROJECTS</div>
          <span className="section-subtitle">Portfolio Showcase</span>
          <AnimatedTitle text="Selected Creations" mode="reveal" />
          <p className="section-description">
            Pushing boundaries and exploring new horizons in digital design and development.
          </p>
        </div>

        {/* Unique Filter Navigation */}
        <div className="filter-nav-wrapper">
          <div className="filter-nav">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-nav-item ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
                {activeFilter === category && (
                  <span className="nav-accent"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="works-pin-wrapper">
        <div className="works-scroll-container">
          <div className="projects-display">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`modern-project-card gpu-accel ${project.featured ? 'is-featured' : ''}`}
              >
                <div className="card-inner">
                  <div className="card-number">0{index + 1}</div>
                  <div className="card-visual">
                    <div className="image-container">
                      <img src={project.image} alt={project.title} loading="lazy" />
                      <div className="card-glow"></div>
                    </div>
                    
                    <div className="card-interactions">
                      <div className="interaction-btns">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-icon">
                            <FaEye />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-icon">
                            <FaGithub />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="card-content">
                    <div className="content-top">
                      <span className="project-category-tag">{project.category}</span>
                      <h3 className="project-headline">{project.title}</h3>
                    </div>
                    
                    <p className="project-brief">{project.description}</p>
                    
                    <div className="project-tech-stack">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="tech-item">{tech}</span>
                      ))}
                    </div>

                    <div className="card-action">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="view-detail-btn">
                        Explore Project <span className="arrow">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


