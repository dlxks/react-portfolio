import SectionHeading from "../components/SectionHeading";
import ProjectList from "../components/ProjectList";

const DEFAULT_INTRO =
  "A selection of web systems and applications I've built — from full-stack platforms to front-end experiences — using technologies like Laravel, React, Vue.js, and more.";

function Projects({ profile = {}, projects = [] }) {
  return (
    <div className="container section">
      <SectionHeading 
        eyebrow={profile.projects_eyebrow || "My work"} 
        title={profile.projects_title || "Projects"}
      >
        {profile.projects_description || DEFAULT_INTRO}
      </SectionHeading>
      <ProjectList projects={projects} />
    </div>
  );
}

export default Projects;
