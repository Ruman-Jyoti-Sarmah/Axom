import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";

/**
 * Masked line reveal: lines slide up from behind an overflow mask
 * with a subtle rise — used for all major typography.
 */
export default function TextReveal({
  as: Tag = "div",
  lines = [],
  className = "",
  delay = 0,
  stagger = 0.12,
  start = "top 82%",
  italicIndex = -1,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.querySelectorAll(".tr-inner"),
        { yPercent: 118, rotateX: 8 },
        {
          yPercent: 0,
          rotateX: 0,
          duration: 1.4,
          ease: "expo.out",
          stagger,
          delay,
          scrollTrigger: { trigger: ref.current, start },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [delay, stagger, start]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {lines.map((line, i) => (
        <span className="tr-line" key={i}>
          <span className="tr-inner" style={{ fontStyle: i === italicIndex ? "italic" : undefined }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
