import { EXPERIENCES } from "../data/content";
import DepthImage from "./DepthImage";
import TextReveal from "./TextReveal";

/**
 * Experiences — static asymmetric editorial grid. No scroll parallax,
 * no staggered reveals.
 */
export default function Experiences() {
  return (
    <section className="exp scene" id="experiences" aria-label="Experiences">
      <div className="exp__grid">
        <div className="exp__head">
          <span className="label">CHAPTER 04 · EXPERIENCES</span>
          <TextReveal as="h2" lines={["DAYS MEASURED", "IN WONDER"]} start="top 80%" />
        </div>
        {EXPERIENCES.map((e, i) => (
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
