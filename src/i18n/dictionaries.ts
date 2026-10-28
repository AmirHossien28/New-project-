import { defaultLocale, locales, type Locale } from "@/config/site";
import en from "./dictionaries/en.json";
import fa from "./dictionaries/fa.json";

/**
 * دیکشنری = متن‌های ثابت رابط کاربری (دکمه‌ها، عنوان‌ها، پیام‌ها).
 * محتوای واقعی (نام کسب‌وکار، متن پست و …) اینجا نیست؛ آن‌ها داده هستند و از دیتابیس می‌آیند.
 *
 * دیکشنری فارسی «مرجع» است؛ بنابراین اگر کلیدی در ترجمه انگلیسی جا بیفتد،
 * TypeScript هنگام build خطا می‌دهد.
 */
export type Dictionary = typeof fa;

const dictionaries: Record<Locale, Dictionary> = {
  fa,
  en: en as Dictionary,
};

/** بررسی معتبر بودن زبانِ مسیر؛ نشانه‌گذاری نوع برای TypeScript */
export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** گرفتن دیکشنری یک زبان. اگر زبان ناشناخته باشد، زبان پیش‌فرض برمی‌گردد. */
export function getDictionary(locale: string): Dictionary {
  return dictionaries[hasLocale(locale) ? locale : defaultLocale];
}

/** انتخاب متن فارسی یا انگلیسی از یک ساختار دوزبانه */
export function pick<T>(text: { fa: T; en: T }, locale: Locale): T {
  return text[locale] ?? text[defaultLocale];
}
