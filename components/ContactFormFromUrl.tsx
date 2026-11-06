"use client";

import { useSearchParams } from "next/navigation";
import type { MenuCategory } from "@/content/services";
import { ContactForm } from "./ContactForm";

// Pre-selects the service named in ?service=<slug>. The key rebuilds the form if the
// service changes, because Next keeps recently visited pages mounted between navigations.
export function ContactFormFromUrl({ menu }: { menu: MenuCategory[] }) {
  const service = useSearchParams().get("service");
  return <ContactForm key={service ?? "none"} menu={menu} initialService={service} />;
}
