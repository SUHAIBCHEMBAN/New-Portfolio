import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../../data/personal';
import AnimatedTitle from '../shared/AnimatedTitle';
import Magnetic from '../shared/Magnetic';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef();
  const { register, handleSubmit, reset, formState: { isSubmitting, isSubmitSuccessful } } = useForm();

  useEffect(() => {
    const isLiteMode =
      window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isLiteMode) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-info-block, .contact-form-block', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 80%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
    reset();
  };

  return (
    <section ref={sectionRef} className="contact-section" id="contact">
      <div className="container">
        
        <div className="contact-headline-wrap">
          <AnimatedTitle text="Let's build" mode="split" />
          <AnimatedTitle text="something great." mode="split" className="text-accent" />
        </div>

        <div className="contact-grid">
          
          <div className="contact-info-block">
            <h3 className="contact-subhead">Contact Details</h3>
            <div className="contact-methods">
              <div className="contact-method">
                <span className="method-label">Email</span>
                <a href={`mailto:${personalInfo.email}`} className="method-value hover-line">{personalInfo.email}</a>
              </div>
              <div className="contact-method">
                <span className="method-label">Phone</span>
                <a href={`tel:${personalInfo.phone}`} className="method-value hover-line">{personalInfo.phone}</a>
              </div>
              <div className="contact-method">
                <span className="method-label">Socials</span>
                <div className="social-links">
                  {Object.entries(personalInfo.social).map(([platform, url]) => (
                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="hover-line">
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-block">
            <h3 className="contact-subhead">Send a Message</h3>
            {isSubmitSuccessful ? (
              <div className="success-msg">
                <span className="success-icon">✓</span>
                <h4>Message Received</h4>
                <p>I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                      id="name" 
                      placeholder="John Doe" 
                      {...register("name", { required: true })} 
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      {...register("email", { required: true })} 
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    placeholder="Tell me about your project..." 
                    rows="4"
                    {...register("message", { required: true })} 
                    className="form-input"
                  ></textarea>
                </div>
                <Magnetic>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary submit-btn clickable">
                    {isSubmitting ? 'Sending...' : 'Send Message ↗'}
                  </button>
                </Magnetic>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
