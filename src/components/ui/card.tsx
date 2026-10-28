import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * سطح پایه کارت‌ها: گوشه‌های متعادل، حاشیه نرم و سایه سبک.
 * عمداً خیلی عمومی ساخته نشده؛ فقط همان چیزی که کارت‌های پلتفرم لازم دارند.
 */
export function Card({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  /** اگر کارت کلیک‌پذیر است، در hover کمی بالا می‌آید */
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface shadow-card",
        interactive &&
          "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-border-strong hover:shadow-pop",
        className,
      )}
    >
      {children}
    </div>
  );
}
