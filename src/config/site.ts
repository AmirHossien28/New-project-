/**
 * تنظیمات سراسری برنامه.
 * هر چیزی که در چند جای پروژه استفاده می‌شود و «عدد جادویی» یا «رشته تکرارشده» است،
 * بهتر است اینجا تعریف شود تا در آینده فقط یک نقطه برای تغییر باشد.
 */

/** زبان‌های پشتیبانی‌شده. برای افزودن زبان جدید، فقط همین آرایه و پوشه دیکشنری را تکمیل کنید. */
export const locales = ["fa", "en"] as const;

export type Locale = (typeof locales)[number];

/** زبان پیش‌فرض؛ اگر مرورگر کاربر زبان دیگری بخواهد، پروکسی به آن زبان هدایت می‌کند. */
export const defaultLocale: Locale = "fa";

/** جهت چیدمان هر زبان. این مقدار روی تگ <html> به شکل dir="rtl|ltr" قرار می‌گیرد. */
export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  fa: "rtl",
  en: "ltr",
};

/** نام زبان برای نمایش در سوییچر زبان (همیشه به خط خودِ آن زبان نوشته می‌شود). */
export const localeLabel: Record<Locale, string> = {
  fa: "فارسی",
  en: "English",
};

/** نام کوکی‌ای که انتخاب دستی زبان را نگه می‌دارد. */
export const localeCookieName = "pidano_locale";

/** کوکی تم (روشن/تاریک) برای جلوگیری از پرش رنگ در اولین بارگذاری. */
export const themeCookieName = "pidano_theme";

export const siteConfig = {
  name: "Pidano",
  nameLocal: { fa: "پیدانو", en: "Pidano" },
  tagline: {
    fa: "کسب‌وکارها و آدم‌ها را کشف کنید",
    en: "Discover businesses and people",
  },
  description: {
    fa: "پیدانو پلتفرمی برای کشف کسب‌وکارها، دنبال‌کردن آدم‌ها و کسب‌وکارها و انتشار محتواست.",
    en: "Pidano is a platform to discover businesses, follow people and businesses, and share content.",
  },
} as const;

/** ساخت مسیرهای داخلی همراه با زبان. مثال: localePath("fa", "/search") => "/fa/search" */
export function localePath(locale: Locale, path = ""): string {
  if (!path || path === "/") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}
