// Everything that changes per deployment lives here.
// Search the project for "TODO: replace" before launch; SETUP.md lists them all.

export const siteConfig = {
  name: "PlotSplice",
  tagline: "Marketing, publishing and author-brand services for independent authors.",
  description:
    "PlotSplice is a book marketing, publishing and author-brand agency for independent and self-published authors.",
  url: "https://www.plotsplice.com", // TODO: replace with the live domain
  email: "hello@plotsplice.com", // TODO: replace
  calendlyUrl: "https://calendly.com/plotsplice/30min", // TODO: replace
  formEndpoint: "https://formspree.io/f/your-form-id", // TODO: replace
  social: {
    instagram: "https://www.instagram.com/plotsplice", // TODO: replace
    tiktok: "https://www.tiktok.com/@plotsplice", // TODO: replace
    linkedin: "https://www.linkedin.com/company/plotsplice", // TODO: replace
    x: "https://x.com/plotsplice", // TODO: replace
  },
} as const;
