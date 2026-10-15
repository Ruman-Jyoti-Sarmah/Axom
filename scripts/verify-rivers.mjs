import { RIVERS, RIVER_SYSTEMS } from "../src/data/rivers.js";
console.log("rows:", RIVERS.length);
console.log("aliases:", RIVERS.filter((r) => r.aliases.en.length).map((r) => r.id));
console.log("systems:", RIVER_SYSTEMS.map((s) => s.id));
console.log("sides:", [...new Set(RIVERS.map((r) => r.side))].sort().join(", "));
console.log("main:", RIVERS.filter((r) => r.side === "main").map((r) => r.id));
console.log("north:", RIVERS.filter((r) => r.side === "north").map((r) => r.id));
console.log("south:", RIVERS.filter((r) => r.side === "south").map((r) => r.id));
console.log("valley:", RIVERS.filter((r) => r.side === "valley").map((r) => r.id));
