import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import gsap from 'gsap';
import { personalInfo } from '../../data/personal';
import AnimatedTitle from '../shared/AnimatedTitle';
import Magnetic from '../shared/Magnetic';
import './Contact.css';

export default function Contact() {
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

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
    <section ref={sectionRef} className="contact" id="contact">
      <div className="container">
        <div className="contact-layout">
          {/* Sidebar */}
          <div className="contact-sidebar">
            <h2 className="contact-headline">Let's <br />Talk</h2>
            
            <div className="contact-method-list">
              <div className="contact-method">
                <span className="method-label">Email</span>
                <a href={`mailto:${personalInfo.email}`} className="method-value clickable">{personalInfo.email}</a>
              </div>
              
              <div className="contact-method">
                <span className="method-label">Socials</span>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {Object.entries(personalInfo.social).map(([platform, url]) => (
                    <Magnetic key={platform}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="method-value clickable" style={{ textTransform: 'capitalize' }}>
                        {platform}
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </div>

              <div className="contact-method">
                <span className="method-label">Location</span>
                <span className="method-value">{personalInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-main">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modern-form-group">
                <label>What's your name?</label>
                <input
                  type="text"
                  placeholder="John Doe *"
                  className="modern-form-input"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="form-error">{errors.name.message}</p>}
              </div>

              <div className="modern-form-group">
                <label>What's your email?</label>
                <input
                  type="email"
                  placeholder="john@example.com *"
                  className="modern-form-input"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
              </div>

              <div className="modern-form-group">
                <label>What are you looking for?</label>
                <input
                  type="text"
                  placeholder="Project Inquiry, Consultation... *"
                  className="modern-form-input"
                  {...register('subject', { required: 'Subject is required' })}
                />
                {errors.subject && <p className="form-error">{errors.subject.message}</p>}
              </div>

              <div className="modern-form-group">
                <label>Your message</label>
                <textarea
                  placeholder="Tell me about your project... *"
                  className="modern-form-input"
                  style={{ minHeight: '120px' }}
                  {...register('message', { required: 'Message is required' })}
                />
                {errors.message && <p className="form-error">{errors.message.message}</p>}
              </div>

              <div className="submit-wrap">
                <Magnetic>
                  <button type="submit" className="contact-submit-btn clickable" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </Magnetic>
              </div>

              {formStatus.message && (
                <p className={`form-message ${formStatus.type}`} style={{ marginTop: '1.5rem', opacity: 0.8 }}>
                  {formStatus.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
