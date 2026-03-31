import { useState, useEffect } from 'react';
import Magnetic from './Magnetic';
import './Navigation.css';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll);
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
    </nav>
  );
}
