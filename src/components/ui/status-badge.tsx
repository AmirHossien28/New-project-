import type { BusinessStatus } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

/**
 * نشان وضعیت کسب‌وکار.
 * رنگ‌ها معنادار هستند: تأییدشده = موفقیت، در انتظار = هشدار، ردشده = خطا.
 */
const statusStyles: Record<BusinessStatus, string> = {
  DRAFT: "bg-surface-muted text-muted-foreground border-border",
  PENDING_REVIEW: "bg-warning-soft text-warning border-warning/30",
  CHANGES_REQUESTED: "bg-warning-soft text-warning border-warning/30",
  APPROVED: "bg-success-soft text-success border-success/30",
  REJECTED: "bg-danger-soft text-danger border-danger/30",
  SUSPENDED: "bg-danger-soft text-danger border-danger/30",
};

export function StatusBadge({
  status,
  dict,
  className,
}: {
  status: BusinessStatus;
  dict: Dictionary;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        statusStyles[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {dict.status[status]}
    </span>
  );
}
