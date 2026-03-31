import { skills } from '../../data/skills';
import AboutImage from './AboutImage';
import './About.css';

export default function About() {
  const safeSkills = Array.isArray(skills) ? skills : [];

  return (
    <section className="about section" id="about">
      <div className="container">
        <header className="about-header" style={{ marginBottom: '4rem' }}>
          <h2 className="about-heading" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '2rem' }}>
            Behind the <span className="gradient-text">Code</span>
          </h2>
        </header>

        <div className="bento-grid">
          {/* Detailed Narrative Bento */}
          <div className="bento-item item-bio gpu-accel" style={{ gridColumn: 'span 3', gridRow: 'span 2' }}>
            <span className="bento-title">The Foundation</span>
            <div className="bio-content">
              <p>Hello! I'm Suhaib, a passionate Full-Stack Developer based in Malappuram, Kerala. My journey into the world of technology began with a curiosity about how things work on the web, which quickly evolved into a dedicated career in building robust and scalable applications.</p>
              <p>I specialize in the Python and JavaScript ecosystems, with deep expertise in Django, React, and modern web technologies. Whether it's crafting high-performance backend systems or designing intuitive, pixel-perfect user interfaces, I enjoy turning complex problems into elegant digital solutions.</p>
              <p>Over the years, I have had the opportunity to work with diverse clients and companies, from e-commerce platforms like Faakart to creative agencies like Creativio Media. These experiences have strengthened my ability not only to write clean code but also to understand business needs and deliver impactful products.</p>
              <p>When I’m not coding, I explore the latest tech trends, contribute to open-source projects, and refine my skills in UI/UX design. I’m always open to new opportunities and collaborations—let’s build something amazing together!</p>
            </div>
          </div>

          <div className="bento-item item-stats gpu-accel">
            <span className="bento-title">Tenure</span>
            <div className="stat-value">2+</div>
            <div className="stat-label">Years of Innovation</div>
          </div>

          <div className="bento-item item-image gpu-accel" style={{ padding: 0 }}>
             <AboutImage />
          </div>

          <div className="bento-item item-stats item-projects gpu-accel">
            <span className="bento-title">Works</span>
            <div className="stat-value">15+</div>
            <div className="stat-label">Successful Deliveries</div>
          </div>

          {/* Full Skills Ecosystem */}
          {safeSkills.map((category, idx) => (
            <div key={idx} className={`bento-item item-skills-cat cat-${category.category?.toLowerCase() || idx} gpu-accel`} style={{ gridColumn: 'span 2' }}>
              <span className="bento-title">{category.category} Stack</span>
              <div className="skills-grid-inner">
                {category.items?.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-tag-full" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <span className="skill-tag-name" style={{ fontSize: '0.85rem', fontWeight: 700 }}>{skill.name}</span>
                    <span className="skill-tag-level" style={{ fontSize: '0.75rem', opacity: 0.5 }}>{skill.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
