# 🚀 React Portfolio - Tristan Sangangbayan

A modern, responsive personal portfolio website built with React and Vite, showcasing professional experience, projects, certifications, and skills in web development. Features a secure admin dashboard powered by Supabase for dynamic content management.

## ✨ Features

- **Responsive Design** - Fully responsive layout that works on all devices
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Interactive Navigation** - Smooth scrolling navigation with active section highlighting
- **Dynamic Content Management** - Secure admin dashboard to manage portfolio data via Supabase
- **Comprehensive Testing** - Full unit and UI testing suite using Vitest and React Testing Library
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

### Backend & Database

- **Supabase** - Backend-as-a-service for database, authentication, and file storage

### Testing

- **Vitest** - Blazing fast unit test framework powered by Vite
- **React Testing Library** - Testing React components
- **JSDOM** - Browser environment simulation

### Styling & Animation

- **AOS (Animate On Scroll)** - Scroll-triggered animations
- **Iconify** - 100k+ icons from popular icon sets
- **CSS3** - Custom styling with modern CSS features

### Development Tools

- **ESLint** - Code linting and formatting
- **Git** - Version control

## 📁 Project Structure

```
react-portfolio/
├── public/                    # Static assets
├── src/
│   ├── components/            # Reusable React components (UI & Admin)
│   ├── pages/                 # Page components (Home, About, Admin Dashboard, etc.)
│   ├── hooks/                 # Custom React hooks (usePortfolioData, useActiveSection, etc.)
│   ├── lib/                   # Utility and configuration files (Supabase config)
│   ├── styles/                # CSS styles
│   └── App.jsx                # Main application component
├── tests/                     # Vitest test suite
│   ├── components/            # Component tests
│   ├── pages/                 # Page tests
│   ├── hooks/                 # Hook tests
│   ├── lib/                   # Utility tests
│   └── setupTests.js          # Vitest configuration and global mocks
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Supabase Project

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

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Running Tests

This project includes a comprehensive test suite covering components, pages, hooks, and utilities.

```bash
# Run all tests
npm run test
```

### Continuous Integration (CI/CD)

The project is configured to automatically run the full test suite to ensure stability:
- **GitHub Actions:** A CI workflow (`.github/workflows/ci.yml`) automatically runs tests on every push and pull request to the repository.
- **Deployments (Vercel, Netlify, etc.):** The build script in `package.json` has been updated to `npm run test && vite build`. This guarantees that deployments will automatically abort if any test fails.

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

### 🔐 Admin Dashboard
- Secured admin login
- Entity and Profile manager for dynamic resume updates via Supabase
- File uploads for Resume and Profile Images

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: dlxks.sangangbayan@gmail.com
- **LinkedIn**: [Tristan Sangangbayan](https://www.linkedin.com/in/sangangbayantristan/)
- **GitHub**: [@dlxks](https://github.com/dlxks)
