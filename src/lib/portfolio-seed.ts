import a1 from "@/assets/portfolio/mary-01.asset.json";
import a2 from "@/assets/portfolio/mary-02.asset.json";
import a3 from "@/assets/portfolio/mary-03.asset.json";
import a4 from "@/assets/portfolio/mary-04.asset.json";
import a5 from "@/assets/portfolio/mary-05.asset.json";
import a6 from "@/assets/portfolio/mary-06.asset.json";
import a7 from "@/assets/portfolio/mary-07.asset.json";
import a8 from "@/assets/portfolio/mary-08.asset.json";
import a9 from "@/assets/portfolio/mary-09.asset.json";
import p1 from "@/assets/portfolio/personal-01.asset.json";
import p2 from "@/assets/portfolio/personal-02.asset.json";
import p3 from "@/assets/portfolio/personal-03.asset.json";
import dawn from "@/assets/portfolio/street-dawn.asset.json";

export type Section = "street" | "personal";
export type StreetSub = "collaborations" | "prints" | "reportages";
export type PersonalSub = "portrait" | "sensual";

export type SeedPhoto = {
  id: string;
  url: string;
  section: Section;
  subsection: StreetSub | PersonalSub;
  title: string;
  caption?: string;
};

export const SEED_PHOTOS: SeedPhoto[] = [
  // STREET — Reportages
  { id: "r1", url: dawn.url, section: "street", subsection: "reportages", title: "Dawn, lagoon", caption: "Setúbal, 2025" },
  { id: "r2", url: a3.url, section: "street", subsection: "reportages", title: "Tram, late light", caption: "Paris" },
  { id: "r3", url: a4.url, section: "street", subsection: "reportages", title: "Through the window", caption: "Atlantic" },
  { id: "r4", url: a5.url, section: "street", subsection: "reportages", title: "Venezia café", caption: "Lisbon" },
  // STREET — Collaborations
  { id: "c1", url: a8.url, section: "street", subsection: "collaborations", title: "Slice", caption: "Editorial, Lomography" },
  { id: "c2", url: a9.url, section: "street", subsection: "collaborations", title: "Sisters", caption: "Brand, Studio S" },
  // PERSONAL — Portrait
  { id: "pt1", url: p1.url, section: "personal", subsection: "portrait", title: "Veil", caption: "Lisbon" },
  { id: "pt2", url: p2.url, section: "personal", subsection: "portrait", title: "Hot chocolate", caption: "Porto" },
  { id: "pt3", url: p3.url, section: "personal", subsection: "portrait", title: "Held", caption: "Home series" },
  // PERSONAL — Sensual
  { id: "s1", url: a1.url, section: "personal", subsection: "sensual", title: "Black lace I", caption: "Morning" },
  { id: "s2", url: a2.url, section: "personal", subsection: "sensual", title: "Black lace II", caption: "Hotel" },
  { id: "s3", url: a6.url, section: "personal", subsection: "sensual", title: "On the chair", caption: "Studio" },
  { id: "s4", url: a7.url, section: "personal", subsection: "sensual", title: "Red lace", caption: "Candlelight" },
];

export const HERO_IMAGE = p1.url;
export const ABOUT_IMAGE = p2.url;

export const STREET_SUBS: { key: StreetSub; label: string; copy: string }[] = [
  { key: "reportages", label: "Reportages", copy: "Slow documentaries. Streets, light, strangers." },
  { key: "collaborations", label: "Collaborations", copy: "Editorial and brand work. Made with good people." },
  { key: "prints", label: "Prints", copy: "Limited editions. Shipped worldwide via Darkroom." },
];

export const PERSONAL_SUBS: { key: PersonalSub; label: string; copy: string }[] = [
  { key: "portrait", label: "Portrait", copy: "Faces without a mask. One hour, one camera." },
  { key: "sensual", label: "Sensual / Boudoir", copy: "Quiet. On your terms. Always." },
];
