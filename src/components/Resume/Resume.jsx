import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaDownload, FaCalendar, FaTrophy } from 'react-icons/fa';
import { personalInfo, experience, education, achievements } from '../../data/personal';
import './Resume.css';

gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  const sectionRef = useRef();
  const timelineRef = useRef([]);
  const achievementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline items
      timelineRef.current.forEach((item) => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // Animate achievements
      gsap.to(achievementsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.achievements',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="resume section" id="resume">
      <div className="container">
        <h2 className="section-title">Resume</h2>
        
        <div className="resume-download">
          <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <FaDownload />
            Download / Preview Resume
          </a>
        </div>

        <div className="resume-content">
          {/* Experience Timeline */}
          <div className="timeline-section">
            <h3>Work Experience</h3>
            <div className="timeline">
              {experience.map((job, index) => (
                <div
                  key={job.id}
                  ref={(el) => (timelineRef.current[index] = el)}
                  className="timeline-item"
                >
                  <div className="timeline-content">
                    <h4 className="timeline-company">{job.company}</h4>
                    <p className="timeline-position">{job.position}</p>
                    <p className="timeline-duration">
                      <FaCalendar />
                      {job.duration}
                    </p>
                    <ul className="experience-points">
                        {job.description.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                    <br />
                    <div className="timeline-tech">
                      {job.technologies.map((tech, idx) => (
                        <span key={idx}>{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="timeline-dot"></div>
                  <div></div>
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
                  <div className="timeline-content">
                    <h4 className="timeline-institution">{edu.institution}</h4>
                    <p className="timeline-degree">{edu.degree}</p>
                    <p className="timeline-duration">
                      <FaCalendar />
                      {edu.duration}
                    </p>
                    <p className="timeline-description">{edu.description}</p>
                  </div>
                  <div className="timeline-dot"></div>
                  <div></div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="achievements">
            <h3>
              <FaTrophy style={{ display: 'inline', marginRight: '0.5rem' }} />
              Key Achievements
            </h3>
            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  ref={(el) => (achievementsRef.current[index] = el)}
                  className="achievement-card"
                >
                  <div className="achievement-header">
                    <span className="achievement-value gradient-text">{achievement.value}</span>
                    <h4 className="achievement-label">{achievement.label}</h4>
                  </div>
                  <p className="achievement-description">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
