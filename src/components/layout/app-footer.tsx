import Link from "next/link";
import type { Locale } from "@/config/site";
import { localePath, siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo } from "@/components/brand/logo";

/** پاورقی: سبک و کوتاه — در محصولی مثل پیدانو، پاورقی سنگین جایش را نمی‌گیرد. */
export function AppFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  const links = [
    { label: dict.footer.about, href: localePath(locale, "/search") },
    { label: dict.footer.guidelines, href: localePath(locale, "/search") },
    { label: dict.footer.privacy, href: localePath(locale, "/search") },
    { label: dict.footer.terms, href: localePath(locale, "/search") },
  ];

  return (
    <footer className="mt-16 border-t border-border bg-surface/60">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-3">
          <Logo name={siteConfig.nameLocal[locale]} />
          <p className="text-sm leading-6 text-muted-foreground">{dict.footer.tagline}</p>
        </div>

        <nav aria-label={dict.footer.company} className="flex flex-wrap gap-x-6 gap-y-3">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {siteConfig.nameLocal[locale]} — {dict.footer.rights}
          </span>
          <span>{dict.common.previewNotice}</span>
        </div>
      </div>
    </footer>
  );
}
