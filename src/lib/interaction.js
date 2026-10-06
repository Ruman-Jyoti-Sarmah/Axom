import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./motion";
import { registerDepth as regDepth } from "./pointer";

/**
 * Scroll-velocity bus: a single global ScrollTrigger feeds a decaying
 * velocity value; components subscribe for subtle energy responses.
 */
const vel = { value: 0, listeners: new Set() };
let inited = false;

export function initVelocity() {
  if (inited) return;
  inited = true;
  ScrollTrigger.create({
    trigger: document.documentElement,
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const v = Math.abs(self.getVelocity());
      if (v > vel.value) vel.value = v;
    },
  });
  gsap.ticker.add(() => {
    vel.value += (0 - vel.value) * 0.08;
    vel.listeners.forEach((fn) => fn(Math.min(vel.value / 3000, 1)));
  });
}

export function onVelocity(fn) {
  vel.listeners.add(fn);
  return () => vel.listeners.delete(fn);
}

/** Subtle 3D tilt + depth interaction for hero images. */
export function useTilt(strength = 6, depth = 10) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rx = gsap.quickTo(el, "rotateX", { duration: 0.9, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotateY", { duration: 0.9, ease: "power3.out" });
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * strength);
      rx((0.5 - (e.clientY - r.top) / r.height) * strength);
    };
    const onLeave = () => { rx(0); ry(0); };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    const un = regDepth(el, { depth });
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      un();
    };
  }, [strength, depth]);
  return ref;
}
