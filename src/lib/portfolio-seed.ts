import a1 from "@/assets/portfolio/mary-01.asset.json";
import a2 from "@/assets/portfolio/mary-02.asset.json";
import a3 from "@/assets/portfolio/mary-03.asset.json";
import a4 from "@/assets/portfolio/mary-04.asset.json";
import a5 from "@/assets/portfolio/mary-05.asset.json";
import a6 from "@/assets/portfolio/mary-06.asset.json";
import a7 from "@/assets/portfolio/mary-07.asset.json";
import a8 from "@/assets/portfolio/mary-08.asset.json";
import a9 from "@/assets/portfolio/mary-09.asset.json";

export type SeedPhoto = { id: string; url: string; category: "street" | "sensual"; title: string; caption?: string };

export const SEED_PHOTOS: SeedPhoto[] = [
  { id: "s1", url: a3.url, category: "street", title: "Tram, late afternoon", caption: "Paris" },
  { id: "s2", url: a4.url, category: "street", title: "Through the window", caption: "Atlantic coast" },
  { id: "s3", url: a5.url, category: "street", title: "Venezia café", caption: "Lisbon" },
  { id: "s4", url: a8.url, category: "street", title: "Slice", caption: "After school" },
  { id: "s5", url: a9.url, category: "street", title: "Sisters", caption: "Studio" },
  { id: "b1", url: a1.url, category: "sensual", title: "Black lace I", caption: "Home, morning" },
  { id: "b2", url: a2.url, category: "sensual", title: "Black lace II", caption: "Hotel room" },
  { id: "b3", url: a6.url, category: "sensual", title: "On the chair", caption: "Studio" },
  { id: "b4", url: a7.url, category: "sensual", title: "Red lace", caption: "Candlelight" },
];

export const HERO_IMAGE = a4.url;
export const ABOUT_IMAGE = a5.url;
