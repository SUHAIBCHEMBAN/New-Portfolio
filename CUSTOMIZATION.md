# Quick Customization Guide

## 🎯 Priority 1: Update Your Personal Information

### 1. Basic Info (`src/data/personal.js`)

```javascript
export const personalInfo = {
  name: "YOUR NAME HERE",
  title: "YOUR JOB TITLE",
  tagline: "Freelance [Your Specialty] | Open to New Opportunities",
  bio: [
    "First paragraph about you...",
    "Second paragraph...",
    "Third paragraph..."
  ],
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  location: "Your City, Country",
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
  }
};
```

### 2. Work Experience (`src/data/personal.js`)

Update the `experience` array with your actual work history.

### 3. Education (`src/data/personal.js`)

Update the `education` array with your degrees and certifications.

## 🛠️ Priority 2: Update Skills

Edit `src/data/skills.js`:

```javascript
{
  category: "Frontend",
  items: [
    { name: "React", level: 95, icon: FaReact },
    // Add/remove skills as needed
  ]
}
```

## 💼 Priority 3: Add Your Services

Edit `src/data/services.js` to reflect the services you actually offer.

## 🎨 Priority 4: Add Your Projects

Edit `src/data/projects.js`:

1. Replace placeholder projects with your real projects
2. Add project images to `public/images/`
3. Update image paths, descriptions, and links

## 🎨 Priority 5: Customize Colors (Optional)

Edit `src/index.css`:

```css
:root {
  --accent-primary: #00d4ff;  /* Your brand color */
  --accent-secondary: #6366f1;
}
```

## 📧 Priority 6: Setup Contact Form

1. Sign up at https://www.emailjs.com/
2. Create an email template
3. Get your credentials
4. Update `src/components/Contact/Contact.jsx` (line 35-40)

## 🖼️ Priority 7: Add Resume PDF

1. Place your resume PDF in `public/` folder
2. Name it `resume.pdf` or update the path in `src/data/personal.js`

## 🔍 Priority 8: Update SEO

Edit `index.html`:

```html
<meta name="author" content="Your Name" />
<title>Your Name - Web Developer Portfolio</title>
```

## ✅ Checklist

- [ ] Updated personal info (name, email, phone, location)
- [ ] Updated bio paragraphs
- [ ] Added social media links
- [ ] Updated work experience
- [ ] Updated education
- [ ] Updated skills and proficiency levels
- [ ] Updated services offered
- [ ] Added real project data
- [ ] Added project images
- [ ] Uploaded resume PDF
- [ ] Setup EmailJS for contact form
- [ ] Updated meta tags in index.html
- [ ] Tested on mobile devices
- [ ] Tested contact form
- [ ] Ready to deploy!

## 🚀 Quick Deploy

Once customized:

```bash
npm run build
```

Then deploy the `dist/` folder to:
- Vercel (easiest)
- Netlify
- GitHub Pages
- Your own hosting

---

**Need help?** Check the main README.md for detailed instructions!
