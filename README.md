# Edd Norris Portfolio

A deployable personal portfolio hub powered by structured career data.

## Quick start

This monorepo uses **npm workspaces** (`package-lock.json` at the repo root). Use npm only — do not run `yarn install` or `pnpm install` here.

```bash
npm install
npm run dev:clean
```

`dev:clean` removes a stale `apps/personal/.next` folder before starting Next.js (fixes corrupted cache / manifest errors after switching package managers).

Open [http://localhost:3000](http://localhost:3000).

Alternatively: `./scripts/dev.sh`

## Structure

- `apps/personal` — Next.js personal hub (deploy this)
- `packages/career-data` — shared career records used by the site and résumé engine
- `prototype/` — original static HTML concept
- `schema/` — JSON schema for career data validation

## Deploy (go live in ~5 minutes)

**Recommendation: use Vercel.** This app is Next.js 15 with a server API route (`/api/resume/pdf` for résumé PDF export). Vercel’s free Hobby tier supports API routes, SSR, and monorepos with no code changes.

### Path A — Vercel (recommended)

1. **Create the GitHub repo** (not created yet as of setup):

   ```bash
   git add .
   git commit -m "Add portfolio site and deploy config"
   gh repo create ed-norris-portfolio --public --source=. --remote=origin --push
   ```

   Or push to an existing remote:

   ```bash
   git remote add origin https://github.com/twobitEDD/ed-norris-portfolio.git
   git push -u origin main
   ```

2. **Import in Vercel:** [vercel.com/new](https://vercel.com/new) → import `twobitEDD/ed-norris-portfolio`.
3. **Project settings:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `apps/personal` (click Edit)
   - **Build Command:** `npm run build` (default)
   - **Install Command:** `cd ../.. && npm install` (set in `apps/personal/vercel.json`)
4. **Deploy.** Vercel auto-deploys on every push to `main`.

Custom domain: Project → Settings → Domains.

### Path B — GitHub Pages (static fallback)

GitHub Pages serves **static files only**. The résumé **PDF download will not work** on Pages because `/api/resume/pdf` is removed during the static build. Everything else (pages, navigation, project case studies) works.

1. Push to GitHub (same as step 1 above).
2. Repo **Settings → Pages → Build and deployment → Source:** select **GitHub Actions**.
3. Push to `main` — `.github/workflows/deploy-pages.yml` builds with `STATIC_EXPORT=true` and deploys `apps/personal/out`.
4. Site URL: `https://twobitEDD.github.io/ed-norris-portfolio/`

To use a user site (`https://twobitEDD.github.io/`) instead, rename the repo to `twobitEDD.github.io` and remove `BASE_PATH` from the workflow and `next.config.ts` env.

### Other free options

| Host | Notes |
|------|--------|
| [Netlify](https://www.netlify.com/) | Connect GitHub, root `apps/personal`, supports Next.js runtime (API routes work). |
| [Cloudflare Pages](https://pages.cloudflare.com/) | Connect GitHub; use `@cloudflare/next-on-pages` adapter for full Next.js features. |

### Local production check

```bash
npm install
npm run build    # standard Next.js build (Vercel)
npm run start --workspace=@ed-norris/personal
```

## Customize before job search

1. Update contact links in `packages/career-data/src/career-data.json`.
2. Add verified roles, projects, and outcomes to the same file.
3. Replace placeholder portrait art in `HeroSection` when you have a photo.
4. Point practice CTAs to future environmental/creative sub-sites.

## Scripts

- `npm run dev` — local development
- `npm run dev:clean` — delete `.next` then start dev (recommended after cache issues)
- `npm run build` — production build
