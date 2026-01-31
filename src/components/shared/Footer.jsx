import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';
import { personalInfo } from '../../data/personal';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content centered">
          <div className="footer-branding">
            <h3 className="gradient-text">{personalInfo.name}</h3>
            <p>{personalInfo.tagline[0]}</p>
          </div>

          <div className="footer-social-simple">
            <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href={personalInfo.social.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* <div className="footer-bottom">
          <p>
            © {currentYear} {personalInfo.name}. Made with <FaHeart className="heart-icon" /> using React & GSAP
          </p>
        </div> */}
      </div>
    </footer>
  );
}
