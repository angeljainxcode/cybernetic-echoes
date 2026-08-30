import augmentProfile from "@/assets/augment-profile.jpg";
import { range, useScrollProgress } from "@/lib/motion";

const SIGNALS = [
  { label: "Neural interface", state: "Active", id: "NI_01" },
  { label: "Cognitive", state: "Amplification", id: "CA_02" },
  { label: "Sensory", state: "Expansion", id: "SE_03" },
];

export function Augment() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const digital = range(progress, 0.3, 0.78); // human → digital
  const enter = range(progress, 0.18, 0.42);

  return (
    <section
      ref={ref}
      id="augment"
      data-accent="lime"
      className="relative overflow-hidden border-t border-hairline py-28 md:py-40"
    >
      <SectionIndex index="01" total="08" />

      <div className="relative mx-auto grid max-w-[110rem] gap-16 px-5 md:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        {/* Type column */}
        <div style={{ opacity: enter, transform: `translate3d(0, ${(1 - enter) * 40}px, 0)` }}>
          <span className="display block text-[clamp(3rem,8vw,6rem)] signal-text">01</span>
          <h2 className="mt-2 display text-[clamp(2.4rem,6vw,4.5rem)] tracking-[0.06em]">Augment</h2>
          <span className="mt-6 block h-px w-16 signal-bg" />
          <p className="mt-8 max-w-sm text-[clamp(1.1rem,2vw,1.6rem)] font-light leading-[1.25] text-foreground/85">
            The line between
            <br />
            human and machine
            <br />
            <span className="signal-text">is moving.</span>
          </p>
          <p className="mt-8 max-w-xs font-mono text-[0.7rem] leading-relaxed text-foreground/45">
            LAT 19.1334 / LON 72.9133 — augmentation lab, powai. subject responds to
            stimulus in {Math.round(12 + digital * 40)}ms.
          </p>
        </div>

        {/* Visual column */}
        <div className="relative">
          <div className="relative aspect-[5/4] overflow-hidden">
            <img
              src={augmentProfile}
              alt="Side profile of a human head dissolving into a lime data structure"
              width={1280}
              height={1024}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                filter: `grayscale(${1 - digital}) contrast(${1 + digital * 0.25})`,
                transform: `scale(${1.04 + digital * 0.06}) translate3d(${digital * -18}px,0,0)`,
              }}
            />
            {/* digital take-over wipe */}
            <div
              className="absolute inset-0 mix-blend-screen"
              style={{
                background:
                  "linear-gradient(100deg, transparent 35%, color-mix(in oklab, var(--lime) 22%, transparent) 100%)",
                opacity: digital,
              }}
            />
            <div className="absolute inset-0 scanlines opacity-50" />

            {/* SVG contour overlay draws in with scroll */}
            <svg viewBox="0 0 500 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <path
                  key={i}
                  d={`M ${40 + i * 22} 380 C ${120 + i * 10} ${300 - i * 30}, ${90 + i * 18} ${150 - i * 20}, ${210 + i * 26} ${40 + i * 18}`}
                  fill="none"
                  stroke="var(--lime)"
                  strokeWidth="0.6"
                  opacity={0.5}
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset={1 - range(digital, i * 0.12, 0.55 + i * 0.12)}
                />
              ))}
              <g stroke="var(--lime)" strokeWidth="0.5" opacity={digital * 0.7}>
                <line x1="0" y1="120" x2="500" y2="120" strokeDasharray="3 7" />
                <line x1="330" y1="0" x2="330" y2="400" strokeDasharray="3 7" />
              </g>
            </svg>

            {/* scanning bar */}
            <div className="absolute inset-x-0 top-0 h-24 anim-sweep bg-[linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--lime)_20%,transparent),transparent)]" />
          </div>

          {/* signal readouts — hairline rows, not cards */}
          <ul className="mt-10 divide-y divide-hairline border-y border-hairline">
            {SIGNALS.map((s, i) => {
              const on = digital > 0.2 + i * 0.18;
              return (
                <li key={s.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-4 py-4">
                  <span className="meta">{s.id}</span>
                  <span className="min-w-0 text-[0.72rem] tracked text-foreground/80">
                    {s.label}{" "}
                    <span className={on ? "signal-text" : "text-foreground/30"}>{s.state}</span>
                  </span>
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${on ? "signal-bg anim-blink" : "bg-foreground/20"}`}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function SectionIndex({ index, total }: { index: string; total: string }) {
  return (
    <div className="pointer-events-none absolute right-5 top-24 hidden flex-col items-end gap-2 md:flex md:right-10">
      <span className="font-mono text-[0.7rem] signal-text">{index}</span>
      <span className="h-16 w-px bg-hairline" />
      <span className="font-mono text-[0.7rem] text-foreground/40">{total}</span>
    </div>
  );
}
