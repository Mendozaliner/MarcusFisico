# Fix the admin: log in with GitHub (no Netlify Identity)

If you see **“Unable to access identity settings”**, use this flow instead. It takes about **5 minutes, once**.

## 1. Create a GitHub OAuth app

1. Open **[GitHub → Settings → Developer settings → OAuth Apps](https://github.com/settings/developers)** (use the account that owns **Mendozaliner/MarcusFisico**).
2. Click **New OAuth App**.
3. Fill in:

   | Field | Value |
   |--------|--------|
   | **Application name** | `Marcus Fisico CMS` (any name is fine) |
   | **Homepage URL** | `https://reliable-youtiao-2f57d2.netlify.app` |
   | **Authorization callback URL** | `https://api.netlify.com/auth/done` |

4. Click **Register application**.
5. Copy the **Client ID**.
6. Click **Generate a new client secret** and copy the **secret** (you only see it once).

## 2. Paste credentials into Netlify

1. Open **[Netlify](https://app.netlify.com)** → your site (**reliable-youtiao-2f57d2**).
2. Go to **Project configuration** (gear) → **Access & security** → **OAuth**.
3. Under **OAuth providers**, open **GitHub** (or **Install provider**).
4. Paste **Client ID** and **Client secret** from step 1.
5. **Save**.

*(If your UI says “Visitor access” or “Authentication providers”, use the GitHub OAuth fields there.)*

## 3. Open the admin again

Go to: **https://reliable-youtiao-2f57d2.netlify.app/admin/**

Click **Login with GitHub**. Use the GitHub account that has **write access** to **Mendozaliner/MarcusFisico**.

## 4. Give Marcus access (required for him to use `/admin/`)

The CMS logs in with **GitHub** and **commits** to the repo. If Marcus’s GitHub user is not on the repo, GitHub will say he **does not have access**.

**You (repo owner) do this:**

1. Open **[github.com/Mendozaliner/MarcusFisico](https://github.com/Mendozaliner/MarcusFisico)** while logged in as **Mendozaliner**.
2. **Settings** → **Collaborators** (under “Access” in the left sidebar).
3. **Add people** → type Marcus’s **GitHub username** or the **email** tied to his GitHub account.
4. Choose role **Write** (not only Read). **Add [name] to this repository**.
5. Marcus must **accept the invitation** (GitHub email or **github.com** notifications).

**Marcus then:**

1. Uses a **GitHub account that matches the invite** (same username/email he accepted).
2. Goes to **https://reliable-youtiao-2f57d2.netlify.app/admin/** → **Login with GitHub** → authorize the app if asked.

If he **does not have a GitHub account**, he needs to **[create one](https://github.com/signup)** first, then you add **that** username as a collaborator with **Write**.

---

## If “Login with GitHub” still errors

1. **GitHub OAuth app → Authorization callback URL** must be exactly:  
   `https://api.netlify.com/auth/done`  
   (not your `.netlify.app` URL.)

2. **Netlify → Project configuration → Access & security → OAuth → GitHub**  
   Client ID and Client secret must be saved **on this same site** (reliable-youtiao-2f57d2).

3. **Hard refresh** `/admin/` after deploy (Ctrl+F5) so the browser loads the new `config.yml`.

4. **Popup blockers** — allow popups for your Netlify domain.

5. **`redirect_uri_mismatch` in GitHub** — almost always the callback URL in step 1.

---

Official references: [Decap backends (auth_endpoint)](https://decapcms.org/docs/backends-overview/), [Netlify OAuth](https://docs.netlify.com/security/secure-access-to-sites/oauth-provider-tokens/).
