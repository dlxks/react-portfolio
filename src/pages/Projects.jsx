import SectionHeading from "../components/SectionHeading";
import ProjectList from "../components/ProjectList";

const INTRO =
  "A selection of web systems and applications I've built — from full-stack platforms to front-end experiences — using technologies like Laravel, React, Vue.js, and more.";

function Projects({ projects = [] }) {
  return (
    <div className="container section">
      <SectionHeading eyebrow="My work" title="Projects">
        {INTRO}
      </SectionHeading>
      <ProjectList projects={projects} />
    </div>
  );
}

export default Projects;
