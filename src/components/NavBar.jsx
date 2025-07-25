import '../styles/NavBar.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Nav, Offcanvas } from 'react-bootstrap';
import useActiveSection from '../hooks/useActiveSection';

function NavBar({ show, handleClose }, ref) {
  const sectionIds = ['home', 'about', 'resume', 'projects'];
  const activeSection = useActiveSection(sectionIds);

  const scrollToSection = (id) => {
    handleClose();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="start"
      scroll={true}
      backdrop={true}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column">
          {sectionIds.map((id) => (
            <Nav.Link
              key={id}
              className={`d-flex align-items-center ${activeSection === id ? 'active' : ''}`}
              onClick={() => scrollToSection(id)}
            >
              <Icon icon={iconMap[id]} width="20" height="20" style={{ color: '#666' }} />
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </Nav.Link>
          ))}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

const iconMap = {
  home: 'bi:house',
  about: 'bi:person',
  resume: 'bi:file-earmark-text',
  projects: 'bi:folder',
};

export default NavBar;
