import React, { useEffect, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/shared/Navigation';
import Hero from './components/Hero/Hero';
import Footer from './components/shared/Footer';
import CustomCursor from './components/shared/CustomCursor';
import BackgroundDecor from './components/shared/BackgroundDecor';
import SectionColorTracker from './components/shared/SectionColorTracker';
import './App.css';

const About = React.lazy(() => import('./components/About/About'));
const Works = React.lazy(() => import('./components/Works/Works'));
const Resume = React.lazy(() => import('./components/Resume/Resume'));
const Contact = React.lazy(() => import('./components/Contact/Contact'));
const BackgroundCanvas = React.lazy(() => import('./components/Canvas3D/BackgroundCanvas'));

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
      <Suspense fallback={null}>
        <BackgroundCanvas />
      </Suspense>
      <Navigation />
      <main style={{ position: 'relative', zIndex: 1, backgroundColor: 'transparent' }}>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Works />
          <Resume />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
