import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

/**
 * RiversAtlas — lazy Leaflet map used on the rivers detail pages.
 * Tiles come from OpenStreetMap (CC-BY-SA). Leaflet is code-split only
 * when the atlas is requested so the rivers shell stays small.
 */
export default function RiversAtlas({ systems }) {
  const ref = useRef(null);
  const [Leaflet, setLeaflet] = useState(null);
  const hasInit = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const mod = await import("leaflet");
        setLeaflet(mod.default || mod);
      } catch {
        // map is non-blocking
      }
    })();
  }, []);

  useEffect(() => {
    if (!Leaflet || !ref.current || hasInit.current) return;
    hasInit.current = true;
    const map = Leaflet.map(ref.current).setView([26.49, 91.84], 7);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);
    for (const sys of systems) {
      const where = sys === "brahmaputra" ? [27.0, 90.5] : sys === "barak" ? [24.8, 92.8] : [26.49, 91.84];
      Leaflet.circleMarker(where, { radius: 8, color: "#9c4a1f", weight: 2, fillColor: "#9c4a1f", fillOpacity: 0.85 }).addTo(map);
    }
    return () => map.remove();
  }, [Leaflet, systems]);

  return (
    <div
      ref={ref}
      className="rivers__map"
      role="application"
      aria-label="OpenStreetMap river atlas "
    ></div>
  );
}
