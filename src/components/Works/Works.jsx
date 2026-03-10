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

      gsap.from(".works-header .section-title", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: ".works-header",
          start: "top 80%",
        }
      });

      // Horizontal Scroll Setup
      const pinWrapper = document.querySelector('.works-pin-wrapper');
      const projectsDisplay = document.querySelector('.projects-display');
      
      if (cardsRef.current.length > 0 && pinWrapper && projectsDisplay) {
        // Dynamic measure for scroll amount
        const getScrollAmount = () => {
            const containerWidth = projectsDisplay.scrollWidth;
            return -(containerWidth - window.innerWidth + (window.innerWidth * 0.1)); 
        };

        const horizontalTween = gsap.to(projectsDisplay, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: pinWrapper,
                start: "top 10%", // Pin near the top
                end: () => `+=${projectsDisplay.scrollWidth}`, // Scroll amount
                pin: true,
                scrub: 1.5,
                invalidateOnRefresh: true,
            }
        });

        // Animations for each card
        cardsRef.current.forEach((card) => {
            if (!card) return;
            
            const visual = card.querySelector('.card-visual');
            const image = card.querySelector('.image-container img');
            const content = card.querySelector('.card-content');

            // Setup
            gsap.set(visual, { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' });
            gsap.set(content, { y: 40, opacity: 0, filter: "blur(10px)" });
            gsap.set(image, { scale: 1.3, x: -40 }); // Parallax starting left

            // Entry Reveal when scrolling horizontally
            const entryTl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: horizontalTween,
                    start: "left 85%", // starts when card enters 85% of viewport from right
                    toggleActions: "play none none reverse"
                }
            });

            entryTl.to(visual, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 1.2,
                ease: "expo.out"
            })
            .to(content, {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power3.out"
            }, "-=0.8");

            // Horizontal Image Parallax (Scrubbed)
            gsap.to(image, {
                x: 40, // Move image right as you scroll horizontally
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: horizontalTween,
                    start: "left right",
                    end: "right left",
                    scrub: true
                }
            });
        });
      }
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
                className={`modern-project-card gpu-accel ${project.featured ? 'is-featured' : ''} ${index % 2 !== 0 ? 'is-offset' : ''}`}
              >
                <div className="card-number">0{index + 1}</div>
                
                <div className="card-inner">
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


