import { Button } from "./Button";

type CtaBandProps = {
  heading?: string;
  body?: string;
  href?: string;
  label?: string;
};

export function CtaBand({
  heading = "Tell us about your book. We’ll tell you the truth about it.",
  body = "Thirty minutes with a senior strategist, free. You’ll leave knowing what’s holding the book back, whether or not you work with us.",
  href = "/contact",
  label = "Book My Free Strategy Call",
}: CtaBandProps) {
  return (
    <section className="on-dark bg-ink-green py-20 text-paper md:py-28">
      <div className="page flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="max-w-[17ch] text-[clamp(2.5rem,5.5vw,4.75rem)] !text-paper">{heading}</h2>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-paper/85">{body}</p>
        </div>
        <Button href={href} variant="gold" className="shrink-0">
          {label}
        </Button>
      </div>
    </section>
  );
}
