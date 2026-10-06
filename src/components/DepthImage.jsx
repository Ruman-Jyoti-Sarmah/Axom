import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { registerDepth } from "../lib/pointer";
import { initVelocity, onVelocity } from "../lib/interaction";

/**
 * Parallax image with depth. The inner image is oversized and translates
 * vertically on scroll (speed = virtual depth) plus slight mouse drift.
 * Scroll velocity adds a subtle energetic offset that settles naturally.
 */
export default function DepthImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  depth = 40,      // px of scroll parallax each way
  mouseDepth = 8,  // px of pointer parallax
  velocity = 0.12, // velocity energy factor
  eager = false,
  imgRef: externalRef,
}) {
  const wrap = useRef(null);
  const img = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img.current,
        { yPercent: -(depth / 12) },
        {
          yPercent: depth / 12,
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        }
      );
    }, wrap);

    const unDepth = registerDepth(img.current, { depth: mouseDepth });
    let unVel;
    if (velocity > 0) {
      initVelocity();
      const setY = gsap.quickSetter(img.current, "y", "px");
      unVel = onVelocity((n) => setY(n * 30 * velocity));
    }
    return () => { ctx.revert(); unDepth(); unVel?.(); };
  }, [depth, mouseDepth, velocity]);

  return (
    <div ref={wrap} className={className}>
      <img
        ref={(n) => { img.current = n; if (externalRef) externalRef.current = n; }}
        src={src}
        alt={alt}
        className={imgClassName}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}
