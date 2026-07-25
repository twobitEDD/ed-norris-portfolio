# 2bitent-site

**Standalone** marketing site for [2bit Entertainment (2bitENT)](https://2bitent.com).

## Repository

| | |
|---|---|
| **Source of truth (live now)** | [`ed-norris-portfolio` → `2bitent-site` branch](https://github.com/twobitEDD/ed-norris-portfolio/tree/2bitent-site) |
| **Target repo** (publish pending) | https://github.com/twobitEDD/2bitent-site |
| **Release archive** | [v0.1.0-2bitent-site](https://github.com/twobitEDD/ed-norris-portfolio/releases/tag/v0.1.0-2bitent-site) (includes `2bitent-site-source.tar.gz`) |

Standalone site code — **not** part of [2bitDEV portfolio](https://github.com/twobitEDD/ed-norris-portfolio) `main`.

### Publish to `twobitEDD/2bitent-site`

The Cursor/GitHub integration cannot create new repos in the `twobitEDD` account. One-time setup:

1. [Create empty repo `2bitent-site`](https://github.com/new?name=2bitent-site&description=2bitENT.com+agency+site)
2. Add **`GH_PAT`** (classic token, `repo` scope) at [repo secrets](https://github.com/twobitEDD/ed-norris-portfolio/settings/secrets/actions)
3. Run **Actions → Publish 2bitent-site repository** (or push to `2bitent-site` branch)

## Design

Inspired by the 2bitDEV personal portfolio aesthetic (iPad/iPhone device frames, cream paper surfaces, polaroid project photos) but built for **2bitENT agency** positioning:

- Charcoal production studio (not personal wood desk)
- *More effective hours. Same team.* — AI-augmented software & production
- Service springboard, before/after workflow story, shipped work polaroids

## Stack

- Next.js 15 (App Router)
- React 19 · TypeScript · Tailwind CSS · Framer Motion

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

| Target | URL |
|--------|-----|
| **Preview (GitHub Pages)** | https://twobitEDD.github.io/ed-norris-portfolio/2bitent/ |
| **Production** | [2bitent.com](https://2bitent.com) via Railway → see [DEPLOY.md](./DEPLOY.md) |

Railway → **2bitent.com**. See [DEPLOY.md](./DEPLOY.md).

## Related repos

| Repo | Site |
|------|------|
| `twobitEDD/ed-norris-portfolio` | [2bitdev.com](https://2bitdev.com) — personal portfolio |
| `twobitEDD/2bitent-site` | [2bitent.com](https://2bitent.com) — agency site (this repo) |
