# 🚀 React Portfolio - Tristan Sangangbayan

A modern, responsive personal portfolio website built with React and Vite, showcasing professional experience, projects, certifications, and skills in web development.

## ✨ Features

- **Responsive Design** - Fully responsive layout that works on all devices
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Interactive Navigation** - Smooth scrolling navigation with active section highlighting
- **Dynamic Content** - JSON-driven content for easy updates
- **Performance Optimized** - Built with Vite for fast development and optimized builds
- **SEO Ready** - Optimized for search engines with semantic HTML
- **Accessibility** - WCAG compliant with keyboard navigation support

## 🛠️ Technologies Used

### Frontend

- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router DOM v7** - Client-side routing
- **Bootstrap 5.3** - Responsive CSS framework
- **React Bootstrap** - Bootstrap components for React

### Styling & Animation

- **AOS (Animate On Scroll)** - Scroll-triggered animations
- **Iconify** - 100k+ icons from popular icon sets
- **CSS3** - Custom styling with modern CSS features

### Development Tools

- **ESLint** - Code linting and formatting
- **Vite** - Build tool and development server
- **Git** - Version control

## 📁 Project Structure

```
react-portfolio/
├── public/
│   └── certificates/          # PDF certificates and credentials
├── src/
│   ├── components/            # Reusable React components
│   │   ├── NavBar.jsx        # Navigation component
│   │   ├── ProjectList.jsx   # Projects display component
│   │   └── ...
│   ├── pages/                 # Page components
│   │   ├── Home.jsx          # Hero section
│   │   ├── About.jsx         # About me section
│   │   ├── Resume.jsx        # Experience & education
│   │   ├── Projects.jsx      # Portfolio projects
│   │   └── Certificates.jsx  # Professional certifications
│   ├── data/                 # JSON data files
│   │   ├── profile.json      # Personal information
│   │   ├── projects.json     # Project details
│   │   ├── resume.json       # Experience data
│   │   └── certificates.json # Certification data
│   ├── hooks/                # Custom React hooks
│   ├── styles/               # CSS styles
│   └── App.jsx              # Main application component
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/dlxks/react-portfolio.git
   cd react-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📊 Sections Overview

### 🏠 Home

- Hero section with animated introduction
- Professional tagline and call-to-action buttons
- Social media links

### 👤 About

- Personal information and background
- Skills and technologies
- Professional summary

### 📄 Resume

- Work experience with detailed descriptions
- Education background
- Technical skills and competencies

### 🏆 Certificates

- Professional certifications and credentials
- Downloadable PDF certificates
- Achievement badges and completion dates

### 💼 Projects

- Portfolio of web development projects
- Project descriptions and technologies used
- Live demo links and GitHub repositories

## 🎨 Customization

### Updating Personal Information

Edit `src/data/profile.json` to update:

- Personal details
- Contact information
- Social media links

### Adding Projects

Update `src/data/projects.json` with new project information:

```json
{
  "id": 1,
  "title": "Project Name",
  "description": "Project description",
  "technologies": ["React", "Node.js", "MongoDB"],
  "github": "https://github.com/username/project",
  "demo": "https://project-demo.com"
}
```

### Adding Certificates

Update `src/data/certificates.json`:

```json
{
  "id": 1,
  "title": "Certificate Name",
  "issuer": "Issuing Organization",
  "date": "2024-01-15",
  "pdf": "certificate-filename.pdf"
}
```

## 🌐 Deployment

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/react-portfolio",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run: `npm run deploy`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: dlxks.sangangbayan@gmail.com
- **LinkedIn**: [Tristan Sangangbayan](https://www.linkedin.com/in/sangangbayantristan/)
- **GitHub**: [@dlxks](https://github.com/dlxks)
- **Portfolio**: [Live Demo](https://your-portfolio-url.com)

---

⭐ **Star this repository** if you found it helpful!
