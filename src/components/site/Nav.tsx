import { useEffect, useState } from "react";
import { EnterButton } from "./EnterButton";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "Events", href: "#intelligence" },
  { label: "About", href: "#augment" },
  { label: "Sponsors", href: "#creation" },
  { label: "Contact", href: "#converge" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-[#050505]/80 backdrop-blur-xl" : ""
      }`}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-10">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <Mark />
          <span className="min-w-0">
            <span className="block display truncate text-base leading-none tracking-[0.16em] md:text-lg">
              Techfest
            </span>
            <span className="meta block leading-none">IIT Bombay</span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              className={`relative text-[0.7rem] tracked transition-colors duration-300 ${
                i === 0 ? "signal-text" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {l.label}
              {i === 0 && <span className="absolute -bottom-2 left-0 h-px w-full signal-bg" />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <EnterButton href="#converge">Enter Techfest</EnterButton>
          </div>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`h-px w-6 bg-foreground transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 bg-foreground transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-border/60 bg-[#050505]/95 backdrop-blur-xl transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-5 py-4">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-hairline py-4 display text-2xl text-foreground/85"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-6">
            <EnterButton href="#converge">Enter Techfest</EnterButton>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Mark() {
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8 shrink-0" aria-hidden="true">
      <path d="M4 8h32l-4 6H22l-2 22h-7l2-22H8z" fill="currentColor" className="signal-text" />
      <path d="M24 20h12l-3 5H21z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
