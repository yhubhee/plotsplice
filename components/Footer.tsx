import Link from "next/link";
import { categories, servicesIn } from "@/content/services";
import { siteConfig } from "@/site.config";
import { CurrentYear } from "./CurrentYear";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/stories", label: "Stories" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

// Inline because lucide no longer ships brand icons.
const socialIcons = [
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    path: "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.6 4.8-4.9 4.9-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-3.2 1.6-4.8 4.9-4.9 1.2-.1 1.6-.1 4.8-.1zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z",
  },
  {
    label: "TikTok",
    href: siteConfig.social.tiktok,
    path: "M16.6 2h-3.3v13.6a2.9 2.9 0 1 1-2-2.8V9.5a6.2 6.2 0 1 0 5.3 6.1V8.8a7.6 7.6 0 0 0 4.4 1.4V6.9a4.4 4.4 0 0 1-4.4-4.9z",
  },
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.75H3V9.75zm6.5 0h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v6.1h-4v-5.4c0-1.3 0-2.95-1.8-2.95s-2.07 1.4-2.07 2.86v5.5h-4V9.75z",
  },
  {
    label: "X",
    href: siteConfig.social.x,
    path: "M17.7 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L1.7 3h6.4l4.4 5.9L17.7 3zm-1.1 16.2h1.7L7.2 4.7H5.4l11.2 14.5z",
  },
];

export function Footer() {
  return (
    <footer className="bg-paper-deep">
      <div className="page py-14">
        <div className="max-w-xl">
          <Link href="/" className="font-display text-4xl text-ink-green">
            {siteConfig.name}
          </Link>
          <p className="mt-3 text-ink-soft">{siteConfig.tagline}</p>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {categories.map((category) => (
            <nav key={category.id} aria-label={`${category.title} services`}>
              <h2 className="display-small text-lg text-ink-green">{category.title}</h2>
              <ul className="mt-3 space-y-2 text-[0.92rem] leading-snug">
                {servicesIn(category.id).map((service) => (
                  <li key={service.slug}>
                    <Link prefetch={false} href={`/services/${service.slug}`} className="text-ink-soft hover:text-ink-green hover:underline">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <nav aria-label="Company">
              <h2 className="display-small text-lg text-ink-green">Company</h2>
              <ul className="mt-3 space-y-2 text-[0.92rem]">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link prefetch={false} href={link.href} className="text-ink-soft hover:text-ink-green hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-6 block text-[0.92rem] font-medium text-ink-green underline decoration-gold decoration-2 underline-offset-4"
            >
              {siteConfig.email}
            </a>
            <ul className="mt-5 flex gap-1">
              {socialIcons.map((icon) => (
                <li key={icon.label}>
                  <a
                    href={icon.href}
                    aria-label={`${siteConfig.name} on ${icon.label}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center rounded-md text-ink-green hover:bg-ink-green/10"
                  >
                    <svg aria-hidden viewBox="0 0 24 24" className="size-[18px] fill-current">
                      <path d={icon.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-ink-green/15 pt-6 text-sm text-ink-soft">
          © <CurrentYear /> {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
