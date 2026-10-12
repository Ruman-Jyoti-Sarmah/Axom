import { EXPERIENCES } from "../data/content";
import { useContent } from "../lib/useContent";
import DepthImage from "./DepthImage";
import TextReveal from "./TextReveal";

/** Experiences — header + card text follow the site language. */
const EXP_AS = [
  { name: "বিহু চোতাল", detail: "ৰঙালীৰ ছন্দ — ঢোল, পেঁপা, গগনা" },
  { name: "কাজিৰঙা ছাফাৰী", detail: "এশিঙীয়া মহাৰথীক লগ পাবলৈ পুৱাৰ বাট" },
  { name: "মাজুলীৰ মুখা", detail: "সত্ৰীয়া নৃত্য আৰু মুখা-শিল্পী" },
  { name: "চাহ বাগিচাৰ পুৱা", detail: "বাগিচা পৰিয়ালৰ সৈতে দুটি পাত এটি কলি" },
  { name: "ব্ৰহ্মপুত্ৰ ভ্ৰমণ", detail: "শৰাইঘাট-উমানন্দৰ কাষেৰে সন্ধিয়া ফেৰী" },
  { name: "গামোচা কৰ্মশালা", detail: "তাঁতশালত মুগা, এৰি আৰু পাট" },
];

export default function Experiences() {
  const { t, lang } = useContent();
  const items = EXPERIENCES.map((e, i) => (lang === "as" ? { ...e, ...EXP_AS[i] } : e));
  return (
    <section className="exp scene" id="experiences" aria-label="Experiences" data-reveal>
      <div className="exp__grid">
        <div className="exp__head">
          <span className="label">{t("exp_label")}</span>
          <TextReveal as="h2" lines={[t("exp_l1"), t("exp_l2")]} start="top 80%" />
        </div>
        {items.map((e, i) => (
          <figure className="exp__card" key={e.name}>
            <DepthImage
              src={e.image}
              alt={e.alt}
              depth={i % 2 ? -26 : 26}
              mouseDepth={i % 2 ? 4 : 10}
              className="exp__imgwrap"
              imgClassName="exp__img"
            />
            <figcaption>
              <h3>{e.name}</h3>
              <p>{e.detail}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
