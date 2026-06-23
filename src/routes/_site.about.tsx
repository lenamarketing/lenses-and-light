import { createFileRoute, Link } from "@tanstack/react-router";
import { ABOUT_IMAGE } from "@/lib/portfolio-seed";
import { useLang } from "@/lib/lang-context";

export const Route = createFileRoute("/_site/about")({
    head: () => ({
          meta: [
            { title: "About — Mary" },
            { name: "description", content: "Mary. Photographer. Based in Portugal, Oeste. Available worldwide." },
            { property: "og:title", content: "About Mary" },
            { property: "og:description", content: "Photographer based in Portugal, Oeste." },
            { property: "og:image", content: ABOUT_IMAGE },
                ],
    }),
    component: About,
});

function About() {
    const { T } = useLang();
    return (
          <>
                <section className="border-b border-border">
                        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-16 md:pt-24 pb-16">
                                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">{T.about.badge}</p>p>
                                  <h1 className="font-display text-[clamp(3rem,11vw,11rem)] font-light tracking-[-0.05em] leading-[0.9]">
                                    {T.about.h1a}<br /><span className="text-muted-foreground">{T.about.h1b}</span>span><br />{T.about.h1c}
                                  </h1>h1>
                        </div>div>
                </section>section>
          
                <section className="border-b border-border">
                        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-10">
                                  <div className="md:col-span-5">
                                              <div className="aspect-[4/5] overflow-hidden bg-muted sticky top-28">
                                                            <img src={ABOUT_IMAGE} alt="Mary" className="w-full h-full object-cover" />
                                              </div>div>
                                  </div>div>
                                  <div className="md:col-span-6 md:col-start-7 space-y-8 text-lg leading-relaxed">
                                              <p className="text-2xl md:text-3xl font-display font-light tracking-tight leading-tight">
                                                {T.about.intro}
                                              </p>p>
                                              <p>{T.about.p1}</p>p>
                                              <p>
                                                {T.about.p2.split('Street').map((part, i) =>
                            i === 0
                              ? <span key={i}>{part}<Link to="/work/street" className="link-underline font-medium">{T.nav.street}</Link>Link></span>span>
                              : <span key={i}>{part.replace('Personal', '')}<Link to="/work/personal" className="link-underline font-medium">{T.nav.personal}</Link>Link>{part.includes('Personal') ? part.split('Personal')[1] : ''}</span>span>
                                                            )}
                                              </p>p>
                                              <div className="pt-8 border-t border-border grid grid-cols-2 gap-8 text-sm">
                                                            <div>
                                                                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{T.about.gearLabel}</p>p>
                                                                            <p>{T.about.gear}</p>p>
                                                            </div>div>
                                                            <div>
                                                                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{T.about.citiesLabel}</p>p>
                                                                            <p>{T.about.cities}</p>p>
                                                            </div>div>
                                                            <div>
                                                                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{T.about.languagesLabel}</p>p>
                                                                            <p>{T.about.languages}</p>p>
                                                            </div>div>
                                                            <div>
                                                                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{T.about.publishedLabel}</p>p>
                                                                            <p>{T.about.published}</p>p>
                                                            </div>div>
                                              </div>div>
                                  </div>div>
                        </div>div>
                </section>section>
          
                <section>
                        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32 text-center">
                                  <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-light tracking-[-0.05em] leading-[0.9]">
                                    {T.about.sayHello}
                                  </h2>h2>
                                  <Link to="/contact" className="inline-flex items-center gap-2 mt-10 text-sm font-semibold px-7 py-3.5 rounded-full bg-foreground text-background hover:bg-foreground/80 transition-colors">
                                    {T.about.cta}
                                  </Link>Link>
                        </div>div>
                </section>section>
          </>>
        );
}
</>
