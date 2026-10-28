import Link from "next/link";
import { BadgeCheck, MapPin } from "lucide-react";
import type { Locale } from "@/config/site";
import { localePath } from "@/config/site";
import { pick, type Dictionary } from "@/i18n/dictionaries";
import type { Business } from "@/types";
import { formatCompactNumber } from "@/lib/format";
import { toneGradient } from "@/lib/tones";
import { Avatar } from "@/components/ui/avatar";
import { FollowButton } from "@/components/ui/follow-button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * کارت کسب‌وکار.
 * ساختار: کاور (فعلاً گرادیان برند به‌جای تصویر) + لوگو + نام + دسته و شهر + دنبال‌کردن.
 * در فاز رسانه، کاور و لوگو از فایل واقعی (S3) خوانده می‌شوند.
 */
export function BusinessCard({
  business,
  categoryName,
  locale,
  dict,
  variant = "default",
  className,
}: {
  business: Business;
  categoryName: string;
  locale: Locale;
  dict: Dictionary;
  variant?: "default" | "compact";
  className?: string;
}) {
  const name = pick(business.name, locale);
  const href = localePath(locale, `/business/${business.slug}`);

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <Avatar name={business.name} tone={business.tone} locale={locale} size="sm" />
        <div className="min-w-0 flex-1">
          <Link
            href={href}
            className="flex items-center gap-1 truncate text-sm font-medium hover:text-primary"
          >
            {name}
            {business.verified ? (
              <BadgeCheck className="size-3.5 shrink-0 text-primary" aria-label={dict.common.verified} />
            ) : null}
          </Link>
          <p className="truncate text-xs text-muted-foreground">{categoryName}</p>
        </div>
        <FollowButton
          labelFollow={dict.common.follow}
          labelFollowing={dict.common.following}
          className="shrink-0"
        />
      </div>
    );
  }

  return (
    <Card interactive className={cn("group overflow-hidden", className)}>
      {/* کاور */}
      <div className={cn("relative h-24 w-full", toneGradient[business.tone])}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
        {business.featured ? (
          <span className="absolute top-3 end-3 rounded-full bg-white/15 px-2.5 py-1 text-[0.68rem] font-medium text-white backdrop-blur-sm ring-1 ring-white/25">
            {dict.common.featured}
          </span>
        ) : null}
      </div>

      <div className="px-4 pb-4">
        <div className="-mt-6 flex items-end justify-between gap-2">
          <Avatar
            name={business.name}
            tone={business.tone}
            locale={locale}
            size="lg"
            className="size-14 rounded-lg ring-4 ring-[var(--surface)]"
          />
          <FollowButton
            labelFollow={dict.common.follow}
            labelFollowing={dict.common.following}
            className="mb-1"
          />
        </div>

        <div className="mt-3">
          <Link
            href={href}
            className="flex items-center gap-1.5 text-base font-semibold transition-colors hover:text-primary"
          >
            <span className="truncate">{name}</span>
            {business.verified ? (
              <BadgeCheck
                className="size-4 shrink-0 text-primary"
                aria-label={dict.common.verified}
              />
            ) : null}
          </Link>

          <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
            {pick(business.tagline, locale)}
          </p>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
          <span className="rounded-full bg-surface-muted px-2 py-0.5 font-medium text-foreground/80">
            {categoryName}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" aria-hidden />
            {pick(business.city, locale)}
          </span>
          <span className="inline-flex items-center gap-1">
            {formatCompactNumber(business.followers, locale)} {dict.common.followers}
          </span>
        </div>
      </div>
    </Card>
  );
}
