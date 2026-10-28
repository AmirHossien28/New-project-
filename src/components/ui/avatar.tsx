import type { Localized, Tone } from "@/types";
import type { Locale } from "@/config/site";
import { pick } from "@/i18n/dictionaries";
import { toneGradient } from "@/lib/tones";
import { cn } from "@/lib/utils";

/**
 * آواتار حرف‌اول.
 * به‌جای تصویر واقعی (که هنوز آپلود نداریم) از حرف اول نام و یک گرادیان برند استفاده می‌کند.
 * وقتی Media آماده شد، فقط همین یک کامپوننت باید تصویر را نشان دهد.
 */
export function Avatar({
  name,
  tone = "teal",
  locale,
  size = "md",
  className,
}: {
  name: Localized;
  tone?: Tone;
  locale: Locale;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    xs: "size-7 text-[0.65rem]",
    sm: "size-9 text-xs",
    md: "size-11 text-sm",
    lg: "size-16 text-lg",
  } as const;

  const letter = pick(name, locale).trim().charAt(0);

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ring-1 ring-black/5 dark:ring-white/10",
        toneGradient[tone],
        sizes[size],
        className,
      )}
    >
      {letter}
    </span>
  );
}
