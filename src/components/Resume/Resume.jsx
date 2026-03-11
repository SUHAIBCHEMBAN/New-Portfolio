import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaDownload, FaCalendar, FaTrophy } from 'react-icons/fa';
import { personalInfo, experience, education, achievements } from '../../data/personal';
import AnimatedTitle from '../shared/AnimatedTitle';
import './Resume.css';

gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  const sectionRef = useRef();
  const timelineRef = useRef([]);
  const containerRef = useRef();
  const expandRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline headers
      gsap.utils.toArray('.timeline-section h3').forEach((header) => {
        gsap.fromTo(header, 
          { opacity: 0, x: -30 },
          { 
            opacity: 1, x: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: header, start: 'top 85%' }
          }
        );
      });

      // Animate timeline items
      timelineRef.current.forEach((item, index) => {
        if (!item) return;
        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.timeline-content');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });

        tl.fromTo(dot, 
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
        )
        .fromTo(content, 
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        );
      });

      // PREMIUM EXPANDING ACHIEVEMENT SECTION (Antigravity Style)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.achievements-expand-container',
          start: "top 20%",
          end: "bottom bottom",
          scrub: 1,
          pin: true,
          pinSpacing: true
        }
      });

      tl.fromTo('.expanding-box', 
        { 
          scale: 0.5, 
          borderRadius: "100px",
          width: "60vw",
          height: "40vh",
          backgroundColor: "#111"
        },
        { 
          scale: 1, 
          borderRadius: "0px", 
          width: "100vw", 
          height: "100vh",
          backgroundColor: "#000",
          ease: "none"
        }
      )
      .fromTo('.achievement-content-wrap',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo('.achievement-milestone',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="resume section" id="resume">
      <div className="container">
        <AnimatedTitle text="My Professional Path" mode="word" />
        
        <div className="resume-download">
          <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <FaDownload />
            Get Full Resume
          </a>
        </div>

        <div className="resume-content">
          {/* Experience Timeline */}
          <div className="timeline-section">
            <h3>Experience</h3>
            <div className="timeline">
              {experience.map((job, index) => (
                <div
                  key={job.id}
                  ref={(el) => (timelineRef.current[index] = el)}
                  className="timeline-item"
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content gpu-accel">
                    <div className="timeline-header">
                      <div className="timeline-title-wrap">
                        <h4 className="timeline-company">{job.company}</h4>
                        <p className="timeline-position">{job.position}</p>
                      </div>
                      <span className="timeline-duration">
                        <FaCalendar />
                        {job.duration}
                      </span>
                    </div>
                    <ul className="experience-points">
                        {job.description.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                    <div className="timeline-tech">
                      {job.technologies.map((tech, idx) => (
                        <span key={idx}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div className="timeline-section">
            <h3>Education</h3>
            <div className="timeline">
              {education.map((edu, index) => (
                <div
                  key={edu.id}
                  ref={(el) => (timelineRef.current[experience.length + index] = el)}
                  className="timeline-item"
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content gpu-accel">
                    <div className="timeline-header">
                      <div className="timeline-title-wrap">
                        <h4 className="timeline-institution">{edu.institution}</h4>
                        <p className="timeline-degree">{edu.degree}</p>
                      </div>
                      <span className="timeline-duration">
                        <FaCalendar />
                        {edu.duration}
                      </span>
                    </div>
                    <p className="timeline-description">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Expanding Achievements Section */}
      <div className="achievements-expand-container">
        <div className="expanding-box">
          <div className="achievement-content-wrap">
            <h2 className="expanding-title">Key Milestones</h2>
            <div className="milestones-grid">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-milestone">
                  <span className="milestone-value">{achievement.value}</span>
                  <h4 className="milestone-label">{achievement.label}</h4>
                  <p className="milestone-desc">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
