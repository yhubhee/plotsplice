"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CategoryId, MenuCategory } from "@/content/services";
import { siteConfig } from "@/site.config";
import { Button } from "./Button";

const plainLinks = [
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
];

function DesktopNav({ menu }: { menu: MenuCategory[] }) {
  const [open, setOpen] = useState<CategoryId | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const openNow = (id: CategoryId) => {
    clearTimeout(closeTimer.current);
    setOpen(id);
  };
  // A short delay so moving the mouse from the label to the card doesn't close the menu.
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  return (
    <nav aria-label="Main" className="hidden xl:block">
      <ul className="flex items-center gap-1">
        {menu.map((category, index) => {
          const isOpen = open === category.id;
          const menuId = `menu-${category.id}`;
          // The last two menus open leftward so they can't run off the screen.
          const alignRight = index >= menu.length - 2;
          return (
            <li
              key={category.id}
              className="relative"
              onPointerEnter={(e) => e.pointerType === "mouse" && openNow(category.id)}
              onPointerLeave={(e) => e.pointerType === "mouse" && closeSoon()}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setOpen(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape" && isOpen) {
                  setOpen(null);
                  e.currentTarget.querySelector("button")?.focus();
                }
              }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={menuId}
                onClick={() => setOpen(isOpen ? null : category.id)}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-[0.95rem] font-medium text-ink-green hover:bg-ink-green/5"
              >
                {category.menuTitle}
                <ChevronDown
                  aria-hidden
                  size={15}
                  className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                id={menuId}
                hidden={!isOpen}
                className={`absolute top-full w-80 pt-2 ${alignRight ? "right-0" : "left-0"}`}
              >
                <ul className="rounded-xl border-t-[3px] border-gold bg-white p-2 shadow-card">
                  {category.services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        onClick={() => setOpen(null)}
                        className="block rounded-md px-3 py-2 text-[0.95rem] leading-snug text-ink hover:bg-paper hover:text-ink-green"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
        {plainLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-md px-3 py-2 text-[0.95rem] font-medium text-ink-green hover:bg-ink-green/5"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MobileNav({ menu }: { menu: MenuCategory[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<CategoryId | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setIsOpen(false);
    toggleRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("button")?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape closes the panel; Tab stays inside it while it's open.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>("a, button");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="xl:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-label="Open menu"
        onClick={() => setIsOpen(true)}
        className="flex size-11 items-center justify-center rounded-md text-ink-green hover:bg-ink-green/5"
      >
        <Menu aria-hidden size={24} />
      </button>

      <div
        aria-hidden
        onClick={close}
        className={`fixed inset-0 z-40 bg-ink-green-deep/50 transition-opacity ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onKeyDown={onKeyDown}
        className={`slide-panel fixed inset-y-0 right-0 z-50 flex w-[min(90vw,26rem)] flex-col bg-paper shadow-card transition-[transform,visibility] duration-300 ${isOpen ? "visible translate-x-0" : "invisible translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <span className="font-display text-2xl text-ink-green">{siteConfig.name}</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="flex size-11 items-center justify-center rounded-md text-ink-green hover:bg-ink-green/5"
          >
            <X aria-hidden size={24} />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pb-4">
          <ul>
            {menu.map((category) => {
              const isExpanded = expanded === category.id;
              return (
                <li key={category.id} className="border-b border-ink-green/15">
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setExpanded(isExpanded ? null : category.id)}
                    className="flex min-h-13 w-full items-center justify-between gap-3 py-3 text-left display-small text-xl text-ink-green"
                  >
                    {category.menuTitle}
                    <ChevronDown
                      aria-hidden
                      size={18}
                      className={`shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isExpanded && (
                    <ul className="pb-3">
                      {category.services.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="block py-2 leading-snug text-ink"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
            {plainLinks.map((link) => (
              <li key={link.href} className="border-b border-ink-green/15">
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 display-small text-xl text-ink-green"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-5" onClick={() => setIsOpen(false)}>
          <Button href="/contact" className="w-full">
            Book a Free Strategy Call
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Header({ menu }: { menu: MenuCategory[] }) {
  return (
    <header className="sticky top-0 z-30 border-b border-ink-green/10 bg-paper">
      <div className="page flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" className="font-display text-[1.7rem] leading-none text-ink-green">
          {siteConfig.name}
        </Link>
        <DesktopNav menu={menu} />
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href="/contact" className="!min-h-11 !px-4 !py-2 text-[0.95rem]">
              Book a Free Strategy Call
            </Button>
          </div>
          <MobileNav menu={menu} />
        </div>
      </div>
    </header>
  );
}
