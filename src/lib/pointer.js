import { gsap, prefersReducedMotion } from "./motion";

/**
 * Shared pointer state with inertia — one central rAF loop drives
 * all registered depth layers (background/mid/foreground/text).
 */
const state = { x: 0, y: 0, tx: 0, ty: 0 };
const layers = new Set(); // { el, depth, rotZ, setter }
let running = false;

const isFine = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export function initPointer() {
  if (running || prefersReducedMotion() || !isFine()) return;
  running = true;
  document.body.classList.add("has-cursor");
  window.addEventListener(
    "mousemove",
    (e) => {
      state.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      state.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );
  gsap.ticker.add(() => {
    state.x += (state.tx - state.x) * 0.06;
    state.y += (state.ty - state.y) * 0.06;
    layers.forEach((l) => {
      l.setx(state.x * l.depth);
      l.sety(state.y * l.depth);
      if (l.rot) l.setrot(state.x * l.rot);
    });
  });
}

export function registerDepth(el, { depth = 0, rot = 0 } = {}) {
  if (!el || prefersReducedMotion() || !isFine()) return () => {};
  const layer = {
    el,
    depth,
    rot,
    setx: gsap.quickSetter(el, "x", "px"),
    sety: gsap.quickSetter(el, "y", "px"),
    setrot: gsap.quickSetter(el, "rotateY", "deg"),
  };
  layers.add(layer);
  return () => layers.delete(layer);
}
