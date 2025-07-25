import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import NavbarContainer from './components/NavbarContainer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Resume from './pages/Resume.jsx';
import Certificates from './pages/Certificates.jsx';
import Projects from './pages/Projects.jsx';
import Footer from './pages/Footer.jsx';
import { Icon } from "@iconify/react";
import useAOS from './hooks/useAOS';
import profileInfo from './data/profile.json';
import resumeData from './data/resume.json';
import projectsData from './data/projects.json';


function App() {

  // Back to top button
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 400;
      setShowTopBtn(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  // Animate on scroll
  useAOS();

  // User data
  const profile = profileInfo.profile;
  const resume = resumeData;
  const projects = projectsData;

  return (
    <>
      <NavbarContainer />

      <section id='home'><Home profile={profile} /></section>
      <section id='about'><About profile={profile} /></section>
      <section id='resume'><Resume resume={resume} /></section>
      <section id='certificates'><Certificates /></section>
      <section id='projects'><Projects projects={projects} /></section>
      <section id='footer'><Footer profile={profile} /></section>

      <button
        onClick={scrollToTop}
        className={`back-to-top-btn ${showTopBtn ? 'visible' : ''}`}
      >
        <Icon icon="bi:arrow-up-circle-fill" width="42" height="42" />
      </button>
    </>
  );
}

export default App;
