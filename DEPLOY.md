# Deploy — 2bitent.com

Standalone **2bitENT** agency site.

## Repository

| Field | Value |
|-------|-------|
| GitHub | `twobitEDD/ed-norris-portfolio` |
| Branch | **`2bitent-site`** (standalone site at repo root — not `main`) |
| Portfolio (`main`) | **Untouched** — still deploys 2bitdev.com only |

> **Goal:** Move to dedicated `twobitEDD/2bitent-site` repo when created. Until then this branch is the ENT source of truth.

## Railway service

| Field | Value |
|-------|-------|
| Project | [twobitENT](https://railway.com/project/3b864b9d-7403-40f2-9a9a-863f393d9e70) |
| Service | **2bitent-com** |
| Service ID | `9803a8a5-536f-44ab-aef6-21651ed48de9` |
| [Settings](https://railway.com/project/3b864b9d-7403-40f2-9a9a-863f393d9e70/service/9803a8a5-536f-44ab-aef6-21651ed48de9/settings) | |
| Domain | **2bitent.com** |

### Railway setup (one-time)

On **2bitent-com** service settings:

1. **Source** → `twobitEDD/ed-norris-portfolio`
2. **Branch** → `2bitent-site` (not `main`)
3. **Builder** → Dockerfile (`Dockerfile` at branch root)
4. **Variables** → `NEXT_PUBLIC_SITE_URL=https://2bitent.com`
5. **Redeploy**

**Do not change** the **2bitdev-portfolio** service — it stays on `main` + `Dockerfile`.

### Previous source (replace)

Railway was pointed at `twobitEDD/2bitdev-site` (old Chakra/voxel site). Switch to branch `2bitent-site` on this repo instead.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000
