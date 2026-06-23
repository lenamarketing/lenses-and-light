# Redesign: Bright. Bold. Lundani-coded.

Pivoting the whole site away from the warm-film/sepia direction toward something **white, bright, modern, oversized typography** — closer to lundanistudio.framer.website. Restructuring the portfolio at the same time.

## 1. Visual system overhaul

**Palette** (replaces cream/sepia/terracotta entirely)
- Background: pure white `#ffffff`
- Foreground/ink: near-black `#0a0a0a`
- Muted text: `#666`
- Hairlines: `#e5e5e5`
- Single accent: kept minimal (black-on-white is the language). One subtle warm gray for surfaces if needed. No beige. No terracotta. No film grain overlay.

**Typography**
- Replace Cormorant Garamond + Inter with **Manrope** (entire family — 200, 300, 400, 500, 600, 700, 800) loaded via `@fontsource-variable/manrope`.
- Display: Manrope 200/300 at very large sizes (clamp up to ~10rem), tight tracking (`-0.04em`).
- Body: Manrope 400, generous line-height.
- Eyebrow: Manrope 500, uppercase, wide tracking — kept.
- Remove all `italic` / serif treatments. No more `<em>` accent words in display.

**Layout language** (matching Lundani)
- Huge edge-to-edge type that breaks the grid
- Generous whitespace, thin 1px hairlines as dividers
- Images sit in clean rectangles, no rounded corners (radius → 0)
- Buttons: pill-shaped, black bg / white text, or outlined black, no color accents
- Subtle hover: underline reveal, image scale, arrow translate

## 2. Portfolio restructure

Old: `street` / `sensual`
New: `street` / `personal`

- **Street** — landing page with three sub-sections (single page, anchor-scrolled or tabbed):
  - Collaborations
  - Prints
  - Reportages
- **Personal** — landing page with two sub-sections:
  - Portrait
  - Sensual / Boudoir

URLs:
- `/work/street` (with `?tab=collaborations|prints|reportages`)
- `/work/personal` (with `?tab=portrait|sensual`)
- Old `/portfolio/$category` routes removed.

Seed data updated: existing 4 boudoir images → Personal/Sensual. Existing 5 street images split between Reportages (3) and Collaborations (2). Prints starts empty with a "coming soon" state.

## 3. Add the 4 new uploaded images

Upload via `lovable-assets` from `/mnt/user-uploads/`:
- `113927.png` → Personal / Portrait (girl through plastic)
- `113940.png` → Personal / Portrait (girl with cup, B&W)
- `113948.png` → Personal / Portrait (hands + dog)
- `113957.png` → Street / Reportages (boats at dawn)

These become 4 new asset pointers in `src/assets/portfolio/`.

## 4. Tone of voice rewrite

Lundani's voice is: terse, confident, lowercase-friendly, declarative, no flourishes. Examples from their site: "We build brands that move." / "Studio for visual identity." Short sentences. Period.

Rewriting:
- **Hero H1**: "Photography that doesn't pose." (replaces "The quiet in-between, held still.")
- **Hero sub**: "Mary. Street and personal work. Lisbon, Paris, anywhere with light."
- **Two chapters → "Two ways of looking."** Sections renamed Street / Personal.
- **About**: tightened, dropped purple prose. "I photograph people when they forget the camera. That's it. That's the work."
- **Process steps**: "Talk." / "Shoot." / "Deliver."
- **Closing CTA**: "Let's make something." (drop "quiet")
- Remove all italic accent words across the site.

## 5. Logo

`Mary.` — Manrope 600, no italic, no terracotta dot. Just black `Mary.` with the period as part of the wordmark.

## 6. Files touched

- `src/styles.css` — new palette, Manrope import, radius=0, drop grain util, drop serif tokens
- `src/routes/__root.tsx` — drop any old font links
- `src/components/Logo.tsx` — new wordmark
- `src/components/SiteNav.tsx` / `SiteFooter.tsx` — update labels (Street, Personal), tighten copy
- `src/routes/_site.index.tsx` — full rewrite, new hero, two-chapter section uses new names
- `src/routes/_site.about.tsx` — rewrite copy
- `src/routes/_site.book.tsx`, `_site.contact.tsx`, `_site.journal*.tsx` — restyle to new system, copy pass
- **Delete** `src/routes/_site.portfolio.$category.tsx`
- **Create** `src/routes/_site.work.street.tsx` and `src/routes/_site.work.personal.tsx` (with internal tab/section switcher)
- `src/lib/portfolio-seed.ts` — new shape: `{ section: "street"|"personal", subsection: "collaborations"|"prints"|"reportages"|"portrait"|"sensual" }`, add 4 new photos
- `src/assets/portfolio/personal-01..04.asset.json` — new
- DB schema unchanged for now (photos table still works as fallback source if admin gets built later); seed list drives the public site.

## 7. Out of scope this turn

Admin backoffice, Google Calendar sync, DB-driven portfolio (still using hand-curated seed per your earlier "BE as source" question — staying with seed + uploads for now).

---

Confirm and I'll build it in one pass.
