import Link from "next/link";
import { cloth } from "@/components/cloth";
import { CtaBand } from "@/components/CtaBand";
import { ServiceCard } from "@/components/ServiceCard";
import { categories, services, servicesIn } from "@/content/services";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Book marketing and publishing services",
  description:
    "Every PlotSplice service for independent authors: book marketing, publishing, author branding, and growth and AI discoverability.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="page pb-12 pt-14 md:pb-16 md:pt-20">
        <h1 className="max-w-[17ch] text-[clamp(2.75rem,6.5vw,5.5rem)]">Everything a book needs to reach its readers</h1>
        <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-soft md:text-xl">
          {services.length} services across four areas. You don&rsquo;t need all of them, and on your diagnosis call we&rsquo;ll
          tell you which ones would make a difference for your book.
        </p>
        <nav aria-label="Service categories" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`#${category.id}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-green/30 px-4 py-2 text-[0.95rem] font-medium text-ink-green hover:border-ink-green hover:bg-ink-green/5"
                >
                  <span aria-hidden className={`inline-block h-4 w-2 rounded-[2px] ${cloth[category.id].swatch}`} />
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {categories.map((category) => (
        <section key={category.id} id={category.id} className="border-t border-ink-green/15">
          <div className="page grid gap-8 py-14 md:py-20 lg:grid-cols-[4fr_8fr] lg:gap-12">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-[clamp(2.25rem,4vw,3.5rem)]">{category.title}</h2>
              <p className="mt-4 max-w-[36ch] text-lg leading-relaxed text-ink-soft">{category.summary}</p>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2">
              {servicesIn(category.id).map((service) => (
                <li key={service.slug}>
                  <ServiceCard service={service} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <CtaBand heading="Not sure where to start? That&rsquo;s what the call is for." body="Tell us where your book stands. A senior strategist will tell you what we&rsquo;d do first, and what you can skip." />
    </>
  );
}
