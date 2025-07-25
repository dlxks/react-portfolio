import { Icon } from "@iconify/react";
import '../styles/NavBar.css';
import { Container } from "react-bootstrap";
import { forwardRef } from "react";

const NavbarButton = forwardRef(({ onClick }, ref) => {
  return (
    <Container fluid="md" className="navbar-container">
      <button onClick={onClick} className='nav-button' ref={ref}>
        <Icon icon="bi:list" width="24" height="24" />
      </button>
    </Container>
  );
})

export default NavbarButton;
