import { Icon } from "@iconify/react";
import BulletList from "./BulletList";
import { getFullUrl } from "../lib/utils";

function ProjectList({ projects = [] }) {
  return (
    <div className="card-grid">
      {projects.map((project, i) => {
        const url = getFullUrl(project.link);
        const tags = project.technology
          ?.split(",")
          .map((t) => t.trim())
          .filter(Boolean);

        return (
          <article
            className="project-card"
            key={project.id ?? i}
            data-aos="fade-up"
            data-aos-delay={(i % 3) * 80}
          >
            <header className="project-card__head">
              <span className="project-card__icon">
                <Icon icon="bi:folder2-open" width="22" height="22" />
              </span>
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__repo"
                  aria-label={`${project.title} repository`}
                >
                  <Icon icon="bi:github" width="22" height="22" />
                </a>
              )}
            </header>

            <h3 className="project-card__title">
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>

            <BulletList items={project.description} className="project-card__desc" />

            {tags?.length > 0 && (
              <ul className="project-card__tags">
                {tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </article>
        );
      })}
    </div>
  );
}

export default ProjectList;
