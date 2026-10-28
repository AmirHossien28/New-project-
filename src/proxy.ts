import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  localeCookieName,
  locales,
  type Locale,
} from "@/config/site";

/**
 * در Next.js 16، فایل middleware به proxy تغییر نام داده است.
 * کار این فایل: هر آدرس بدون زبان (مثل /about) را به نسخه زبان‌دار (/fa/about) هدایت کند.
 * زبان از کوکی انتخاب کاربر، وگرنه از هدر Accept-Language مرورگر، وگرنه پیش‌فرض است.
 */

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

function getPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    // نمونه: "en-US,en;q=0.9,fa;q=0.8" → ["en-US", "en", "fa"]
    const requested = acceptLanguage
      .split(",")
      .map((part) => part.split(";")[0]?.trim().toLowerCase())
      .filter(Boolean);

    for (const tag of requested) {
      const base = tag.split("-")[0];
      if (base && isLocale(base)) return base;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (pathnameHasLocale) return NextResponse.next();

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  /*
   * این مسیرها را رد می‌کنیم:
   * api (مسیرهای API)، _next (فایل‌های خود Next)، فایل‌های عمومی (پسوند دارند).
   */
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
