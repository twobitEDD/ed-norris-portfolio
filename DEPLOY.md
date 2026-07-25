# Deploy — 2bitent.com

Standalone **2bitENT** agency site.

## Repository

| Field | Value |
|-------|-------|
| GitHub | `twobitEDD/ed-norris-portfolio` |
| Branch | **`2bitent-site`** (standalone site at repo root — not `main`) |
| Portfolio (`main`) | **Untouched** — still deploys 2bitdev.com only |

> **Goal:** Canonical home is `twobitENT/twobitent-site`. Until published, branch `2bitent-site` here is the source of truth.

## Railway service

| Field | Value |
|-------|-------|
| Project | [twobitENT](https://railway.com/project/3b864b9d-7403-40f2-9a9a-863f393d9e70) |
| Service | **2bitent-com** |
| Service ID | `9803a8a5-536f-44ab-aef6-21651ed48de9` |
| [Settings](https://railway.com/project/3b864b9d-7403-40f2-9a9a-863f393d9e70/service/9803a8a5-536f-44ab-aef6-21651ed48de9/settings) | |
| Domain | **2bitent.com** |

### Railway setup (one-time) — pick ONE path

#### Path A — GitHub Actions deploy (fastest if you have a Railway token)

1. Create token: https://railway.com/account/tokens
2. Add repo secret **`RAILWAY_TOKEN`** at https://github.com/twobitEDD/ed-norris-portfolio/settings/secrets/actions
3. Re-run workflow: **Actions → Deploy 2bitENT site → Run workflow** (branch `2bitent-site`)

This deploys to **2bitent-com** without changing the portfolio service.

#### Path B — Railway GitHub integration (recommended once repo exists)

On [2bitent-com settings](https://railway.com/project/3b864b9d-7403-40f2-9a9a-863f393d9e70/service/9803a8a5-536f-44ab-aef6-21651ed48de9/settings):

1. **Source** → `twobitENT/twobitent-site` (or interim: `twobitEDD/ed-norris-portfolio` branch `2bitent-site`)
2. **Branch** → `main` (or `2bitent-site` for interim)
3. **Builder** → Dockerfile
4. **Variables** → `NEXT_PUBLIC_SITE_URL=https://2bitent.com`
5. **Redeploy**

**Do not change** **2bitdev-portfolio** — it stays on `main`.

### Previous source (replace)

Railway was pointed at `twobitEDD/2bitdev-site` (old Chakra/voxel site). Switch to branch `2bitent-site` on this repo instead.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000
