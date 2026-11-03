# Deploy — 2bitent.com

Standalone **2bitENT** agency site. **Hosted on serv0** (self-hosted, behind Cloudflare) since 2026-11-03. Railway is retired for this site: do not run `railway up` and do not add Railway config back.

## Source

| Field | Value |
|-------|-------|
| GitHub | `twobitEDD/ed-norris-portfolio` |
| Branch | **`2bitent-site`** (standalone site at repo root, not `main`) |
| Portfolio (`main`) | Deploys 2bitdev.com separately, also on serv0 |

## How a change goes live

1. Push (or merge) to branch **`2bitent-site`**.
2. serv0 checks the branch at **:15 and :45 UTC** (07:15 / 07:45 … PST) and rebuilds only when it moved.
3. Check https://2bitent.com.

No GitHub secret or Actions workflow is involved.

## serv0 details

| Field | Value |
|-------|-------|
| Compose project | `/srv/ergo/apps/owner-sites` (service `twobitent-site`, loopback `127.0.0.1:17003`) |
| Build | this repo's `Dockerfile` (Next.js, port 3000) |
| Routing | Cloudflare (proxied A → serv0) → Caddy `2bitent.com` → `twobitent-site:3000` |
| Env | `NEXT_PUBLIC_SITE_URL` is optional (defaults to `https://2bitent.com`); env file lives only on the box |
| Auto-deploy log | `/srv/ergo/apps/owner-sites/logs/auto-deploy.log` |
| Deploy right now | on serv0: `cd /srv/ergo/apps/owner-sites && ./deploy.sh twobitent-site` |

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000
