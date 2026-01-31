import Navigation from './components/shared/Navigation';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Works from './components/Works/Works';
import Resume from './components/Resume/Resume';
import Contact from './components/Contact/Contact';
import Footer from './components/shared/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
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
