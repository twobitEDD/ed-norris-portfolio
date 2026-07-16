# Deploy — Edd Norris portfolio (2bitDEV.com)

Personal portfolio (`apps/personal`) for **Edd Norris / 2bitDEV**.

## Standard workflow (required)

**Always deploy via GitHub → Railway.** Do **not** use `railway up` CLI uploads.

1. Push to `main` on `twobitEDD/ed-norris-portfolio`
2. Railway auto-builds and deploys **2bitdev-portfolio** (GitHub-connected)
3. Verify at https://2bitdev-portfolio-production.up.railway.app (or custom domain when attached)

This lets any machine or agent contribute by pushing git commits — no local Railway CLI deploy needed.

## Railway service (canonical)

| Field | Value |
|-------|-------|
| Project | [twobitENT](https://railway.com/project/3b864b9d-7403-40f2-9a9a-863f393d9e70) |
| Service | **2bitdev-portfolio** |
| Service ID | `4abc3283-3867-4802-b9d4-7baebd1e78f8` |
| GitHub | `twobitEDD/ed-norris-portfolio` → branch `main` (only this service) |
| Build | Repo `railway.toml` / Dockerfile (see service settings) |
| Railway URL | https://2bitdev-portfolio-production.up.railway.app |
| Custom domain | **2bitdev.com** — attach in dashboard to **2bitdev-portfolio** only (see DNS below) |

### Local CLI link (optional)

```bash
railway link -w "CO2T Team" -p 3b864b9d-7403-40f2-9a9a-863f393d9e70 -e production -s 2bitdev-portfolio
```

### Do not use

- **2bitent-site** (`8334c011-9071-46ca-bb97-7929d618d176`) — legacy entertainment service; do not CLI-deploy or reconfigure
- **edd-norris-portfolio** (`7d600c0a-942c-4e56-b964-7c32eabe6b35`) — duplicate; GitHub source disconnected; stale `railway up` deploy only. Remove in dashboard when convenient. Do not reconnect GitHub here.

## Duplicate deploy status (2026-07-15)

| Service | Online | GitHub `main` | Serves portfolio |
|---------|--------|---------------|------------------|
| **2bitdev-portfolio** | Yes | **Connected** | 200 — title `Edd Norris — Technical Designer` |
| **edd-norris-portfolio** | Yes | **Disconnected** | 200 — same site (last CLI deploy); no auto-deploy on push |

Only **2bitdev-portfolio** should receive GitHub pushes. Repo-level GitHub webhooks are managed by the Railway GitHub App (not visible via `gh api hooks`).

## Environment variables

Set in Railway → **2bitdev-portfolio** → Variables.

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL, e.g. `https://2bitdev.com` |
| `RESEND_API_KEY` | For contact/schedule email | Resend API key |
| `RESEND_FROM_EMAIL` | Optional | Sender address (default: Resend onboarding) |
| `SCHEDULE_NOTIFY_EMAIL` | Optional | Booking notification inbox |
| `CONTACT_NOTIFY_EMAIL` | Optional | Contact form notification inbox |
| `SCHEDULE_ADMIN_SECRET` | For `/schedule/admin` | Admin token for schedule management |
| `UPSTASH_REDIS_REST_URL` | For schedule persistence | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | For schedule persistence | Upstash Redis REST token |
| `NEXT_PUBLIC_SCHEDULING_URL` | Optional | External scheduling link override |

`PORT` is set automatically by Railway.

## Custom domain — 2bitdev.com

**User action in Railway dashboard + Cloudflare** (do not attach via CLI):

1. **Railway** → **2bitdev-portfolio** → **Settings → Networking → Custom Domain**
   - Add `2bitdev.com` and `www.2bitdev.com`
   - Copy the CNAME target Railway provides (e.g. `2bitdev-portfolio-production.up.railway.app`)

2. **Remove** `2bitdev.com` from legacy **2bitent-site** (only after new domain verifies on **2bitdev-portfolio**)

3. **Cloudflare DNS** (2bitdev.com zone):

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| CNAME | `www` | `2bitdev-portfolio-production.up.railway.app` | DNS only (grey cloud) initially, then proxied after SSL works |
| CNAME or ALIAS | `@` | Railway apex target from wizard | Per registrar |

4. **Cloudflare SSL/TLS** → set mode to **Full** (not Flexible) so HTTPS terminates correctly between Cloudflare and Railway.

5. Wait for Railway domain verification (green check), then test `https://2bitdev.com`.

## Local development

```bash
npm install
npm run dev:clean
```

## Connect GitHub (one-time / new service)

If setting up a fresh service:

```bash
railway link -w "CO2T Team" -p 3b864b9d-7403-40f2-9a9a-863f393d9e70 -e production -s 2bitdev-portfolio
railway service source connect --repo twobitEDD/ed-norris-portfolio --branch main --service 2bitdev-portfolio
```

Do **not** run `railway up` for production deploys.
