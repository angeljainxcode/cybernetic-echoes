const SOCIALS = ["Instagram", "YouTube", "LinkedIn", "X"];

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-[#050505] px-5 py-8 md:px-10">
      <div className="mx-auto grid max-w-[110rem] gap-6 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <svg viewBox="0 0 40 40" className="h-7 w-7 shrink-0 text-foreground/80" aria-hidden="true">
            <path d="M4 8h32l-4 6H22l-2 22h-7l2-22H8z" fill="currentColor" />
          </svg>
          <span className="min-w-0">
            <span className="block display text-sm tracking-[0.16em]">Techfest</span>
            <span className="meta block">IIT Bombay</span>
          </span>
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {SOCIALS.map((s) => (
            <li key={s}>
              <a
                href="#top"
                className="text-[0.65rem] tracked text-foreground/50 transition-colors hover:text-foreground"
              >
                {s}
              </a>
            </li>
          ))}
        </ul>

        <span className="meta">© Techfest, IIT Bombay</span>
      </div>
    </footer>
  );
}
