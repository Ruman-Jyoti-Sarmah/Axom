/**
 * Heading with scroll-triggered line reveal — pure CSS driven by
 * [data-reveal].is-visible on a parent (see useReveal + index.css).
 * Keeps the same API used across the site (as / lines / start).
 *
 * NOTE: the root element MUST carry `data-reveal` itself. The CSS only
 * un-clips `.tr-inner` when some ancestor has `.is-visible`, and .is-visible
 * is only ever added by useRevealRoot to `[data-reveal]` elements. Without the
 * attribute here (and on every wrapping parent) the heading lines stay at
 * translateY(110%) — permanently invisible, leaving a blank gap on the page.
 */
export default function TextReveal({ as: Tag = "h2", lines = [], className = "" }) {
  return (
    <Tag className={className} data-reveal>
      {lines.map((line, i) => (
        <span className="tr-line tr-line--anim" key={line + i} style={{ "--d": `${i * 90}ms` }}>
          <span className="tr-inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
