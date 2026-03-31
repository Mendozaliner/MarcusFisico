# Marcus Fisico — personal site

Static HTML/CSS site with wine **rankings** and winery **reviews** driven by JSON in `content/`. Marcus can update lists via **[Decap CMS](https://decapcms.org/)** at `/admin/` on GitHub Pages using external OAuth auth (see [ADMIN-GITHUB-PAGES.md](ADMIN-GITHUB-PAGES.md)).

## Repo

Intended GitHub repository name: **`MarcusFisico`**.

### Push to your GitHub (one-time)

1. Install GitHub CLI if needed: `winget install GitHub.cli`
2. Log in: `gh auth login`
3. From this folder, run: `powershell -ExecutionPolicy Bypass -File scripts/push-to-github.ps1`

That creates **`MarcusFisico`** on your account and pushes **`main`**. Then enable GitHub Pages in repo settings.

## Local preview

```bash
npx --yes serve .
```

## Content

| File | Purpose |
|------|---------|
| `content/rankings.json` | Table rows (wine, notes, pairings, score); page sorts by score |
| `content/reviews.json` | Review cards (title, meta, body, optional slug) |

Do not edit JSON by hand if using the admin UI—use **Publish** in Decap to avoid merge conflicts.
