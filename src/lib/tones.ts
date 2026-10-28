import type { Tone } from "@/types";

/**
 * نگاشت «تن رنگی» به کلاس‌های Tailwind.
 * چرا فایل جدا؟ چون Tailwind فقط کلاس‌هایی را می‌بیند که به‌صورت کامل در کد نوشته شده‌اند.
 * اگر کلاس را با رشته پویا بسازیم (مثل `from-${tone}-500`)، Tailwind آن را تولید نمی‌کند.
 */
export const toneGradient: Record<Tone, string> = {
  teal: "bg-linear-to-br from-[#134e4a] via-[#0f766e] to-[#14958b]",
  gold: "bg-linear-to-br from-[#8a6f42] via-[#c5a46d] to-[#dcc294]",
  ocean: "bg-linear-to-br from-[#12466f] via-[#1d6fb8] to-[#3f9ade]",
  forest: "bg-linear-to-br from-[#0c4f27] via-[#15803d] to-[#2aa864]",
  clay: "bg-linear-to-br from-[#7c3a06] via-[#b45309] to-[#d97b1f]",
  plum: "bg-linear-to-br from-[#4c1d95] via-[#7c3aed] to-[#a074f5]",
};

/** نسخه کم‌رنگ همان تن، برای پس‌زمینه‌های ملایم */
export const toneSoft: Record<Tone, string> = {
  teal: "bg-primary-soft text-primary",
  gold: "bg-gold-soft text-on-gold",
  ocean: "bg-info-soft text-info",
  forest: "bg-success-soft text-success",
  clay: "bg-warning-soft text-warning",
  plum: "bg-primary-soft text-primary",
};
