import { useEffect } from 'react';
import Lenis from 'lenis';
import Navigation from './components/shared/Navigation';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Works from './components/Works/Works';
import Resume from './components/Resume/Resume';
import Contact from './components/Contact/Contact';
import Footer from './components/shared/Footer';
import BackgroundCanvas from './components/Canvas3D/BackgroundCanvas';
import './App.css';

function App() {
  useEffect(() => {
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
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy();
    }
  }, [])
  return (
    <div className="App">
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
