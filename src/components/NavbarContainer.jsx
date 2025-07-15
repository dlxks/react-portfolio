import { useState } from 'react';
import NavBar from './NavBar';
import NavbarButton from './NavbarButton';

function NavbarContainer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <NavbarButton onClick={toggleShow} />
      <NavBar show={show} handleClose={handleClose} />
    </>
  );
}

export default NavbarContainer;
