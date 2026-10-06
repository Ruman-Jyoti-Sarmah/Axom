import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "./motion";

/**
 * Responsive image: serves srcset (400/800/1200/2000/2400) with
 * proper sizes so mobile never downloads a 2.4MB asset.
 */
export default function RImg({ id, alt, sizes = "100vw", className = "", lazy = true, eagerWidth, ...rest }) {
  const widths = eagerWidth ? [eagerWidth] : [400, 800, 1200, 2000, 2400];
  const srcSet = widths.map((w) =>
    `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop ${w}w`
  ).join(", ");
  const fallback = widths[widths.length - 1];
  // pick smallest >= sizes viewport width-ish — browser decides via sizes
  const fallbackUrl = `https://images.unsplash.com/${id}?q=80&w=${fallback}&auto=format&fit=crop`;
  return (
    <img
      srcSet={srcSet}
      sizes={sizes}
      src={fallbackUrl}
      alt={alt}
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
      className={className}
      {...rest}
    />
  );
}
