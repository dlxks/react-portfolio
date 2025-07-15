import { Icon } from "@iconify/react/dist/iconify.js";
import { Container } from "react-bootstrap";

function Home({ profile }) {
  const getFullUrl = (url) => (url?.startsWith("http") ? url : `https://${url}`);

  const socialIcons = {
    facebook: "bi:facebook",
    instagram: "bi:instagram",
    linkedin: "bi:linkedin",
    github: "bi:github",
  };

  return (
    <Container
      fluid="md"
      className="home-container"
      data-aos="fade"
      data-aos-duration="600"
    >
      <div className="contents">
        <h1 className="home-name h1">{profile.name}</h1>

        <div className="socials" data-aos="fade" data-aos-delay="100">
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
                <Icon icon={icon} width="36" height="36" style={{ color: "#fff" }} />
              </a>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default Home;
