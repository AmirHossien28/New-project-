import { Search } from "lucide-react";
import type { Locale } from "@/config/site";
import { localePath } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * نوار جست‌وجو.
 * یک <form method="get"> ساده است؛ بنابراین حتی بدون جاوااسکریپت هم کار می‌کند
 * و نتیجه در آدرس می‌نشیند (/fa/search?q=...). این برای اشتراک‌گذاری لینک جست‌وجو هم بهتر است.
 */
export function SearchBar({
  locale,
  placeholder,
  submitLabel,
  variant = "default",
  defaultValue,
  className,
}: {
  locale: Locale;
  placeholder: string;
  submitLabel: string;
  variant?: "default" | "hero" | "header";
  defaultValue?: string;
  className?: string;
}) {
  const isHero = variant === "hero";
  const isHeader = variant === "header";

  return (
    <form
      action={localePath(locale, "/search")}
      method="get"
      role="search"
      className={cn("relative w-full", className)}
    >
      <Search
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground",
          "start-4",
          isHeader ? "size-4" : "size-[1.15rem]",
        )}
        aria-hidden
      />
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-label={submitLabel}
        className={cn(
          "w-full rounded-full border border-border bg-surface text-foreground placeholder:text-muted-foreground",
          "transition-colors duration-200 hover:border-border-strong",
          "focus:border-primary/60 focus:outline-none focus:ring-4 focus:ring-primary/12",
          isHeader ? "h-10 ps-10 pe-4 text-sm" : "h-12 ps-12 pe-4 text-[0.95rem]",
          isHero && "h-14 ps-14 pe-32 text-base shadow-card",
        )}
      />
      {isHero ? (
        <button
          type="submit"
          className="absolute top-1/2 end-2 h-10 -translate-y-1/2 rounded-full bg-primary px-5 text-sm font-medium text-on-primary transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {submitLabel}
        </button>
      ) : null}
    </form>
  );
}
