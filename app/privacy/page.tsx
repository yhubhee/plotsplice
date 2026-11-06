import { Copy } from "@/components/Copy";
import { pageMeta } from "@/lib/metadata";
import { siteConfig } from "@/site.config";

export const metadata = pageMeta({
  title: "Privacy policy",
  description: "How PlotSplice collects and uses the information you share through this website.",
  path: "/privacy",
});

const sections = [
  {
    heading: "What we collect",
    body: "When you fill in our contact form, we collect your name, email address, book details, budget range, the services you’re interested in and anything else you choose to tell us. If you book a call, the scheduling service collects the details you enter there.",
  },
  {
    heading: "How we use it",
    body: "We use your information to reply to you, prepare for your strategy call and provide the services you ask for. If you tick the consent box on the form, we may also send you a personalized growth plan and occasional author marketing insights. You can unsubscribe at any time.",
  },
  {
    heading: "Who handles it",
    body: "We use third-party providers to run this site, receive form submissions and schedule calls. They process your information on our behalf. [[TODO: list your real providers, such as Vercel, Formspree and Calendly]]",
  },
  {
    heading: "How long we keep it",
    body: "[[TODO: state how long you keep inquiries and client records]]",
  },
  {
    heading: "Your choices",
    body: `You can ask us to access, correct or delete your information by emailing ${siteConfig.email}. [[TODO: add any rights required where you and your clients are based, such as GDPR or CCPA]]`,
  },
];

export default function PrivacyPage() {
  return (
    <article className="page py-14 md:py-20">
      <h1 className="text-[clamp(2.75rem,6vw,5rem)]">Privacy policy</h1>
      <p className="mt-6 max-w-[62ch] leading-relaxed text-ink-soft">
        <Copy text="[[TODO: this is a simple placeholder. Have it reviewed against how you really handle data before launch.]]" />
      </p>
      <div className="mt-10 max-w-[68ch] space-y-9">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="display-small text-2xl">{section.heading}</h2>
            <p className="mt-2 leading-relaxed text-ink">
              <Copy text={section.body} />
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
