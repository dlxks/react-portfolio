import { Container } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import ExperienceItemList from "../components/ExperienceItemList";
import EducationItemList from "../components/EducationItemList";
import CertificationItemList from "../components/CertificationItemList";

function Resume({ resume }) {
  const experienceItems = resume.filter(item => item.category === "experience") || []
  const educationItems = resume.filter(item => item.category === "education") || []
  const certificationItems = resume.filter(item => item.category === "certificate") || []

  return (
    <>
      <Container fluid="md" className="resume-container" data-aos="fade-up" data-aos-duration="500">
        <div className="contents">
          <section id="resume" className="resume-section">
            <div className="container section-title" data-aos="fade-up">
              <h2>Resume</h2>

              <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row">
                  <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                    <h2 className="resume-title">Experience</h2>
                    <ExperienceItemList experienceItems={experienceItems} />
                  </div>

                  <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                    <h2 className="resume-title">Education</h2>
                    <EducationItemList educationItems={educationItems} />

                    <h2 className="resume-title">Certifications</h2>
                    <CertificationItemList certificationItems={certificationItems} />

                  </div>
                </div>
              </div>
            </div>
          </section>
        </div >
      </Container >
    </>
  );
}

export default Resume;