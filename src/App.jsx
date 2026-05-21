import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/shared/Navigation';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Works from './components/Works/Works';
import Resume from './components/Resume/Resume';
import Contact from './components/Contact/Contact';
import Footer from './components/shared/Footer';
import BackgroundCanvas from './components/Canvas3D/BackgroundCanvas';
import CustomCursor from './components/shared/CustomCursor';
import BackgroundDecor from './components/shared/BackgroundDecor';
import SectionColorTracker from './components/shared/SectionColorTracker';
import './App.css';

function App() {
  const isLiteMode =
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (isLiteMode) return;

    // Initialize Lenis for premium smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [isLiteMode]);
  return (
    <div className="App">
      {!isLiteMode && <CustomCursor />}
      {!isLiteMode && <BackgroundDecor />}
      {!isLiteMode && <SectionColorTracker />}
      <BackgroundCanvas />
      <Navigation />
      <main style={{ position: 'relative', zIndex: 1, backgroundColor: 'transparent' }}>
        <Hero />
        <About />
        <Works />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
