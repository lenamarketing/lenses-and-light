import { createFileRoute, Link } from "@tanstack/react-router";
import { ABOUT_IMAGE } from "@/lib/portfolio-seed";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "About — Mary" },
      { name: "description", content: "Mary. Photographer. Between Lisbon and Paris. Available worldwide." },
      { property: "og:title", content: "About Mary" },
      { property: "og:description", content: "Photographer between Lisbon and Paris." },
      { property: "og:image", content: ABOUT_IMAGE },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-16 md:pt-24 pb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">— About</p>
          <h1 className="font-display text-[clamp(3rem,11vw,11rem)] font-light tracking-[-0.05em] leading-[0.9]">
            People when<br /><span className="text-muted-foreground">they forget</span><br />the camera.
          </h1>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="aspect-[4/5] overflow-hidden bg-muted sticky top-28">
              <img src={ABOUT_IMAGE} alt="Mary" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 space-y-8 text-lg leading-relaxed">
            <p className="text-2xl md:text-3xl font-display font-light tracking-tight leading-tight">
              Mary. Photographer. Based between Lisbon and Paris. Available worldwide.
            </p>
            <p>
              I started on trams. Strangers, mostly — people who couldn't pose because they didn't know I was there. Years later I started making portraits, and it was the same hunt. The picture I want is the one you let slip when you stop trying.
            </p>
            <p>
              The work lives in two chapters: <Link to="/work/street" className="link-underline font-medium">Street</Link> and <Link to="/work/personal" className="link-underline font-medium">Personal</Link>. It's all one search.
            </p>
            <div className="pt-8 border-t border-border grid grid-cols-2 gap-8 text-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Gear</p>
                <p>Leica M6. Contax T2. Pentax 67.</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Cities</p>
                <p>Lisbon. Paris. Porto. Berlin.</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Languages</p>
                <p>EN · PT · FR</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Published</p>
                <p>Vogue Italia. Lomography.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32 text-center">
          <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-light tracking-[-0.05em] leading-[0.9]">
            Say hello.
          </h2>
          <Link to="/contact" className="inline-flex items-center gap-2 mt-10 text-sm font-semibold px-7 py-3.5 rounded-full bg-foreground text-background hover:bg-foreground/80 transition-colors">
            Write to Mary →
          </Link>
        </div>
      </section>
    </>
  );
}
