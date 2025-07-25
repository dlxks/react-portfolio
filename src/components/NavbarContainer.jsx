import { useEffect, useRef, useState } from 'react';
import NavBar from './NavBar';
import NavbarButton from './NavbarButton';

function NavbarContainer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  // Hide navbar button on scroll down
  const buttonRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      if (buttonRef.current) {
        if (isScrollingDown) {
          buttonRef.current.classList.add("hide");
          buttonRef.current.classList.remove("show");
        } else {
          buttonRef.current.classList.add("show");
          buttonRef.current.classList.remove("hide");
        }
      }
      lastScrollY.current = currentScrollY;
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <NavbarButton onClick={toggleShow} ref={buttonRef} />
      <NavBar show={show} handleClose={handleClose} />
    </>
  );
}

export default NavbarContainer;
