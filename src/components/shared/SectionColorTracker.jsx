import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionColorTracker() {
  useEffect(() => {
    // Definining color themes for each section
    const sections = [
      { id: 'home', bg: '#000000' },
      { id: 'about', bg: '#050505' },
      { id: 'works', bg: '#0a0a0a' },
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
