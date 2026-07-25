# Deploy — 2bitENT.com

Agency site (`apps/ent`) for **2bit Entertainment / 2bitENT**.

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
