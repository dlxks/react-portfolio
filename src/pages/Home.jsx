import { Icon } from "@iconify/react";
import { getFullUrl } from "../lib/utils";

function Home({ profile, socialLinks = [] }) {
  const name = profile.name ?? "";

  return (
    <div className="hero">
      <div className="hero__overlay" />
      <div className="container hero__content">
        <p className="hero__eyebrow" data-aos="fade-up">
          Hi, my name is
        </p>
        <h1 className="hero__name" data-aos="fade-up" data-aos-delay="80">
          {name}
        </h1>
        <p className="hero__role" data-aos="fade-up" data-aos-delay="160">
          Front-End &amp; Web Developer
        </p>
        <p className="hero__tagline" data-aos="fade-up" data-aos-delay="220">
          I build responsive, user-focused web applications with React, Laravel,
          and modern tooling.
        </p>

        <div className="hero__actions" data-aos="fade-up" data-aos-delay="280">
          <a href="#projects" className="btn btn--primary">
            View my work
          </a>
          <a href="#about" className="btn btn--ghost">
            About me
          </a>
        </div>

        <div className="hero__socials" data-aos="fade-up" data-aos-delay="340">
          {socialLinks.map(
            (link) =>
              link.url && (
                <a
                  key={link.id ?? link.platform}
                  href={getFullUrl(link.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                >
                  <Icon icon={link.icon} width="24" height="24" />
                </a>
              ),
          )}
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to content">
        <Icon icon="bi:chevron-down" width="28" height="28" />
      </a>
    </div>
  );
}

export default Home;
