# Deploy — Edd Norris portfolio (2bitDEV.com)

Personal portfolio (`apps/personal`) for **Edd Norris / 2bitDEV**.

## Standard workflow (required)

**Always deploy via GitHub → Railway.** Do **not** use `railway up` CLI uploads.

1. Push to `main` on `twobitEDD/ed-norris-portfolio`
2. Railway auto-builds and deploys from the connected service
3. Verify at the Railway URL or custom domain

This lets any machine or agent contribute by pushing git commits — no local Railway CLI deploy needed.

## Railway service

| Field | Value |
|-------|-------|
| Project | [twobitENT](https://railway.com/project/3b864b9d-7403-40f2-9a9a-863f393d9e70) |
| Service | **2bitdev-portfolio** |
| Service ID | `4abc3283-3867-4802-b9d4-7baebd1e78f8` |
| GitHub | `twobitEDD/ed-norris-portfolio` → branch `main` |
| Build | Dockerfile at repo root (`railway.toml`) |
| Start | `npm run start` (delegates to `@ed-norris/personal`) |
| Railway URL | https://2bitdev-portfolio-production.up.railway.app |
| Custom domain | **2bitdev.com** (see DNS below) |

### Do not use

- **2bitent-site** (`8334c011-9071-46ca-bb97-7929d618d176`) — legacy service; do not CLI-deploy or reconfigure
- **edd-norris-portfolio** — duplicate empty service; canonical deploy is **2bitdev-portfolio**

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

1. In Railway → **2bitdev-portfolio** → **Settings → Networking → Custom Domain**, add `2bitdev.com` (and `www.2bitdev.com` if desired).
2. At your DNS provider, point to Railway:

| Type | Name | Value |
|------|------|-------|
| CNAME | `www` | `2bitdev-portfolio-production.up.railway.app` |

For apex/root (`@`), use Railway's wizard — many registrars need **ALIAS/ANAME** instead of CNAME.

3. **Migration note:** `2bitdev.com` may still be attached to the legacy **2bitent-site** service. Remove it from that service only after the new domain is verified on **2bitdev-portfolio** (user confirmation recommended).

## Local development

```bash
npm install
npm run dev:clean
```

## Connect GitHub (one-time / new service)

If setting up a fresh service:

```bash
railway link -p 3b864b9d-7403-40f2-9a9a-863f393d9e70 -e production -s 2bitdev-portfolio
railway service source connect --repo twobitEDD/ed-norris-portfolio --branch main --service 2bitdev-portfolio
```

Do **not** run `railway up` for production deploys.
