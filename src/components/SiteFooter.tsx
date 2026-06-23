import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-32 bg-background">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-20 pb-10">
        <div className="grid md:grid-cols-12 gap-10 pb-16 border-b border-border">
          <div className="md:col-span-6">
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[0.95]">
              Let's make<br />something.
            </h2>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 mt-8 text-sm font-semibold px-6 py-3.5 rounded-full bg-foreground text-background hover:bg-foreground/80 transition-colors"
            >
              Book a session →
            </Link>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-5">Work</p>
            <ul className="space-y-3 text-sm">
              <li><Link to="/work/street" className="link-underline">Street</Link></li>
              <li><Link to="/work/personal" className="link-underline">Personal</Link></li>
              <li><Link to="/journal" className="link-underline">Journal</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-5">Studio</p>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="link-underline">About</Link></li>
              <li><Link to="/book" className="link-underline">Book</Link></li>
              <li><Link to="/contact" className="link-underline">Contact</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-5">Elsewhere</p>
            <ul className="space-y-3 text-sm">
              <li><a href="https://www.instagram.com/maryhadalittlelens/" target="_blank" rel="noreferrer" className="link-underline">Instagram ↗</a></li>
              <li><a href="https://www.behance.net/" target="_blank" rel="noreferrer" className="link-underline">Behance ↗</a></li>
              <li><a href="https://maryhadalittlelens.darkroom.com/" target="_blank" rel="noreferrer" className="link-underline">Darkroom ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Mary. All rights reserved.</p>
          <p className="uppercase tracking-[0.15em]">Lisbon · Paris · Worldwide</p>
        </div>
      </div>
    </footer>
  );
}
