export default function SectionTitle({ title, subtitle }) {
  return <div className="mb-5 bangla"><h2 className="section-title">{title}</h2>{subtitle && <p className="section-subtitle">{subtitle}</p>}</div>;
}
