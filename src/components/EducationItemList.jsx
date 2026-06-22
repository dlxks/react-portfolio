function EducationItemList({ item }) {
  return (
    <article className="timeline__item">
      <h4 className="timeline__title">{item.school}</h4>
      <p className="timeline__meta">
        <span>{item.degree}</span>
        <span className="timeline__date">{item.duration}</span>
      </p>
      <p className="timeline__sub">
        {item.level}
        {item.grade != null && ` · GPA/GWA: ${item.grade}`}
      </p>
    </article>
  );
}

export default EducationItemList;
