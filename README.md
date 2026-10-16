# ADVIO website

Marketing site for ADVIO (formerly SparrowTV) — built with Next.js 15, Tailwind CSS v4, Motion and Lenis.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home — cinematic hero + Apple-style scroll scenes |
| `/broadcasters`, `/distributors` | Audience pages |
| `/adglean` | Product / operating model |
| `/measurement` | Measurement approach |
| `/company` | About + team |
| `/model` | Opportunity calculator |
| `/contact` | Working-session request form |

## Where things live

- `src/lib/site.ts` — nav links, contact email, tagline
- `src/app/globals.css` — brand colors (navy / lime / cyan / electric blue) and type
- `src/components/home/*` — scroll scenes (HouseholdsScene, ConnectionScene, OperatingModel)
- `src/components/ui/Logo.tsx` — placeholder logo; replace with the official SVG in `public/brand/`

## Contact form email

Submissions go to **info@advio.com**, matching the contact-page and footer email links.
The recipient is defined in `src/lib/site.ts`; `CONTACT_TO` is no longer used.

Configure email delivery in Vercel → Project → Settings → Environment Variables:

- `RESEND_API_KEY` — from resend.com
- `CONTACT_FROM` — optional, e.g. `ADVIO <hello@yourdomain>` (domain must be verified in Resend)

Without `RESEND_API_KEY`, the form reports an error instead of confirming an undelivered submission.
