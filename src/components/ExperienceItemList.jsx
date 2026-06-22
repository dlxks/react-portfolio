import BulletList from "./BulletList";

function ExperienceItemList({ item }) {
  return (
    <article className="timeline__item">
      <h4 className="timeline__title">{item.position}</h4>
      <p className="timeline__meta">
        <span>{item.company}</span>
        <span className="timeline__date">{item.duration}</span>
      </p>
      <BulletList items={item.description} />
    </article>
  );
}

export default ExperienceItemList;
