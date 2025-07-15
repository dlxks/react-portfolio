import { useEffect, useState } from 'react';

const useActiveSection = (sectionIds = []) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (let sectionId of sectionIds) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  useEffect(() => {
    if (activeSection) {
      const titles = {
        home: 'Home',
        about: 'About',
        resume: 'Resume',
        projects: 'Projects',
        skills: 'Skills',
      }

      const pageTitle = titles[activeSection] || 'My Portfolio';
      document.title = `${pageTitle} - My Portfolio`;
    }
  }, [activeSection])

  return activeSection;
};

export default useActiveSection;
