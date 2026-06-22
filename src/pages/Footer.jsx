import { Icon } from "@iconify/react";
import { getFullUrl, firstWord, capitalize } from "../lib/utils";

function Footer({ profile, socialLinks = [], sections = [] }) {
  const firstName = firstWord(profile.name);

  return (
    <footer id="footer" className="footer">
      <div className="container footer__grid">
        <div className="footer__col">
          <h3 className="footer__brand">{firstName}.</h3>
          <p className="footer__text">
            Seeking new career challenges and opportunities. Let&rsquo;s start a
            conversation!
          </p>
          <div className="footer__socials">
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
                    <Icon icon={link.icon} width="20" height="20" />
                  </a>
                ),
            )}
          </div>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h4 className="footer__heading">Navigate</h4>
          {sections.map((id) => (
            <a key={id} href={`#${id}`} className="footer__link">
              {capitalize(id)}
            </a>
          ))}
        </nav>

        <div className="footer__col">
          <h4 className="footer__heading">Get in touch</h4>
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="footer__email">
              {profile.email}
            </a>
          )}
        </div>
      </div>

      <div className="footer__bar">
        <p>
          &copy; {new Date().getFullYear()} {firstName}. Built with React,
          Bootstrap &amp; Iconify.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
