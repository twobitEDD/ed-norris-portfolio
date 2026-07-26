# twobitent-site

**Standalone** marketing site for [2bit Entertainment (2bitENT)](https://2bitent.com).

## Repository

| | |
|---|---|
| **Site code (branch)** | [`2bitent-site` branch](https://github.com/twobitEDD/ed-norris-portfolio/tree/2bitent-site) |
| **Target repo** | https://github.com/twobitENT/twobitent-site |

> `main` on this repo is the **2bitDEV portfolio** — all ENT work is on branch `2bitent-site`.

### Get code into `twobitENT/twobitent-site`

The Cursor bot **cannot** create org repos. Pick one path:

| Path | Secrets? | Steps |
|------|----------|-------|
| **A. Bundle export** | None | Actions → **Export twobitent-site bundle** → download artifact → [create empty repo](https://github.com/organizations/twobitENT/repositories/new?name=twobitent-site) → run `./scripts/bootstrap-twobitent-repo.sh ./twobitent-site.bundle` |
| **B. GH_PAT auto-publish** | `GH_PAT` | Add [classic token](https://github.com/settings/tokens) (`repo` + twobitENT org) to [repo secrets](https://github.com/twobitEDD/ed-norris-portfolio/settings/secrets/actions) → Actions → **Publish twobitent-site repository** |
| **C. Personal account transfer** | None | Create `twobitEDD/twobitent-site` on your user → push branch → **Settings → Transfer ownership → twobitENT** |
| **D. One-liner clone** | None | After empty repo exists: `git clone -b 2bitent-site --single-branch https://github.com/twobitEDD/ed-norris-portfolio.git . && git remote set-url origin https://github.com/twobitENT/twobitent-site.git && git push -u origin HEAD:main` |

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
