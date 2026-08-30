import { useEffect, useRef, useState } from "react";

/** True once the element has entered the viewport (never flips back). */
export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/**
 * Scroll progress of an element through the viewport.
 * 0 = element top hits viewport bottom, 1 = element bottom hits viewport top.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const raw = (window.innerHeight - rect.top) / total;
      setProgress(Math.min(1, Math.max(0, raw)));
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
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}

/** Normalised pointer position (-1..1) relative to viewport centre. */
export function usePointer(enabled = true) {
  const [pointer, setPointer] = useState({ x: 0, y: 0, px: 0.5, py: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    let next = { x: 0, y: 0, px: 0.5, py: 0.5 };
    const flush = () => {
      frame = 0;
      setPointer(next);
    };
    const onMove = (e: PointerEvent) => {
      const px = e.clientX / window.innerWidth;
      const py = e.clientY / window.innerHeight;
      next = { x: px * 2 - 1, y: py * 2 - 1, px, py };
      if (!frame) frame = requestAnimationFrame(flush);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return pointer;
}

/** True after hydration — safe gate for window-dependent rendering. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Remap v from [a,b] onto 0..1. */
export const range = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
