"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/config/site";
import { localePath } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { NavLinks, type NavItem } from "@/components/layout/nav-links";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SearchBar } from "@/components/ui/search-bar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * منوی موبایل.
 * روی موبایل فضای هدر کم است؛ ناوبری کامل داخل یک پنل تمام‌صفحه می‌رود.
 * با Escape بسته می‌شود و هنگام باز بودن، اسکرول پشت آن قفل می‌شود.
 */
export function MobileNav({
  locale,
  dict,
  items,
}: {
  locale: Locale;
  dict: Dictionary;
  items: NavItem[];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={dict.nav.openMenu}
        aria-expanded={open}
        className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-border-strong lg:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-x-0 top-0 max-h-[92vh] overflow-y-auto rounded-b-2xl border-b border-border bg-surface p-4 shadow-pop animate-rise">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">
                {dict.nav.menu}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={dict.nav.closeMenu}
                className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-foreground"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <SearchBar
              locale={locale}
              placeholder={dict.common.searchPlaceholder}
              submitLabel={dict.common.search}
              variant="header"
            />

            <NavLinks
              items={items}
              onNavigate={() => setOpen(false)}
              className="mt-4 flex-col items-stretch gap-1"
              itemClassName="justify-start px-4 py-3 text-base"
            />

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
              <div className="flex items-center gap-2">
                <ThemeToggle label={dict.nav.theme} />
                <LocaleSwitcher current={locale} label={dict.nav.language} />
              </div>
              <Link
                href={localePath(locale, "/login")}
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
              >
                {dict.nav.login}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
