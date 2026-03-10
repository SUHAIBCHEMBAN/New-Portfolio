import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../../data/personal';
import { skills, softSkills } from '../../data/skills';
import { services } from '../../data/services';
import AboutImage from './AboutImage';
import AnimatedTitle from '../shared/AnimatedTitle';
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
      // 1. High-end Image Reveal & Parallax (Awwwards Style)
      gsap.fromTo(imageRef.current, 
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          scale: 1.1,
          y: 30
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          y: 0,
          duration: 1.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 2. Continuous Image Parallax (Scrubbed)
      // Moving the image itself inside its clipped container gives it depth
      const imageInner = imageRef.current.querySelector('.about-image-inner');
      if(imageInner) {
         gsap.to(imageInner, {
            y: 40,
            ease: "none",
            scrollTrigger: {
               trigger: sectionRef.current,
               start: "top bottom",
               end: "bottom top",
               scrub: 1.5
            }
         });
      }

      // 3. Text Entrance (Slide up + blur out)
      gsap.fromTo(textRef.current, 
        {
          opacity: 0,
          y: 40,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 4. Animate skill categories (staggered fade-up)
      skillsRef.current.forEach((category, index) => {
        gsap.fromTo(category, 
          {
            opacity: 0,
            y: 50,
            clipPath: 'inset(100% 0 0 0)' // Clip from bottom
          },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: category,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Animate skill bars (grow from left)
        const skillBars = category.querySelectorAll('.skill-progress');
        skillBars.forEach((bar) => {
          const level = bar.getAttribute('data-level');
          gsap.fromTo(bar, 
            { width: '0%' },
            {
              width: `${level}%`,
              duration: 1.5,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: bar,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      });

      // 5. Services - Line Draw + Slide-In per row
      servicesRef.current.forEach((row, index) => {
        if (!row) return;
        const line = row.querySelector('.service-row-line');
        const inner = row.querySelector('.service-row-inner');

        gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
        gsap.set(inner, { x: -60, opacity: 0, filter: 'blur(6px)' });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        });

        tl.to(line, {
          scaleX: 1,
          duration: 0.8,
          ease: 'expo.inOut'
        })
        .to(inner, {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out'
        }, '-=0.4');
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about section" id="about">
      <div className="container">
        <AnimatedTitle text="About Me" mode="skew" />

        {/* New Layout: Image + Intro Side-by-Side */}
        <div className="about-content-wrapper">
          <div ref={imageRef} className="gpu-accel">
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
          <AnimatedTitle as="h3" text="Skills &amp; Tools" className="skills-title" mode="word" />
          
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
                        <Icon className="skill-icon" />
                        <span className="skill-name">{skill.name}</span>
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

        {/* Services - Modern Accordion Style */}
        <div className="services-container">
          <div className="services-header-row">
            <AnimatedTitle as="h3" text="What I Do" className="services-title" mode="reveal" />
            <p className="services-lead">Specialized solutions built for modern digital experiences.</p>
          </div>

          <div className="services-list">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  ref={(el) => (servicesRef.current[index] = el)}
                  className="service-row"
                >
                  <div className="service-row-line"></div>
                  <div className="service-row-inner">
                    <span className="service-index">0{index + 1}</span>
                    <div className="service-icon-wrap"><Icon /></div>
                    <h3 className="service-name">{service.title}</h3>
                    <p className="service-desc">{service.description}</p>
                    <div className="service-tags">
                      {service.features.map((f, i) => (
                        <span key={i} className="service-tag">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="services-list-end-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
