import { Icon } from '@iconify/react/dist/iconify.js';
import { Nav } from 'react-bootstrap';
import useActiveSection from '../hooks/useActiveSection';

function Footer({ profile }) {

  // Get first name from JSON data
  const getFirstWord = (text) => {
    if (text) {
      const words = text.split(' ');
      return words[0];
    }

    return ''
  }
  const firstName = getFirstWord(profile.name)
  const email = profile.email

  // Social media lists
  const getFullUrl = (url) => (url?.startsWith("http") ? url : `https://${url}`);

  const socialIcons = {
    facebook: "bi:facebook",
    instagram: "bi:instagram",
    linkedin: "bi:linkedin",
    github: "bi:github",
  };

  const sectionIds = ['home', 'about', 'resume', 'certificates', 'projects'];
  const activeSection = useActiveSection(sectionIds);

  const scrollToSection = (id) => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (

    <footer className="bg-dark text-white py-3">
      <div className="container">
        <div className="row g-md-5 my-5">
          <div className="col-md-4 footer-section" data-aos="fade-up">
            <h3>{firstName}.</h3>
            <p>Find me on social media:</p>

            <div className='socials' >
              {Object.entries(socialIcons).map(([key, icon]) => {
                const url = profile[key];
                if (!url) return null;

                return (
                  <a
                    key={key}
                    href={getFullUrl(url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginRight: 12 }}
                    aria-label={key}
                  >
                    <Icon icon={icon} width="22" height="22" style={{ color: "#fff" }} />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="col-md-3 footer-section" data-aos="fade-up">
            {sectionIds.map((id) => (
              <Nav.Link
                key={id}
                className={`text-white px-0 ${activeSection === id ? 'fw-bold text-decoration-none' : ''}`}
                onClick={() => scrollToSection(id)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Nav.Link>
            ))}
          </div>
          <div className="col-md-5 footer-section" data-aos="fade-up">
            <p>
              Seeking new career challenges and opportunities. Let’s start a conversation!
            </p>
            <h3>
              <a href="mailto:dlxks.sangangbayan@gmail.com" className="text-white text-decoration-none">{email}</a>
            </h3>
          </div>
        </div>
        <div className="row">
          <p>
            &copy;{new Date().getFullYear()} {firstName}. Created using{' '}
            <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React JS</a>,{' '}
            <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">Bootstrap</a>, {' '}
            <a href="https://github.com/michalsnik/aos" target="_blank" rel="noopener noreferrer">
              AOS
            </a>, and{' '}
            <a href="https://iconify.design/" target="_blank" rel="noopener noreferrer">Iconify</a>.
          </p>

        </div>
      </div>
    </footer>
  );
}


export default Footer;