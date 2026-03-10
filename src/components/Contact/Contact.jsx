import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { personalInfo } from '../../data/personal';
import AnimatedTitle from '../shared/AnimatedTitle';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef();
  const infoRef = useRef();
  const formRef = useRef();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo('.contact-label', 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      )
      .fromTo('.contact-info h3', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo('.contact-info p', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo('.contact-item', 
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.social-link', 
        { opacity: 0, y: 20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' },
        '-=0.3'
      )
      .fromTo(formRef.current, 
        { opacity: 0, x: 60, clipPath: 'inset(0 0 0 100%)' },
        { opacity: 1, x: 0, clipPath: 'inset(0 0 0 0%)', duration: 1.2, ease: 'power4.inOut' },
        'start'
      );

      // Magnetic-like hover effect for icons and buttons
      gsap.utils.toArray('.social-link, .form-submit').forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(el, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          ...data,
          access_key: "925ea3b1-38ce-456d-9dab-d8a5f1a2c12b"
        })
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.'
        });
        reset();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="contact section" id="contact">
      <div className="container">
        <div className="contact-container">
          {/* Contact Info */}
          <div ref={infoRef} className="contact-info gpu-accel">
            <span className="contact-label">Get In Touch</span>
            <h3>Let's create something <span>extraordinary</span></h3>
            <p>
              Whether you have a project in mind, need a consultation, or just want to discuss 
              the latest in tech, I'm always open to interesting conversations.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <FaEnvelope />
                </div>
                <div className="contact-item-content">
                  <h4>Email Me</h4>
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <FaPhone />
                </div>
                <div className="contact-item-content">
                  <h4>Call Me</h4>
                  <p>{personalInfo.phone}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-item-content">
                  <h4>Location</h4>
                  <p>{personalInfo.location}</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                <FaGithub />
              </a>
              <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                <FaLinkedin />
              </a>
              <a href={personalInfo.social.twitter} target="_blank" rel="noopener noreferrer" className="social-link" title="Twitter">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="contact-form-wrapper gpu-accel">
            <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  placeholder="John Doe"
                />
                {errors.name && <p className="form-error">{errors.name.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
              </div>

              <div className="form-group full-width">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject', { required: 'Subject is required' })}
                  placeholder="Project Inquiry"
                />
                {errors.subject && <p className="form-error">{errors.subject.message}</p>}
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  {...register('message', { required: 'Message is required' })}
                  placeholder="Tell me about your project or just say hi..."
                />
                {errors.message && <p className="form-error">{errors.message.message}</p>}
              </div>

              <div className="form-group full-width">
                <button type="submit" className="btn btn-primary form-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>

              {formStatus.message && (
                <div className={`form-message ${formStatus.type}`}>
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
