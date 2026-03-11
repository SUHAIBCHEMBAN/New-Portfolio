import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';
import { personalInfo } from '../../data/personal';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-bg-text">SUHAIB CHEMBAN</div>
      <div className="container footer-container">
        <div className="footer-main">
          <div className="footer-branding">
            <h3 className="footer-logo gradient-text">{personalInfo.name}</h3>
            <p className="footer-tagline">
              {personalInfo.tagline[1] || personalInfo.tagline[0]} 
              Built with precision and passion for the digital age.
            </p>
          </div>
        </div>

        <div className="footer-social">
          <a 
            href={personalInfo.social.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-btn"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a 
            href={personalInfo.social.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-btn"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a 
            href={personalInfo.social.twitter} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-btn"
            title="Twitter"
          >
            <FaTwitter />
          </a>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
             © {currentYear} {personalInfo.name}. All rights reserved.
          </div>
          {/* <div className="footer-credit">
            Crafted with <FaHeart className="heart-icon" /> by <a href="#home">Suhaib</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
