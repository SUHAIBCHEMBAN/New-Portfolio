# 3D Portfolio Website

A modern, professional portfolio website built with React.js, featuring stunning 3D elements and smooth GSAP scroll animations. Perfect for showcasing your skills to both freelance clients and potential employers.

## ✨ Features

- **3D Interactive Elements** - Built with Three.js and React Three Fiber
- **GSAP Scroll Animations** - Smooth, professional scroll-triggered animations
- **Responsive Design** - Works perfectly on all devices
- **Dark Theme** - Modern, eye-catching design with cyan/indigo accents
- **Dual-Purpose** - Targets both freelance clients and job opportunities
- **SEO Optimized** - Proper meta tags and semantic HTML

## 🎯 Sections

1. **Hero** - Eye-catching introduction with animated 3D sphere
2. **About** - Personal intro, skills with progress bars, and freelance services
3. **Recent Works** - Portfolio showcase with filterable project cards
4. **Resume** - Professional timeline of experience and education
5. **Contact** - Working contact form with 3D background elements

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
```bash
cd portfolio-3d
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

## 📝 Customization

### Update Your Information

Edit the data files in `src/data/`:

1. **`personal.js`** - Your name, bio, contact info, experience, education
2. **`skills.js`** - Your technical skills and proficiency levels
3. **`services.js`** - Freelance services you offer
4. **`projects.js`** - Your portfolio projects

### Example - Update Personal Info:

```javascript
// src/data/personal.js
export const personalInfo = {
  name: "John Doe",
  title: "Full Stack Developer",
  tagline: "Freelance Web Developer | Open to New Opportunities",
  email: "john@example.com",
  // ... update all fields
};
```

### Add Project Images

1. Place your project images in `public/images/`
2. Update the image paths in `src/data/projects.js`:

```javascript
{
  id: 1,
  title: "My Project",
  image: "/images/my-project.jpg",
  // ...
}
```

### Update Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --accent-primary: #00d4ff;  /* Change to your brand color */
  --accent-secondary: #6366f1;
  /* ... */
}
```

## 📧 Contact Form Setup

The contact form uses EmailJS. To enable it:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Get your Service ID, Template ID, and Public Key
3. Update `src/components/Contact/Contact.jsx`:

```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  data,
  'YOUR_PUBLIC_KEY'
);
```

## 🎨 Technologies Used

- **React** - UI framework
- **Vite** - Build tool
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful Three.js helpers
- **GSAP** - Professional animations
- **React Hook Form** - Form validation
- **React Icons** - Icon library

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically

### Netlify

1. Push your code to GitHub
2. Import project on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## 🎯 Performance Tips

- Images are optimized and lazy-loaded
- 3D elements use efficient geometries
- GSAP animations are hardware-accelerated
- Code splitting for faster initial load

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For questions or issues, please open an issue on GitHub or contact via the portfolio contact form.

---

**Made with ❤️ using React, Three.js, and GSAP**
