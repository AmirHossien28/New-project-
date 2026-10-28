import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * وضعیت خالی (Empty state).
 * هر فهرستی در پلتفرم ممکن است خالی باشد؛ این کامپوننت باعث می‌شود
 * «خالی بودن» شبیه خطا یا خرابی به‌نظر نرسد.
 */
export function EmptyState({
  icon,
  title,
  body,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  body?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface/60 px-6 py-12 text-center",
        className,
      )}
    >
      {icon ? (
        <div className="flex size-12 items-center justify-center rounded-full bg-surface-muted text-muted-foreground">
          {icon}
        </div>
      ) : null}
      <p className="font-medium">{title}</p>
      {body ? (
        <p className="max-w-sm text-sm leading-6 text-muted-foreground">{body}</p>
      ) : null}
      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  );
}
