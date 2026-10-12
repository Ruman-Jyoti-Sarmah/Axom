import { readFileSync } from "fs";
const s = readFileSync("src/lib/useReveal.js", "utf8");
const ioI = s.indexOf("const io");
const rvI = s.indexOf("revealInView");
console.log("ioI=" + ioI + " rvI=" + rvI + " ioBeforeReveal=" + (ioI < rvI));
console.log("dupRoot=" + s.split("export function useRevealRoot").length - 1);
console.log("dupUseReveal=" + s.split("export function useReveal").length - 1);
console.log("---- snippet ----");
console.log(s.slice(250, 460));
