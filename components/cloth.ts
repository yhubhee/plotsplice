import type { CategoryId } from "@/content/services";

// Each category is bound in its own cloth. The same colors appear on the shelf spines,
// the legend under the shelf, the category cards and the service page covers.
export const cloth: Record<CategoryId, { surface: string; muted: string; foil: string; swatch: string; dark: boolean }> = {
  marketing: {
    surface: "bg-ink-green text-paper",
    muted: "text-paper/80",
    foil: "bg-gold",
    swatch: "bg-ink-green",
    dark: true,
  },
  publishing: {
    surface: "bg-gold text-ink",
    muted: "text-ink/80",
    foil: "bg-gold-deep",
    swatch: "bg-gold",
    dark: false,
  },
  "author-brand": {
    surface: "bg-page-white text-ink-green",
    muted: "text-ink-soft",
    foil: "bg-gold",
    swatch: "bg-page-white ring-1 ring-ink-green/30",
    dark: false,
  },
  growth: {
    surface: "bg-moss text-paper",
    muted: "text-paper/90",
    foil: "bg-gold",
    swatch: "bg-moss",
    dark: true,
  },
};

// The groove where a cloth cover meets its hinge, plus the shared soft card shadow.
export const coverShadow =
  "shadow-[inset_16px_0_0_rgb(0_0_0/0.07),inset_18px_0_0_rgb(255_255_255/0.1),var(--shadow-card)]";
