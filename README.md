# Marcus Fisico — personal site

Static HTML/CSS site with wine **rankings** and winery **reviews** driven by JSON in `content/`. Marcus can update lists via **[Decap CMS](https://decapcms.org/)** at `/admin/` when the site is hosted on **Netlify** (see [DEPLOY.md](DEPLOY.md)).

## Repo

Intended GitHub repository name: **`MarcusFisico`**.

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
