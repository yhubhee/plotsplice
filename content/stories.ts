// HOW TO ADD A REAL STORY
// Easiest: sign in at /admin/reviews and post it. It is saved to published-reviews.json.
// By hand: add an entry to published-reviews.json with isPlaceholder: false.
//
// The entries in `placeholderStories` are not real. Each shows a "Sample" badge and is
// left out of structured data. Real stories always appear ahead of them. Delete the
// samples once you have enough real stories to fill the page.

import publishedReviews from "./published-reviews.json";

export type Story = {
  id: string;
  authorName: string;
  bookTitle: string;
  genre: string;
  quote: string;
  /** The result, in one line. */
  result: string;
  photo?: string;
  bookUrl?: string;
  /** 1 to 5. Only include this if the author actually gave a rating. */
  rating?: number;
  /** Optional longer case study, used for the featured layout on /stories. */
  caseStudy?: { challenge: string; whatWeDid: string; result: string };
  isPlaceholder: boolean;
};

const placeholderStories: Story[] = [
  ["Fiction", "first"],
  ["Romance", "second"],
  ["Memoir", "third"],
  ["Fantasy & Sci-Fi", "fourth"],
  ["Business", "fifth"],
  ["Mystery & Thriller", "sixth"],
].map(([genre, position], index) => ({
  id: `sample-${index + 1}`,
  authorName: "Author Name",
  bookTitle: "Book Title",
  genre,
  quote: `[Placeholder] This is the ${position} sample quote. A real author’s words go here, in their own voice.`,
  result: "[Placeholder] The real result, in one line.",
  isPlaceholder: true,
}));

// Shows how the featured case study looks on /stories until a real story has one.
placeholderStories[0].caseStudy = {
  challenge: "[Placeholder] What was holding the book back when the author came to us.",
  whatWeDid: "[Placeholder] The specific work we did, in plain language.",
  result: "[Placeholder] What actually changed. Use only real figures the author has agreed to share.",
};

export const stories: Story[] = [...(publishedReviews as Story[]), ...placeholderStories];

/** Real, published stories only. Used for structured data. */
export const realStories = stories.filter((story) => !story.isPlaceholder);
