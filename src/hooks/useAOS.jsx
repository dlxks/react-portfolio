import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/** Initializes scroll animations, disabled when the user prefers reduced motion. */
export default function useAOS() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      disable: prefersReduced,
    });
  }, []);
}
