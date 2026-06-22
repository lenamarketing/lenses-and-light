import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SEED_PHOTOS } from "@/lib/portfolio-seed";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";

export const Route = createFileRoute("/_site/portfolio/$category")({
  beforeLoad: ({ params }) => {
    if (params.category !== "street" && params.category !== "sensual") throw notFound();
  },
  head: ({ params }) => {
    const cat = params.category;
    const title = cat === "street" ? "Street photography — Mary" : "Sensual & boudoir — Mary";
    const desc = cat === "street"
      ? "A slow study of strangers in found light. Street photography by Mary."
      : "Intimate boudoir and sensual portraiture. Quiet, careful, yours.";
    return { meta: [
      { title }, { name: "description", content: desc },
      { property: "og:title", content: title }, { property: "og:description", content: desc },
    ]};
  },
  component: PortfolioPage,
  errorComponent: () => <div className="p-20 text-center">Couldn't load gallery.</div>,
  notFoundComponent: () => <div className="p-20 text-center">Category not found.</div>,
});

function PortfolioPage() {
  const { category } = Route.useParams();
  const [open, setOpen] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["photos", category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("photos").select("*").eq("category", category).order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

  const photos = (data && data.length > 0)
    ? data.map((p) => ({ id: p.id, url: p.image_url, title: p.title ?? "", caption: p.caption ?? "" }))
    : SEED_PHOTOS.filter((p) => p.category === category);

  const title = category === "street" ? "Street" : "Sensual";
  const blurb = category === "street"
    ? "Found light. Strangers I'll never see again. Photographs of the small theatre of every day."
    : "Boudoir and intimate portraits made together — slow, considered, on your terms.";

  return (
    <article>
      <header className="mx-auto max-w-[1400px] px-6 md:px-10 pt-16 md:pt-24 pb-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <p className="eyebrow text-muted-foreground">{category === "street" ? "Chapter I" : "Chapter II"}</p>
          <p className="mt-4 text-sm text-muted-foreground">{photos.length} photographs</p>
        </div>
        <div className="md:col-span-9">
          <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95]">{title}<span className="text-accent">.</span></h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">{blurb}</p>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pb-24">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
          {photos.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setOpen(p.url)}
              className="mb-4 md:mb-6 block w-full break-inside-avoid group relative overflow-hidden"
            >
              <img src={p.url} alt={p.title} className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink/70 to-transparent text-cream opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="font-display italic text-lg">{p.title}</p>
                {p.caption && <p className="eyebrow opacity-80">{p.caption}</p>}
              </div>
              <span className="absolute top-3 left-3 eyebrow text-cream/0 group-hover:text-cream/80 transition-colors mix-blend-difference">N° {String(i + 1).padStart(3, "0")}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pb-24 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-border pt-16">
        <p className="font-display text-3xl md:text-4xl italic">Want a photograph like these?</p>
        <Link to="/book" className="eyebrow px-6 py-3.5 bg-foreground text-background hover:bg-accent">Book a session</Link>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-ink/95 flex items-center justify-center p-6" onClick={() => setOpen(null)}>
          <button className="absolute top-6 right-6 text-cream p-2" aria-label="Close"><X /></button>
          <img src={open} alt="" className="max-h-[90vh] max-w-[90vw] object-contain" />
        </div>
      )}
    </article>
  );
}
