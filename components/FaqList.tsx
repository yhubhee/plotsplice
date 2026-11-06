import { Plus } from "lucide-react";
import type { Faq } from "@/content/home";
import { Copy } from "./Copy";
import { JsonLd } from "./JsonLd";

// An accordion that works without JavaScript, plus FAQPage structured data.
export function FaqList({ faqs }: { faqs: Faq[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer.replace(/\s*\[\[.*?\]\]/g, "") },
    })),
  };

  return (
    <div className="border-t border-ink-green/20">
      <JsonLd data={structuredData} />
      {faqs.map((faq) => (
        <details key={faq.question} className="faq-item border-b border-ink-green/20">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 display-small text-xl text-ink-green md:text-2xl">
            {faq.question}
            <Plus aria-hidden size={20} className="faq-icon shrink-0 text-gold-deep transition-transform" />
          </summary>
          <p className="max-w-[62ch] pb-6 leading-relaxed text-ink-soft">
            <Copy text={faq.answer} />
          </p>
        </details>
      ))}
    </div>
  );
}
