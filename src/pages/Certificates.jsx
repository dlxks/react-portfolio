import SectionHeading from "../components/SectionHeading";
import CertificationItemList from "../components/CertificationItemList";

const DEFAULT_INTRO =
  "Certificates recognizing my completion of various courses and training programs. Each one reflects my commitment to continuous learning and staying current in my field.";

function Certificates({ profile = {}, certificates = [] }) {
  return (
    <div className="container section">
      <SectionHeading 
        eyebrow={profile.certificates_eyebrow || "Credentials"} 
        title={profile.certificates_title || "Certificates & Training"}
      >
        {profile.certificates_description || DEFAULT_INTRO}
      </SectionHeading>
      <CertificationItemList items={certificates} />
    </div>
  );
}

export default Certificates;
