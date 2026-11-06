// Copy for the home page sections. Anything in [[double brackets]] still needs a real
// answer from you: it renders highlighted so it can’t slip through unnoticed.

export type Faq = { question: string; answer: string };

export const genres = [
  "Fiction",
  "Literary Fiction",
  "Romance",
  "Fantasy & Sci-Fi",
  "Mystery & Thriller",
  "Memoir",
  "Self-Help",
  "Business",
  "Health & Wellness",
  "Spirituality",
];

export const problems = [
  {
    problem: "Invisible on Amazon",
    detail: "Your listing doesn’t use the words readers type, so the book rarely appears when they’re looking for one like it.",
    fix: "We rework your categories, keywords and description around how your readers actually search.",
  },
  {
    problem: "Missing from AI answers",
    detail: "Readers now ask ChatGPT, Perplexity and Rufus what to read next. They can only suggest books they can find and understand.",
    fix: "We structure your book’s details across the web so these tools can find them and describe the book accurately.",
  },
  {
    problem: "No platform to launch from",
    detail: "With no site, reader list or community, every launch starts from zero and fades when the ads stop.",
    fix: "We build the website, newsletter and reader relationships that you keep after any campaign ends.",
  },
];

export const steps = [
  {
    title: "Tell us about your book",
    detail: "Send the short form with where the book stands, your budget and your goals. It takes about 90 seconds.",
  },
  {
    title: "Free diagnosis call",
    detail: "A senior strategist reviews your book’s market position with you and tells you what’s holding it back.",
  },
  {
    title: "Custom growth plan",
    detail: "You get a written plan with the work we’d do, the order we’d do it in, and what it costs.",
  },
  {
    title: "We execute and report",
    detail: "We do the work and report back in plain language: what ran, what it did, and what changes next.",
  },
];

export const homeFaqs: Faq[] = [
  {
    question: "How much does it cost?",
    answer:
      "Most engagements start at $1,500. We don’t publish a fixed rate card because a listing audit and a full launch are very different jobs. After your diagnosis call you get a written quote for the exact work we recommend.",
  },
  {
    question: "How long does it take?",
    answer:
      "It depends on the work. An audit is much quicker than a launch campaign, and ghostwriting takes months. Your plan includes dates for each stage, so you’ll know what to expect before you commit.",
  },
  {
    question: "Which genres do you work with?",
    answer:
      "Fiction and non-fiction, including romance, fantasy and sci-fi, thrillers, memoir, self-help and business. If we don’t think we’re the right fit for your book, we’ll tell you on the call.",
  },
  {
    question: "What do you need from me?",
    answer:
      "Your book or manuscript, access to any existing listings and accounts we’ll be working on, and honest answers about what you’ve tried so far. You approve anything published in your name.",
  },
  {
    question: "How does payment work?",
    answer:
      "You’ll see the full cost in your written plan before anything starts, and nothing is billed until you approve it. [[TODO: confirm deposit, installment and refund terms]]",
  },
  {
    question: "Can you guarantee a bestseller?",
    answer:
      "No, and be wary of anyone who does. No honest agency can promise sales, rankings or list placement. We can promise a clear plan, careful work and straight reporting on what happened.",
  },
];
