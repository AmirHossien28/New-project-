import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";

import {
  localeDirection,
  locales,
  siteConfig,
  type Locale,
} from "@/config/site";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { ThemeScript } from "@/components/ui/theme-script";

/**
 * صفحه‌های ثابتی که از پیش ساخته می‌شوند (fa و en).
 * با این کار هر زبان یک نسخه استاتیک سریع دارد.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return {
    title: {
      default: dict.meta.title,
      template: `%s — ${siteConfig.nameLocal[locale as Locale] ?? siteConfig.name}`,
    },
    description: dict.meta.description,
    applicationName: siteConfig.name,
    alternates: {
      languages: Object.fromEntries(locales.map((item) => [item, `/${item}`])),
    },
  };
}

/** فونتی که باید در همان زبان پیش‌بارگذاری شود تا متن دیرتر ظاهر نشود */
const preloadByLocale: Record<string, string[]> = {
  fa: [
    "/fonts/vazirmatn-arabic-wght-normal.woff2",
    "/fonts/vazirmatn-latin-wght-normal.woff2",
  ],
  en: ["/fonts/inter-latin-wght-normal.woff2"],
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  // اگر کسی آدرسی مثل /xx بسازد، ۴۰۴ می‌گیرد (نه یک صفحه با زبان نامعتبر)
  if (!hasLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const dir = localeDirection[locale];

  return (
    <html lang={locale} dir={dir} className="h-full" suppressHydrationWarning>
      <head>
        <ThemeScript />
        {preloadByLocale[locale]?.map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-on-primary"
        >
          {dict.nav.skipToContent}
        </a>

        <AppHeader locale={locale} dict={dict} />

        <main id="main" className="flex-1">
          {children}
        </main>

        <AppFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}
