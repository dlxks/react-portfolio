function EducationItemList({ educationItems }) {
  return (
    <>
      {
        educationItems.map(
          (item) => (
            <div key={item.id} className="resume-item">
              <h4 className="item-title">{item.school}</h4>
              <h5 className="item-degree">{item.degree}</h5>
              <p>{item.level} | {item.duration}</p>
              <p className="item-grade">GPA/GWA: {item.grade}</p>
            </div>
          )
        )
      }
    </>
  )
}

export default EducationItemList;