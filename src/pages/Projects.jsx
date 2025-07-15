import { Container } from "react-bootstrap";
import ProjectList from "../components/ProjectList";

function Projects({ projects }) {

  return (

    <Container fluid="md" className="project-container" data-aos="fade-up" data-aos-duration="500">
      <div className="contents">
        <section id="projects" className="projects-section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Projects</h2>
            <p>Developed web-based systems including an entrance examination platform with chatbot integration, real-time notifications (SMS/email), and scoring, as well as a student information management system with secure CRUD operations and responsive UI. Technologies used include Laravel, Vue.js, PHP, MySQL, and Bootstrap.</p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              <ProjectList projects={projects} />
            </div>
          </div>
        </section>
      </div >

    </Container>
  );
}

export default Projects;