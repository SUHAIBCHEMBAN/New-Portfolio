import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { personalInfo } from '../../data/personal';
import Magnetic from './Magnetic';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const marqueeRef = useRef();
  const footerRef = useRef();

  useEffect(() => {
    const isLiteMode =
      window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isLiteMode) return;

    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer">
      <div ref={marqueeRef} className="footer-marquee">
        Digital Architect • Creative Developer • Solution Finder • Digital Architect • Creative Developer • Solution Finder •
      </div>

      <div className="container footer-content">
        <h2 className="footer-cta-text">
          Want to bring your ideas to life? <br />
          <span className="gradient-text">Let's work together.</span>
        </h2>

        <div className="footer-social-list">
          {Object.entries(personalInfo.social).map(([platform, url]) => (
            <Magnetic key={platform}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="footer-social-link clickable">
                {platform}
              </a>
            </Magnetic>
          ))}
        </div>

        <div className="footer-bottom-info">
          <span>© {currentYear} {personalInfo.name}</span>
          <span>Open for collaboration anywhere</span>
          <span>Inspired by high-end digital design</span>
        </div>
      </div>
    </footer>
  );
}
