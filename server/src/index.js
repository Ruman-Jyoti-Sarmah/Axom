import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB = path.join(__dirname, "..", "..", "data", "db.json");
const ADMIN_KEY = process.env.ADMIN_KEY || "axom-admin-123";

const read = () => JSON.parse(fs.readFileSync(DB, "utf8"));
const write = (db) => fs.writeFileSync(DB, JSON.stringify(db, null, 2));

const slugify = (name) =>
  String(name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// ---------- public API ----------
app.get("/api/health", (_, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.get("/api/districts", (_, res) => {
  const { districts } = read();
  res.json(districts.map((d) => ({ ...d, slug: slugify(d.name) })));
});

app.get("/api/districts/:slug", (req, res) => {
  const { districts } = read();
  const d = districts.find((x) => slugify(x.name) === req.params.slug);
  if (!d) return res.status(404).json({ error: "not-found" });
  // prev / next for pager
  const i = districts.indexOf(d);
  res.json({
    ...d,
    slug: req.params.slug,
    prev: i > 0 ? slugify(districts[i - 1].name) : null,
    next: i < districts.length - 1 ? slugify(districts[i + 1].name) : null,
  });
});

app.get("/api/content", (_, res) => {
  const { content } = read();
  res.json(content);
});

app.post("/api/bookings", (req, res) => {
  const { name, email, date } = req.body || {};
  if (!name || !email || !date) return res.status(400).json({ error: "name, email, date required" });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: "invalid email" });
  const db = read();
  const rec = { id: `b-${Date.now()}`, ...req.body, createdAt: new Date().toISOString() };
  db.bookings.unshift(rec);
  write(db);
  res.status(201).json(rec);
});

app.post("/api/newsletter", (req, res) => {
  const { email } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: "invalid email" });
  const db = read();
  if (!db.newsletter.includes(email)) {
    db.newsletter.unshift(email);
    write(db);
  }
  res.json({ ok: true });
});

// ---------- admin (header: x-admin-key) ----------
const admin = (req, res, next) => {
  if (req.headers["x-admin-key"] !== ADMIN_KEY)
    return res.status(401).json({ error: "unauthorized — send x-admin-key header" });
  next();
};

app.get("/api/admin/bookings", admin, (_, res) => res.json(read().bookings));
app.get("/api/admin/newsletter", admin, (_, res) => res.json(read().newsletter));

app.post("/api/admin/districts", admin, (req, res) => {
  const db = read();
  const rec = { no: db.districts.length + 1, ...req.body };
  db.districts.push(rec);
  write(db);
  res.status(201).json(rec);
});

app.put("/api/admin/districts/:slug", admin, (req, res) => {
  const db = read();
  const i = db.districts.findIndex((x) => slugify(x.name) === req.params.slug);
  if (i < 0) return res.status(404).json({ error: "not-found" });
  db.districts[i] = { ...db.districts[i], ...req.body };
  write(db);
  res.json(db.districts[i]);
});

app.delete("/api/admin/districts/:slug", admin, (req, res) => {
  const db = read();
  const n = db.districts.length;
  db.districts = db.districts.filter((x) => slugify(x.name) !== req.params.slug);
  if (db.districts.length === n) return res.status(404).json({ error: "not-found" });
  write(db);
  res.json({ ok: true });
});

app.delete("/api/admin/bookings/:id", admin, (req, res) => {
  const db = read();
  db.bookings = db.bookings.filter((b) => b.id !== req.params.id);
  write(db);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`AXOM API on http://localhost:${PORT} (ADMIN_KEY=${ADMIN_KEY})`));
