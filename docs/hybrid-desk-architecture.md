# Hybrid Desk Architecture

**Short answer: yes, the northstar vision is achievable** — but only with a **hybrid** approach that separates atmosphere from interactivity.

Two approaches that do **not** work:

| Approach | Why it fails |
|----------|--------------|
| **One giant static hero image** | Kills interactivity. Links, React Flow, timeline data, résumé builder, and theme toggle cannot live inside a JPEG. Hiring reviewers see a pretty wallpaper, not proof of work. |
| **Pure CSS skeuomorphism** | Already tried. CSS gradients and box-shadows cannot reproduce the cinematic density, analog texture, and cohesive lighting of the northstar reference. The desk reads as empty and flat. |

The hybrid model uses **generated images for atmosphere and polish**, and **HTML/React for every surface that must be real**.

---

## Layer stack

```
Layer 0: Generated wood desk surface (tileable or wide)
Layer 1: Generated window band (top, optional day/night pair)
Layer 2: Positioned HTML modules (IntroPaper, tablets, map, timeline) — REAL interactivity
Layer 3: Generated PNG overlays (torn paper edges, tape, shadows) — polish
Layer 4: Generated prop cutouts (plant, mug, compass) — optional sparse accents
```

Think of it as a **composited stage set**: the desk and window are painted backdrops; the proof objects are live React components sitting on top.

---

## What generated images SHOULD be used for

| Asset | Purpose |
|-------|---------|
| Wood desk texture | Wide hero backdrop (`desk-wood-surface.jpg`). Tileable or full-bleed. |
| Window atmosphere strip | Top band only — day/night pair (`window-band-day.jpg`, `window-band-night.jpg`). |
| Device bezels | Empty tablet/phone frames with transparent screen holes (`tablet-bezel-empty.png`). |
| Torn paper edges | PNG overlay on top of HTML text blocks (`paper-torn-overlay.png`). |
| Practice card art | Custom backgrounds per practice, not Unsplash (`practice-environment-bg.jpg`, `practice-creative-bg.jpg`). |
| Sticky note textures | Small generated paper/note PNGs for analog accents. |
| Prop cutouts (optional) | Plant, mug, compass — sparse, not the whole composition. |

---

## What MUST stay HTML/React

These are non-negotiable — they are the **proof** hiring reviewers need to interact with:

- **Work map** — React Flow graph with real project nodes and links
- **Timeline** — career data rendered from `experiences.ts`
- **Résumé builder + PDF** — live form, real export
- **Navigation, links, theme toggle** — accessible, keyboard-navigable
- **All text and copy** — selectable, translatable, SEO-indexable

If it has a URL, a click handler, or dynamic data, it is HTML.

---

## How this addresses the hiring critique

The northstar reference (`docs/hero-vision.md`) encodes a proof-first desk. The critique against the current site maps directly to this architecture:

### 1. Dense desk — assets + tight grid, no 80% void

Generated wood texture fills the frame. HTML modules are positioned on a **CSS grid** with deliberate overlap (`StudioObject` rotation, negative margins). Optional prop cutouts add density without blocking interaction. The desk feels worked-in, not empty.

### 2. Proof above the fold — HTML modules on composed desk, not wallpaper

`IntroPaper`, practice portals, work map preview, and timeline strip are **real components** visible on first paint. The hero is not a headline floating over a blurred photo — it is a composed layout of navigable surfaces.

### 3. Contrast — CSS on HTML, not baked into blurry photo

Typography, link colors, and badge contrast are controlled by CSS variables (`--ink`, `--paper-cream`, `--environment`). They remain sharp and accessible at any viewport. Generated images provide warmth; CSS provides readability.

### 4. No stock Unsplash — custom generated practice art

Practice portal cards use purpose-built backgrounds (`practice-environment-bg.jpg`, `practice-creative-bg.jpg`) that match the environmental/creative split. The asset pack is unified in tone and lighting.

### 5. Coherent metaphor — unified asset pack

All generated assets share the same Pacific Northwest studio palette: warm wood, golden-hour or moonlit window, cream paper, muted analog props. One art direction, one desk.

---

## Asset pack (v1)

Located at `apps/personal/public/assets/`:

| File | Layer | Notes |
|------|-------|-------|
| `desk-wood-surface.jpg` | 0 | 16:9 warm oak top-down texture |
| `window-band-day.jpg` | 1 | Oregon countryside, golden hour |
| `window-band-night.jpg` | 1 | Night/moonlit version for theme toggle |
| `paper-torn-overlay.png` | 3 | Cream torn edges; center is neutral gray — mask or crop for transparency |
| `tablet-bezel-empty.png` | 2/3 | Dark frame, gray screen hole for HTML inset |
| `practice-environment-bg.jpg` | 2 | Wind/farm landscape for environmental card |
| `practice-creative-bg.jpg` | 2 | Neon city mood for creative card |

### Transparency note

The image generation tool does not produce true alpha-channel PNGs. For `paper-torn-overlay.png` and `tablet-bezel-empty.png`, the neutral gray center should be removed in post (CSS `mix-blend-mode`, `mask-image`, or a quick Figma/Photoshop pass) before production use.

---

## Proof-of-concept scaffold

`apps/personal/src/components/studio/HybridDeskSurface.tsx` is a **WIP scaffold** — not a full rebuild. It demonstrates:

- Layer 0 wood background via `desk-wood-surface.jpg`
- Layer 1 window band with day/night crossfade
- Layer 2 children slot (e.g. `IntroPaper`)

It is **not wired into `page.tsx` yet**. Swap it in when ready to iterate on layout.

---

## Implementation sequence (recommended)

1. **Wire `HybridDeskSurface` into hero** — replace or augment `CinematicNorthStarHero` background layers only; keep existing HTML modules.
2. **Mask overlay PNGs** — remove gray centers from paper and tablet assets; add `mask-image` or alpha PNGs.
3. **Practice card backgrounds** — point practice portal components at `practice-*-bg.jpg` instead of Unsplash.
4. **Tablet bezel compositing** — wrap `MapTablet` and practice portals in bezel frame with HTML content in the screen hole.
5. **Tighten grid density** — adjust `StudioObject` positions to match northstar overlap; add prop cutouts (Layer 4) sparingly.
6. **Mobile stack** — same layers, vertical rhythm per `hero-vision-mobile.jpg`.
7. **Retire pure CSS wood grain** — remove redundant `wood-grain` gradients once image layer is stable.

---

## Related docs

- [Hero Vision Reference](./hero-vision.md) — northstar images and design principles
- Asset files: `apps/personal/public/assets/`
- Scaffold: `apps/personal/src/components/studio/HybridDeskSurface.tsx`
