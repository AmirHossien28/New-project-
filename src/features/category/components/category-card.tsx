import Link from "next/link";
import type { Locale } from "@/config/site";
import { localePath } from "@/config/site";
import { pick } from "@/i18n/dictionaries";
import type { Category } from "@/types";
import { formatNumber } from "@/lib/format";
import { CategoryIcon } from "./category-icon";
import { cn } from "@/lib/utils";

/** کارت دسته‌بندی: یک ورودی ساده و سریع به کشف کسب‌وکارها. */
export function CategoryCard({
  category,
  locale,
  countLabel,
  className,
}: {
  category: Category;
  locale: Locale;
  countLabel: string;
  className?: string;
}) {
  return (
    <Link
      href={`${localePath(locale, "/search")}?category=${category.slug}`}
      className={cn(
        "group flex items-center gap-3 rounded-lg border border-border bg-surface p-4 transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
        <CategoryIcon name={category.icon} className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium">
          {pick(category.name, locale)}
        </span>
        <span className="block text-xs text-muted-foreground">
          {formatNumber(category.businessCount, locale)} {countLabel}
        </span>
      </span>
    </Link>
  );
}
