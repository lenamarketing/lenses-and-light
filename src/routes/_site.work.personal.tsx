import { createFileRoute } from "@tanstack/react-router";
import { SEED_PHOTOS, PERSONAL_SUBS, type PersonalSub } from "@/lib/portfolio-seed";
import { WorkPage } from "@/components/WorkPage";
import { useLang } from "@/lib/lang-context";
import { z } from "zod";

const search = z.object({ tab: z.enum(["portrait", "sensual"]).optional() });

export const Route = createFileRoute("/_site/work/personal")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Personal — Mary" },
      { name: "description", content: "Portrait and sensual photography. Made together, on your terms." },
      { property: "og:title", content: "Personal — Mary" },
      { property: "og:description", content: "Portrait and sensual photography." },
    ],
  }),
  component: Personal,
});

function Personal() {
  const { T } = useLang();
  const { tab } = Route.useSearch();
  const photos = SEED_PHOTOS.filter((p) => p.section === "personal");
  const subs = (PERSONAL_SUBS as { key: string; label: string; copy: string }[]).map((s) => ({
    ...s,
    label: (T.work.personal.subs as Record<string, string>)[s.key] ?? s.label,
  }));
  return (
    <WorkPage
      n="02"
      title={T.work.personal.title}
      blurb={T.work.personal.blurb}
      subs={subs}
      activeTab={tab ?? "portrait"}
      basePath="/work/personal"
      photos={photos.map((p) => ({ ...p, sub: p.subsection as PersonalSub }))}
    />
  );
}
