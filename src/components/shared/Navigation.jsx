import { useState, useEffect } from 'react';
import Magnetic from './Magnetic';
import './Navigation.css';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
      const sections = ['home', 'about', 'works', 'resume', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
      ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'works', label: 'Work' },
    { id: 'resume', label: 'Path' },
    { id: 'contact', label: 'Hello' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-pill-wrapper">
          <div className="nav-logo-side clickable" onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>
            <svg viewBox="0 0 100 100" className="nav-logo-svg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="nav-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff3b30" />
                  <stop offset="100%" stopColor="#7f140f" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" rx="24" fill="#0a0a0a" />
              <path d="M 40 28 L 20 28 L 20 72 L 40 72 M 80 28 L 60 28 L 60 50 L 80 50 L 80 72 L 60 72" 
                    fill="none" 
                    stroke="url(#nav-grad)" 
                    strokeWidth="12" 
                    strokeLinecap="square" 
                    strokeLinejoin="miter" />
            </svg>
            {/* <span className="logo-text">SUHAIB</span> */}
          </div>
          <ul className="nav-menu">
            {navItems.map(item => (
              <li key={item.id}>
                <Magnetic>
                  <button
                    className={`nav-link clickable ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </button>
                </Magnetic>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
