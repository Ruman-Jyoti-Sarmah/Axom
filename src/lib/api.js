import { DISTRICTS, slugify } from "../data/districts.js";
import { DISTRICT_DETAILS } from "../data/districtDetails.js";
import * as STATIC_CONTENT from "../data/content.js";

const API = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

async function tryFetch(path, opts) {
  if (!API) throw new Error("no-api");
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) throw new Error(`api-${res.status}`);
  return res.json();
}

const withSlug = (d) => ({ ...d, slug: slugify(d.name) });

/** Districts — API first, static fallback (works fully offline too). */
export async function fetchDistricts() {
  try {
    const data = await tryFetch("/api/districts");
    if (Array.isArray(data) && data.length) return data.map(withSlug);
  } catch {}
  return DISTRICTS.map(withSlug);
}

export async function fetchDistrict(slug) {
  try {
    const data = await tryFetch(`/api/districts/${slug}`);
    if (data && data.name) return data;
  } catch {}
  const base = DISTRICTS.find((d) => slugify(d.name) === slug);
  if (!base) return null;
  const det = DISTRICT_DETAILS[slug] || {};
  return {
    ...base,
    slug,
    history: det.history || "",
    attractions: det.attractions || [],
    images: [base.image, ...(det.extra || [])],
    alt: base.alt,
  };
}

/** Site content (hero, dining, experiences...) — API first, static fallback. */
export async function fetchContent() {
  try {
    const data = await tryFetch("/api/content");
    if (data && data.BRAND) return data;
  } catch {}
  return { ...STATIC_CONTENT };
}

/** Bookings + newsletter — POST to API when available, else localStorage queue. */
export async function submitBooking(payload) {
  try {
    return await tryFetch("/api/bookings", { method: "POST", body: JSON.stringify(payload) });
  } catch {
    const key = "axom:bookings";
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    const rec = { id: `local-${Date.now()}`, ...payload, createdAt: new Date().toISOString(), pending: true };
    localStorage.setItem(key, JSON.stringify([rec, ...prev]));
    return rec;
  }
}

export async function submitNewsletter(email) {
  try {
    return await tryFetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) });
  } catch {
    const key = "axom:newsletter";
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    if (!prev.includes(email)) localStorage.setItem(key, JSON.stringify([email, ...prev]));
    return { ok: true, offline: true };
  }
}

export const apiBase = API;
