import { Container } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import profilePic from '../assets/profile.jpg';

function About({ profile }) {
  return (
    <>
      <Container fluid="md" className="about-container" data-aos="fade-up" data-aos-duration="500">
        <div className="contents">
          <section id="about" className="about-section">
            <div className="container section-title" data-aos="fade-up">
              <h2 data-aos="fade-up">About</h2>
              <p data-aos="fade-up">
                Hi! I am Tristan Sangangbayan and I'm an aspiring web developer/front-end developer with a solid academic foundation in Information Technology and hands-on experience from personal and academic projects using Laravel, React, and modern web development tools. Eager to apply my knowledge in a professional setting, contribute to real-world projects, and grow as a developer in a collaborative and forward-thinking environment.
              </p>
            </div>

            <div className="container" data-aos="fade-up" data-aos-delay="100">
              <div className="row gy-4 justify-content-center">
                <div className="col-lg-3">
                  <img
                    src={profilePic}
                    className="img-fluid"
                    alt={`${profile.name}'s profile`}
                  />
                </div>
                <div className="col-lg-9 content" data-aos="fade-up" data-aos-delay="100">
                  <h2 className="about-title">Front-End Developer &amp; Web Developer.</h2>
                  <div className="row">
                    <div className="col-lg-6" data-aos="fade-up">
                      <ul>
                        <li>
                          <Icon icon="bi:caret-right" width="16" height="16" />
                          <strong>Birthday:</strong>
                          <span>{profile.birthday}</span>
                        </li>
                        <li>
                          <Icon icon="bi:caret-right" width="16" height="16" />
                          <strong>Phone:</strong>
                          <span>{profile.contact}</span>
                        </li>
                        <li>
                          <Icon icon="bi:caret-right" width="16" height="16" />
                          <strong>Email:</strong>
                          <span>{profile.email}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6" data-aos="fade-up">
                      <ul>
                        <li>
                          <Icon icon="bi:caret-right" width="16" height="16" />
                          <strong>Age:</strong>
                          <span>{profile.age}</span>
                        </li>
                        <li>
                          <Icon icon="bi:caret-right" width="16" height="16" />
                          <strong>Degree:</strong>
                          <span>{profile.degree}</span>
                        </li>
                        <li><Icon icon="bi:caret-right" width="16" height="16" />
                          <strong>Address:</strong>
                          <span>{profile.address}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}

export default About;