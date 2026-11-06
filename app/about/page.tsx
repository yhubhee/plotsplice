import { Copy } from "@/components/Copy";
import { CtaBand } from "@/components/CtaBand";
import { Splice } from "@/components/Splice";
import { howWeWork, mission, team, values, whoWeAre } from "@/content/about";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "About us",
  description: "PlotSplice is a book marketing, publishing and author-brand agency for independent authors, built on senior strategists and honest diagnosis.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="page pb-14 pt-14 md:pb-20 md:pt-20">
        <h1 className="max-w-[16ch] text-[clamp(2.75rem,6.5vw,5.5rem)]">We join good books to the readers looking for them</h1>
        <p className="mt-7 max-w-[56ch] text-lg leading-relaxed text-ink-soft md:text-xl">{whoWeAre}</p>
      </section>

      <Splice />

      <section className="page py-16 md:py-24">
        <p className="mx-auto max-w-[24ch] text-center font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.12] text-ink-green">{mission}</p>
      </section>

      <section className="bg-paper-deep py-16 md:py-24">
        <div className="page grid gap-10 lg:grid-cols-[4fr_8fr] lg:gap-12">
          <h2 className="text-[clamp(2.25rem,4vw,3.5rem)]">How we work</h2>
          <ul>
            {howWeWork.map((item) => (
              <li key={item.title} className="border-t border-ink-green/20 py-6 md:grid md:grid-cols-[2fr_3fr] md:gap-8">
                <h3 className="display-small text-2xl">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft md:mt-0">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page py-16 md:py-24">
        <h2 className="text-[clamp(2.25rem,4vw,3.5rem)]">What we won&rsquo;t compromise on</h2>
        <ul className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {values.map((value) => (
            <li key={value.title} className="border-l-2 border-gold pl-5">
              <h3 className="display-small text-2xl">{value.title}</h3>
              <p className="mt-2 max-w-[46ch] leading-relaxed text-ink-soft">{value.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="page pb-20 md:pb-28">
        <h2 className="text-[clamp(2.25rem,4vw,3.5rem)]">The people on your book</h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {team.map((member, index) => (
            <li key={index} className="rounded-2xl bg-page-white p-7 shadow-card">
              <p className="display-small text-xl text-ink-green">
                <Copy text={member.name} />
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                <Copy text={member.role} />
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                <Copy text={member.bio} />
              </p>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
