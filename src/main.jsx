import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import "./index.css";

const createFallbackSvg = (label = "Assam") => {
  const safeLabel = String(label).replace(/[&<>"']/g, "");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stop-color="#153d3d" />
          <stop offset="100%" stop-color="#0d1c1d" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#g)" />
      <circle cx="930" cy="165" r="120" fill="rgba(243,201,138,0.22)" />
      <path d="M0 540C170 500 320 610 470 620C665 635 770 470 950 500C1055 522 1115 560 1200 540V800H0Z" fill="rgba(255,255,255,0.07)" />
      <text x="70" y="620" fill="#f3c98a" font-size="92" font-family="Georgia, serif" font-weight="700">${safeLabel}</text>
      <text x="72" y="690" fill="rgba(255,255,255,0.75)" font-size="30" font-family="Arial, sans-serif" letter-spacing="4">AXOM</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const replaceBrokenMedia = (target) => {
  if (
    !(target instanceof HTMLImageElement || target instanceof HTMLVideoElement)
  )
    return;
  if (target.dataset.axomFallback === "true") return;

  target.dataset.axomFallback = "true";

  if (target instanceof HTMLImageElement) {
    target.src = createFallbackSvg(
      target.alt || target.dataset.label || "Assam",
    );
    return;
  }

  if (target.tagName === "VIDEO") {
    target.poster = createFallbackSvg(
      target.getAttribute("data-fallback-label") || "Assam",
    );
    target.style.display = "none";
    target.pause();
  }
};

document.addEventListener(
  "error",
  (event) => {
    const target = event.target;
    if (
      target instanceof HTMLImageElement ||
      target instanceof HTMLVideoElement
    ) {
      replaceBrokenMedia(target);
    }
  },
  true,
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
