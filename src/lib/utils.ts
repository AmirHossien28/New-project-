import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * ترکیب کلاس‌های Tailwind به‌صورت امن.
 * clsx: کلاس‌های شرطی را کنار هم می‌گذارد.
 * twMerge: کلاس‌های متناقض را حل می‌کند (مثلاً px-2 و px-4 => px-4).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
