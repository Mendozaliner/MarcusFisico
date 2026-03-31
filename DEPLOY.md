# Deploy Marcus Fisico site (GitHub Pages + Decap admin)

## 1. GitHub repository `MarcusFisico`

1. Create a **new public repository** on GitHub named **`MarcusFisico`** (no README if you already have files locally).
2. In this project folder, run:

```bash
git init
git add .
git commit -m "Initial site: static pages, JSON content, Decap admin"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/MarcusFisico.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## 2. GitHub Pages (free URL)

1. Repo **Settings → Pages**.
2. Source **Deploy from branch**, branch **`main`**, folder **`/` (root)**.
3. Site URL will be:
   - `https://mendozaliner.github.io/MarcusFisico/`

## 3. Admin on GitHub Pages

Decap CMS needs an OAuth provider when not using Netlify auth.  
Use **DecapBridge** (recommended free option) and follow:

- [ADMIN-GITHUB-PAGES.md](ADMIN-GITHUB-PAGES.md)

## 4. Free domain note

A **`.com`** name is **not** free; expect roughly **$10–15/year** from a registrar.

## 5. Local preview

Open `index.html` or run a static server so JSON loads (browsers block `file://` fetches on some setups):

```bash
npx --yes serve .
```

Then visit `http://localhost:3000/rankings.html` and `http://localhost:3000/reviews.html`.
