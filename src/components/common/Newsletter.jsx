import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useApp } from "@/store/AppContext";
import { submitNewsletter } from "@/lib/api";

/** Newsletter — footer signup with validation + offline queue. */
export default function Newsletter() {
  const { t } = useApp();
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | error | done
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setMsg(t("invalid_email"));
      return;
    }
    await submitNewsletter(email);
    setState("done");
    setMsg(t("subscribed"));
  };

  if (state === "done") {
    return (
      <p className="news news--done" role="status">
        <CheckCircle2 size={15} aria-hidden="true" /> {msg}
      </p>
    );
  }

  return (
    <form className="news" onSubmit={submit} noValidate>
      <strong>{t("newsletter_title")}</strong>
      <span>{t("newsletter_sub")}</span>
      <div className="news__row">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="you@example.com"
          aria-label={t("email")}
        />
        <button className="btn btn--solid" type="submit">
          <Send size={13} aria-hidden="true" /> {t("subscribe")}
        </button>
      </div>
      {state === "error" && <p className="news__error" role="alert">{msg}</p>}
    </form>
  );
}
