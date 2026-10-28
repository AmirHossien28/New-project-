"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface NavItem {
  href: string;
  label: string;
}

/**
 * لینک‌های ناوبری با مشخص‌کردن صفحه فعال.
 * usePathname در کلاینت لازم است چون layout سمت سرور مسیر فعلی را نمی‌داند
 * (و نمی‌خواهیم به‌خاطر این، همه صفحات را داینامیک کنیم).
 */
export function NavLinks({
  items,
  className,
  itemClassName,
  onNavigate,
}: {
  items: NavItem[];
  className?: string;
  itemClassName?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="main" className={cn("flex items-center gap-1", className)}>
      {items.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
              isActive
                ? "bg-primary-soft text-primary"
                : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
              itemClassName,
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
