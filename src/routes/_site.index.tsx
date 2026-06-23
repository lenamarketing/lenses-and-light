import { createFileRoute, Link } from "@tanstack/react-router";
import { HERO_IMAGE, SEED_PHOTOS } from "@/lib/portfolio-seed";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/lang-context";

export const Route = createFileRoute("/_site/")({
    head: () => ({
          meta: [
            { title: "Mary — Photographer. Street & personal." },
            { name: "description", content: "Photography that doesn't pose. Street and personal work by Mary. Based in Portugal, Oeste. Anywhere the light is right." },
            { property: "og:title", content: "Mary — Photographer" },
            { property: "og:description", content: "Photography that doesn't pose. Street and personal work." },
            { property: "og:image", content: HERO_IMAGE },
                ],
    }),
    component: Home,
});

function Chapter({ to, n, title, copy, photos }: { to: string; n: string; title: string; copy: string; photos: typeof SEED_PHOTOS }) {
    return (
          <Link to={to} className="group block">
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {photos.map((p) => (
                      <div key={p.id} className="aspect-[4/5] overflow-hidden bg-muted">
                                  <img src={p.src} alt={p.alt} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                      </div>div>
                    ))}
                </div>div>
                <div className="flex items-end justify-between">
                        <div>
                                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{n}</p>p>
                                  <h3 className="font-display text-4xl md:text-5xl font-light tracking-[-0.03em]">{title}</h3>h3>
                                  <p className="mt-2 text-sm text-muted-foreground">{copy}</p>p>
                        </div>div>
                        <ArrowUpRight size={24} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>div>
          </Link>Link>
        );
}

function Home() {
    const { T } = useLang();
    const street = SEED_PHOTOS.filter((p) => p.section === "street").slice(0, 3);
    const personal = SEED_PHOTOS.filter((p) => p.section === "personal").slice(0, 3);
  
    return (
          <>
            {/* HERO */}
                <section className="border-b border-border">
                        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-24">
                                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10 md:mb-16">
                                    {T.hero.badge}
                                  </p>p>
                                  <h1 className="font-display text-[clamp(3.5rem,13vw,13rem)] font-light tracking-[-0.05em] leading-[0.88]">
                                    {T.hero.h1a}<br />
                                              <span className="text-muted-foreground">{T.hero.h1b}</span>span> {T.hero.h1c}
                                  </h1>h1>
                                  <div className="mt-16 md:mt-24 grid md:grid-cols-12 gap-10 items-end">
                                              <div className="md:col-span-5">
                                                            <p className="text-base md:text-lg leading-relaxed max-w-md">
                                                              {T.hero.body}
                                                            </p>p>
                                                            <div className="mt-8 flex flex-wrap gap-3">
                                                                            <Link to="/book" className="text-sm font-semibold px-6 py-3.5 rounded-full bg-foreground text-background hover:bg-foreground/80 transition-colors">
                                                                              {T.hero.cta}
                                                                            </Link>Link>
                                                                            <Link to="/work/personal" className="text-sm font-semibold px-6 py-3.5 rounded-full border border-foreground hover:bg-foreground hover:text-background transition-colors">
                                                                              {T.hero.ctaWork}
                                                                            </Link>Link>
                                                            </div>div>
                                              </div>div>
                                              <div className="md:col-span-7 md:col-start-6">
                                                            <div className="aspect-[16/10] overflow-hidden bg-muted">
                                                                            <img src={HERO_IMAGE} alt="Featured photograph" className="w-full h-full object-cover" />
                                                            </div>div>
                                                            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground uppercase tracking-[0.15em]">
                                                                            <span>№ 014 / Portrait / 50mm</span>span>
                                                                            <span>↓ Scroll</span>span>
                                                            </div>div>
                                              </div>div>
                                  </div>div>
                        </div>div>
                </section>section>
          
            {/* MARQUEE STRIP */}
                <section className="border-b border-border overflow-hidden py-6">
                        <div className="flex gap-12 whitespace-nowrap font-display text-2xl md:text-3xl font-light tracking-tight animate-[scroll_40s_linear_infinite]">
                          {Array.from({ length: 8 }).map((_, i) => (
                        <span key={i} className="inline-flex items-center gap-12">
                          {T.marquee[0]} <span className="text-muted-foreground">✶</span>span>
                          {T.marquee[1]} <span className="text-muted-foreground">✶</span>span>
                          {T.marquee[2]} <span className="text-muted-foreground">✶</span>span>
                          {T.marquee[3]} <span className="text-muted-foreground">✶</span>span>
                          {T.marquee[4]} <span className="text-muted-foreground">✶</span>span>
                        </span>span>
                      ))}
                        </div>div>
                        <style>{`@keyframes scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>style>
                </section>section>
          
            {/* TWO WAYS */}
                <section className="border-b border-border">
                        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32">
                                  <div className="grid md:grid-cols-12 gap-10 mb-16 md:mb-24">
                                              <p className="md:col-span-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{T.twoWays.label}</p>p>
                                              <h2 className="md:col-span-9 font-display text-[clamp(2.5rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[0.95]">
                                                {T.twoWays.h2a}<br />
                                                            <span className="text-muted-foreground">{T.twoWays.h2b}</span>span>
                                              </h2>h2>
                                  </div>div>
                                  <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                                              <Chapter to="/work/street" n={T.twoWays.street.n} title={T.twoWays.street.title} copy={T.twoWays.street.copy} photos={street} />
                                              <Chapter to="/work/personal" n={T.twoWays.personal.n} title={T.twoWays.personal.title} copy={T.twoWays.personal.copy} photos={personal} />
                                  </div>div>
                        </div>div>
                </section>section>
          
            {/* PROCESS */}
                <section className="border-b border-border bg-secondary">
                        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32">
                                  <div className="grid md:grid-cols-12 gap-10">
                                              <p className="md:col-span-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{T.process.label}</p>p>
                                              <div className="md:col-span-9 grid md:grid-cols-3 gap-12">
                                                {T.process.steps.map((s) => (
                            <div key={s.n}>
                                              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.n}</p>p>
                                              <h3 className="font-display text-5xl md:text-6xl font-light tracking-[-0.04em] mt-4">{s.t}</h3>h3>
                                              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">{s.d}</p>p>
                            </div>div>
                          ))}
                                              </div>div>
                                  </div>div>
                        </div>div>
                </section>section>
          
            {/* CTA */}
                <section>
                        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-32 md:py-40 text-center">
                                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">{T.cta.label}</p>p>
                                  <h2 className="font-display text-[clamp(3rem,10vw,9rem)] font-light tracking-[-0.05em] leading-[0.9]">
                                    {T.cta.h2.split('\n').map((line, i) => (
                          <span key={i}>{line}{i === 0 && <br />}</span>span>
                        ))}
                                  </h2>h2>
                                  <Link to="/book" className="inline-flex items-center gap-2 mt-12 text-sm font-semibold px-8 py-4 rounded-full bg-foreground text-background hover:bg-foreground/80 transition-colors">
                                    {T.cta.book}
                                  </Link>Link>
                        </div>div>
                </section>section>
          </>>
        );
}
</></Link>
