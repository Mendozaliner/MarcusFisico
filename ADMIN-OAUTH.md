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

## 4. If Marcus should edit too

On GitHub: **MarcusFisico** → **Settings** → **Collaborators** → add his GitHub username with **Write** access. He will **Login with GitHub** the same way.

---

Official references: [Decap GitHub backend](https://decapcms.org/docs/github-backend/), [Netlify OAuth](https://docs.netlify.com/security/secure-access-to-sites/oauth-provider-tokens/).
