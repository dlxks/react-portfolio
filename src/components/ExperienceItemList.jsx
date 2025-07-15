import ExperienceItemDescription from "./ExperienceItemDescription";

function ExperienceItemList({ experienceItems }) {
  return (
    <>
      {
        experienceItems.map(
          (item) => (
            <div key={item.id} className="resume-item">
              <h4 className="item-title">{item.position}</h4>
              <h5>{item.company} | {item.duration}</h5>
              <ExperienceItemDescription description={item.description} />
            </div>
          )
        )
      }
    </>
  )
}

export default ExperienceItemList;