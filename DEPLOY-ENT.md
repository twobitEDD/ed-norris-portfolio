# Deploy — 2bitENT.com

Agency site (`apps/ent`) for **2bit Entertainment / 2bitENT**.

## Why no builds after merge?

The overhaul **is on `main`** (merged via PR #6), but **2bitent.com still serves the old site** because the Railway **2bitent-site** service was never reconfigured to build from this monorepo.

| What happened | Status |
|---------------|--------|
| Code merged to `main` | ✅ Done |
| `apps/ent` builds locally (`npm run build:ent`) | ✅ Works |
| Railway **2bitent-site** connected to monorepo + `Dockerfile.ent` | ❌ **Not done** |
| GitHub Action `deploy-2bitent-railway.yml` has `RAILWAY_TOKEN` secret | ❌ **Likely missing** |

The **2bitdev-portfolio** service only watches `apps/personal/**` via root `railway.toml` — ENT changes do not trigger that service.

GitHub's **Deploy to GitHub Pages** workflow is unrelated (optional static fallback for 2bitDEV); it does not deploy 2bitent.com.

## One-time Railway setup (required)

In [Railway → twobitENT project → 2bitent-site](https://railway.com/project/3b864b9d-7403-40f2-9a9a-863f393d9e70):

1. **Settings → Source** → Connect `twobitEDD/ed-norris-portfolio` branch `main`
2. **Settings → Build** → Builder: **Dockerfile**
3. **Variables** (service-level):
   - `RAILWAY_DOCKERFILE_PATH` = `Dockerfile.ent`
   - `NEXT_PUBLIC_SITE_URL` = `https://2bitent.com`
4. **Settings → Deploy** → Watch paths (optional but recommended):
   - `apps/ent/**`
   - `Dockerfile.ent`
   - `package.json`
   - `package-lock.json`
5. Click **Deploy** / **Redeploy** to build from current `main`

## GitHub Actions deploy (optional backup)

Workflow: `.github/workflows/deploy-2bitent-railway.yml`

Add repo secret **`RAILWAY_TOKEN`** ([Railway account tokens](https://railway.com/account/tokens)).

On push to `main` touching `apps/ent/**`, the workflow runs `railway redeploy` on **2bitent-site**.

You can also trigger manually: **Actions → Deploy 2bitENT to Railway → Run workflow**.

## Standard workflow

**Deploy via GitHub → Railway.** Do not use `railway up` CLI uploads for production.

1. Push to `main` on `twobitEDD/ed-norris-portfolio`
2. Railway auto-builds and deploys **2bitent-site** (when GitHub-connected with `Dockerfile.ent`)
3. Verify at https://2bitent.com

## Railway service

| Field | Value |
|-------|-------|
| Project | [twobitENT](https://railway.com/project/3b864b9d-7403-40f2-9a9a-863f393d9e70) |
| Service | **2bitent-site** |
| Service ID | `8334c011-9071-46ca-bb97-7929d618d176` |
| Dockerfile | `Dockerfile.ent` (set in service settings) |
| Domain | **2bitent.com** |

### One-time Railway setup

In the **2bitent-site** service settings:

1. **Settings → Build → Dockerfile Path** → `Dockerfile.ent`
2. **Settings → Source** → connect `twobitEDD/ed-norris-portfolio` branch `main`
3. **Variables** → `NEXT_PUBLIC_SITE_URL=https://2bitent.com`

## Local development

```bash
npm install
npm run dev:ent
```

Runs at http://localhost:3001

## Build

```bash
npm run build:ent
npm run start:ent
```

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL `https://2bitent.com` |

`PORT` is set automatically by Railway.

## Monorepo notes

- **2bitdev-portfolio** uses `Dockerfile` + `railway.toml` → 2bitdev.com
- **2bitent-site** uses `Dockerfile.ent` + `railway.ent.toml` → 2bitent.com

Both apps live in this monorepo under `apps/personal` and `apps/ent`.
