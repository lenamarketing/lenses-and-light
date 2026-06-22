import { createFileRoute, Link } from "@tanstack/react-router";
import { ABOUT_IMAGE } from "@/lib/portfolio-seed";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "About — Mary" },
      { name: "description", content: "Mary is a photographer working between street and sensual portraiture. Here's how she sees." },
      { property: "og:title", content: "About Mary" },
      { property: "og:description", content: "How I see, why I shoot, and what a session with me is like." },
      { property: "og:image", content: ABOUT_IMAGE },
    ],
  }),
  component: About,
});

function About() {
  return (
    <article className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-24">
      <p className="eyebrow text-muted-foreground">About</p>
      <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] max-w-4xl">
        I make pictures of <em className="italic text-accent">people becoming themselves</em>.
      </h1>

      <div className="mt-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden sticky top-24">
            <img src={ABOUT_IMAGE} alt="Mary" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="md:col-span-7 md:pl-8 space-y-6 text-lg leading-relaxed font-display">
          <p className="text-xl italic text-muted-foreground">A photographer based between Lisbon and Paris. Available worldwide.</p>
          <p>I started photographing strangers on trams a long time ago. I liked that I couldn't ask them to pose — I had to wait for them to forget about me, and then there it was: the face they keep for themselves.</p>
          <p>Years later I began making boudoir portraits, and I realised it was the same hunt. The picture I want isn't the one you give the camera. It's the one you let slip when you stop trying.</p>
          <p>My work lives in two chapters — <Link to="/portfolio/street" className="text-accent italic">street</Link> and <Link to="/portfolio/sensual" className="text-accent italic">sensual</Link> — but it's all one search, really. A search for the moment just before composure returns.</p>
          <p className="font-sans text-sm text-muted-foreground not-italic pt-8 border-t border-border">
            Featured / Published — <em>Vogue Italia digital</em>, <em>Lomography Magazine</em>, group show "Quiet Frames" (Porto, 2024). Prints available via{" "}
            <a href="https://maryhadalittlelens.darkroom.com/" target="_blank" rel="noreferrer" className="underline">Darkroom</a>.
          </p>
        </div>
      </div>

      <section className="mt-24 grid md:grid-cols-3 gap-10 border-t border-border pt-16">
        {[
          { k: "Gear", v: "Leica M6 · Contax T2 · Pentax 67. Mostly film, sometimes digital." },
          { k: "Cities", v: "Lisbon · Paris · Porto · Berlin. Travel for editorial." },
          { k: "Languages", v: "English · Portuguese · French (a little)." },
        ].map((x) => (
          <div key={x.k}>
            <p className="eyebrow text-muted-foreground mb-3">{x.k}</p>
            <p className="font-display text-xl">{x.v}</p>
          </div>
        ))}
      </section>
    </article>
  );
}
