import { useEffect, useState } from "react";

const SECTIONS = ["Hero", "Augment", "Intelligence", "Creation", "Converge"];

export function ProgressRail() {
  const [progress, setProgress] = useState(0);
  const [coords, setCoords] = useState("0000");

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = document.body.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(p);
      setCoords(String(Math.round(window.scrollY)).padStart(4, "0"));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const index = Math.min(SECTIONS.length - 1, Math.floor(progress * SECTIONS.length));

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-transparent">
        <div
          className="h-px signal-bg transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="pointer-events-none fixed bottom-8 left-5 z-40 hidden flex-col gap-3 md:flex">
        <span className="meta [writing-mode:vertical-rl]">
          {SECTIONS[index]} / {coords}
        </span>
        <div className="ml-[3px] h-24 w-px bg-hairline">
          <div className="w-px signal-bg" style={{ height: `${progress * 100}%` }} />
        </div>
      </div>
    </>
  );
}
