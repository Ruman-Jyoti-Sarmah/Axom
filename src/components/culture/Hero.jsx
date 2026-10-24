const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const PlayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
  >
    <path d="M8 5.8c0-.8.9-1.3 1.6-.8l9.2 6.2a1 1 0 0 1 0 1.6l-9.2 6.2a1 1 0 0 1-1.6-.8V5.8Z" />
  </svg>
);

export default function HeroSection() {
  return (
    <section
      id="home"
      className="assam-hero relative isolate flex min-h-[700px] items-center overflow-hidden bg-[#102c31] text-white sm:min-h-[760px] lg:min-h-[calc(100svh-159px)]"
    >
      {/* Background photograph */}
      <div className="assam-hero-image absolute inset-0 -z-30">
        <img
          src="/homehero.png"
          alt="Golden sunset over a river and distant hills in Assam"
          fetchPriority="high"
          decoding="async"
          width="1600"
          height="900"
          className="h-full w-full object-cover object-center"
          onError={(e) => { e.currentTarget.src = "/img/hero-brahmaputra.jpg"; }}
        />
      </div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#091c20]/90 via-[#10282b]/65 to-[#10282b]/10" />

      <div className="absolute inset-0 -z-20 bg-gradient-to-t from-[#071719]/75 via-transparent to-[#091c20]/20" />

      {/* Warm ambient glow */}
      <div className="assam-hero-glow pointer-events-none absolute -left-32 top-1/4 -z-10 h-80 w-80 rounded-full bg-amber-400/10 blur-[100px]" />

      {/* Decorative outline */}
      <div className="pointer-events-none absolute right-[-100px] top-1/2 hidden h-[480px] w-[480px] -translate-y-1/2 rounded-full border border-white/15 lg:block" />
      <div className="pointer-events-none absolute right-[-30px] top-1/2 hidden h-[340px] w-[340px] -translate-y-1/2 rounded-full border border-white/10 lg:block" />

      <div className="mx-auto w-full max-w-[1500px] px-6 pb-24 pt-20 sm:px-10 sm:pb-28 lg:px-16 lg:py-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className="assam-reveal mb-7 flex items-center gap-3"
            style={{ "--delay": "100ms" }}
          >
            <span className="h-px w-10 bg-amber-300" />

            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200 sm:text-sm">
              The Land of the Red River & Blue Hills
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="assam-reveal text-5xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[88px]"
            style={{ "--delay": "250ms" }}
          >
            Discover the
            <br />
            Soul of{" "}
            <span className="relative inline-block text-amber-300">
              Assam.
              <svg
                viewBox="0 0 250 14"
                fill="none"
                className="absolute -bottom-2 left-0 w-full"
                aria-hidden="true"
              >
                <path
                  d="M3 10C64 1 177 1 247 7"
                  stroke="#F6C66A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="assam-underline"
                />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p
            className="assam-reveal mt-8 max-w-xl text-base leading-8 text-white/90 sm:text-lg"
            style={{ "--delay": "400ms" }}
          >
            Journey through ancient temples, vibrant traditions, mighty rivers,
            and timeless stories. Explore the heritage, culture, and hidden
            wonders that make Assam unforgettable.
          </p>

          {/* CTA buttons */}
          <div
            className="assam-reveal mt-9 flex flex-col gap-4 sm:flex-row"
            style={{ "--delay": "550ms" }}
          >
            <a
              href="#/districts"
              className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-sm bg-amber-300 px-7 py-4 text-sm font-semibold text-[#172d2b] shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:bg-amber-200"
            >
              Explore Destinations
              <ArrowIcon />
            </a>

            <a
              href="#/culture"
              className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-sm border border-white/40 bg-white/[0.07] px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:bg-white/15"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/50 transition-colors group-hover:border-amber-200 group-hover:text-amber-200">
                <PlayIcon />
              </span>
              Explore Our Culture
            </a>
          </div>

          {/* Cultural highlights */}
          <div
            className="assam-reveal mt-12 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-white/20 pt-6 sm:mt-16 sm:pt-7"
            style={{ "--delay": "700ms" }}
          >
            <div>
              <p className="text-lg font-semibold tracking-wide text-white">
                Heritage
              </p>
              <p className="mt-1 text-xs tracking-wide text-white/80">
                Centuries of stories
              </p>
            </div>

            <span className="h-9 w-px bg-white/25" />

            <div>
              <p className="text-lg font-semibold tracking-wide text-white">
                Culture
              </p>
              <p className="mt-1 text-xs tracking-wide text-white/80">
                Traditions that live on
              </p>
            </div>

            <span className="h-9 w-px bg-white/25" />

            <div>
              <p className="text-lg font-semibold tracking-wide text-white">
                Nature
              </p>
              <p className="mt-1 text-xs tracking-wide text-white/80">
                Landscapes to remember
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-right location label */}
      <div className="assam-reveal absolute bottom-7 right-6 hidden items-center gap-3 text-right sm:flex lg:bottom-10 lg:right-12">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/80">
            Incredible Northeast India
          </p>
          <p className="mt-1 text-sm font-medium tracking-wide text-white">
            Assam, India
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-amber-200">
          <ArrowIcon />
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#discover"
        className="absolute bottom-7 left-6 hidden items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-white/90 transition-colors hover:text-amber-200 lg:flex lg:left-16"
      >
        <span className="assam-scroll-line h-10 w-px bg-amber-300" />
        Scroll to discover
      </a>
    </section>
  );
}
