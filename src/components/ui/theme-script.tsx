import { themeCookieName } from "@/config/site";

/**
 * اسکریپت بسیار کوچکی که قبل از رنگ‌آمیزی صفحه اجرا می‌شود.
 * اگر نباشد، کاربرِ تم تاریک برای یک لحظه صفحه سفید می‌بیند (Flash of Wrong Theme).
 * این تنها جاهایی است که از dangerouslySetInnerHTML استفاده می‌کنیم؛ محتوای آن ثابت است و ورودی کاربر ندارد.
 */
const script = `(function(){try{var stored=localStorage.getItem("${themeCookieName}");var prefersDark=window.matchMedia("(prefers-color-scheme: dark)").matches;var theme=stored||(prefersDark?"dark":"light");if(theme==="dark"){document.documentElement.classList.add("dark");}}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
