import { useEffect, useLayoutEffect } from "react";
import { initLenis, ScrollTrigger } from "./lib/motion";
import { initPointer } from "./lib/pointer";
import { initVelocity } from "./lib/interaction";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Architecture from "./components/Architecture";
import Rooms from "./components/Rooms";
import Dining from "./components/Dining";
import Experiences from "./components/Experiences";
import Gallery from "./components/Gallery";
import Districts from "./components/Districts";
import Location from "./components/Location";
import Finale from "./components/Finale";
import Footer from "./components/Footer";

export default function App() {
  useLayoutEffect(() => {
    initLenis();
    initPointer();
    initVelocity();
    // settle triggers after fonts/images affect layout
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => { clearTimeout(t); window.removeEventListener("load", onLoad); };
  }, []);

  useEffect(() => {
    document.title = "AXOM — Soul of Assam, Land of the Brahmaputra";
  }, []);

  return (
    <main>
      <CustomCursor />
      <Navbar />
      <Hero />
      <Intro />
      <Architecture />
      <Rooms />
      <Dining />
      <Experiences />
      <Gallery />
      <Districts />
      <Location />
      <Finale />
      <Footer />
    </main>
  );
}
