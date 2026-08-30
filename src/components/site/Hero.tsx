import heroFace from "@/assets/hero-face.jpg";
import { EnterButton } from "./EnterButton";
import { clamp01, usePointer, useReducedMotion, useScrollProgress } from "@/lib/motion";

export function Hero() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const reduced = useReducedMotion();
  const pointer = usePointer(!reduced);

  // The hero starts at progress ~0.5 (top of page); deconstruct as it leaves.
  const exit = clamp01((progress - 0.5) * 2);
  const px = reduced ? 0 : pointer.x;
  const py = reduced ? 0 : pointer.y;

  return (
    <section
      ref={ref}
      id="top"
      data-accent="cyan"
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* Portrait */}
      <div
        className="absolute inset-y-0 right-0 w-full md:w-[62%] lg:w-[56%]"
        style={{ opacity: 1 - exit * 0.85 }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translate3d(${px * -14}px, ${py * -10 - exit * 40}px, 0) scale(${1.06 + exit * 0.06})`,
            transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <img
            src={heroFace}
            alt="Half-human, half-cybernetic portrait with an illuminated machine eye"
            width={1280}
            height={1600}
            className="h-full w-full object-cover object-[58%_30%]"
          />
          {/* machine-side layer separates on scroll */}
          <div
            className="absolute inset-y-0 right-0 w-1/2 mix-blend-screen"
            style={{
              transform: `translate3d(${exit * 60 + px * 10}px, 0, 0)`,
              backgroundImage: `url(${heroFace})`,
              backgroundSize: "200% 100%",
              backgroundPosition: "100% 30%",
              opacity: exit * 0.5,
            }}
          />
        </div>

        {/* cursor-tracking scan line */}
        {!reduced && (
          <div
            className="pointer-events-none absolute inset-x-0 h-px"
            style={{
              top: `${pointer.py * 100}%`,
              background:
                "linear-gradient(to right, transparent, color-mix(in oklab, var(--cyan) 85%, transparent), transparent)",
              opacity: 0.7,
            }}
          />
        )}

        <div className="pointer-events-none absolute inset-0 scanlines opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/45 to-transparent md:via-[#050505]/25" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-[0.35]" />

      {/* Type block */}
      <div
        className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-24 pt-32 md:px-10 md:justify-center md:pb-32"
        style={{
          transform: `translate3d(0, ${exit * -70}px, 0)`,
          opacity: 1 - exit * 1.1,
        }}
      >
        <div className="max-w-[46rem]">
          <h1 className="display text-[clamp(3.6rem,13vw,10.5rem)]">Techfest</h1>
          <p className="mt-3 flex flex-wrap items-baseline gap-x-4 text-[clamp(1rem,3.2vw,2rem)] font-light tracked">
            <span>Human</span>
            <span className="signal-text">//</span>
            <span>Machine</span>
          </p>

          <div className="mt-10 space-y-1 text-sm tracked md:text-[0.8rem]">
            <p className="text-foreground/70">The future isn&apos;t coming.</p>
            <p style={{ color: "var(--lime)" }}>It&apos;s being built.</p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <EnterButton href="#converge">Enter Techfest</EnterButton>
            <a
              href="#augment"
              className="group inline-flex items-center gap-3 border-b border-foreground/25 pb-1 text-[0.7rem] tracked text-foreground/70 transition-colors hover:border-foreground hover:text-foreground"
            >
              Explore
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* HUD */}
      <div
        className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-10 md:flex md:right-8"
        style={{ transform: `translate3d(${px * 8}px, calc(-50% + ${py * 6}px), 0)` }}
      >
        <Readout label="SYS_01" value="Human" metric="98.2%" />
        <Readout label="SYS_02" value="Machine" metric="1.8%" />
        <div className="w-40">
          <span className="meta block">Sync</span>
          <span className="mt-1 block text-[0.65rem] tracked text-foreground/70">In progress</span>
          <span className="mt-2 block font-mono text-lg signal-text">
            {(42 + Math.round(pointer.px * 12)).toString()}%
          </span>
          <div className="mt-2 h-[2px] w-full bg-foreground/15">
            <div
              className="h-[2px] signal-bg transition-[width] duration-300"
              style={{ width: `${42 + pointer.px * 12}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-5 z-20 flex items-center gap-4 md:left-10">
        <span className="meta anim-blink">Scroll to awaken</span>
        <span className="h-px w-24 bg-gradient-to-r from-foreground/40 to-transparent md:w-40" />
      </div>
    </section>
  );
}

function Readout({ label, value, metric }: { label: string; value: string; metric: string }) {
  return (
    <div className="w-40 border-t signal-border/40 pt-2" style={{ borderColor: "color-mix(in oklab, var(--signal) 35%, transparent)" }}>
      <span className="meta block">{label}</span>
      <span className="mt-2 block text-[0.7rem] tracked signal-text">{value}</span>
      <span className="mt-1 block font-mono text-sm text-foreground/80">{metric}</span>
    </div>
  );
}
