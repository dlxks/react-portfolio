import { Icon } from "@iconify/react";

function CertificationItemList({ items = [] }) {
  return (
    <div className="card-grid">
      {items.map((item, i) => (
        <article
          className="cert-card"
          key={item.id}
          data-aos="fade-up"
          data-aos-delay={(i % 3) * 80}
        >
          <span className="cert-card__icon">
            <Icon icon="bi:award-fill" width="22" height="22" />
          </span>
          <h3 className="cert-card__title">{item.title}</h3>
          <dl className="cert-card__meta">
            <div>
              <dt>Issued by</dt>
              <dd>{item.provider}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{item.date}</dd>
            </div>
          </dl>
          {item.file_url ? (
            <a
              className="cert-card__link"
              href={item.file_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View certificate
              <Icon icon="bi:box-arrow-up-right" width="14" height="14" />
            </a>
          ) : (
            <span className="cert-card__link cert-card__link--muted">
              No file available
            </span>
          )}
        </article>
      ))}
    </div>
  );
}

export default CertificationItemList;
