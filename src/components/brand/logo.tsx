import { cn } from "@/lib/utils";

/**
 * نشان پیدانو: یک «پین مکان» با هسته طلایی.
 * مفهوم: کشف کسب‌وکار در یک نقطه از شهر — و رنگ طلایی برند به‌عنوان لهجه.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-hidden
      className={cn("size-9", className)}
    >
      <defs>
        <linearGradient id="pidano-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#134E4A" />
          <stop offset="55%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#1D8F83" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#pidano-mark)" />
      <path
        d="M16 6.5c-3.7 0-6.7 3-6.7 6.7 0 4.6 6.7 12.3 6.7 12.3s6.7-7.7 6.7-12.3c0-3.7-3-6.7-6.7-6.7Z"
        fill="#FFFFFF"
        fillOpacity="0.95"
      />
      <circle cx="16" cy="13.2" r="2.6" fill="#C5A46D" />
    </svg>
  );
}

/** نشان کامل: آیکون + نام برند */
export function Logo({
  name,
  className,
  markClassName,
}: {
  name: string;
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} />
      <span className="text-lg font-bold tracking-tight text-foreground">{name}</span>
    </span>
  );
}
