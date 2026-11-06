import { categories, servicesIn } from "@/content/services";
import { siteConfig } from "@/site.config";

// /llms.txt: a plain summary for AI assistants, generated from the same data as the site.
export function GET() {
  const url = siteConfig.url;
  const serviceSections = categories.map((category) => {
    const lines = servicesIn(category.id).map(
      (service) => `- [${service.title}](${url}/services/${service.slug}): ${service.shortDescription}`,
    );
    return `### ${category.title}\n\n${category.summary}\n\n${lines.join("\n")}`;
  });

  const text = `# ${siteConfig.name}

> ${siteConfig.description}

## Who we serve

Independent and self-published authors of fiction and non-fiction, whether they have a manuscript, are planning a first launch, want to relaunch a book, or need ongoing marketing support.

## What we don't promise

${siteConfig.name} does not guarantee bestseller status, sales numbers, rankings, press coverage or a Wikipedia page.

## Services

${serviceSections.join("\n\n")}

## Pages

- [All services](${url}/services)
- [Author stories](${url}/stories)
- [About](${url}/about)
- [Contact and strategy call booking](${url}/contact)

## Contact

- Email: ${siteConfig.email}
- Book a call: ${siteConfig.calendlyUrl}
`;

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
