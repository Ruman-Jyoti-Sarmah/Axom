import { useEffect, useRef } from "react";

/**
 * useRevealRoot â€” IntersectionObserver based scroll reveal.
 * Use with <main ref={useRevealRoot(dep)}>. The dep must change per route.
 *
 * Blank-page guarantee (why a page is never white):
 *  - index.css hides [data-reveal] elements ONLY when an ancestor carries
 *    .reveal-ready. That class is added synchronously via requestAnimationFrame
 *    during the first effect â€” before the first paint completes. Until that
 *    moment, and even if JS never runs, every [data-reveal] is fully visible.
 *  - We synchronously reveal anything already in the viewport during the same
 *    effect, so no painted frame is ever empty. The "hidden" rule therefore
 *    never affects what the user sees on first load.
 *  - A MutationObserver catches [data-reveal] nodes mounted later (lazy routes
 *    inside <Suspense>), and a short failsafe re-reveals anything still stuck.
 */
export function useRevealRoot(dep) {
  const ref = useRef(null);

  useEffect(() => {
    // Create the observer first so revealInView has it in scope (no TDZ crash).
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    const root = ref.current || document;
    const els = root.querySelectorAll ? root.querySelectorAll("[data-reveal]") : [];

    // Reduced-motion: show everything immediately, no observers.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-visible"));
      requestAnimationFrame(() =>
        (ref.current || document.documentElement).classList?.add("reveal-ready")
      );
      return;
    }

    // Reveal anything already in view right now â€” synchronously â€” so the
    // first painted frame is never a blank page, even before IO fires.
    const revealInView = (el) => {
      if (!(el instanceof Element) || el.classList.contains("is-visible")) return false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      if (r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw) {
        el.classList.add("is-visible");
        return true;
      }
      io.observe(el);
      return false;
    };

    els.forEach(revealInView);

    // Gate the hidden state AFTER the reveal pass so CSS only hides below-fold
    // [data-reveal] elements that are not yet visible.
    requestAnimationFrame(() =>
      (ref.current || document.documentElement).classList?.add("reveal-ready")
    );

    // Catch [data-reveal] nodes that mount later (lazy routes inside Suspense).
    const mo = new MutationObserver((records) => {
      for (const rec of records) {
        rec.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches?.("[data-reveal]")) revealInView(node);
          node.querySelectorAll?.("[data-reveal]").forEach(revealInView);
        });
      }
    });
    mo.observe(root, { childList: true, subtree: true });

    // Failsafe: anything in the viewport that somehow stayed hidden, show it.
    const failsafe = setTimeout(() => {
      (ref.current || document)
        .querySelectorAll("[data-reveal]")
        .forEach((el) => {
          if (el.classList.contains("is-visible")) return;
          const r = el.getBoundingClientRect();
          const vh = window.innerHeight || document.documentElement.clientHeight;
          if (r.top < vh && r.bottom > 0) el.classList.add("is-visible");
        });
    }, 900);

    return () => {
      clearTimeout(failsafe);
      io.disconnect();
      mo.disconnect();
    };
  }, [dep]);

  return ref;
}
