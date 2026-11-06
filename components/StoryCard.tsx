import Image from "next/image";
import type { Story } from "@/content/stories";

export function SampleBadge() {
  return <span className="self-start rounded-full bg-gold/30 px-3 py-0.5 text-sm font-medium text-ink">Sample</span>;
}

export function BookCredit({ story }: { story: Story }) {
  return (
    <p className="text-sm text-ink-soft">
      {story.bookUrl ? (
        <a href={story.bookUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
          {story.bookTitle}
        </a>
      ) : (
        story.bookTitle
      )}
      , {story.genre}
    </p>
  );
}

export function StoryCard({ story, className = "" }: { story: Story; className?: string }) {
  return (
    <figure className={`flex h-full flex-col rounded-2xl bg-page-white p-7 shadow-card ${className}`}>
      {story.isPlaceholder && (
        <div className="mb-4 flex">
          <SampleBadge />
        </div>
      )}
      <blockquote className="display-small text-[1.3rem] leading-[1.36] text-ink-green">{story.quote}</blockquote>
      <figcaption className="mt-auto pt-6">
        <div className="flex items-center gap-3">
          {story.photo && (
            // Unoptimized because you can paste a photo URL from any site in the admin form.
            <Image src={story.photo} alt={`Portrait of ${story.authorName}`} width={48} height={48} unoptimized className="size-12 rounded-full object-cover" />
          )}
          <div>
            <p className="font-medium text-ink">{story.authorName}</p>
            <BookCredit story={story} />
          </div>
        </div>
        <p className="mt-3 border-t border-gold/60 pt-3 text-sm text-ink">{story.result}</p>
      </figcaption>
    </figure>
  );
}
