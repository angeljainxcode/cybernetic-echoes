import { useState } from "react";
import coreImage from "@/assets/intelligence-core.jpg";
import { range, useScrollProgress } from "@/lib/motion";
import { SectionIndex } from "./Augment";

type Domain = {
  key: "ai" | "robotics" | "cybernetics" | "computing";
  title: string;
  sub: string;
  detail: string;
};

const DOMAINS: Domain[] = [
  { key: "ai", title: "AI", sub: "Artificial intelligence", detail: "12 neural nodes firing" },
  { key: "robotics", title: "Robotics", sub: "Autonomous systems", detail: "6 axis actuation" },
  { key: "cybernetics", title: "Cybernetics", sub: "Human machine integration", detail: "Bio-loop closed" },
  { key: "computing", title: "Computing", sub: "Beyond possibilities", detail: "9.4 PFLOPS sustained" },
];

export function Intelligence() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const [active, setActive] = useState<Domain["key"]>("ai");
  const enter = range(progress, 0.16, 0.4);

  return (
    <section
      ref={ref}
      id="intelligence"
      data-accent="cyan"
      className="relative overflow-hidden border-t border-hairline py-28 md:py-40"
    >
      <SectionIndex index="02" total="08" />
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-25" />

      <div className="relative mx-auto max-w-[110rem] px-5 md:px-10">
        <div style={{ opacity: enter, transform: `translate3d(0, ${(1 - enter) * 36}px, 0)` }}>
          <span className="display block text-[clamp(3rem,8vw,6rem)] signal-text">02</span>
          <h2 className="mt-2 display text-[clamp(2.2rem,7vw,5.5rem)] tracking-[0.06em]">Intelligence</h2>
          <span className="mt-6 block h-px w-16 signal-bg" />
        </div>

        {/* Central visual reacts to the active domain */}
        <div className="relative mt-16 md:mt-24">
          <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
            <img
              src={coreImage}
              alt="Orbital cyan data core"
              width={1280}
              height={1024}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain transition-transform duration-[1200ms] ease-out anim-drift"
              style={{
                transform: `scale(${active === "computing" ? 1.12 : active === "robotics" ? 0.94 : 1}) rotate(${
                  active === "robotics" ? 8 : active === "cybernetics" ? -6 : 0
                }deg)`,
              }}
            />
            <CoreOverlay active={active} />
          </div>

          <p className="mt-6 text-center meta">{DOMAINS.find((d) => d.key === active)?.detail}</p>
        </div>

        {/* Typographic domain composition */}
        <div className="mt-16 border-t border-hairline md:mt-24">
          {DOMAINS.map((d, i) => {
            const on = active === d.key;
            return (
              <button
                key={d.key}
                onMouseEnter={() => setActive(d.key)}
                onFocus={() => setActive(d.key)}
                onClick={() => setActive(d.key)}
                aria-pressed={on}
                className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 border-b border-hairline py-6 text-left transition-colors duration-500 md:gap-10 md:py-8"
              >
                <span className={`meta shrink-0 transition-colors ${on ? "signal-text" : ""}`}>
                  0{i + 1}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block display text-[clamp(1.9rem,6vw,4.2rem)] transition-all duration-500 ${
                      on ? "signal-text translate-x-2 md:translate-x-4" : "text-foreground/35"
                    }`}
                  >
                    {d.title}
                  </span>
                  <span
                    className={`mt-2 block text-[0.65rem] tracked transition-opacity duration-500 ${
                      on ? "text-foreground/70 opacity-100" : "text-foreground/40 opacity-60"
                    }`}
                  >
                    {d.sub}
                  </span>
                </span>
                <span className="hidden w-40 shrink-0 md:block">
                  <DomainMeter active={on} kind={d.key} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CoreOverlay({ active }: { active: Domain["key"] }) {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {/* AI — neural web */}
      <g opacity={active === "ai" ? 1 : 0} className="transition-opacity duration-700">
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2;
          const r = 120 + (i % 3) * 26;
          const x = 200 + Math.cos(a) * r;
          const y = 200 + Math.sin(a) * r;
          return (
            <g key={i}>
              <line x1="200" y1="200" x2={x} y2={y} stroke="var(--cyan)" strokeWidth="0.4" opacity="0.5" />
              <circle cx={x} cy={y} r="2" fill="var(--cyan)">
                <animate attributeName="r" values="1.4;3;1.4" dur={`${1.6 + i * 0.1}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
      </g>

      {/* Robotics — articulated arms */}
      <g opacity={active === "robotics" ? 1 : 0} className="transition-opacity duration-700" stroke="var(--cyan)" fill="none">
        {[0, 90, 180, 270].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 200 200)`}>
            <path d="M200 200 L200 110 L250 70" strokeWidth="1.2">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 200 200; 14 200 200; 0 200 200"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </path>
            <rect x="244" y="64" width="12" height="12" strokeWidth="1" />
          </g>
        ))}
      </g>

      {/* Cybernetics — bio loop */}
      <g opacity={active === "cybernetics" ? 1 : 0} className="transition-opacity duration-700">
        <ellipse cx="200" cy="200" rx="150" ry="60" fill="none" stroke="var(--cyan)" strokeWidth="0.7" strokeDasharray="6 8">
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="18s" repeatCount="indefinite" />
        </ellipse>
        <circle cx="200" cy="200" r="150" fill="none" stroke="var(--cyan)" strokeWidth="0.4" strokeDasharray="2 10" />
        <circle cx="350" cy="200" r="4" fill="var(--cyan)">
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="6s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Computing — data columns */}
      <g opacity={active === "computing" ? 1 : 0} className="transition-opacity duration-700">
        {Array.from({ length: 18 }).map((_, i) => (
          <rect key={i} x={20 + i * 21} y={0} width="1" height="70" fill="var(--cyan)" opacity="0.7">
            <animate
              attributeName="y"
              values="-70;400"
              dur={`${0.9 + (i % 5) * 0.35}s`}
              repeatCount="indefinite"
              begin={`${i * 0.09}s`}
            />
          </rect>
        ))}
      </g>
    </svg>
  );
}

function DomainMeter({ active, kind }: { active: boolean; kind: Domain["key"] }) {
  const bars = 12;
  return (
    <span className="flex items-end gap-1" aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => {
        const h = active ? 6 + ((i * (kind === "computing" ? 7 : 5)) % 18) : 4;
        return (
          <span
            key={i}
            className={`w-[3px] transition-all duration-500 ${active ? "signal-bg" : "bg-foreground/20"}`}
            style={{ height: `${h}px`, transitionDelay: `${i * 25}ms` }}
          />
        );
      })}
    </span>
  );
}
