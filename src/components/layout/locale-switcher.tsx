"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check, Globe } from "lucide-react";
import {
  localeCookieName,
  localeLabel,
  locales,
  type Locale,
} from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * تعویض زبان.
 * زبان فقط «متن» نیست: مسیر صفحه، جهت چیدمان و فونت هم عوض می‌شود.
 * به همین دلیل به‌جای نگه‌داشتن زبان در state، به آدرس زبان‌دار (/fa/... یا /en/...) می‌رویم.
 */
/**
 * ذخیره انتخاب زبان در کوکی.
 * عمداً بیرون از کامپوننت است: قاعده lint پروژه نوشتن در cookie/document را
 * داخل بدنه کامپوننت ممنوع می‌کند (برای جلوگیری از عوارض جانبی در رندر).
 * این تابع فقط داخل event handler صدا زده می‌شود.
 */
function persistLocale(locale: Locale) {
  document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LocaleSwitcher({
  current,
  label,
  className,
}: {
  current: Locale;
  label: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // بستن منو با کلیک بیرون یا کلید Escape
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function switchTo(next: Locale) {
    setOpen(false);
    if (next === current) return;

    // انتخاب دستی را نگه می‌داریم تا پروکسی بار بعد به همان زبان برگردد
    persistLocale(next);

    const segments = pathname.split("/").filter(Boolean);
    const rest = segments.slice(1).join("/"); // همه چیز بعد از بخش زبان
    router.push(`/${next}${rest ? `/${rest}` : ""}`);
    router.refresh();
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        title={label}
        className={cn(
          "inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-sm text-muted-foreground",
          "transition-colors hover:border-border-strong hover:text-foreground",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        )}
      >
        <Globe className="size-4" aria-hidden />
        <span className="hidden sm:inline">{localeLabel[current]}</span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute end-0 top-12 z-50 w-40 overflow-hidden rounded-lg border border-border bg-surface p-1 shadow-pop animate-rise"
        >
          {locales.map((item) => (
            <button
              key={item}
              type="button"
              role="menuitemradio"
              aria-checked={item === current}
              onClick={() => switchTo(item)}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                item === current
                  ? "bg-primary-soft text-primary"
                  : "text-foreground hover:bg-surface-muted",
              )}
            >
              <span lang={item}>{localeLabel[item]}</span>
              {item === current ? <Check className="size-4" aria-hidden /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
