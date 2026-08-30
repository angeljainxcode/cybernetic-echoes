import { useEffect, useRef } from "react";
import { range, useReducedMotion, useScrollProgress } from "@/lib/motion";
import { EnterButton } from "./EnterButton";

/**
 * FINAL — everything converges to a point, collides, cuts to black,
 * then resolves into calm monochrome typography.
 */
export function Convergence() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef(0);
  const reduced = useReducedMotion();
  progressRef.current = progress;

  const converge = range(progress, 0.2, 0.44);
  const chaos = range(progress, 0.4, 0.5);
  const blackout = range(progress, 0.48, 0.54);
  const line1 = range(progress, 0.55, 0.62);
  const wordmark = range(progress, 0.63, 0.72);
  const statement = range(progress, 0.73, 0.82);
  const outro = range(progress, 0.83, 0.92);

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

    const colors = ["#00E5FF", "#B6FF00", "#FF2BD6"];
    const streaks = Array.from({ length: window.innerWidth < 768 ? 70 : 180 }, (_, i) => ({
      a: Math.random() * Math.PI * 2,
      r: 0.5 + Math.random() * 0.8,
      len: 40 + Math.random() * 220,
      color: colors[i % 3],
      speed: 0.4 + Math.random(),
    }));

    const draw = () => {
      raf = requestAnimationFrame(draw);
      const p = progressRef.current;
      const c = range(p, 0.18, 0.46);
      const black = range(p, 0.46, 0.53);
      ctx.clearRect(0, 0, w, h);
      if (c <= 0 || black >= 1) return;
      const cx = w / 2;
      const cy = h / 2;
      const visible = c * (1 - black);

      for (const s of streaks) {
        const dist = (1 - c) * Math.max(w, h) * 0.75 * s.r + 12;
        const x1 = cx + Math.cos(s.a) * dist;
        const y1 = cy + Math.sin(s.a) * dist;
        const l = s.len * (0.25 + c * s.speed);
        const x2 = cx + Math.cos(s.a) * (dist + l);
        const y2 = cy + Math.sin(s.a) * (dist + l);
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = visible * 0.5;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // collision core
      ctx.globalAlpha = visible * Math.pow(c, 3);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 220 * c);
      g.addColorStop(0, "#FFFFFF");
      g.addColorStop(0.35, "#00E5FF");
      g.addColorStop(0.7, "#FF2BD6");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, 220 * c, 0, Math.PI * 2);
      ctx.fill();
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
      id="converge"
      data-accent="mono"
      className="relative min-h-[320svh] border-t border-hairline"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* cut to black */}
        <div
          className="absolute inset-0 bg-[#050505]"
          style={{ opacity: blackout, transition: "opacity 0.2s linear" }}
        />

        {/* chaos flash */}
        <div
          className="pointer-events-none absolute inset-0 bg-white"
          style={{ opacity: chaos * (1 - blackout) * 0.35 }}
        />

        <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
          <p
            className="absolute top-[46%] -translate-y-1/2 display text-[clamp(1.6rem,4vw,3rem)] leading-[1.05] tracking-[0.16em]"
            style={{ opacity: line1 * (1 - wordmark) }}
          >
            All systems
            <br />
            converge
          </p>

          <div
            style={{
              opacity: wordmark * (1 - outro * 0.15),
              transform: `translate3d(0, ${(1 - wordmark) * 18}px, 0)`,
            }}
          >
            <h2 className="display text-[clamp(3rem,14vw,11rem)] tracking-[0.02em]">Techfest</h2>
            <p className="mt-3 text-[clamp(0.8rem,2.4vw,1.4rem)] font-light tracked text-foreground/70">
              IIT Bombay
            </p>

            <p
              className="mx-auto mt-12 max-w-2xl display text-[clamp(1.1rem,3vw,2.2rem)] leading-[1.15] tracking-[0.06em]"
              style={{ opacity: statement }}
            >
              The future doesn&apos;t build itself.
            </p>

            <div
              className="mt-10 space-y-1 text-[0.72rem] tracked"
              style={{ opacity: outro }}
            >
              <p className="text-foreground/60">The future isn&apos;t coming.</p>
              <p className="text-foreground">It&apos;s being built.</p>
            </div>

            <div className="mt-10 flex justify-center" style={{ opacity: outro }}>
              <EnterButton href="#top" variant="outline">
                Enter Techfest
              </EnterButton>
            </div>
          </div>

          <span
            className="absolute bottom-10 meta"
            style={{ opacity: (1 - line1) * 0.8 }}
          >
            Convergence — 04 / 08
          </span>
        </div>
      </div>
    </section>
  );
}
