# Career Point of Truth

**Purpose:** Single confirmation workflow for portfolio, map, timeline, résumé, and contact data.  
**Authoritative experience list (code):** `experiences.ts` (sourced from [LinkedIn](https://linkedin.com/in/eddnorris)).  
**Legacy package (needs sync):** `packages/career-data/src/career-data.json`.

---

## Phase 1 Audit Summary (2026-07-14)

### Dual data sources (critical)

| Source | Used by | Status |
|--------|---------|--------|
| `apps/personal/src/data/*` | Studio bento, living map, timeline paper, résumé builder | **Mostly real** (EA, 2bit, CO2T, adidas, etc.) |
| `packages/career-data/src/career-data.json` | `HeroSection`, `TimelineSection`, `WorkMapSection`, `ResumeSection` (legacy pages) | **Stale / oversimplified** |

BBC, Sky, and Culture Code Group were **not found** in the current codebase — likely from an older build or screenshot. The closest “wrong” data is `career-data.json` collapsing history into generic eras starting **2000**.

### Inaccuracies & mismatches

| Field / area | Current value(s) | Issue | Status |
|--------------|------------------|-------|--------|
| 2bit start date | `career-data.json` & `proj-2bit-games`: **2000** | LinkedIn: founded **2009**, official studio **Jul 2012** | `confirmed` → **2012** in `projects.ts` |
| 2bit end date | `proj-2bit-games`: **2018**, status `archived` | LinkedIn: Senior Interactive Dev **Apr 2018 – Present** | `confirmed` → distinct 2012–2014 / 2018–present phases |
| Profile headline | `profile.ts` + `career-data.json` | Two headlines in production | `confirmed` |
| Location | `profile.ts`: Cottage Grove, OR; `career-data.json`: Cottage Grove, OR | Inconsistent specificity | `confirmed` |
| Email | `EddNorris@2bitdev.com` | — | `confirmed` |
| CO2T company period | `relationships.ts` company-co2t: **2020 – Present** | VP role starts **Mar 2024**; org founded 2024 per LinkedIn | `confirmed` → **2024 – Present** |
| exp-node-2bit | period **2012 – Present**, `experienceId`: `exp-2bit-founder` | Founder role ended **May 2014**; senior role is `exp-2bit-senior` | `confirmed` → **2012 – 2014 · 2018 – Present** |
| Black Lantern | In `timeline-eras` & `through-line`, **not** in `experiences` graph nodes | Missing map node | `confirmed` — games era accurate without separate node |
| Google employment | Mentioned in bio summary; **not** in `experiences.ts` | User confirms employee + contractor; dates/title unknown | `confirmed` — public client via 2bit graph node `client-google` |
| LinkedIn-only roles | iD Tech Camps, Hatalom Systems, Gordon Norris & Sons, Black Beauty Coal Mine, multiple 2bit Production Specialist stints | Absent from `experiences.ts` | `confirmed` — iD Tech added (`exp-id-tech`); others remain omitted from public graph |
| ERGO.games | Project + map node | No `experiences.ts` entry | `needs_review` |
| Resume presets | `resume-presets.ts` (5 presets) vs `career-data.json` (3 presets) | Different IDs and labels | `confirmed` — `softwareProductLeadership` default |
| Practice CTAs | `career-data.json`: `href: "#contact"` | `resume-presets.ts` practices use `/work#environmental` | `confirmed` — synced to resume-presets |
| Polaroid images | External Unsplash URLs + purple gradients | Not local, not era-specific photos | `placeholder` → migrated to `/career/` |
| proj-ergo metrics | "12+ games in catalog" | Unverified metric | `needs_review` |
| GitHub links | `twobitEDD`, `twobitENT`, `co2trust-org` | User-confirmed; ERGO repo URL not listed | `confirmed` (personal/org) |
| LinkedIn URL | `https://linkedin.com/in/eddnorris` | Fetched successfully; matches `experiences.ts` | `confirmed` |

### LinkedIn verification highlights

- **Name on LinkedIn:** Edd Norris (not Edward)
- **Current roles:** VP Operations @ CO2T.earth (Mar 2024–Present), Senior Interactive Developer @ 2bit (Apr 2018–Present)
- **Location:** Greater Eugene-Springfield Area; CO2T role lists Cottage Grove, OR
- **Headline:** "Co-Founder, Technical Designer & Production Specialist; CO2T.earth is building a Sustainable Future"

---

## Schema: confirmed fields per experience

```yaml
experience:
  id: string                    # e.g. exp-co2t-vp
  status: confirmed | needs_review | placeholder
  title: string
  organization: string
  period:
    start: string               # "Mar 2024" or "2005"
    end: string | null          # null = present
  location: string | null
  summary: string
  details: string[]
  disciplines: Discipline[]
  skills: string[]
  projects: string[]              # project ids
  featured: boolean
  image: string | null          # path under /career/
  links:
    - label: string
      url: string
  sources:
    - linkedin
    - resume
    - personal_knowledge
```

```yaml
profile:
  status: confirmed | needs_review | placeholder
  legal_name: string
  display_name: string
  tagline: string
  headline: string
  summary: string
  location: string
  availability: string
  email: string
  links: { label, url }[]
```

---

## Confirmation prompts

Answer each **Answer:** in chat when ready. Updates will be applied to `experiences.ts`, `profile.ts`, `relationships.ts`, and `career-data.json`.

### Prompt 1: Legal name display
**Current value:** `Edd Norris` (profile, graph, LinkedIn)  
**Question:** Should the site use **Edd**, **Edward**, or **Edd Norris** everywhere? Any contexts where formal name is required (résumé PDF, legal footer)?  
**Why it matters:** Hero, map center node, résumé header, meta/SEO title.  
**Answer:** **Edd Norris** everywhere (display and résumé). No formal "Edward" variant.

### Prompt 2: Email contact
**Current value:** `hello@ednorris.com` (profile.ts, career-data.json)  
**Question:** Is this the correct public contact email? If not, what should replace it?  
**Why it matters:** Contact section, mailto links, résumé footer.  
**Answer:** **EddNorris@2bitdev.com** (`mailto:EddNorris@2bitdev.com`)

### Prompt 3: Location
**Current value:** `Cottage Grove, Oregon` (profile.ts) vs `Oregon` (career-data.json) vs `Greater Eugene-Springfield Area` (LinkedIn)  
**Question:** What location string should appear on the portfolio and résumé?  
**Why it matters:** Profile badge, contact, map subtitle, job-search signals.  
**Answer:** **Cottage Grove, Oregon**

### Prompt 4: Headline / tagline
**Current value:** Tagline: `Systems thinker who ships games & platforms`. Headline: `I build useful systems that connect people, technology, and the living world.` LinkedIn headline differs.  
**Question:** Which headline + tagline pair is the canonical public positioning?  
**Why it matters:** Hero intro paper, Open Graph, LinkedIn parity.  
**Answer:**  
- **Headline:** I love building solutions, for fun and function.  
- **Tagline:** Technical Designer — UX & Software

### Prompt 5: Games foundation era (2005–2012)
**Current value:** EA Tiburon (volunteer QA Dec 2005–Sep 2006), Black Lantern (Nov 2007–Jul 2008), Seamless (Jul 2008–Oct 2009), Rocket Gaming (Jan 2010–Jul 2012). Timeline era: `2005–2012`.  
**Question:** Are these dates and titles accurate? Include Black Beauty Coal Mine (summer 2005) or keep era games-only?  
**Why it matters:** Timeline polaroid `era-games`, map nodes `exp-node-ea` through `exp-node-rocket`.  
**Answer:** **ACCURATE** — keep EA → Black Lantern → Seamless → Rocket as in `experiences.ts`. Games-only era; no Black Beauty Coal Mine on the public timeline.

### Prompt 6: 2bit Entertainment era (2012–2018+)
**Current value:** Founder Jul 2012–May 2014; Senior Interactive Developer Apr 2018–Present. Timeline era ends 2018 but org string says founder through 2018. `career-data.json` wrongly starts 2bit at **2000**.  
**Question:** How should 2bit be presented — one continuous studio (2012–present) or distinct founder vs consulting phases? Correct public start year?  
**Why it matters:** Timeline `era-2bit`, `company-2bit`, `proj-2bit-games`, graph `exp-node-2bit`.  
**Answer:** **Distinct phases** — operational indie studio **2012–2014** building **Planet's Core**; re-established **2018** as **Software Production Business**; contract engagements through agencies (Nice Touch, Uncorked, others); clients include **Google, Dell, Washington University** and additional brands; continued adidas support via contract engagement when new leadership requested ongoing work. Public start year **2012** (not 2000).

### Prompt 7: Software + marketing era (adidas, agencies)
**Current value:** adidas Future Team Mar 2017–Sep 2018; Uncorked, Fresh, Opus, Nice Touch, TrustlessTeam, ERGnomes as contracts via 2bit. Era period `2017–2023`.  
**Question:** Confirm date ranges and which clients are **public portfolio** vs **omit**. Any NDA clients to exclude?  
**Why it matters:** Timeline `era-software`, story stops, project `proj-brand-systems` / `proj-web-platforms`.  
**Answer:** **Public portfolio clients:** adidas, google, uncorked, fresh, opus, nice-touch, trustless, ergnomes. Add graph nodes or story mentions for **Google, Dell, Washington University**. **Do NOT expose NDA clients.**

### Prompt 8: Environmental era (Oregon Institute + CO2T)
**Current value:** OIBW Sep 2022–Apr 2024; VP Operations CO2T Mar 2024–Present. Company node says CO2T from 2020.  
**Question:** When did CO2T work actually begin (2020 platform, 2024 VP, or other)? Is OIBW → CO2T the right narrative chain?  
**Why it matters:** Timeline `era-environment`, `exp-node-oibw`, `exp-node-co2t`, `company-co2t`.  
**Answer:** **OIBW Sep 2022–Apr 2024** → **VP Operations CO2T Mar 2024–present**; **CO2T org founded 2024**. Fix `company-co2t` period from 2020 to **2024**. Fix `proj-co2t-platform` start date to **2024**. OIBW → CO2T is the correct narrative chain.

### CO2T / CO2True leadership detail (2026-07-15)

**Confirmed VP Operations scope at CO2T.earth & CO2True.com:**
- Comprehensive software architecture, product design, and brand design for Soil Additive Business
- Bigfoot character designs and overall brand design — Edd personally, from scratch (`/brands/co2t/co2t-mascot-welcome.png`)
- E-commerce and product sales software built from ground up — industry-leading, bulletproof
- Biochar and carbon capture product sales integrated into environmental impact tracking
- Systems used for carbon credit issuance and field-to-customer traceability

**Map vs through-line (2026-07-15):** Work map shows **relationship graph** from `relationships.ts` (companies, roles, clients, projects). Career through-line thesis and `storyStops` remain in `through-line.ts` for timeline/intro — **not** map layout or "Tell me a story" mode.

### Prompt 9: Through-line thesis wording
**Current value:** `Every role taught me how people learn, play, and adopt systems — from classroom support and game loops to marketing funnels and production pipelines. The medium changed; the work didn't: make complex things usable and worth people's time.`  
**Question:** Keep, edit, or replace this thesis? Any phrases to avoid for hiring contexts?  
**Why it matters:** Living work map header, guided story mode.  
**Answer:** **Replace** — derive from confirmed bio summary. New thesis in `through-line.ts`: UX/human-centered design anchor; public education and inclusive learning; environmental technology; marketing/product at major brands (adidas, Google); close with applying skills thoughtfully to help people thrive. Map theme labels and story stop headlines updated to match (`relationships.ts`, `through-line.ts`).

### Prompt 10: GitHub personal + org links
**Current value:** Personal `https://github.com/twobitEDD`; orgs `twobitENT`, `co2trust-org`. ERGO.games has no dedicated repo link in profile.  
**Question:** Confirm all public GitHub URLs. Add ERGO or other org repos?  
**Why it matters:** Profile links, project case studies, map project nodes.  
**Answer:** **Confirmed** — keep `twobitEDD` (personal), `twobitENT`, and `co2trust-org`. **No ERGO repo yet** — ERGO.games project links to `twobitENT` until a dedicated org/repo exists.

### Prompt 11: LinkedIn URL
**Current value:** `https://linkedin.com/in/eddnorris`  
**Question:** Confirm this is the canonical LinkedIn profile URL.  
**Why it matters:** Contact, structured data, recruiter path.  
**Answer:** **Confirmed** — `https://linkedin.com/in/eddnorris` is canonical (`profile.ts`, `experiences.ts` source note).

### Prompt 12: Project slugs and featured set
**Current value:** Featured: `ergo-games`, `co2t-platform`, `carbon-tracking`, `2bit-entertainment`. Non-featured: `web-platforms`, `brand-systems`.  
**Question:** Which projects should be **featured** on the bento grid? Correct public slugs and URLs?  
**Why it matters:** Home project cards, `/projects/[slug]`, résumé project picker.  
**Answer:** **Keep featured set:** `ergo-games`, `co2t-platform`, `carbon-tracking`, `2bit-entertainment`. Non-featured: `web-platforms`, `brand-systems`. Slugs unchanged in `projects.ts`.

### Prompt 13: Education entries
**Current value:** No formal degree entries in `experiences.ts`. Community roles: PPS paraprofessional, Innovation Academy mentor. LinkedIn also lists iD Tech Camps instructor (2015).  
**Question:** List any degrees, bootcamps, or certs to add. Include iD Tech and PPS/Innovation Academy as “education” on résumé?  
**Why it matters:** Résumé `includeEducation`, map `theme-education`, story stop `theme-education`.  
**Answer:**  
- **PPS** — Special Education Educator (`exp-pps`) — include on résumé education section  
- **Innovation Academy PDX** — afterschool club mentored (`exp-innovation-academy`) — include on résumé education section  
- **iD Tech Camps** — summer jobs, volunteer work, and instructor role (`exp-id-tech`) — include on résumé education section  
- **Full Sail University** — Bachelor's Degree — Software (`education.ts` → `edu-full-sail`) — formal degree entry added  
- Résumé `includeEducation` defaults **on**; map `theme-education` copy updated to reflect degree + teaching path

### Prompt 14: Availability / hiring message
**Current value:** `Open to collaboration — software leadership, environmental technology, and creative technology roles.`  
**Question:** What roles, engagement types (FTE, contract, fractional), and geography are you open to?  
**Why it matters:** Profile availability, practice CTAs, contact section.  
**Answer:** **Seeking Opportunities — Software Leadership, Sustainable Environment Technologies, Creative Technology Solutions**

---

## Confirmed profile summary (2026-07-14)

**Status:** `confirmed`

> Human-centered software across environment, brands, and education — building technology that puts people first.

**Proof strip (hero):** Adidas · Google · CO2T

**Notes:** Google, Dell, and Washington University appear as public contract clients via 2bit graph nodes (`client-google`, `client-dell`, `client-wash-u`) — no standalone `experiences.ts` employment entries. PPS public education support aligns with `exp-pps` (Apr 2014 – Feb 2017). Long-form bio retired from hero; résumé builder may extend `profile.summary` per preset.

---

### Prompt 15: Practice descriptions (environmental vs creative)
**Current value:** Environmental: carbon, agriculture, ops. Creative: games, interactive, brand systems. Two sources (`resume-presets.ts` practices vs `career-data.json` practices) differ slightly.  
**Question:** Canonical copy for each practice title, summary, tags, and CTA destination?  
**Why it matters:** Work page, intro paper practice links, hero badges.  
**Answer:** **Keep `resume-presets.ts` as canonical.** Environmental practice: title "Environmental Systems & Technology", summary on CO2T.earth biochar/soil/carbon/field ops, **tagline "Built from Nature. Backed by Science."**, tags Biochar · Soil Stewardship · Carbon · CO2T.earth, CTA `/work#environmental`. Creative practice: title "Games, Interactive Media & Product Storytelling", summary on game platforms/web/identity/marketing tools, CTA `/work#creative`. Sync `career-data.json` practices to match.

### Prompt 16: Map theme node labels
**Current value:** Themes: Education & Learning, Games & Interactive, Software Engineering, Marketing & Growth, Product Leadership, Production & Operations.  
**Question:** Are these six theme labels how you want recruiters to scan your arc? Rename or merge any?  
**Why it matters:** Living work map filters, story path, graph hub nodes.  
**Answer:** **Keep all six theme hubs** as currently labeled in `relationships.ts` / `through-line.ts`: Education & Inclusive Learning, Games & Human-Centered UX, UX & Human-Centered Design, Marketing & Product at Major Brands, Product Leadership, Production & Environmental Ops. No merges or renames.

### Prompt 17: Résumé default preset
**Current value:** `resume-presets.ts` default: **Sustainability Technology** (1 page). `career-data.json` lists **executive** first.  
**Question:** Which preset should load by default in the résumé builder?  
**Why it matters:** Bento résumé preview, `/resume` page, PDF export.  
**Answer:** **Software Product Leadership** (`softwareProductLeadership`) — default in résumé builder via `DEFAULT_RESUME_PRESET_ID` in `resume-presets.ts`.

### Prompt 18: Polaroid / timeline images per era
**Current value:** Placeholder mood images at `/career/era-*.jpg` (see `career-images.ts`).  
**Question:** For each era — games, 2bit, software, environment, ERGO — what **real photo** should represent it (personal photo, screenshot, logo, or keep mood art)?  
**Why it matters:** Timeline polaroids, future experience cards.  
**Answer:** **Environment era (`era-environment`):** CO2T mascot (`/brands/co2t/co2t-mascot-welcome.png`) — **confirmed**, wired in `career-images.ts`. **Games, 2bit, software, ERGO eras:** keep current mood art placeholders at `/career/era-*.jpg` until user provides real photos.

### Prompt 19: Graph nodes to remove or add
**Current value:** Graph includes `outcome-traceability`, `practice-data`, `project-web`; missing Black Lantern, Nice Touch, Fresh, TrustlessTeam, ERGnomes, iD Tech. No fake BBC/Sky nodes.  
**Question:** Which nodes should be **removed** (too abstract or inaccurate)? Which **missing employers** should become map nodes?  
**Why it matters:** Map density, story path length, accuracy.  
**Answer:**  
- **ADD:** `client-google` (via Uncorked — not direct employment), `client-dell` (via Nice Touch), `client-wash-u` (via Nice Touch), `project-planets-core` (2bit indie game 2012–2014)  
- **REMOVE:** abstract nodes `outcome-traceability`, `practice-data` — trim abstract layer; carbon traceability stays on `project-carbon`  
- **KEEP:** overall map density; agency edges use `connectionNote` labels ("via Uncorked", "via Nice Touch")  
- **NO ADD:** Black Lantern separate node (games era accurate without it); iD Tech, Nice Touch, Fresh, TrustlessTeam, ERGnomes already present

### Prompt 20: Custom domain / site URL plans
**Current value:** Deploy targets `twobitEDD.github.io/ed-norris-portfolio`; no custom domain in data.  
**Question:** Planned production URL (e.g. `ednorris.com`, `ergo.games`, other)? Should profile links and canonical meta use it?  
**Why it matters:** OG tags, sitemap, email/domain consistency, project links.  
**Answer:** **Stay on Vercel deployment URL for now** — no custom domain in site metadata yet. Profile links and canonical meta remain deployment-relative until a production domain is confirmed.

---

## Image inventory

| Era ID | Path | Status |
|--------|------|--------|
| `era-games` | `/career/era-games.jpg` | placeholder (Unsplash arcade) |
| `era-2bit` | `/career/era-2bit.jpg` | placeholder (generated mood) |
| `era-software` | `/career/era-software.jpg` | placeholder (generated mood) |
| `era-environment` | `/brands/co2t/co2t-mascot-welcome.png` | **confirmed** (CO2T mascot) |
| `era-advisory` | `/career/era-ergo.jpg` | placeholder (Unsplash night city) — advisory era; ERGO.games lives in projects/expertise slideshow, not timeline row |

Mapping code: `career-images.ts`

---

## Next steps after answers

1. Apply confirmed values to `experiences.ts`, `profile.ts`, `timeline-eras.ts`, `relationships.ts`, `projects.ts`.
2. Regenerate or sync `packages/career-data/src/career-data.json` from point of truth.
3. Replace placeholder `/career/*.jpg` with confirmed photos.
4. Mark each field `confirmed` in this doc.
