import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaExternalLinkAlt, FaGithub, FaCode } from 'react-icons/fa';
import { projects, categories } from '../../data/projects';
import './Works.css';

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const sectionRef = useRef();
  const cardsRef = useRef([]);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate project cards
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section ref={sectionRef} className="works section" id="works">
      <div className="container">
        <h2 className="section-title">Recent Works</h2>
        <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
          Here are some of my recent projects showcasing my skills in web development and design.
        </p>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="project-card"
            >
              {project.featured && <div className="featured-badge">Featured</div>}
              
              {/* 3D Laptop Image Section */}
              <div className="project-image">
                {project.image ? (
                  <div className="laptop-container">
                    <div className="laptop-device">
                      <div className="laptop-screen">
                        <img src={project.image} alt={project.title} />
                        <div className="project-overlay">
                          <div className="project-links">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link"
                                title="View Live"
                              >
                                <FaExternalLinkAlt />
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link"
                                title="View Code"
                              >
                                <FaGithub />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="laptop-base">
                        <div className="laptop-base-inner"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="project-placeholder">
                    <FaCode />
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">
                      {tech}
                    </span>
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
