"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * دکمه دنبال‌کردن.
 * توجه: در این مرحله فقط وضعیت ظاهری را عوض می‌کند (بدون سرور).
 * در فاز بعد همین دکمه به یک Server Action وصل می‌شود و
 * سرور باید مجوز و وضعیت واقعی را بررسی کند — نه کلاینت.
 */
export function FollowButton({
  initialFollowing = false,
  labelFollow,
  labelFollowing,
  size = "sm",
  className,
}: {
  initialFollowing?: boolean;
  labelFollow: string;
  labelFollowing: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const [following, setFollowing] = useState(initialFollowing);

  return (
    <button
      type="button"
      aria-pressed={following}
      onClick={() => setFollowing((value) => !value)}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full border font-medium transition-all duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        size === "sm" ? "h-8 px-3 text-xs" : "h-10 px-4 text-sm",
        following
          ? "border-border-strong bg-surface text-muted-foreground hover:border-danger/40 hover:text-danger"
          : "border-transparent bg-primary text-on-primary hover:bg-primary-hover",
        className,
      )}
    >
      {following ? (
        <Check className="size-3.5" aria-hidden />
      ) : (
        <Plus className="size-3.5" aria-hidden />
      )}
      {following ? labelFollowing : labelFollow}
    </button>
  );
}
