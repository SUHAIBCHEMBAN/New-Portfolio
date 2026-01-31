import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../../data/personal';
import { skills, softSkills } from '../../data/skills';
import { services } from '../../data/services';
import AboutImage from './AboutImage';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef();
  const skillsRef = useRef([]);
  const servicesRef = useRef([]);
  const imageRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Image Entrance
      gsap.from(imageRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate Text Entrance
      gsap.from(textRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 0.2, // Stagger slightly after image
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate skill categories
      skillsRef.current.forEach((category, index) => {
        gsap.to(category, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: category,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });

        // Animate skill bars
        const skillBars = category.querySelectorAll('.skill-progress');
        skillBars.forEach((bar) => {
          const level = bar.getAttribute('data-level');
          gsap.to(bar, {
            width: `${level}%`,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          });
        });
      });

      // Animate service cards with stagger
      gsap.to(servicesRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about section" id="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>

        {/* New Layout: Image + Intro Side-by-Side */}
        <div className="about-content-wrapper">
          <div ref={imageRef}>
            <AboutImage />
          </div>
          
          <div ref={textRef} className="about-intro">
            {personalInfo.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Skills & Tools */}
        <div className="skills-container">
          <h3 className="section-title" style={{ fontSize: '2rem' }}>Skills & Tools</h3>
          
          <div className="skills-grid">
            {skills.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                ref={(el) => (skillsRef.current[categoryIndex] = el)}
                className="skill-category"
              >
                <h3>{category.category}</h3>
                <div className="skills-list">
                  {category.items.map((skill, skillIndex) => {
                    const Icon = skill.icon;
                    return (
                      <div key={skillIndex} className="skill-item">
                        <div className="skill-header">
                          <Icon className="skill-icon" />
                          <span className="skill-name">{skill.name}</span>
                        </div>
                        <div className="skill-bar">
                          <div
                            className="skill-progress"
                            data-level={skill.level}
                          ></div>
                        </div>
                        <div className="skill-level">{skill.level}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Soft Skills */}
          <div className="soft-skills">
            {softSkills.map((skill, index) => (
              <span key={index} className="soft-skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="services-container">
          <h3 className="section-title" style={{ fontSize: '2rem' }}>
            Freelance Services
          </h3>
          <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
            I offer a range of professional services to help bring your digital projects to life.
          </p>

          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  ref={(el) => (servicesRef.current[index] = el)}
                  className="service-card"
                >
                  <Icon className="service-icon" />
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
