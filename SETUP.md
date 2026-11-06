# PlotSplice setup

## Run it on your computer

You need [Node.js](https://nodejs.org) 20.9 or newer.

```
npm install
npm run dev
```

Then open http://localhost:3000.

To test posting reviews locally, copy `.env.example` to `.env.local` and set `ADMIN_PASSWORD`. Reviews then save to `content/published-reviews.json` on your computer.

If a page keeps reloading itself during local development, stop the server, delete the `.next` folder and run `npm run dev` again. That folder is generated, so deleting it is safe.

## What to fill in before launch

### Contact details: `site.config.ts`

- [ ] `url`: your live domain (used by the sitemap, canonical links and sharing previews)
- [ ] `email`
- [ ] `calendlyUrl`
- [ ] `formEndpoint`: create a form at [formspree.io](https://formspree.io) and paste its endpoint. **The contact form shows an error until you do this.**
- [ ] `social`: all four links. Delete any you don't use from `site.config.ts` and `components/Footer.tsx`.

### Copy that needs your real answer

These show on the page with a gold highlight until replaced. Search the project for `[[TODO`.

- [ ] Payment terms: `content/home.ts`, "How does payment work?"
- [ ] Ghostwriting AI policy: `content/services.ts`, Ghostwriting FAQ
- [ ] Team names, roles and bios: `content/about.ts`
- [ ] Privacy policy: `app/privacy/page.tsx`. Have this reviewed before launch.

### Claims to confirm are true

I wrote these as draft copy, so check you're happy to stand behind them:

- [ ] "Most engagements start at $1,500": `content/home.ts`
- [ ] "Nothing is billed until you approve it": `content/home.ts`
- [ ] Replies "within 24 hours": `app/contact/page.tsx`, `components/ContactForm.tsx`
- [ ] Authors keep their rights, royalties and accounts: `content/about.ts`, `content/services.ts`
- [ ] What each service includes (`whatYouGet`): `content/services.ts`

### Real figures

- [ ] No page uses a statistic or results figure yet. If you add one, use a real number. Until you have it, write `[[TODO: real figure]]`.

### Real testimonials

- [ ] Post real reviews at `/admin/reviews` (see below). The six samples in `content/stories.ts` carry a "Sample" badge and sit behind real reviews.
- [ ] Delete the samples once you have enough real stories to fill the page, and move the sample case study out at the same time.

## Deploy to Vercel

1. Push this project to GitHub.
2. At [vercel.com](https://vercel.com), choose **Add New > Project** and import `yhubhee/plotsplice`. Keep the default settings and deploy.
3. Add your domain under **Settings > Domains**, then update `url` in `site.config.ts`.

Netlify also works: import the repo there, and it detects Next.js automatically. Add the settings below under **Site configuration > Environment variables**.

## Turn on review posting

This is a one-time setup, and it needs the project to be on GitHub and deployed.

**1. Create a GitHub access key**

1. Go to [GitHub's fine-grained token page](https://github.com/settings/personal-access-tokens/new).
2. Name it `PlotSplice reviews` and set an expiry date. Put a reminder in your calendar, because posting stops working when it expires.
3. Under **Repository access**, choose **Only select repositories** and pick `plotsplice`.
4. Under **Repository permissions**, set **Contents** to **Read and write**.
5. Generate it and copy the key. Treat it like a password.

**2. Add four settings at your host**

On Vercel: **Settings > Environment Variables**.

| Name | Value |
| --- | --- |
| `ADMIN_PASSWORD` | A long, unique password you choose |
| `GITHUB_TOKEN` | The key from step 1 |
| `GITHUB_REPO` | `yhubhee/plotsplice` |
| `GITHUB_BRANCH` | `main` |

**3. Redeploy** so the new settings take effect.

## Post a review

1. Go to `https://your-domain.com/admin/reviews` and sign in. It isn't linked anywhere on the site, so bookmark it.
2. Fill in the form and click **Publish review**.
3. The site rebuilds itself, and the review should go live within a few minutes.

You can edit or remove published reviews from the same page. Only publish a review with the author's permission, in their own words.

Good to know:

- Each review you post adds a small commit to the repo, and that commit triggers the rebuild. If you've pulled the project to your computer, run `git pull` before making other changes.
- A review's rating feeds the site's structured data. Google doesn't generally show review stars for a business's reviews of itself, so don't count on stars appearing in search results.

## Changing content

| To change | Edit |
| --- | --- |
| Services, categories | `content/services.ts` |
| Home page copy, general FAQs | `content/home.ts` |
| About page | `content/about.ts` |
| Contact form dropdowns | `content/contact.ts` |
| Sample stories | `content/stories.ts` |
| Name, tagline, contact details | `site.config.ts` |

Adding a service to `content/services.ts` also creates its page and adds it to the menu, footer, shelf, sitemap, contact form and `/llms.txt`.

To use Web3Forms or Resend instead of Formspree, see the comment above `sendForm` in `components/ContactForm.tsx`.
