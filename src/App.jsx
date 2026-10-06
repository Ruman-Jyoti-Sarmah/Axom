import { useEffect, useState } from "react";
import { getDistrict } from "./data/districtDetails";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Architecture from "./components/Architecture";
import Rooms from "./components/Rooms";
import Dining from "./components/Dining";
import Experiences from "./components/Experiences";
import Gallery from "./components/Gallery";
import Districts from "./components/Districts";
import DistrictDetail from "./components/DistrictDetail";
import Location from "./components/Location";
import Finale from "./components/Finale";
import Footer from "./components/Footer";

/** #/district/kamrup -> "kamrup", anything else -> null */
const slugFromHash = (hash) =>
  (hash || "").match(/^#\/district\/([a-z0-9-]+)/)?.[1] || null;

export default function App() {
  // lightweight hash router: main site / districts page / district page
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const slug = slugFromHash(hash);
  const onDistrictsPage = hash === "#/districts";

  // route changes: page title + native scroll (no animation engine)
  useEffect(() => {
    const detail = slug ? getDistrict(slug) : null;
    document.title = detail
      ? `${detail.name} District — AXOM, Assam`
      : onDistrictsPage
        ? "All 35 Districts — AXOM, Assam"
        : "AXOM — Soul of Assam, Land of the Brahmaputra";

    const t = setTimeout(() => {
      if (slug || onDistrictsPage || hash === "#top" || !hash) {
        window.scrollTo(0, 0);
      } else if (hash) {
        document.querySelector(hash)?.scrollIntoView();
      }
    }, 60);
    return () => clearTimeout(t);
  }, [slug, hash, onDistrictsPage]);

  // scroll progress indicator
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <Navbar />
      {slug ? (
        <DistrictDetail slug={slug} key={slug} />
      ) : onDistrictsPage ? (
        <Districts key="districts-page" />
      ) : (
        <>
          <Hero />
          <Intro />
          <Architecture />
          <Rooms />
          <Dining />
          <Experiences />
          <Gallery />
          <Location />
          <Finale />
        </>
      )}
      <Footer />
    </main>
  );
}
