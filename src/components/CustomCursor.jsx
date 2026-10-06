import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";

/**
 * Minimal premium cursor: inertial dot that expands to "VIEW" over
 * [data-cursor="view"] elements and rings over interactive links.
 * Desktop (fine pointer) only.
 */
export default function CustomCursor() {
  const dot = useRef(null);

  useEffect(() => {
    if (
      prefersReducedMotion() ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;

    const el = dot.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const t = e.target.closest("[data-cursor='view'], a, button");
      el.classList.toggle("cursor--view", t?.dataset?.cursor === "view");
      el.classList.toggle("cursor--link", !!t && t.dataset.cursor !== "view");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.body.classList.add("has-cursor");
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={dot} className="cursor" aria-hidden="true">
      <span>View</span>
    </div>
  );
}
