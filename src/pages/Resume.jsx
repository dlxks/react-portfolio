import { Container } from "react-bootstrap";
import ExperienceItemList from "../components/ExperienceItemList";
import EducationItemList from "../components/EducationItemList";
import { Icon } from "@iconify/react/dist/iconify.js";

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
              <p data-aos="fade-up" data-aos-delay="200">
                Detail-oriented and adaptable Web Developer with hands-on experience in building responsive, user-focused applications and enhancing system performance. Combines technical expertise with creativity through a background in graphic design, and leverages transferable strengths in system optimization, process improvement, and cross-functional collaboration. Dedicated to delivering scalable, high-quality solutions while continuously advancing technical knowledge.
              </p>

              <p className="flex items-center">
                <a
                  href="/resume/sangangbayan_tristan_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary">
                  Download My Resume <Icon icon="bi:box-arrow-up-right" />
                </a>
              </p>

              <div className="container">
                {/* Experience Section */}
                <h2 className="resume-title">Experience</h2>
                <div className="row gy-4" data-aos="fade-up" data-aos-delay="100">
                  {experienceItems.map((item) => (
                    <ExperienceItemList item={item} key={item.id} />
                  ))}
                </div>

                {/* Education Section */}
                <h2 className="resume-title" data-aos="fade-up">Education</h2>
                <div className="row gy-4" data-aos="fade-up" data-aos-delay="100">
                  {educationItems.map((item) => (
                    <EducationItemList item={item} key={item.id} />
                  ))}
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