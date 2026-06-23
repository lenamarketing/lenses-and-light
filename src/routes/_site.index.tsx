import { createFileRoute, Link } from "@tanstack/react-router";
import { HERO_IMAGE, SEED_PHOTOS } from "@/lib/portfolio-seed";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "Mary — Photographer. Street & personal." },
      { name: "description", content: "Photography that doesn't pose. Street and personal work by Mary. Lisbon, Paris, anywhere with light." },
      { property: "og:title", content: "Mary — Photographer" },
      { property: "og:description", content: "Photography that doesn't pose. Street and personal work." },
      { property: "og:image", content: HERO_IMAGE },
    ],
  }),
  component: Home,
});

function Home() {
  const street = SEED_PHOTOS.filter((p) => p.section === "street").slice(0, 3);
  const personal = SEED_PHOTOS.filter((p) => p.section === "personal").slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-24">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10 md:mb-16">
            ✦ Photographer · Available worldwide
          </p>
          <h1 className="font-display text-[clamp(3.5rem,13vw,13rem)] font-light tracking-[-0.05em] leading-[0.88]">
            Photography<br />
            <span className="text-muted-foreground">that doesn't</span> pose.
          </h1>
          <div className="mt-16 md:mt-24 grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-5">
              <p className="text-base md:text-lg leading-relaxed max-w-md">
                Mary. Street and personal work. Lisbon, Paris, anywhere with good light.
                I shoot people when they forget the camera — that's the whole job.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/book" className="text-sm font-semibold px-6 py-3.5 rounded-full bg-foreground text-background hover:bg-foreground/80 transition-colors">
                  Book a session →
                </Link>
                <Link to="/work/personal" className="text-sm font-semibold px-6 py-3.5 rounded-full border border-foreground hover:bg-foreground hover:text-background transition-colors">
                  See the work
                </Link>
              </div>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img src={HERO_IMAGE} alt="Featured photograph" className="w-full h-full object-cover" />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground uppercase tracking-[0.15em]">
                <span>№ 014 / Portrait / 50mm</span>
                <span>↓ Scroll</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <section className="border-b border-border overflow-hidden py-6">
        <div className="flex gap-12 whitespace-nowrap font-display text-2xl md:text-3xl font-light tracking-tight animate-[scroll_40s_linear_infinite]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-12">
              Reportages <span className="text-muted-foreground">✦</span>
              Portraits <span className="text-muted-foreground">✦</span>
              Boudoir <span className="text-muted-foreground">✦</span>
              Collaborations <span className="text-muted-foreground">✦</span>
              Prints <span className="text-muted-foreground">✦</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
      </section>

      {/* TWO WAYS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-10 mb-16 md:mb-24">
            <p className="md:col-span-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">— Two ways of looking</p>
            <h2 className="md:col-span-9 font-display text-[clamp(2.5rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[0.95]">
              One eye for the world.<br />
              <span className="text-muted-foreground">One for the people in it.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            <Chapter to="/work/street" n="01" title="Street" copy="Reportages, collaborations, prints." photos={street} />
            <Chapter to="/work/personal" n="02" title="Personal" copy="Portrait, sensual, boudoir." photos={personal} />
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-10">
            <p className="md:col-span-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">— How it works</p>
            <div className="md:col-span-9 grid md:grid-cols-3 gap-12">
              {[
                { n: "01", t: "Talk.", d: "Tell me what you want. Mood, place, feeling. No forms." },
                { n: "02", t: "Shoot.", d: "We meet. Music on. We take the time it needs." },
                { n: "03", t: "Deliver.", d: "Private gallery in 14 days. Prints on request." },
              ].map((s) => (
                <div key={s.n}>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.n}</p>
                  <h3 className="font-display text-5xl md:text-6xl font-light tracking-[-0.04em] mt-4">{s.t}</h3>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-32 md:py-40 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">— Currently booking</p>
          <h2 className="font-display text-[clamp(3rem,11vw,11rem)] font-light tracking-[-0.05em] leading-[0.9]">
            Let's make<br />something.
          </h2>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 mt-12 text-sm font-semibold px-8 py-4 rounded-full bg-foreground text-background hover:bg-foreground/80 transition-colors"
          >
            Request a session →
          </Link>
        </div>
      </section>
    </>
  );
}

function Chapter({ to, n, title, copy, photos }: { to: string; n: string; title: string; copy: string; photos: typeof SEED_PHOTOS }) {
  return (
    <Link to={to} className="group block">
      <div className="grid grid-cols-3 gap-2 mb-6">
        {photos.map((p, i) => (
          <div key={p.id} className={`overflow-hidden bg-muted ${i === 0 ? "row-span-2 col-span-2 aspect-square" : "aspect-square"}`}>
            <img src={p.url} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        ))}
      </div>
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{n}</p>
          <h3 className="font-display text-5xl md:text-6xl font-light tracking-[-0.04em] mt-3">{title}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{copy}</p>
        </div>
        <ArrowUpRight size={32} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.25} />
      </div>
    </Link>
  );
}
