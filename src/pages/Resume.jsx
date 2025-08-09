import { Container } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import ExperienceItemList from "../components/ExperienceItemList";
import EducationItemList from "../components/EducationItemList";

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
                Adaptable IT graduate with experience in order processing, system support, and digital marketing. Skilled in SAP S/4HANA, workflow automation, and cross-functional collaboration. Certified in programming and information security, with a strong focus on continuous learning and process improvement.
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