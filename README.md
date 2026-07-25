# twobitent-site

**Standalone** marketing site for [2bit Entertainment (2bitENT)](https://2bitent.com).

## Repository

| | |
|---|---|
| **Canonical repo** | https://github.com/twobitENT/twobitent-site |
| **Staging branch** (until published) | [`ed-norris-portfolio` → `2bitent-site`](https://github.com/twobitEDD/ed-norris-portfolio/tree/2bitent-site) |

Standalone site code — **not** part of [2bitDEV portfolio](https://github.com/twobitEDD/ed-norris-portfolio) `main`.

### Publish to `twobitENT/twobitent-site`

1. [Create empty repo `twobitent-site`](https://github.com/organizations/twobitENT/repositories/new?name=twobitent-site&description=2bitENT.com+agency+site) in the **twobitENT** org (no README)
2. Add **`GH_PAT`** (classic token, `repo` scope, twobitENT org access) at [repo secrets](https://github.com/twobitEDD/ed-norris-portfolio/settings/secrets/actions)
3. Run **Actions → Publish twobitent-site repository** — or locally: `./scripts/publish-to-twobitent-site.sh`

## Design

AI-augmented production studio — charcoal desk aesthetic with device frames, paper surfaces, and polaroid work:

- *More effective hours. Same team.*
- Before/after workflow story, service springboard, shipped work polaroids

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Framer Motion

## Local development

```bash
npm install
npm run dev
```

## Deploy

Railway → **2bitent.com**. Point **2bitent-com** at `twobitENT/twobitent-site` → `main` → `Dockerfile`. See [DEPLOY.md](./DEPLOY.md).

## Related

| Repo | Site |
|------|------|
| `twobitEDD/ed-norris-portfolio` | [2bitdev.com](https://2bitdev.com) |
| `twobitENT/twobitent-site` | [2bitent.com](https://2bitent.com) |
