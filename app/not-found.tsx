import type { Metadata } from "next";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="page py-24 md:py-36">
      <h1 className="max-w-[14ch] text-[clamp(2.75rem,6.5vw,5.5rem)]">This page is out of print.</h1>
      <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
        The link may be old or mistyped. You can head back to the home page or browse every service we offer.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Back to the home page</Button>
        <Button href="/services" variant="secondary">
          Explore Services
        </Button>
      </div>
    </section>
  );
}
