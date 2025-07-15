function CertificationItemList({ certificationItems }) {
  return (
    <>
      {
        certificationItems.map(
          (item) => (
            <div key={item.id} className="resume-item">
              <h4 className="item-title">{item.title}</h4>
              <h5 className="item-degree">{item.body}</h5>
              <p className="item-grade">{item.date}</p>
            </div>
          )
        )
      }
    </>
  )
}

export default CertificationItemList;