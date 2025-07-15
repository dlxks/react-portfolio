import { Icon } from "@iconify/react/dist/iconify.js";
import ProjectDescription from "./ProjectDescription";

function ProjectList({ projects }) {

  const getFullUrl = (url) => (url?.startsWith("http") ? url : `https://${url}`);

  return (
    <>
      {
        projects.map((project, index) => (
          <div
            key={index}
            className={`col-lg-6 d-flex project-item ${index % 2 === 1 ? 'even' : 'odd'}`}
            data-aos="fade-up"
            data-aos-delay={index % 2 === 1 ? '200' : '100'}
          >
            <div className="icon flex-shrink-0">
              <Icon icon="bi:github" className="item-icon" />
            </div>
            <div>
              <h4 className="title" key={index}>
                <a
                  href={getFullUrl(project.link)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </a>
              </h4>
              <h6>{project.technology}</h6>
              <ProjectDescription description={project.description} />
            </div>
          </div >
        )
        )
      }
    </>
  )
}

export default ProjectList;