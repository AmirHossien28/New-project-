import {
  Briefcase,
  Coffee,
  Dumbbell,
  Palette,
  Scissors,
  Shirt,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { CategoryIconKey } from "@/types";

/**
 * نگاشت کلید دسته‌بندی به آیکون.
 * آیکون‌ها یک خانواده (lucide) و با ضخامت خط یکسان هستند تا رابط یکدست بماند.
 * اگر دسته جدیدی در دیتابیس اضافه شد که اینجا نیست، آیکون پیش‌فرض استفاده می‌شود.
 */
const icons: Record<CategoryIconKey, LucideIcon> = {
  coffee: Coffee,
  food: UtensilsCrossed,
  beauty: Scissors,
  fitness: Dumbbell,
  fashion: Shirt,
  design: Palette,
  tech: Briefcase,
  services: Wrench,
};

export function CategoryIcon({
  name,
  className,
}: {
  name: CategoryIconKey;
  className?: string;
}) {
  const Icon = icons[name] ?? Briefcase;
  return <Icon className={className} aria-hidden />;
}
