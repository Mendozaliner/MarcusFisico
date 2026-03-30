# Deploy Marcus Fisico site (GitHub + Netlify + admin for Marcus)

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

## 2. Netlify (free URL + CMS backend)

Decap CMS needs **Netlify Identity** and **Git Gateway** so Marcus can log in and save changes to GitHub without using Git.

1. Log in at [https://app.netlify.com](https://app.netlify.com).
2. **Add new site → Import an existing project → GitHub**, pick **`MarcusFisico`**.
3. Build settings: leave **build command** empty; **publish directory** is **`.`** (root). Netlify reads [netlify.toml](netlify.toml).
4. Deploy. Note your site URL, e.g. `https://marcus-fisico.netlify.app`.

### Set the admin URL in Decap config

1. In this repo, edit **[admin/config.yml](admin/config.yml)**.
2. Set **`site_url`** and **`display_url`** to your real Netlify URL (same as the site).
3. Commit and push; Netlify will redeploy.

### Enable Identity and Git Gateway

1. Netlify: **Site configuration → Identity → Enable Identity**.
2. **Identity → Registration preferences**: set to **Invite only** (recommended).
3. **Identity → Services → Git Gateway → Enable Git Gateway**.
4. **OAuth** is not required for the default email/password Identity flow with Git Gateway.

### Invite Marcus

1. **Identity → Invite users**, enter his email.
2. He accepts the invite and sets a password.
3. He opens **`https://YOUR-SITE.netlify.app/admin/`**, logs in with Netlify Identity, then edits **Wine rankings** or **Winery reviews** and clicks **Publish**.  
   After ~30–60 seconds the live Rankings and Reviews pages update.

## 3. GitHub Pages (optional, second free URL)

If you also want `https://USERNAME.github.io/MarcusFisico/`:

1. Repo **Settings → Pages**: Source **Deploy from branch**, branch **`main`**, folder **`/` (root)**.
2. **Important:** Decap CMS **admin will not work** on GitHub Pages alone (no Git Gateway). Use **Netlify** for Marcus’s **`/admin/`** workflow. Public visitors can use either URL if you deploy both.

## 4. Free domain note

A **`.com`** name (e.g. `marcusfisco.com`) is **not** free; expect roughly **$10–15/year** from a registrar, then attach it in Netlify under **Domain management**.

## 5. Local preview

Open `index.html` or run a static server so JSON loads (browsers block `file://` fetches on some setups):

```bash
npx --yes serve .
```

Then visit `http://localhost:3000/rankings.html` and `http://localhost:3000/reviews.html`.  
The admin UI only works when the site is served from your **Netlify URL** with Identity enabled.
