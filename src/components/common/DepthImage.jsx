/**
 * Image frame with subtle pointer drift (desktop only) + CSS reveal.
 * Falls back to a plain image when reduced-motion is preferred.
 */
import { useRef } from "react";

export default function DepthImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  eager = false,
  depth = 0,
  mouseDepth = 8,
  onError,
  ...rest
}) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--mx", x.toFixed(3));
    el.style.setProperty("--my", y.toFixed(3));
  };

  // Never leave a broken-image hole: hide the frame if the source fails.
  const hideOnError = (e) => {
    const frame = ref.current;
    if (frame) frame.style.display = "none";
    const cap = frame?.parentElement?.querySelector?.("figcaption");
    if (cap) cap.style.display = "none";
    onError?.(e);
  };

  return (
    <div
      ref={ref}
      className={`${className} depth`.trim()}
      style={{ "--md": mouseDepth }}
      onMouseMove={onMove}
      onMouseLeave={() => ref.current?.style.removeProperty("--mx")}
    >
      <img
        src={src}
        alt={alt}
        className={imgClassName}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onError={hideOnError}
        {...rest}
      />
    </div>
  );
}
