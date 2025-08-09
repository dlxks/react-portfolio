import ExperienceItemDescription from "./ExperienceItemDescription";

function ExperienceItemList({ item }) {
  return (
    <>
      <div
        className="resume-item col-lg-6"
        data-aos="fade-up" data-aos-delay="100">
        <h4 className="item-title">{item.position}</h4>
        <h5>{item.company} | {item.duration}</h5>
        <ExperienceItemDescription description={item.description} />
      </div>
    </>
  )
}

export default ExperienceItemList;