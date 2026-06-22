export default function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading" data-aos="fade-up">
      {eyebrow && <span className="section-heading__eyebrow">{eyebrow}</span>}
      <h2 className="section-heading__title">{title}</h2>
      {children && <p className="section-heading__intro">{children}</p>}
    </div>
  );
}
