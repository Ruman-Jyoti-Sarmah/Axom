import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

function useAdmin(key) {
  const h = { "Content-Type": "application/json", "x-admin-key": key };
  const get = async (p) => (await fetch(`${API}${p}`, { headers: h })).json();
  const send = async (p, method, body) =>
    (await fetch(`${API}${p}`, { method, headers: h, body: body ? JSON.stringify(body) : undefined })).json();
  return { get, send };
}

/** Admin panel — route #/admin. Bookings + newsletter + district editor. */
export default function Admin() {
  const [key, setKey] = useState(() => localStorage.getItem("axom:admin-key") || "");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [newsletter, setNewsletter] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState("");
  const { get, send } = useAdmin(key);

  const load = async () => {
    setError("");
    try {
      const [b, n, d] = await Promise.all([
        get("/api/admin/bookings"),
        get("/api/admin/newsletter"),
        get("/api/districts"),
      ]);
      if (b?.error) throw new Error(b.error);
      setBookings(b);
      setNewsletter(n);
      setDistricts(d);
      setAuthed(true);
      localStorage.setItem("axom:admin-key", key);
    } catch (e) {
      setError("Login failed — check ADMIN_KEY. (" + e.message + ")");
    }
  };

  useEffect(() => {
    if (key) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!authed) {
    return (
      <section className="admin" id="top">
        <span className="label">AXOM · ADMIN</span>
        <h1>Admin Login</h1>
        <p>Server ke <code>ADMIN_KEY</code> se login karo (default: <code>axom-admin-123</code>).</p>
        <div className="admin__login">
          <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="ADMIN_KEY" type="password" />
          <button className="btn btn--solid" onClick={load}>Login</button>
        </div>
        {error && <p className="booking__error">{error}</p>}
        <a className="btn btn--ghost" href="#top">← Home</a>
      </section>
    );
  }

  return (
    <section className="admin" id="top">
      <span className="label">AXOM · ADMIN PANEL</span>
      <h1>Namaskar, Admin</h1>
      <div className="admin__tabs">
        {[["bookings", `Bookings (${bookings.length})`], ["newsletter", `Newsletter (${newsletter.length})`], ["districts", `Districts (${districts.length})`]].map(([id, label]) => (
          <button key={id} className={`dlist__chip ${tab === id ? "dlist__chip--active" : ""}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
        <button className="dlist__chip" onClick={() => { setAuthed(false); localStorage.removeItem("axom:admin-key"); }}>
          Logout
        </button>
      </div>

      {tab === "bookings" && (
        <div className="admin__list">
          {bookings.length === 0 && <p>No bookings yet — form bharo home page se.</p>}
          {bookings.map((b) => (
            <article key={b.id} className="admin__card">
              <div>
                <strong>{b.name}</strong> · {b.email} · {b.date} · {b.guests} guests
                {b.district && <span> · loves {b.district}</span>}
                {b.message && <p>{b.message}</p>}
                <span className="label">{b.createdAt?.slice(0, 10)} {b.pending ? "· offline queue" : ""}</span>
              </div>
              <button
                className="btn btn--ghost"
                onClick={async () => {
                  await send(`/api/admin/bookings/${b.id}`, "DELETE");
                  setBookings((p) => p.filter((x) => x.id !== b.id));
                }}
              >
                Delete
              </button>
            </article>
          ))}
        </div>
      )}

      {tab === "newsletter" && (
        <div className="admin__list">
          {newsletter.map((e) => (
            <article key={e} className="admin__card"><span>{e}</span></article>
          ))}
          {newsletter.length === 0 && <p>No subscribers yet.</p>}
        </div>
      )}

      {tab === "districts" && (
        <div className="admin__list">
          {districts.map((d) => (
            <article key={d.slug || d.no} className="admin__card">
              <div>
                <strong>{String(d.no).padStart(2, "0")} · {d.name}</strong>
                <span className="label"> {d.division} · Seat: {d.hq}</span>
              </div>
              <a className="btn btn--ghost" href={`#/district/${d.slug}`}>View →</a>
            </article>
          ))}
          <p className="label">Add / edit / delete via API: POST / PUT / DELETE /api/admin/districts (x-admin-key header)</p>
        </div>
      )}

      <a className="btn btn--ghost" href="#top">← Home</a>
    </section>
  );
}
