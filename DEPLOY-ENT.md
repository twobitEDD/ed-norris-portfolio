# Deploy — 2bitENT.com

Agency site (`apps/ent`) for **2bit Entertainment / 2bitENT**.

## Railway service (canonical)

| Field | Value |
|-------|-------|
| Project | [twobitENT](https://railway.com/project/3b864b9d-7403-40f2-9a9a-863f393d9e70) |
| Service | **2bitent-site** |
| Service ID | `9803a8a5-536f-44ab-aef6-21651ed48de9` |
| Settings | [Service settings](https://railway.com/project/3b864b9d-7403-40f2-9a9a-863f393d9e70/service/9803a8a5-536f-44ab-aef6-21651ed48de9/settings) |
| Dockerfile | `Dockerfile.ent` |
| Domain | **2bitent.com** |

> Legacy service `8334c011-9071-46ca-bb97-7929d618d176` is deprecated — do not deploy there.

## Configure this service (one-time)

On the [service settings page](https://railway.com/project/3b864b9d-7403-40f2-9a9a-863f393d9e70/service/9803a8a5-536f-44ab-aef6-21651ed48de9/settings):

### Source
- **Repository:** `twobitEDD/ed-norris-portfolio`
- **Branch:** `main`
- **Root directory:** `/` (repo root — do not set to `apps/ent`)

### Build
- **Builder:** Dockerfile
- **Dockerfile path:** set via variable (below), not `Dockerfile`

### Variables (service-level)

| Variable | Value |
|----------|-------|
| `RAILWAY_DOCKERFILE_PATH` | `Dockerfile.ent` |
| `NEXT_PUBLIC_SITE_URL` | `https://2bitent.com` |

`PORT` is set automatically by Railway.

### Deploy / watch paths (recommended)

Only rebuild when ENT-related files change:

```
apps/ent/**
Dockerfile.ent
railway.ent.toml
package.json
package-lock.json
```

### Networking
- Attach custom domain **2bitent.com** (and `www` if desired)
- Remove domain from legacy service `8334c011` after new service verifies

### Trigger first build
After saving settings, click **Deploy** or **Redeploy** on the service.

## Standard workflow

**Deploy via GitHub → Railway.** Do not use `railway up` CLI uploads for production.

1. Push to `main` on `twobitEDD/ed-norris-portfolio`
2. Railway auto-builds **2bitent-site** (`9803a8a5…`) using `Dockerfile.ent`
3. Verify at https://2bitent.com

## GitHub Actions deploy (optional backup)

Workflow: `.github/workflows/deploy-2bitent-railway.yml`

Add repo secret **`RAILWAY_TOKEN`** ([Railway account tokens](https://railway.com/account/tokens)).

On push to `main` touching `apps/ent/**`, the workflow runs `railway redeploy` on service `9803a8a5-536f-44ab-aef6-21651ed48de9`.

Manual trigger: **Actions → Deploy 2bitENT to Railway → Run workflow**.

## Local development

```bash
npm install
npm run dev:ent    # http://localhost:3001
npm run build:ent
npm run start:ent
```

## Monorepo notes

- **2bitdev-portfolio** → `Dockerfile` + `railway.toml` → 2bitdev.com
- **2bitent-site** → `Dockerfile.ent` + `railway.ent.toml` → 2bitent.com

Both apps live under `apps/personal` and `apps/ent`.
