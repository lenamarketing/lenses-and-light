import { createFileRoute, Link } from "@tanstack/react-router";
import { HERO_IMAGE, SEED_PHOTOS } from "@/lib/portfolio-seed";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "Mary — Sensual & street photography" },
      { name: "description", content: "Photography by Mary. Sensual and boudoir portraits, and tender street work. Sessions on request." },
      { property: "og:title", content: "Mary — Sensual & street photography" },
      { property: "og:description", content: "Sensual portraits, tender street work. Sessions on request." },
      { property: "og:image", content: HERO_IMAGE },
    ],
  }),
  component: Home,
});

function Home() {
  const street = SEED_PHOTOS.filter((p) => p.category === "street").slice(0, 3);
  const sensual = SEED_PHOTOS.filter((p) => p.category === "sensual").slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-12 md:pt-20 pb-20 md:pb-28 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <p className="eyebrow text-muted-foreground mb-8">— Photography portfolio · est. 2019</p>
            <h1 className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.02em]">
              The quiet <em className="italic text-accent">in-between</em>,<br />
              held still.
            </h1>
            <p className="mt-10 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
              I'm Mary. I photograph what happens before the picture — a glance through a tram window, a breath before a smile, the warmth of a room.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/book" className="eyebrow px-6 py-3.5 bg-foreground text-background hover:bg-accent transition-colors">
                Book a session
              </Link>
              <Link to="/portfolio/sensual" className="eyebrow px-6 py-3.5 border border-foreground hover:bg-foreground hover:text-background transition-colors inline-flex items-center gap-2">
                View the work <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={HERO_IMAGE} alt="Featured photograph by Mary" className="w-full h-full object-cover" />
            </div>
            <p className="eyebrow text-muted-foreground mt-4">N° 014 / Atlantic coast / 35mm</p>
          </div>
        </div>
      </section>

      {/* TWO CHAPTERS */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <p className="eyebrow text-muted-foreground md:col-span-3">Two chapters</p>
            <h2 className="md:col-span-9 font-display text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] max-w-3xl">
              One eye for the street, one for the candle-lit room.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <Chapter
              to="/portfolio/street"
              eyebrow="Chapter I"
              title="Street"
              copy="Found light, found people. A slow study of strangers."
              photos={street}
            />
            <Chapter
              to="/portfolio/sensual"
              eyebrow="Chapter II"
              title="Sensual"
              copy="Boudoir and intimate portraits. Made together, gently."
              photos={sensual}
            />
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t border-border bg-secondary/50">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-10">
          <p className="eyebrow text-muted-foreground md:col-span-3">How it works</p>
          <div className="md:col-span-9 grid md:grid-cols-3 gap-10">
            {[
              { n: "01", t: "Hello", d: "Tell me what you'd like to make — a mood, a place, a feeling. We talk." },
              { n: "02", t: "Together", d: "We shoot somewhere that feels right. Music on. Take your time." },
              { n: "03", t: "Yours", d: "A private gallery within two weeks. Prints available on request." },
            ].map((s) => (
              <div key={s.n}>
                <p className="font-display text-5xl text-accent">{s.n}</p>
                <h3 className="font-display text-2xl mt-3">{s.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32 text-center">
          <p className="eyebrow text-muted-foreground mb-6">Currently booking</p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1] max-w-3xl mx-auto">
            Let's make<br /><em className="italic text-accent">something</em> quiet.
          </h2>
          <Link to="/book" className="inline-block mt-10 eyebrow px-8 py-4 bg-foreground text-background hover:bg-accent transition-colors">
            Request a session
          </Link>
        </div>
      </section>
    </>
  );
}

function Chapter({ to, eyebrow, title, copy, photos }: { to: string; eyebrow: string; title: string; copy: string; photos: typeof SEED_PHOTOS }) {
  return (
    <Link to={to} className="group block">
      <div className="grid grid-cols-3 gap-2 mb-6">
        {photos.map((p, i) => (
          <div key={p.id} className={`overflow-hidden ${i === 0 ? "row-span-2 col-span-2 aspect-square" : "aspect-square"}`}>
            <img src={p.url} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        ))}
      </div>
      <p className="eyebrow text-muted-foreground">{eyebrow}</p>
      <h3 className="font-display text-4xl md:text-5xl mt-2 flex items-baseline gap-3">
        {title}
        <ArrowUpRight size={24} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
      </h3>
      <p className="mt-3 text-sm text-muted-foreground max-w-sm">{copy}</p>
    </Link>
  );
}
