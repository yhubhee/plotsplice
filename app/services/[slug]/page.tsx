import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { cloth, coverShadow } from "@/components/cloth";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { ServiceCard } from "@/components/ServiceCard";
import { Splice } from "@/components/Splice";
import { getCategory, getService, relatedServices, services } from "@/content/services";
import { pageMeta } from "@/lib/metadata";
import { siteConfig } from "@/site.config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMeta({
    title: `${service.title} for authors`,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const category = getCategory(service.category);
  const style = cloth[service.category];
  const contactHref = `/contact?service=${service.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    serviceType: category.title,
    url: `${siteConfig.url}/services/${service.slug}`,
    audience: { "@type": "Audience", audienceType: "Independent and self-published authors" },
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <>
      <JsonLd data={structuredData} />

      {/* The hero is a book cover in the category's cloth. */}
      <div className="page pt-6 md:pt-10">
        <header className={`rounded-2xl py-10 pl-10 pr-6 md:py-16 md:pl-16 md:pr-14 ${coverShadow} ${style.surface} ${style.dark ? "on-dark" : ""}`}>
          <nav aria-label="Breadcrumb" className={`text-[0.95rem] ${style.muted}`}>
            <Link href="/services" className="underline underline-offset-4">
              Services
            </Link>
            <span aria-hidden> / </span>
            <Link href={`/services#${category.id}`} className="underline underline-offset-4">
              {category.title}
            </Link>
          </nav>
          <h1 className="mt-6 max-w-[20ch] text-[clamp(2.5rem,6vw,5rem)] !text-inherit">{service.title}</h1>
          <p className={`mt-6 max-w-[52ch] text-lg leading-relaxed md:text-xl ${style.muted}`}>{service.heroLine}</p>
          <div className="mt-8">
            <Button href={contactHref} variant={style.dark ? "gold" : "primary"}>
              Book a Free Strategy Call
            </Button>
          </div>
        </header>
      </div>

      <section className="page grid gap-6 py-16 md:py-24 lg:grid-cols-[4fr_8fr] lg:gap-12">
        <h2 className="text-[clamp(2rem,4vw,3.25rem)]">Who it&rsquo;s for</h2>
        <p className="max-w-[56ch] text-xl leading-relaxed text-ink md:text-2xl md:leading-relaxed">{service.whoItsFor}</p>
      </section>

      <section className="page grid gap-8 pb-16 md:pb-24 lg:grid-cols-[4fr_8fr] lg:gap-12">
        <h2 className="text-[clamp(2rem,4vw,3.25rem)]">What you get</h2>
        <ul className="grid gap-x-10 border-t border-ink-green/20 sm:grid-cols-2 sm:border-t-0">
          {service.whatYouGet.map((item) => (
            <li key={item} className="border-b border-ink-green/20 py-4 leading-relaxed sm:border-t sm:border-b-0">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-paper-deep py-16 md:py-24">
        <div className="page grid gap-10 lg:grid-cols-[4fr_8fr] lg:gap-12">
          <h2 className="text-[clamp(2rem,4vw,3.25rem)]">How it works</h2>
          <div className="relative">
            <div aria-hidden className="stitch-y absolute bottom-2 left-6 top-2" />
            <ol className="relative space-y-9">
              {service.howItWorks.map((step, index) => (
                <li key={step.title} className="relative pl-[4.5rem]">
                  <span className="absolute left-0 top-0 flex size-12 items-center justify-center rounded-full bg-ink-green font-display text-xl text-paper">
                    {index + 1}
                  </span>
                  <h3 className="display-small text-2xl">{step.title}</h3>
                  <p className="mt-1.5 max-w-[56ch] leading-relaxed text-ink-soft">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="page grid gap-8 py-16 md:py-24 lg:grid-cols-[4fr_8fr] lg:gap-12">
        <h2 className="text-[clamp(2rem,4vw,3.25rem)]">Questions about {service.title.split(" (")[0]}</h2>
        <FaqList faqs={service.faqs} />
      </section>

      <Splice />

      <section className="page py-16 md:py-24">
        <h2 className="text-[clamp(2rem,4vw,3.25rem)]">Often paired with</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {relatedServices(service).map((related) => (
            <li key={related.slug}>
              <ServiceCard service={related} />
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        heading={`Is ${service.title.split(" (")[0]} right for your book?`}
        body="Tell us where the book stands. We&rsquo;ll tell you if this is the right next step, or if something else should come first."
        href={contactHref}
      />
    </>
  );
}
