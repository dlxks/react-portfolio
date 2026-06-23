import { Icon } from "@iconify/react";
import SectionHeading from "../components/SectionHeading";
import ExperienceItemList from "../components/ExperienceItemList";
import EducationItemList from "../components/EducationItemList";

const DEFAULT_INTRO =
  "Detail-oriented and adaptable web developer with hands-on experience building responsive, user-focused applications and improving system performance. I combine technical skill with a background in graphic design, and I'm dedicated to delivering scalable, high-quality solutions.";

const FALLBACK_RESUME = "/resume/sangangbayan_tristan_resume.pdf";

function Resume({ profile = {}, experience = [], education = [], resumeUrl }) {
  return (
    <div className="container section">
      <SectionHeading 
        eyebrow={profile.resume_eyebrow || "My journey"} 
        title={profile.resume_title || "Resume"}
      >
        {profile.resume_description || DEFAULT_INTRO}
      </SectionHeading>

      <div className="resume__download" data-aos="fade-up">
        <a
          href={resumeUrl || FALLBACK_RESUME}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
        >
          Download résumé
          <Icon icon="bi:box-arrow-up-right" width="16" height="16" />
        </a>
      </div>

      <div className="resume__columns">
        <div data-aos="fade-up">
          <h3 className="resume__group-title">
            <Icon icon="bi:briefcase" width="20" height="20" />
            Experience
          </h3>
          <div className="timeline">
            {experience.map((item) => (
              <ExperienceItemList item={item} key={item.id} />
            ))}
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <h3 className="resume__group-title">
            <Icon icon="bi:mortarboard" width="20" height="20" />
            Education
          </h3>
          <div className="timeline">
            {education.map((item) => (
              <EducationItemList item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
