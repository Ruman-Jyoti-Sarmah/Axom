import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useApp } from "../store/AppContext";
import { submitBooking } from "../lib/api";
import { DISTRICTS } from "../data/districts";

/** Booking / enquiry form — validates, saves via API or localStorage.
 *  standalone: renders inside the #/visit page (id="booking"); otherwise same markup. */
export default function BookingForm({ standalone = false }) {
  const { t, pick, addBooking } = useApp();
  const [form, setForm] = useState({ name: "", email: "", date: "", guests: "2", district: "", message: "" });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.date) return setError(t("required"));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError(t("invalid_email"));
    setSending(true);
    try {
      const rec = await submitBooking({ ...form, createdAt: new Date().toISOString() });
      addBooking(rec);
      setDone(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className={`booking scene${standalone ? " booking--page" : ""}`} id={standalone ? "booking" : undefined} aria-label={t("book_title")} data-reveal>
      <div className="booking__inner">
        <div>
          <span className="label">{t("book_kicker")}</span>
          <h2>{t("book_title")}</h2>
          <p>{t("book_sub")}</p>
          <ul className="booking__points">
            <li>✓ {t("date")} — {t("book_flex")}</li>
            <li>✓ {t("book_gamosa")}</li>
            <li>✓ {t("book_safari")}</li>
          </ul>
        </div>
        {done ? (
          <div className="booking__done" role="status">
            <CheckCircle2 size={28} aria-hidden="true" />
            <p>{t("success")}</p>
            <button className="btn btn--ghost" onClick={() => { setDone(false); setForm({ name: "", email: "", date: "", guests: "2", district: "", message: "" }); }}>
              {t("new_enquiry")}
            </button>
          </div>
        ) : (
          <form className="booking__form" onSubmit={submit} noValidate>
            <label>{t("name")}
              <input value={form.name} onChange={set("name")} placeholder="Priya Das" autoComplete="name" />
            </label>
            <label>{t("email")}
              <input value={form.email} onChange={set("email")} type="email" placeholder="you@example.com" autoComplete="email" />
            </label>
            <div className="booking__row">
              <label>{t("date")}
                <input value={form.date} onChange={set("date")} type="date" min={new Date().toISOString().slice(0, 10)} />
              </label>
              <label>{t("guests")}
                <select value={form.guests} onChange={set("guests")}>
                  {["1", "2", "3", "4", "5+"].map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </label>
            </div>
            <label>{t("district")}
              <select value={form.district} onChange={set("district")}>
                <option value="">—</option>
                {DISTRICTS.map((d) => <option key={d.no} value={d.name}>{pick(d.name)}</option>)}
              </select>
            </label>
            <label>{t("message")}
              <textarea value={form.message} onChange={set("message")} rows={3} placeholder="Bihu week, river cruise…" />
            </label>
            {error && <p className="booking__error" role="alert">{error}</p>}
            <button className="btn btn--solid" type="submit" disabled={sending}>
              <Send size={14} aria-hidden="true" /> {sending ? "…" : t("submit")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
