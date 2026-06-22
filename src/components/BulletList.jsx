/** Renders an array of strings as a bulleted list. */
export default function BulletList({ items, className = "bullet-list" }) {
  if (!items?.length) return null;
  return (
    <ul className={className}>
      {items.map((text, i) => (
        <li key={i}>{text}</li>
      ))}
    </ul>
  );
}
