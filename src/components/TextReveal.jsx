/**
 * Static heading — renders masked lines without any animation.
 * Keeps the same API used across the site (as / lines).
 */
export default function TextReveal({ as: Tag = "h2", lines = [], className = "" }) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span className="tr-line" key={line + i}>
          <span className="tr-inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
