import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_site/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Mary" },
      { name: "description", content: "Stories from behind the camera. Notes on light, people, and slow photography." },
      { property: "og:title", content: "Mary's Journal" },
      { property: "og:description", content: "Stories from behind the camera." },
    ],
  }),
  component: Journal,
});

const SEED_STORIES = [
  { slug: "tram-light", title: "Tram light", excerpt: "On waiting for the right face in the wrong city.", cover_url: null, category: "Street", created_at: "2025-03-14" },
  { slug: "candle-as-key-light", title: "Candle as key light", excerpt: "What a single flame does for a portrait.", cover_url: null, category: "Notes", created_at: "2025-01-22" },
  { slug: "first-session", title: "Before your first sensual session", excerpt: "Five things I tell everyone, before the shutter.", cover_url: null, category: "Sessions", created_at: "2024-11-09" },
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
    <article className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-24">
      <p className="eyebrow text-muted-foreground">Journal</p>
      <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95]">Notes from <em className="italic text-accent">behind</em>.</h1>
      <p className="mt-6 max-w-xl text-muted-foreground">Letters about light, people I've met, and the slow business of making a photograph.</p>

      <div className="mt-16 divide-y divide-border border-y border-border">
        {stories.map((s: any) => (
          <Link key={s.slug} to="/journal/$slug" params={{ slug: s.slug }} className="group grid md:grid-cols-12 gap-6 py-10 items-baseline hover:bg-secondary/30 px-2 -mx-2 transition-colors">
            <p className="md:col-span-2 eyebrow text-muted-foreground">
              {s.category ?? "Note"} · {new Date(s.created_at).toLocaleDateString("en", { year: "numeric", month: "short" })}
            </p>
            <h2 className="md:col-span-7 font-display text-3xl md:text-4xl leading-tight group-hover:text-accent transition-colors">{s.title}</h2>
            <p className="md:col-span-3 text-muted-foreground text-sm">{s.excerpt}</p>
          </Link>
        ))}
      </div>
    </article>
  );
}
