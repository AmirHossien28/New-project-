import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap " +
  "transition-all duration-200 ease-out select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary shadow-sm hover:bg-primary-hover hover:shadow-md active:translate-y-px",
  secondary:
    "bg-surface-muted text-foreground border border-border hover:border-border-strong hover:bg-surface",
  outline:
    "border border-border-strong text-foreground hover:bg-surface-muted hover:border-primary/40",
  ghost: "text-foreground hover:bg-surface-muted",
  gold: "bg-gold text-on-gold hover:brightness-105 active:translate-y-px",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-12 px-6 text-base",
};

/** ساخت رشته کلاس‌ها؛ برای وقتی که می‌خواهیم دکمه‌ای به شکل <Link> رندر شود. */
export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** فقط برای دکمه‌هایی که قرار است تمام عرض را بگیرند */
  block?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  block,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({ variant, size, className: cn(block && "w-full", className) })}
      {...props}
    />
  );
}
