import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/portfolio/street", label: "Street" },
  { to: "/portfolio/sensual", label: "Sensual" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border/60">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`eyebrow transition-colors hover:text-accent ${path.startsWith(n.to) ? "text-accent" : "text-foreground/70"}`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/book"
            className="eyebrow px-4 py-2.5 border border-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Book a session
          </Link>
        </nav>
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-6 flex flex-col gap-5">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="eyebrow">
                {n.label}
              </Link>
            ))}
            <Link to="/book" onClick={() => setOpen(false)} className="eyebrow px-4 py-3 border border-foreground text-center mt-2">
              Book a session
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
