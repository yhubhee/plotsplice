import Link from "next/link";
import { Button } from "@/components/Button";
import { cloth, coverShadow } from "@/components/cloth";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { HeroThread } from "@/components/HeroThread";
import { Shelf } from "@/components/Shelf";
import { Splice } from "@/components/Splice";
import { StoryCard } from "@/components/StoryCard";
import { genres, homeFaqs, problems, steps } from "@/content/home";
import { categories, servicesIn } from "@/content/services";
import { stories } from "@/content/stories";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "PlotSplice: book marketing and publishing for independent authors",
  absoluteTitle: true,
  description:
    "Book marketing, publishing and author-brand services for independent and self-published authors. Book a free strategy call with a senior strategist.",
  path: "/",
});

// Headline options considered:
// - "Your story deserves readers. We build the path to them."   <- chosen: the gold
//    thread can literally draw that path, so the line and the motif do one job.
// - "Your book is written. Now let's get it read."              (excludes manuscript-stage authors)
// - "A good book still has to be found."                        (true, but says nothing about us)
// - "Good books don't find readers by accident."                (sounds like a scolding)

// Card widths alternate so the four categories don't read as a uniform grid.
const cardSpan = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-x-clip pt-12 md:pt-16">
        <HeroThread />
        <div className="page relative z-10">
          <h1 className="text-[clamp(2.75rem,6.5vw,6rem)] !leading-[1.04]">
            Your story deserves readers. We build{" "}
            <span data-thread-start className="whitespace-nowrap">
              the path to them.
            </span>
          </h1>
          <div className="mt-8 flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-10">
            <p className="max-w-[34rem] text-lg leading-relaxed text-ink-soft md:text-xl">
              Marketing, publishing and author-brand services for independent and self-published authors, with
              senior strategists on every book.
            </p>
            <div className="flex shrink-0 flex-col gap-3 pr-4 sm:flex-row">
              <Button href="/contact">Book a Free Strategy Call</Button>
              <Button href="/services" variant="secondary">
                Explore Services
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 md:mt-14">
          <Shelf />
        </div>
      </section>

      {/* Shelf legend and genres */}
      <section aria-label="Service categories and genres" className="page py-8">
        <ul className="flex flex-wrap gap-x-7 gap-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/services#${category.id}`} className="group inline-flex items-center gap-2 py-1 text-[0.95rem] text-ink hover:text-ink-green">
                <span aria-hidden className={`inline-block h-4 w-2 rounded-[2px] ${cloth[category.id].swatch}`} />
                <span className="group-hover:underline">{category.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-baseline md:gap-6">
          <h2 className="shrink-0 font-sans text-[0.95rem] font-medium tracking-normal text-ink-soft">Genres we work with</h2>
          <ul className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <li key={genre} className="rounded-full border border-gold-deep/40 px-3.5 py-1 display-small text-[0.98rem] text-ink-green">
                {genre}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Problem and solution */}
      <section className="page pb-20 pt-16 md:pb-28 md:pt-24">
        <h2 className="max-w-[16ch] text-[clamp(2.25rem,5vw,4.25rem)]">Good books rarely fail on the page. They fail to be found.</h2>
        <div className="mt-12 hidden gap-10 text-[0.95rem] font-medium text-ink-soft md:grid md:grid-cols-[1fr_5rem_1fr]">
          <p>What goes wrong</p>
          <span />
          <p>What we do about it</p>
        </div>
        <ul className="mt-8 md:mt-4">
          {problems.map((item) => (
            <li key={item.problem} className="grid gap-5 border-t border-ink-green/20 py-8 md:grid-cols-[1fr_5rem_1fr] md:items-center md:gap-10">
              <div>
                <h3 className="display-small text-[1.75rem]">{item.problem}</h3>
                <p className="mt-2 max-w-[46ch] leading-relaxed text-ink-soft">{item.detail}</p>
              </div>
              <div aria-hidden className="stitch-x hidden md:block" />
              <p className="max-w-[46ch] border-l-2 border-gold pl-4 text-lg leading-relaxed text-ink md:border-0 md:pl-0">{item.fix}</p>
            </li>
          ))}
        </ul>
      </section>

      <Splice />

      {/* Service categories */}
      <section className="page py-20 md:py-28">
        <h2 className="mx-auto max-w-[20ch] text-center text-[clamp(2.25rem,5vw,4.25rem)]">Four ways we get a book in front of readers</h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {categories.map((category, index) => {
            const style = cloth[category.id];
            const list = servicesIn(category.id);
            return (
              <article
                key={category.id}
                className={`rounded-2xl py-8 pl-10 pr-7 md:py-10 md:pl-12 md:pr-10 ${coverShadow} ${style.surface} ${cardSpan[index]} ${style.dark ? "on-dark" : ""}`}
              >
                <h3 className="!text-inherit text-[clamp(2rem,3.4vw,3rem)]">{category.title}</h3>
                <p className={`mt-3 max-w-[42ch] leading-relaxed ${style.muted}`}>{category.summary}</p>
                <ul className="mt-6 space-y-1.5">
                  {list.slice(0, 4).map((service) => (
                    <li key={service.slug}>
                      <Link prefetch={false} href={`/services/${service.slug}`} className="underline-offset-4 hover:underline">
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/services#${category.id}`} className="mt-7 inline-block font-medium underline decoration-2 underline-offset-[5px]">
                  See all {list.length} {category.title === "Growth & Discoverability" ? "growth" : category.title.toLowerCase()} services
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* How it works: a real sequence, so the numbers carry meaning */}
      <section className="bg-paper-deep py-20 md:py-28">
        <div className="page">
          <h2 className="max-w-[18ch] text-[clamp(2.25rem,5vw,4.25rem)]">From first message to a plan you can check</h2>
          <div className="relative mt-14">
            <div aria-hidden className="stitch-x absolute inset-x-0 top-7 hidden lg:block" />
            <div aria-hidden className="stitch-y absolute bottom-2 left-7 top-2 lg:hidden" />
            <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <li key={step.title} className="relative pl-20 lg:pl-0">
                <span className="absolute left-0 top-0 flex size-14 items-center justify-center rounded-full bg-ink-green font-display text-2xl text-paper lg:relative">
                  {index + 1}
                </span>
                <h3 className="display-small pt-1 text-2xl lg:mt-6 lg:pt-0">{step.title}</h3>
                <p className="mt-2 max-w-[38ch] leading-relaxed text-ink-soft">{step.detail}</p>
              </li>
            ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Featured stories */}
      <section className="page py-20 md:py-28">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[16ch] text-[clamp(2.25rem,5vw,4.25rem)]">In our authors&rsquo; own words</h2>
          <Link href="/stories" className="shrink-0 font-medium text-ink-green underline decoration-gold decoration-2 underline-offset-[5px]">
            Read all author stories
          </Link>
        </div>
        <ul className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-start">
          {stories.slice(0, 3).map((story, index) => (
            <li key={story.id} className={index === 1 ? "lg:mt-10" : ""}>
              <StoryCard story={story} />
            </li>
          ))}
        </ul>
      </section>

      <Splice />

      {/* FAQ */}
      <section className="page grid gap-10 py-20 md:py-28 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <h2 className="max-w-[12ch] text-[clamp(2.25rem,5vw,4.25rem)]">Questions authors ask first</h2>
        </div>
        <FaqList faqs={homeFaqs} />
      </section>

      {/* Final call to action */}
      <CtaBand />
    </>
  );
}
