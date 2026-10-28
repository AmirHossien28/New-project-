"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { themeCookieName } from "@/config/site";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

/**
 * وضعیت تم، «منبع حقیقت» آن کلاس .dark روی تگ <html> است — نه state داخلی.
 * چرا؟ چون همان کلاس را اسکریپت داخل layout قبل از رندر ست می‌کند.
 * با useSyncExternalStore این وضعیت DOM را می‌خوانیم، بدون useEffect و بدون
 * ناهم‌خوانی hydration (سرور «روشن» را فرض می‌کند، کلاینت بعد از hydration به‌روز می‌شود).
 */
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/** در سرور کلاسی وجود ندارد؛ مقدار پیش‌فرض همان تم روشن است */
function getServerSnapshot(): Theme {
  return "light";
}

function setTheme(next: Theme) {
  document.documentElement.classList.toggle("dark", next === "dark");
  try {
    localStorage.setItem(themeCookieName, next);
  } catch {
    /* اگر localStorage مسدود بود، فقط کوکی را ست می‌کنیم */
  }
  document.cookie = `${themeCookieName}=${next}; path=/; max-age=31536000; samesite=lax`;
  listeners.forEach((listener) => listener());
}

/**
 * سوییچ تم روشن/تاریک.
 * انتخاب کاربر در localStorage (دفعه بعد) و یک کوکی (هم‌خوانی) ذخیره می‌شود.
 */
export function ThemeToggle({ label, className }: { label: string; className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground",
        "transition-colors hover:border-border-strong hover:text-foreground",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      {theme === "dark" ? (
        <Sun className="size-[1.15rem]" aria-hidden />
      ) : (
        <Moon className="size-[1.15rem]" aria-hidden />
      )}
    </button>
  );
}
