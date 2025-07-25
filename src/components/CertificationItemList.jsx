import { Icon } from "@iconify/react/dist/iconify.js";

function CertificationItemList({ certificationItems }) {
  return (
    <>
      <div className="certification-item-container">
        {
          certificationItems.map((item, index) => (
            <div
              className="certification-item"
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={Math.floor(Math.random() * 3) * 100}
            >
              < div >
                <h5 className="certification-title fw-800">
                  <Icon icon="bi:award" className="item-icon" />
                  {item.title}
                </h5>
              </div>
              <div className="certification-item-details">
                <ul>
                  <li><span className="label">Given by:</span> {item.provider}</li>
                  <li><span className="label">Date:</span> {item.date}</li>
                </ul>
              </div>
              <div className="certification-link d-flex justify-content-end">
                {item.file_url ? (
                  <a href={item.file_url} target="_blank" rel="noopener noreferrer" key={item.id}>
                    View Certificate <Icon icon="bi:box-arrow-up-right" />
                  </a>
                ) : (
                  <span style={{ color: '#999', fontStyle: 'italic' }}>No certificate available</span>
                )}
              </div>

              {/* Bubble on hover  */}
              < div className="hover_color_bubble" ></div>
            </div >

          ))
        }
      </div >
    </>
  )
}

export default CertificationItemList;