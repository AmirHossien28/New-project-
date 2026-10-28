import { BadgeCheck, Heart, MessageCircle, Play, Share2, Store } from "lucide-react";
import type { Locale } from "@/config/site";
import { pick, type Dictionary } from "@/i18n/dictionaries";
import type { Post } from "@/types";
import { formatCompactNumber } from "@/lib/format";
import { toneGradient } from "@/lib/tones";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * کارت پست.
 * انواع محتوا (متن/تصویر/ویدیو) یک قالب مشترک دارند و فقط بخش رسانه تفاوت می‌کند.
 * دکمه‌های تعامل فعلاً فقط نمایشی هستند؛ در فاز بعد Server Action می‌گیرند.
 */
export function PostCard({
  post,
  locale,
  dict,
  className,
}: {
  post: Post;
  locale: Locale;
  dict: Dictionary;
  className?: string;
}) {
  const authorName = pick(post.author.name, locale);

  return (
    <Card interactive className={cn("overflow-hidden", className)}>
      <article>
        <header className="flex items-start gap-3 p-4 pb-3">
          <Avatar name={post.author.name} tone={post.author.tone} locale={locale} />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
              <span className="truncate font-medium">{authorName}</span>
              {post.author.verified ? (
                <BadgeCheck
                  className="size-4 shrink-0 text-primary"
                  aria-label={dict.common.verified}
                />
              ) : null}
              {post.author.isBusiness ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-gold-soft px-2 py-0.5 text-[0.65rem] font-medium text-on-gold">
                  <Store className="size-3" aria-hidden />
                  {dict.post.businessPost}
                </span>
              ) : null}
            </div>
            <p className="text-xs text-muted-foreground">
              @{post.author.handle} · {pick(post.time, locale)}
            </p>
          </div>
        </header>

        <div className="px-4 pb-3">
          <p className="text-[0.95rem] leading-7 text-foreground/90">
            {pick(post.body, locale)}
          </p>
        </div>

        {post.media ? (
          <div
            className={cn(
              "relative mx-4 mb-3 aspect-16/10 overflow-hidden rounded-md",
              toneGradient[post.media.tone],
            )}
            role="img"
            aria-label={`${dict.post.mediaPlaceholder} — ${
              post.media.type === "video" ? dict.post.videoLabel : dict.post.imageLabel
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_60%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              {post.media.type === "video" ? (
                <span className="flex size-14 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/40 backdrop-blur-sm">
                  <Play className="size-6 translate-x-px" aria-hidden />
                </span>
              ) : (
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/25">
                  {dict.post.imageLabel}
                </span>
              )}
            </div>
          </div>
        ) : null}

        <footer className="flex items-center justify-between gap-2 border-t border-border px-2 py-1.5">
          <div className="flex items-center gap-0.5">
            <InteractionButton
              icon={<Heart className="size-[1.15rem]" aria-hidden />}
              label={dict.post.like}
              count={post.likes}
              locale={locale}
            />
            <InteractionButton
              icon={<MessageCircle className="size-[1.15rem]" aria-hidden />}
              label={dict.post.comment}
              count={post.comments}
              locale={locale}
            />
          </div>
          <InteractionButton
            icon={<Share2 className="size-[1.15rem]" aria-hidden />}
            label={dict.post.share}
            locale={locale}
            flipIcon
          />
        </footer>
      </article>
    </Card>
  );
}

function InteractionButton({
  icon,
  label,
  count,
  locale,
  flipIcon,
}: {
  icon: React.ReactNode;
  label: string;
  count?: number;
  locale: Locale;
  /** آیکون‌های جهت‌دار باید در RTL آینه شوند (فقط ظاهری، نه معنایی) */
  flipIcon?: boolean;
}) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <span className={flipIcon ? "rtl:-scale-x-100" : undefined}>{icon}</span>
      <span className="sr-only">{label}</span>
      {typeof count === "number" ? (
        <span aria-hidden>{formatCompactNumber(count, locale)}</span>
      ) : null}
    </button>
  );
}
