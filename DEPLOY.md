# Deployment — Edd Norris portfolio (2bitDEV.com)

## Rule: GitHub push only — never `railway up` on `2bitent-site`

| Item | Value |
|------|-------|
| **Project** | `twobitENT` (`3b864b9d-7403-40f2-9a9a-863f393d9e70`) |
| **Environment** | `production` (`2d1f98bb-ee10-449e-a8a9-81f940acbfd9`) |
| **Service** | `2bitdev-portfolio` (`4abc3283-3867-4802-b9d4-7baebd1e78f8`) |
| **GitHub** | `twobitEDD/ed-norris-portfolio` → branch `main` |
| **Railway URL** | https://2bitdev-portfolio-production.up.railway.app |
| **Custom domain** | `2bitdev.com` (attach in Railway dashboard → this service) |

### Forbidden service — do not deploy here

**`2bitent-site`** (`8334c011-9071-46ca-bb97-7929d618d176`) hosts the legacy **2bit Entertainment** site from `servprotocolorg/serv-website`. It is **not** the portfolio.

- **Never** run `railway up`, `railway link`, or CLI deploys targeting `2bitent-site`.
- **Never** link this repo locally to `2bitent-site` (`railway unlink` if accidentally linked).
- That service is managed by its own GitHub repo/branch only.

## Standard workflow

1. Edit code locally (monorepo root; app lives in `apps/personal`).
2. Commit and **push to `main`** on GitHub.
3. Railway auto-builds from the connected GitHub source (`railway.toml` + `Dockerfile`).
4. Verify: https://2bitdev-portfolio-production.up.railway.app

Do **not** use `railway up` for production deploys. CLI uploads bypass git history and make multi-machine/agent workflows unreliable.

## Build config

- `railway.toml` — Dockerfile builder, watch patterns for `apps/personal` and `packages/`
- `Dockerfile` — monorepo install + `npm run start` (workspace delegates to `@ed-norris/personal`)

## Environment variables (Railway dashboard)

Set on **`2bitdev-portfolio`** only:

| Variable | Required | Notes |
|----------|----------|-------|
| `RESEND_API_KEY` | For email | Booking notifications |
| `SCHEDULE_ADMIN_SECRET` | For admin | Protects `/schedule/admin` |
| `NEXT_PUBLIC_SITE_URL` | Recommended | e.g. `https://2bitdev.com` |
| `RESEND_FROM_EMAIL` | Optional | Verified Resend sender |
| `SCHEDULE_NOTIFY_EMAIL` | Optional | Defaults to EddNorris@2bitdev.com |
| `UPSTASH_REDIS_REST_URL` | Optional | Admin calendar / double-booking guard |
| `UPSTASH_REDIS_REST_TOKEN` | Optional | Pair with Upstash URL |

See `apps/personal/.env.example` for full list.

## Custom domain: 2bitdev.com

1. Railway → **twobitENT** → **2bitdev-portfolio** → **Settings** → **Networking** → **Custom Domain** → add `2bitdev.com` (and `www` if desired).
2. At your DNS provider, point `2bitdev.com` to Railway (CNAME to the value Railway shows, or A/ALIAS per their instructions).
3. Remove `2bitdev.com` from **`2bitent-site`** if it is still attached there.
4. Wait for certificate provisioning; verify https://2bitdev.com shows the portfolio title **Edd Norris — Technical Designer**.

## Local Railway CLI (optional)

For logs/variables only — not deploys:

```bash
railway link --project 3b864b9d-7403-40f2-9a9a-863f393d9e70 --environment production --service 2bitdev-portfolio
railway logs
railway variables
```

Unlink when done to avoid accidental `railway up`:

```bash
railway unlink -y
```
