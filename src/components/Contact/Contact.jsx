import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useForm } from 'react-hook-form';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { personalInfo } from '../../data/personal';
import Contact3D from './Contact3D';
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
      gsap.to(infoRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.to(formRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
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
      <div className="contact-3d-bg">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Contact3D />
        </Canvas>
      </div>

      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--spacing-2xl)' }}>
          I'm currently available for freelance work and open to new opportunities. 
          Let's discuss how I can help bring your project to life!
        </p>

        <div className="contact-container">
          {/* Contact Info */}
          <div ref={infoRef} className="contact-info">
            <h3>Let's Talk</h3>
            <p>
              Whether you have a project in mind, need a consultation, or just want to say hello, 
              I'd love to hear from you.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div className="contact-item-content">
                  <h4>Email</h4>
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                </div>
              </div>

              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div className="contact-item-content">
                  <h4>Phone</h4>
                  <p>{personalInfo.phone}</p>
                </div>
              </div>

              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div className="contact-item-content">
                  <h4>Location</h4>
                  <p>{personalInfo.location}</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub />
              </a>
              <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin />
              </a>
              <a href={personalInfo.social.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="contact-form-wrapper">
            <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Your Name"
                />
                {errors.name && <p className="form-error">{errors.name.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
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
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject', { required: 'Subject is required' })}
                  placeholder="Project Inquiry"
                />
                {errors.subject && <p className="form-error">{errors.subject.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  {...register('message', { required: 'Message is required' })}
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="form-error">{errors.message.message}</p>}
              </div>

              <button type="submit" className="btn btn-primary form-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

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
