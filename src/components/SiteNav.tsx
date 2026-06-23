import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/work/street", label: "Street" },
  { to: "/work/personal", label: "Personal" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm font-medium tracking-tight transition-colors hover:text-foreground ${path.startsWith(n.to) ? "text-foreground" : "text-muted-foreground"}`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/book"
            className="text-sm font-semibold px-5 py-2.5 rounded-full bg-foreground text-background hover:bg-foreground/80 transition-colors"
          >
            Book →
          </Link>
        </nav>
        <button className="md:hidden p-2 -mr-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-8 flex flex-col gap-6">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="font-display text-4xl font-light tracking-tight">
                {n.label}
              </Link>
            ))}
            <Link to="/book" onClick={() => setOpen(false)} className="text-sm font-semibold px-5 py-3 rounded-full bg-foreground text-background text-center mt-4">
              Book a session →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
