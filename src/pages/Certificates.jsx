import SectionHeading from "../components/SectionHeading";
import CertificationItemList from "../components/CertificationItemList";

const INTRO =
  "Certificates recognizing my completion of various courses and training programs. Each one reflects my commitment to continuous learning and staying current in my field.";

function Certificates({ certificates = [] }) {
  return (
    <div className="container section">
      <SectionHeading eyebrow="Credentials" title="Certificates & Training">
        {INTRO}
      </SectionHeading>
      <CertificationItemList items={certificates} />
    </div>
  );
}

export default Certificates;
