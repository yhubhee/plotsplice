import { NextResponse, type NextRequest } from "next/server";
import { services } from "@/content/services";

const knownSlugs = new Set(services.map((service) => service.slug));

// Service pages are sent before the page itself can check the slug, so a mistyped URL
// would show the not-found page with a 200 status, which search engines count against
// a site. Checking here returns a true 404.
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (knownSlugs.has(slug)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/page-not-found", request.url));
}

export const config = { matcher: "/services/:slug" };
