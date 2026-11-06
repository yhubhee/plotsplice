import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { ContactFormFromUrl } from "@/components/ContactFormFromUrl";
import { serviceMenu } from "@/content/services";
import { pageMeta } from "@/lib/metadata";
import { siteConfig } from "@/site.config";

export const metadata = pageMeta({
  title: "Book a free strategy call",
  description: "Tell us about your book and get an honest diagnosis from a senior strategist, or book a free 30-minute audit directly.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="page grid gap-12 py-12 md:py-16 lg:grid-cols-[7fr_4fr] lg:gap-16">
      <div>
        <h1 className="text-[clamp(2.75rem,5.5vw,4.75rem)]">Tell us about your book</h1>
        <p className="mb-9 mt-4 text-lg leading-relaxed text-ink-soft">
          Takes 90 seconds. The more honest you are, the better our diagnosis.
        </p>
        {/* The fallback is the same form, so it's in the page HTML with no layout shift. */}
        <Suspense fallback={<ContactForm menu={serviceMenu} />}>
          <ContactFormFromUrl menu={serviceMenu} />
        </Suspense>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
        <div className="on-dark rounded-2xl bg-ink-green p-7 text-paper shadow-card">
          <h2 className="text-[1.9rem] !text-paper">Free 30-Minute Audit</h2>
          <p className="mt-3 leading-relaxed text-paper/85">
            Skip the form — grab a slot directly on a strategist&rsquo;s calendar and get a live diagnosis of your book&rsquo;s market position.
          </p>
          <a
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-12 items-center rounded-lg bg-gold px-5 py-3 font-medium text-ink hover:bg-[#d6b15b]"
          >
            Book My Free Audit →
          </a>
        </div>
        <div className="rounded-2xl bg-page-white p-7 shadow-card">
          <h2 className="text-[1.9rem]">Email Us Directly</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Prefer to write? Every author email is answered within 24 hours with specific, actionable advice.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-4 inline-block break-all font-medium text-ink-green underline decoration-gold decoration-2 underline-offset-4"
          >
            {siteConfig.email}
          </a>
        </div>
      </aside>
    </section>
  );
}
