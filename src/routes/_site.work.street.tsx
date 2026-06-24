import { createFileRoute } from "@tanstack/react-router";
import { SEED_PHOTOS, STREET_SUBS, type StreetSub } from "@/lib/portfolio-seed";
import { WorkPage } from "@/components/WorkPage";
import { useLang } from "@/lib/lang-context";
import { z } from "zod";

const search = z.object({ tab: z.enum(["collaborations", "prints", "reportages"]).optional() });

export const Route = createFileRoute("/_site/work/street")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Street — Mary" },
      { name: "description", content: "Reportages, collaborations, and prints. Slow documentary photography by Mary." },
      { property: "og:title", content: "Street — Mary" },
      { property: "og:description", content: "Reportages, collaborations, prints." },
    ],
  }),
  component: Street,
});

function Street() {
  const { T } = useLang();
  const { tab } = Route.useSearch();
  const photos = SEED_PHOTOS.filter((p) => p.section === "street");
  const subs = (STREET_SUBS as { key: string; label: string; copy: string }[]).map((s) => ({
    ...s,
    label: (T.work.street.subs as Record<string, string>)[s.key] ?? s.label,
  }));
  return (
    <WorkPage
      n="01"
      title={T.work.street.title}
      blurb={T.work.street.blurb}
      subs={subs}
      activeTab={tab ?? "reportages"}
      basePath="/work/street"
      photos={photos.map((p) => ({ ...p, sub: p.subsection as StreetSub }))}
    />
  );
}
