import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";

type Photo = { id: string; url: string; title: string; caption?: string; sub: string };

export function WorkPage({
  n, title, blurb, subs, activeTab, basePath, photos,
}: {
  n: string;
  title: string;
  blurb: string;
  subs: { key: string; label: string; copy: string }[];
  activeTab: string;
  basePath: string;
  photos: Photo[];
}) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const filtered = photos.filter((p) => p.sub === activeTab);
  const activeMeta = subs.find((s) => s.key === activeTab);

  return (
    <article>
      <header className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-16 md:pt-24 pb-12 md:pb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">— Chapter {n}</p>
          <h1 className="font-display text-[clamp(4rem,18vw,18rem)] font-light tracking-[-0.06em] leading-[0.85]">{title}</h1>
          <p className="mt-10 max-w-xl text-base md:text-lg leading-relaxed">{blurb}</p>
        </div>
      </header>

      {/* TABS */}
      <div className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 flex items-center gap-1 overflow-x-auto">
          {subs.map((s) => {
            const active = s.key === activeTab;
            return (
              <Link
                key={s.key}
                to={basePath}
                search={{ tab: s.key } as never}
                className={`shrink-0 px-5 py-4 text-sm font-medium tracking-tight border-b-2 transition-colors ${active ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {s.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 md:py-20">
        {activeMeta && (
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-12">{activeMeta.copy}</p>
        )}

        {filtered.length === 0 ? (
          <div className="border border-dashed border-border py-32 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Coming soon</p>
            <p className="mt-4 font-display text-4xl md:text-5xl font-light tracking-tight">New edition in progress.</p>
            <a
              href="https://maryhadalittlelens.darkroom.com/"
              target="_blank" rel="noreferrer"
              className="inline-block mt-8 text-sm font-semibold px-6 py-3 rounded-full border border-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              Existing prints on Darkroom ↗
            </a>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
            {filtered.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setLightbox(p.url)}
                className="mb-4 md:mb-6 block w-full break-inside-avoid group relative overflow-hidden bg-muted"
              >
                <img src={p.url} alt={p.title} className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <div>
                    <p className="text-sm font-medium">{p.title}</p>
                    {p.caption && <p className="text-xs uppercase tracking-[0.15em] opacity-80 mt-1">{p.caption}</p>}
                  </div>
                  <span className="text-xs uppercase tracking-[0.15em] opacity-80">№ {String(i + 1).padStart(3, "0")}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 pb-32 pt-16 border-t border-border flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light tracking-[-0.04em] leading-[0.95] max-w-xl">
          Want one like<br />these?
        </h2>
        <Link to="/book" className="text-sm font-semibold px-6 py-3.5 rounded-full bg-foreground text-background hover:bg-foreground/80 transition-colors whitespace-nowrap">
          Book a session →
        </Link>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white p-2" aria-label="Close"><X /></button>
          <img src={lightbox} alt="" className="max-h-[92vh] max-w-[92vw] object-contain" />
        </div>
      )}
    </article>
  );
}
