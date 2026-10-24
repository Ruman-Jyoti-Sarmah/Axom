import { DINING } from "@/data/culture/site/heritage";
import { useContent } from "@/lib/useContent";
import TextReveal from "@/components/common/TextReveal";

/** Dining — story + menu follow the site language. */
export default function Dining() {
  const { dining } = useContent();
  return (
    <section className="dining scene" id="dining" aria-label="Dining" data-reveal>
      <div className="dining__media">
        <img src={DINING.image} alt={DINING.alt} loading="lazy" decoding="async" />
      </div>
      <div className="dining__overlay">
        <div className="dining__content">
          <span className="label">{dining.label}</span>
          <TextReveal as="h2" lines={[dining.l1, dining.l2]} />
          <p>{dining.body}</p>
          <ul className="dining__list">
            {dining.menu.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>
        <div className="dining__inset">
          <img src={DINING.image2} alt={DINING.image2Alt} loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
}
