function ProjectDescription({ description }) {
  return (
    <>
      {description && (
        <ul className="description">
          {description.map((desc, index) => (
            <li key={index}>{desc}</li>
          )
          )}
        </ul>
      )}
    </>
  )
}

export default ProjectDescription;