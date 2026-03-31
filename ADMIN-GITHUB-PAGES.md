# Admin on GitHub Pages (Decap CMS + DecapBridge)

Use this if your site is hosted on GitHub Pages and you still want `/admin/`.

## 1) Publish site on GitHub Pages

1. Repo -> `Settings` -> `Pages`.
2. Source: `Deploy from a branch`.
3. Branch: `main`, folder: `/ (root)`.
4. Site URL should become:
   - `https://mendozaliner.github.io/MarcusFisico/`
5. Admin URL:
   - `https://mendozaliner.github.io/MarcusFisico/admin/`

## 2) DecapBridge setup

1. Create account at <https://decapbridge.com/>.
2. Add site and connect repo `Mendozaliner/MarcusFisico`.
3. In DecapBridge setup:
   - **Auth type:** select the DecapBridge recommended OAuth option for GitHub.
   - **Decap CMS login URL:** `https://mendozaliner.github.io/MarcusFisico/admin/`
4. DecapBridge gives backend values for `admin/config.yml`.
5. Paste those values in `backend.base_url` and `backend.auth_endpoint`.

## 3) Access token (if DecapBridge asks for one)

Create a GitHub Personal Access Token from your GitHub account.

- Token type: fine-grained (recommended)
- Repository access: only `Mendozaliner/MarcusFisico`
- Permissions:
  - Contents: Read and write
  - Metadata: Read
  - Pull requests: Read and write (optional, useful for editorial workflow)

If DecapBridge asks for classic PAT, use `repo` scope.

## 4) Verify

1. Open `https://mendozaliner.github.io/MarcusFisico/admin/`
2. Click login.
3. Create a small test edit and publish.
4. Confirm commit appears in GitHub and site updates.

## 5) Netlify

Once GitHub Pages + admin are working, you can delete the old Netlify site.

Netlify dashboard -> Site settings -> Danger zone -> Delete this site.
