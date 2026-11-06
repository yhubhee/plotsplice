import Link from "next/link";
import type { Service } from "@/content/services";
import { cloth } from "./cloth";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      prefetch={false}
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-page-white p-6 pl-8 shadow-card"
    >
      {/* A strip of the category's cloth, like the spine on the shelf. */}
      <span aria-hidden className={`absolute inset-y-0 left-0 w-2 ${cloth[service.category].swatch}`} />
      <h3 className="display-small text-[1.4rem] leading-tight">{service.title}</h3>
      <p className="mb-4 mt-2 leading-relaxed text-ink-soft">{service.shortDescription}</p>
      <span className="mt-auto font-medium text-ink-green underline decoration-gold decoration-2 underline-offset-4 group-hover:decoration-ink-green">
        Learn more →
      </span>
    </Link>
  );
}
