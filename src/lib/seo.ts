/** Absolute site URL used for canonical links, sitemap and social previews.
 * Set NEXT_PUBLIC_SITE_URL in Vercel once the production domain is live. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_BRANCH_URL
      ? `https://${process.env.VERCEL_BRANCH_URL}`
      : "http://localhost:3000");

export const isProduction = process.env.VERCEL_ENV === "production";
