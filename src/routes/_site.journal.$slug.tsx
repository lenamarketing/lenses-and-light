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
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="eyebrow text-muted-foreground">Coming soon</p>
        <h1 className="mt-6 font-display text-5xl capitalize">{slug.replace(/-/g, " ")}</h1>
        <p className="mt-6 text-muted-foreground">This piece hasn't been published yet. <Link to="/journal" className="text-accent underline">Back to journal</Link>.</p>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link to="/journal" className="eyebrow text-muted-foreground hover:text-accent">← Journal</Link>
      <h1 className="mt-8 font-display text-5xl md:text-6xl leading-tight">{data.title}</h1>
      {data.excerpt && <p className="mt-6 text-xl text-muted-foreground italic font-display">{data.excerpt}</p>}
      {data.cover_url && <img src={data.cover_url} alt="" className="mt-12 w-full" />}
      <div className="mt-12 font-display text-lg leading-relaxed whitespace-pre-wrap">{data.content}</div>
    </article>
  );
}
