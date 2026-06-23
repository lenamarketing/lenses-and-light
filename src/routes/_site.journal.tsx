import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_site/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Mary" },
      { name: "description", content: "Notes on light, people, and slow photography." },
    ],
  }),
  component: Journal,
});

const SEED_STORIES = [
  { slug: "tram-light", title: "Tram light.", excerpt: "On waiting for the right face in the wrong city.", category: "Street", created_at: "2025-03-14" },
  { slug: "candle-as-key-light", title: "Candle as key light.", excerpt: "What a single flame does for a portrait.", category: "Notes", created_at: "2025-01-22" },
  { slug: "first-session", title: "Before your first session.", excerpt: "Five things I tell everyone, before the shutter.", category: "Sessions", created_at: "2024-11-09" },
];

function Journal() {
  const { data } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const { data } = await supabase.from("stories").select("*").eq("published", true).order("created_at", { ascending: false });
      return data ?? [];
    },
  });
  const stories = (data && data.length > 0) ? data : SEED_STORIES;

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-16 md:pt-24 pb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">— Journal</p>
          <h1 className="font-display text-[clamp(3rem,12vw,12rem)] font-light tracking-[-0.05em] leading-[0.88]">
            Notes from<br /><span className="text-muted-foreground">behind</span> the lens.
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-[1600px] px-6 md:px-10 py-16">
        <div className="divide-y divide-border border-b border-border">
          {stories.map((s: any) => (
            <Link
              key={s.slug}
              to="/journal/$slug"
              params={{ slug: s.slug }}
              className="group grid md:grid-cols-12 gap-6 py-10 md:py-14 items-baseline hover:bg-secondary px-3 -mx-3 transition-colors"
            >
              <p className="md:col-span-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {s.category ?? "Note"} · {new Date(s.created_at).toLocaleDateString("en", { year: "numeric", month: "short" })}
              </p>
              <h2 className="md:col-span-7 font-display text-4xl md:text-6xl font-light tracking-[-0.04em] leading-[0.95]">{s.title}</h2>
              <p className="md:col-span-3 text-sm text-muted-foreground">{s.excerpt}</p>
            </Link>
          ))}
        </div>
      </article>
    </>
  );
}
