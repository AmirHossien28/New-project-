import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { localeDirection, localePath, type Locale } from "@/config/site";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * صفحه موقت برای مسیرهایی که هنوز ساخته نشده‌اند.
 * چرا؟ چون لینک‌های ناوبری باید به جایی برسند؛ صفحه ۴۰۴ در پیش‌نمایش طراحی بد به‌نظر می‌رسد.
 * هر کدام از این صفحه‌ها در فاز خودش با صفحه واقعی جایگزین می‌شود.
 */
export function PagePlaceholder({
  locale,
  title,
  body,
  backLabel,
  children,
  className,
}: {
  locale: Locale;
  title: string;
  body: string;
  backLabel: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const BackIcon = localeDirection[locale] === "rtl" ? ArrowRight : ArrowLeft;

  return (
    <div className={cn("container-page py-16", className)}>
      <Card className="mx-auto max-w-2xl p-8 text-center sm:p-12">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
          {body}
        </p>

        {children ? <div className="mt-6">{children}</div> : null}

        <Link
          href={localePath(locale)}
          className={buttonVariants({
            variant: "secondary",
            size: "sm",
            className: "mt-6",
          })}
        >
          <BackIcon className="size-4" aria-hidden />
          {backLabel}
        </Link>
      </Card>
    </div>
  );
}
