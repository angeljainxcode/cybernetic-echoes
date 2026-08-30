import { useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  href?: string;
  className?: string;
};

/** Magnetic CTA — cursor pulls the label slightly toward itself. */
export function EnterButton({ children, variant = "outline", href = "#top", className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setOffset({
      x: ((e.clientX - (r.left + r.width / 2)) / r.width) * 14,
      y: ((e.clientY - (r.top + r.height / 2)) / r.height) * 10,
    });
  };

  const base =
    "group relative inline-flex items-center gap-4 px-6 py-3 text-[0.7rem] font-medium tracked transition-colors duration-500 will-change-transform";
  const styles: Record<string, string> = {
    solid: "signal-bg text-[#050505]",
    outline: "border signal-border signal-text hover:bg-[color-mix(in_oklab,var(--signal)_14%,transparent)]",
    ghost: "text-foreground/70 hover:text-foreground",
  };

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      className={`${base} ${styles[variant]} ${className}`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 && offset.y === 0 ? "transform 0.6s cubic-bezier(0.16,1,0.3,1)" : "transform 0.1s linear",
      }}
    >
      <span>{children}</span>
      <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">→</span>
    </a>
  );
}
