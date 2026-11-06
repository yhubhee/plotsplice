import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { BookCredit, SampleBadge, StoryCard } from "@/components/StoryCard";
import { realStories, stories } from "@/content/stories";
import { pageMeta } from "@/lib/metadata";
import { siteConfig } from "@/site.config";

export const metadata = pageMeta({
  title: "Author stories",
  description: "What independent authors say about working with PlotSplice, in their own words, with the result of each project.",
  path: "/stories",
});

// Only real stories ever reach structured data, and a rating only if the author gave one.
function reviewData() {
  if (realStories.length === 0) return null;
  const rated = realStories.filter((story) => story.rating);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    review: realStories.map((story) => ({
      "@type": "Review",
      author: { "@type": "Person", name: story.authorName },
      reviewBody: story.quote,
      ...(story.rating && { reviewRating: { "@type": "Rating", ratingValue: story.rating, bestRating: 5 } }),
    })),
    ...(rated.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: (rated.reduce((sum, story) => sum + story.rating!, 0) / rated.length).toFixed(1),
        reviewCount: rated.length,
        bestRating: 5,
      },
    }),
  };
}

export default function StoriesPage() {
  const featured = stories.find((story) => story.caseStudy);
  const grid = stories.filter((story) => story !== featured);
  const structuredData = reviewData();

  return (
    <>
      {structuredData && <JsonLd data={structuredData} />}

      <section className="page pb-12 pt-14 md:pb-16 md:pt-20">
        <h1 className="max-w-[15ch] text-[clamp(2.75rem,6.5vw,5.5rem)]">Author stories, in their own words</h1>
        <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-ink-soft md:text-xl">
          What authors came to us with, what we did, and what changed for their books.
        </p>
      </section>

      {featured?.caseStudy && (
        <section aria-label="Featured story" className="page pb-14">
          <article className="on-dark rounded-2xl bg-ink-green p-7 text-paper shadow-card md:p-14">
            {featured.isPlaceholder && (
              <div className="mb-5 flex [&>span]:bg-gold [&>span]:text-ink">
                <SampleBadge />
              </div>
            )}
            <blockquote className="max-w-[28ch] font-display text-[clamp(1.9rem,3.6vw,3.25rem)] leading-[1.15]">
              {featured.quote}
            </blockquote>
            <div className="mt-6 [&_p]:text-paper/85">
              <p className="font-medium">{featured.authorName}</p>
              <BookCredit story={featured} />
            </div>
            <dl className="mt-10 grid gap-8 border-t border-gold/60 pt-8 md:grid-cols-3">
              {[
                ["The challenge", featured.caseStudy.challenge],
                ["What we did", featured.caseStudy.whatWeDid],
                ["The result", featured.caseStudy.result],
              ].map(([label, text]) => (
                <div key={label}>
                  <dt className="display-small text-xl text-gold">{label}</dt>
                  <dd className="mt-2 leading-relaxed text-paper/90">{text}</dd>
                </div>
              ))}
            </dl>
          </article>
        </section>
      )}

      <section aria-label="More author stories" className="page pb-20 md:pb-28">
        {/* Columns rather than rows, so real quotes of different lengths sit naturally. */}
        <ul className="gap-5 md:columns-2 lg:columns-3">
          {grid.map((story) => (
            <li key={story.id} className="mb-5 break-inside-avoid">
              <StoryCard story={story} />
            </li>
          ))}
        </ul>
      </section>

      <CtaBand heading="Your book could be the next story here." />
    </>
  );
}
