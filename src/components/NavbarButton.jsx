import { Icon } from "@iconify/react";
import '../styles/NavBar.css';
import { Container } from "react-bootstrap";

function NavbarButton({ onClick }) {
  return (
    <Container fluid="md" className="navbar-container">
      <button onClick={onClick} className='nav-button'>
        <Icon icon="bi:list" width="24" height="24" />
      </button>
    </Container>
  );
}

export default NavbarButton;
