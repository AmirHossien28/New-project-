import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * پردازش Tailwind v4 در Turbopack.
   * این پروژه از @tailwindcss/turbopack استفاده می‌کند (نه @tailwindcss/postcss)؛
   * بنابراین قاعده loader زیر لازم است. اگر حذف شود، @theme/@custom-variant
   * به‌عنوان «at-rule ناشناخته» نادیده گرفته می‌شوند و هیچ کلاس Tailwind ساخته نمی‌شود.
   */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  /*
   * cacheComponents (که create-next-app پیش‌فرض روشن می‌کند) در Next.js 16
   * اجازه نمی‌دهد هوک‌هایی مثل usePathname بیرون از <Suspense> استفاده شوند.
   * ما برای «مشخص‌کردن صفحه فعال در منو» به usePathname نیاز داریم و نمی‌خواهیم
   * کل هدر را به‌خاطر یک منو داخل Suspense ببریم.
   *
   * این گزینه در فاز «عملکرد و بهینه‌سازی» قابل روشن‌شدن است؛ آن زمان مرزهای
   * Suspense را آگاهانه طراحی می‌کنیم. الان داده واقعی برای partial prerender نداریم.
   */
  cacheComponents: false,
};

export default nextConfig;
