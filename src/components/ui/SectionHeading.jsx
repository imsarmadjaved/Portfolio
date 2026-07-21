const SectionHeading = ({ eyebrow, title, description, align = "center" }) => (
  <header
    className={`section-heading ${align === "left" ? "section-heading--left" : ""}`}
    data-aos="fade-up"
  >
    <span className="section-heading__eyebrow">{eyebrow}</span>
    <h2 className="section-heading__title">{title}</h2>
    <p className="section-heading__description">{description}</p>
  </header>
);

export default SectionHeading;
