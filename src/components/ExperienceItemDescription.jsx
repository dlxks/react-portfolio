function ExperienceItemDescription({ description }) {
  return (
    <>
      {description && (
        <ul className="description-list">
          {description.map((desc, index) => (
            <li key={index}>{desc}</li>
          )
          )}
        </ul>
      )}
    </>
  )
}

export default ExperienceItemDescription;