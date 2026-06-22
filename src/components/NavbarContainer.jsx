import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { Icon } from "@iconify/react";
import useActiveSection from "../hooks/useActiveSection";
import { capitalize } from "../lib/utils";
import "../styles/NavBar.css";

const ICONS = {
  home: "bi:house",
  about: "bi:person",
  resume: "bi:file-earmark-text",
  certificates: "bi:award",
  projects: "bi:folder",
};

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function NavLinks({ sections, active, onNavigate, withIcons = false }) {
  return sections.map((id) => (
    <button
      key={id}
      type="button"
      className={`nav-link-btn ${active === id ? "active" : ""}`}
      onClick={() => onNavigate(id)}
    >
      {withIcons && <Icon icon={ICONS[id]} width="18" height="18" />}
      {capitalize(id)}
    </button>
  ));
}

export default function NavbarContainer({ sections }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sections);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (id) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-nav__inner">
        <button
          type="button"
          className="site-nav__brand"
          onClick={() => navigate("home")}
        >
          tristan<span>.</span>
        </button>

        <nav className="site-nav__links" aria-label="Primary">
          <NavLinks sections={sections} active={active} onNavigate={navigate} />
        </nav>

        <button
          type="button"
          className="site-nav__toggle"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Icon icon="bi:list" width="26" height="26" />
        </button>
      </div>

      <Offcanvas show={open} onHide={() => setOpen(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="site-nav__drawer">
          <NavLinks
            sections={sections}
            active={active}
            onNavigate={navigate}
            withIcons
          />
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
}
