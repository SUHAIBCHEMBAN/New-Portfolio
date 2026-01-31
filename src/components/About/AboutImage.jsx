import { useRef } from 'react';
import gsap from 'gsap';
import { FaUser } from 'react-icons/fa';

export default function AboutImage() {
  const frameRef = useRef();

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate center relative position -1 to 1
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    // Tilt effect
    gsap.to(frameRef.current, {
      rotationY: x * 20, // Rotate Y based on X mouse
      rotationX: -y * 20, // Rotate X based on Y mouse (inverted)
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.5
    });
  };

  const handleMouseLeave = () => {
    gsap.to(frameRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: "power2.out",
      duration: 0.8
    });
  };

  return (
    <div 
      className="about-image-container" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="about-image-frame" ref={frameRef}>
        <div className="about-image-inner">
          {/* Replace with your actual image path */}
          {/* <FaUser /> */}
          <img src="/assets/profile.PNG" alt="Suhaib - Full Stack Developer" className="about-profile-photo" />
          {/* <img src="/path/to/your/photo.jpg" alt="Profile" /> */}
        </div>
        <div className="about-image-border" />
        <div className="about-image-glow" />
      </div>
    </div>
  );
}
