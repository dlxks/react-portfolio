import { Container } from "react-bootstrap";
import CertificationItemList from "../components/CertificationItemList";
import certificatesData from '../data/certificates.json';


const Certificates = () => {
  const certificates = certificatesData || [];

  return (
    <>
      <Container fluid="md" className="certificates-container" data-aos="fade-up" data-aos-duration="500">
        <div className="contents">
          <section id="certificates" className="certificates-section">
            <div className="container section-title" data-aos="fade-up">
              <h2>Certificates & Trainings</h2>
              <p data-aos="fade-up" data-aos-delay="200">
                I have received several certificates recognizing my successful completion of various courses and training programs. These certificates validate my skills, knowledge, and commitment to continuous learning in my professional and technical fields. Each certification reflects my dedication to improving and staying updated in my areas of expertise.
              </p>

              <CertificationItemList certificationItems={certificates} />
            </div>
          </section>
        </div >
      </Container >
    </>
  );
}

export default Certificates;