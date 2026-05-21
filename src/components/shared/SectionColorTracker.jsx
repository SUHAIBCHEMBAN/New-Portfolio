import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionColorTracker() {
  useEffect(() => {
    // Black, red, and white color rhythm for each section.
    const sections = [
      { id: 'home', bg: '#050505' },
      { id: 'about', bg: '#0c0809' },
      { id: 'works', bg: '#050505' },
      { id: 'resume', bg: '#090607' },
      { id: 'contact', bg: '#000000' }
    ];

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => gsap.to('body', { backgroundColor: section.bg, duration: 0.8 }),
          onEnterBack: () => gsap.to('body', { backgroundColor: section.bg, duration: 0.8 })
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger?.id && sections.some(s => s.id === st.trigger.id)) {
          st.kill();
        }
      });
    };
  }, []);

  return null;
}
