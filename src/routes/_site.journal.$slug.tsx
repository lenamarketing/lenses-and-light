import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_site/journal/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Mary's Journal` },
      { name: "description", content: "A note from Mary's journal." },
    ],
  }),
  component: Story,
  notFoundComponent: () => <div className="p-20 text-center">Story not found.</div>,
  errorComponent: () => <div className="p-20 text-center">Couldn't load this story.</div>,
});

function Story() {
  const { slug } = Route.useParams();
  const { data } = useQuery({
    queryKey: ["story", slug],
    queryFn: async () => {
      const { data } = await supabase.from("stories").select("*").eq("slug", slug).eq("published", true).maybeSingle();
      return data;
    },
  });

  if (!data) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 md:py-40 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">— Coming soon</p>
        <h1 className="font-display text-6xl md:text-7xl font-light tracking-[-0.04em] capitalize">{slug.replace(/-/g, " ")}</h1>
        <p className="mt-8 text-muted-foreground">
          Not published yet. <Link to="/journal" className="link-underline">Back to journal</Link>.
        </p>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link to="/journal" className="text-xs uppercase tracking-[0.2em] text-muted-foreground link-underline">← Journal</Link>
      <h1 className="mt-10 font-display text-5xl md:text-7xl font-light tracking-[-0.04em] leading-[0.95]">{data.title}</h1>
      {data.excerpt && <p className="mt-8 text-xl text-muted-foreground leading-relaxed">{data.excerpt}</p>}
      {data.cover_url && <img src={data.cover_url} alt="" className="mt-12 w-full" />}
      <div className="mt-12 text-lg leading-relaxed whitespace-pre-wrap">{data.content}</div>
    </article>
  );
}
