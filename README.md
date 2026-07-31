# Mana Prime Realty — Website

Next.js site for manaprimerealty.com, with a browser-based content admin
(Decap CMS) so you or your agents can add/edit listings without touching code.

## What's built so far

- **Home** — hero carousel of featured listings, floating filter box
  (project type / location / price), featured listings grid, inquiry form.
- **Properties** — full gallery grid (photo, name, location, price, size)
  with working filters.
- **Property detail page** — gallery image, YouTube video thumbnail
  (click-through to the video), full description, inquiry form pre-filled
  to that listing.
- **About Us** and **Buyers Guide** — editable via the CMS.
- **Inquiry form** — name, email, phone, and a Listings dropdown, wired to
  Netlify Forms (submissions land in your Netlify dashboard, with email
  notifications you can turn on).
- **/admin** — Decap CMS panel for managing listings and page text.

Sample/placeholder listings and images are included so the site isn't
empty — swap them out via `/admin` once it's live.

## 1. Push this to GitHub

```bash
cd manaprimerealty
git init
git add .
git commit -m "Initial site scaffold"
git branch -M main
git remote add origin https://github.com/<your-username>/manaprimerealty.git
git push -u origin main
```

(Create the empty repo on GitHub first if you haven't.)

## 2. Connect Netlify

1. In Netlify: **Add new site → Import an existing project → GitHub** →
   pick the `manaprimerealty` repo.
2. Build command: `npm run build` — Publish directory: `.next`
   (already set in `netlify.toml`, along with the Next.js plugin).
3. Deploy. Netlify will give you a temporary `*.netlify.app` URL first.

## 3. Point manaprimerealty.com at Netlify

In Netlify: **Site settings → Domain management → Add a domain** →
`manaprimerealty.com`. Netlify will show you the DNS records to add at
your domain registrar (or you can move DNS to Netlify entirely). Since you
already own the domain, this is just a DNS change — no re-purchase needed.

## 4. Turn on the CMS login (Netlify Identity + Git Gateway)

The `/admin` panel needs a way to log you in and commit changes to GitHub
on your behalf. Netlify handles both:

1. Netlify site → **Identity** tab → **Enable Identity**.
2. Identity → **Registration** → set to **Invite only** (so strangers
   can't sign up).
3. Identity → **Services** → enable **Git Gateway**.
4. Identity → **Invite users** → send yourself (and any agents) an invite
   email. They'll set a password and can then log in at
   `manaprimerealty.com/admin`.

Once that's done, logging into `/admin` gives a form-based editor for
listings and pages — every save creates a commit and triggers a new
Netlify build automatically.

## 5. Add real listings

Go to `/admin` → **Listings** → **New Listing**, fill in the fields, upload
photos, paste the YouTube link, and publish. No code required from here on.

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Continuing the build with Claude Code

This repo is a clean starting point — natural next steps are things like:
real photography, a proper logo file, map embeds on the detail page, an
agent roster page, and refining copy. Once this is pushed to GitHub,
Claude Code can work directly in this folder, run the dev server, and push
commits — just point it at this repo.
