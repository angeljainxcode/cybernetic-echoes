import { useEffect, useRef } from "react";
import burst from "@/assets/creation-burst.jpg";
import { range, useReducedMotion, useScrollProgress } from "@/lib/motion";
import { SectionIndex } from "./Augment";

const FRAGMENTS = [
  "IDEA",
  "CODE",
  "DESIGN",
  "BUILD",
  "0x1F",
  "PROTO",
  "LOOP",
  "SIGNAL",
  "FORGE",
  "ITERATE",
];

/**
 * Fragment field: hundreds of particles that appear, accelerate, collide,
 * explode and reassemble, driven entirely by scroll progress.
 */
export function Creation() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef(0);
  const reduced = useReducedMotion();

  progressRef.current = progress;

  const enter = range(progress, 0.15, 0.38);
  const climax = range(progress, 0.5, 0.72);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = window.innerWidth < 768 ? 160 : 420;
    const parts = Array.from({ length: count }, () => {
      const a = Math.random() * Math.PI * 2;
      return {
        a,
        r: 20 + Math.random() * 240,
        size: 0.6 + Math.random() * 2.4,
        speed: 0.3 + Math.random() * 1.4,
        spin: (Math.random() - 0.5) * 0.02,
        hue: Math.random(),
      };
    });

    const colorFor = (hue: number) =>
      hue > 0.86 ? "#00E5FF" : hue > 0.74 ? "#B6FF00" : hue > 0.4 ? "#FF2BD6" : "#F5F5F5";

    let t = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      t += 0.016;
      const p = progressRef.current;
      const appear = range(p, 0.18, 0.42);
      const accel = range(p, 0.4, 0.58);
      const collide = range(p, 0.55, 0.68);
      const explode = range(p, 0.66, 0.82);
      const reassemble = range(p, 0.8, 0.97);

      ctx.clearRect(0, 0, w, h);
      if (appear <= 0) return;

      const cx = w / 2;
      const cy = h / 2;

      for (const q of parts) {
        q.a += q.spin * (1 + accel * 6);
        const inward = 1 - collide * 0.92;
        const outward = explode * (260 + q.speed * 420);
        const settle = reassemble * 0.6;
        const radius =
          q.r * inward * (1 - settle * 0.35) + outward - reassemble * outward * 0.72;
        const x = cx + Math.cos(q.a) * radius * (w / 900 + 0.45);
        const y = cy + Math.sin(q.a) * radius * 0.9 + Math.sin(t + q.r) * (2 + accel * 6);

        const alpha =
          appear * (0.25 + q.speed * 0.35) * (1 - reassemble * 0.35) * (0.6 + collide * 0.4);
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.fillStyle = colorFor(q.hue);

        const stretch = 1 + accel * 4 + explode * 10;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(q.a);
        ctx.fillRect(0, 0, q.size * stretch, q.size);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <section
      ref={ref}
      id="creation"
      data-accent="magenta"
      className="relative min-h-[150svh] overflow-hidden border-t border-hairline"
    >
      {/* burst plate */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: 0.16 + climax * 0.5 }}
      >
        <img
          src={burst}
          alt=""
          aria-hidden="true"
          width={1600}
          height={1024}
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ transform: `scale(${1 + climax * 0.25})`, filter: "saturate(1.1)" }}
        />
        <div className="absolute inset-0 bg-[#050505]/55" />
      </div>

      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />

      <SectionIndex index="03" total="08" />

      <div className="sticky top-0 flex min-h-[100svh] flex-col justify-center px-5 md:px-10">
        <div
          className="relative max-w-xl"
          style={{ opacity: enter, transform: `translate3d(0, ${(1 - enter) * 40}px, 0)` }}
        >
          <span className="display block text-[clamp(3rem,8vw,6rem)] signal-text">03</span>
          <h2 className="mt-2 display text-[clamp(2.4rem,7vw,5.5rem)] tracking-[0.06em]">Creation</h2>
          <span className="mt-6 block h-px w-16 signal-bg" />
          <p className="mt-8 text-[clamp(1.1rem,2vw,1.6rem)] font-light leading-[1.25] text-foreground/85">
            Ideas. Code. Design.
            <br />
            Collide. Evolve.
            <br />
            <span className="signal-text">Become real.</span>
          </p>
        </div>

        {/* fragment vocabulary, drifting */}
        <ul className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
          {FRAGMENTS.map((f, i) => (
            <li
              key={f}
              className="absolute font-mono text-[0.6rem] tracking-[0.3em] text-foreground/40"
              style={{
                left: `${18 + ((i * 37) % 72)}%`,
                top: `${14 + ((i * 53) % 70)}%`,
                opacity: enter * (0.3 + (i % 4) * 0.2),
                transform: `translate3d(${(climax - 0.5) * (i % 2 ? 160 : -160)}px, ${(climax - 0.5) * (i % 3 ? -90 : 90)}px, 0)`,
              }}
            >
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
