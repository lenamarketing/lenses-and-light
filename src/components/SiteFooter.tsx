import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 text-sm text-muted-foreground max-w-xs leading-relaxed">
            Photography for the in-between moments — on the street, in the quiet of a room.
          </p>
        </div>
        <div>
          <p className="eyebrow text-muted-foreground mb-4">Work</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/portfolio/street" className="hover:text-accent">Street</Link></li>
            <li><Link to="/portfolio/sensual" className="hover:text-accent">Sensual</Link></li>
            <li><Link to="/journal" className="hover:text-accent">Journal</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-muted-foreground mb-4">Studio</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="hover:text-accent">About Mary</Link></li>
            <li><Link to="/book" className="hover:text-accent">Book a session</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-muted-foreground mb-4">Elsewhere</p>
          <ul className="space-y-2.5 text-sm">
            <li><a href="https://www.instagram.com/maryhadalittlelens/" target="_blank" rel="noreferrer" className="hover:text-accent">Instagram</a></li>
            <li><a href="https://www.behance.net/" target="_blank" rel="noreferrer" className="hover:text-accent">Behance</a></li>
            <li><a href="https://maryhadalittlelens.darkroom.com/" target="_blank" rel="noreferrer" className="hover:text-accent">Darkroom prints</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Mary — All images and writing reserved.</p>
          <p className="eyebrow">Made with care</p>
        </div>
      </div>
    </footer>
  );
}
