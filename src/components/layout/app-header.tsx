import Link from "next/link";
import { Bell } from "lucide-react";
import type { Locale } from "@/config/site";
import { localePath, siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo } from "@/components/brand/logo";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLinks, type NavItem } from "@/components/layout/nav-links";
import { SearchBar } from "@/components/ui/search-bar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { buttonVariants } from "@/components/ui/button";

/**
 * هدر اصلی.
 * یک کامپوننت سرور است تا متن‌های ترجمه و لینک‌ها روی سرور ساخته شوند.
 * فقط بخش‌هایی که به تعامل نیاز دارند (منو، تم، زبان) کلاینتی هستند.
 */
export function AppHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const navItems: NavItem[] = [
    { href: localePath(locale), label: dict.nav.home },
    { href: localePath(locale, "/search"), label: dict.nav.discover },
  ];

  return (
    <header className="glass sticky top-0 z-40 border-b border-border">
      <div className="container-page flex h-16 items-center gap-2 sm:gap-3">
        <Link
          href={localePath(locale)}
          className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          aria-label={siteConfig.name}
        >
          <Logo name={siteConfig.nameLocal[locale]} />
        </Link>

        <div className="ms-2 hidden lg:block">
          <NavLinks items={navItems} />
        </div>

        {/* جست‌وجو در تبلت و دسکتاپ */}
        <div className="mx-auto hidden w-full max-w-md md:block">
          <SearchBar
            locale={locale}
            placeholder={dict.common.searchPlaceholder}
            submitLabel={dict.common.search}
            variant="header"
          />
        </div>

        <div className="ms-auto flex items-center gap-2 md:ms-0">
          <button
            type="button"
            disabled
            title={dict.nav.notifications}
            aria-label={dict.nav.notifications}
            className="hidden size-10 cursor-not-allowed items-center justify-center rounded-full border border-border bg-surface text-muted-foreground/60 sm:inline-flex"
          >
            <Bell className="size-[1.15rem]" aria-hidden />
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            <ThemeToggle label={dict.nav.theme} />
            <LocaleSwitcher current={locale} label={dict.nav.language} />
          </div>

          <Link
            href={localePath(locale, "/login")}
            className={buttonVariants({
              variant: "primary",
              size: "sm",
              className: "hidden h-10 px-4 sm:inline-flex",
            })}
          >
            {dict.nav.login}
          </Link>

          <MobileNav locale={locale} dict={dict} items={navItems} />
        </div>
      </div>
    </header>
  );
}
