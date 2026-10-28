import type { Locale } from "@/config/site";

const intlLocale: Record<Locale, string> = {
  fa: "fa-IR",
  en: "en-US",
};

/** ۱۲۳۴ => "۱٬۲۳۴" در فارسی و "1,234" در انگلیسی */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale[locale]).format(value);
}

/** ۱۲۸۰۰ => "۱۲.۸ هزار" در فارسی و "12.8K" در انگلیسی */
export function formatCompactNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale[locale], {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
