import { skills } from '../../data/skills';
import './About.css';

export default function About() {
  const safeSkills = Array.isArray(skills) ? skills : [];

  return (
    <section className="about section" id="about" style={{ display: 'block', visibility: 'visible', opacity: 1, minHeight: '100px', background: '#050505', position: 'relative', zIndex: 100 }}>
      <div className="container" style={{ position: 'relative', zIndex: 101 }}>
        <header className="about-header" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', color: 'white' }}>
            Behind the Code
          </h2>
        </header>

        <div className="bento-grid" style={{ opacity: 1 }}>
          <div className="bento-item item-bio" style={{ opacity: 1 }}>
            <span className="bento-title">Narrative</span>
            <div className="bio-content">
              <p>Hello! I'm Suhaib, a passionate Full-Stack Developer based in Malappuram, Kerala. My journey into the world of technology began with a curiosity about how things work on the web, which quickly evolved into a dedicated career in building robust and scalable applications.</p>
              <p>I specialize in the Python and JavaScript ecosystems, with deep expertise in Django, React, and modern web technologies. Whether it's crafting high-performance backend systems or designing intuitive, pixel-perfect user interfaces, I enjoy turning complex problems into elegant digital solutions.</p>
              <p>Over the years, I have had the opportunity to work with diverse clients and companies, from e-commerce platforms like Faakart to creative agencies like Creativio Media. These experiences have strengthened my ability not only to write clean code but also to understand business needs and deliver impactful products.</p>
              <p>When I’m not coding, I explore the latest tech trends, contribute to open-source projects, and refine my skills in UI/UX design. I’m always open to new opportunities and collaborations—let’s build something amazing together!</p>
            </div>
          </div>

          <div className="bento-item item-stats" style={{ opacity: 1 }}>
            <span className="bento-title">Experience</span>
            <div className="stat-value">2+</div>
            <div className="stat-label">Years of Innovation</div>
          </div>

          <div className="bento-item item-stats" style={{ opacity: 1 }}>
             <span className="bento-title">Portfolio</span>
             <div className="stat-value">15+</div>
             <div className="stat-label">Successes</div>
          </div>

          {safeSkills.map((category, idx) => (
            <div key={idx} className="bento-item item-skills-cat" style={{ opacity: 1 }}>
              <span className="bento-title">{category.category} Stack</span>
              <div className="skills-grid-inner">
                {category.items?.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-tag-full">
                    <span className="skill-tag-name">{skill.name}</span>
                    <span className="skill-tag-level">{skill.level}%</span>
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
