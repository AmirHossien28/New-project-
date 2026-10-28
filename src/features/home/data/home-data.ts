import type { Business, Category, Post } from "@/types";

/**
 * داده‌های نمونه مرحله اول.
 * این فایل «داده» است، نه منطق. در فاز دیتابیس، جای آن را کوئری‌های Prisma می‌گیرد
 * و بقیه کد (کامپوننت‌ها) بدون تغییر می‌ماند؛ به همین دلیل شکل داده مهم است.
 */

export const categories: Category[] = [
  {
    id: "cafe",
    slug: "cafe",
    name: { fa: "کافه و کافی‌شاپ", en: "Cafes" },
    icon: "coffee",
    businessCount: 248,
  },
  {
    id: "restaurant",
    slug: "restaurant",
    name: { fa: "رستوران", en: "Restaurants" },
    icon: "food",
    businessCount: 412,
  },
  {
    id: "beauty",
    slug: "beauty",
    name: { fa: "زیبایی و آرایش", en: "Beauty & salon" },
    icon: "beauty",
    businessCount: 186,
  },
  {
    id: "fitness",
    slug: "fitness",
    name: { fa: "ورزش و تناسب اندام", en: "Fitness" },
    icon: "fitness",
    businessCount: 97,
  },
  {
    id: "fashion",
    slug: "fashion",
    name: { fa: "مد و پوشاک", en: "Fashion" },
    icon: "fashion",
    businessCount: 305,
  },
  {
    id: "design",
    slug: "design",
    name: { fa: "طراحی و گرافیک", en: "Design" },
    icon: "design",
    businessCount: 154,
  },
  {
    id: "tech",
    slug: "tech",
    name: { fa: "فناوری و نرم‌افزار", en: "Technology" },
    icon: "tech",
    businessCount: 128,
  },
  {
    id: "services",
    slug: "services",
    name: { fa: "خدمات خانگی", en: "Home services" },
    icon: "services",
    businessCount: 221,
  },
];

export const featuredBusinesses: Business[] = [
  {
    id: "biz_1",
    slug: "cafe-rest",
    name: { fa: "کافه رست", en: "Cafe Rest" },
    tagline: {
      fa: "قهوه تخصصی و منوی فصلی در قلب شهر",
      en: "Specialty coffee and a seasonal menu in the heart of the city",
    },
    categoryId: "cafe",
    city: { fa: "تهران", en: "Tehran" },
    followers: 12840,
    posts: 213,
    verified: true,
    featured: true,
    tone: "teal",
  },
  {
    id: "biz_2",
    slug: "naghsh-studio",
    name: { fa: "استودیو نقش", en: "Naghsh Studio" },
    tagline: {
      fa: "هویت بصری و طراحی رابط برای کسب‌وکارهای نوپا",
      en: "Brand identity and interface design for young businesses",
    },
    categoryId: "design",
    city: { fa: "اصفهان", en: "Isfahan" },
    followers: 6320,
    posts: 87,
    verified: true,
    featured: true,
    tone: "gold",
  },
  {
    id: "biz_3",
    slug: "mahoor-salon",
    name: { fa: "آرایشگاه ماهور", en: "Mahoor Salon" },
    tagline: {
      fa: "مراقبت از مو و پوست با تیم حرفه‌ای",
      en: "Hair and skin care with a professional team",
    },
    categoryId: "beauty",
    city: { fa: "تهران", en: "Tehran" },
    followers: 9840,
    posts: 142,
    verified: false,
    featured: false,
    tone: "plum",
  },
  {
    id: "biz_4",
    slug: "iron-gym",
    name: { fa: "باشگاه آیرون", en: "Iron Gym" },
    tagline: {
      fa: "تمرین قدرتی و برنامه تمرینی اختصاصی",
      en: "Strength training and personalized programs",
    },
    categoryId: "fitness",
    city: { fa: "شیراز", en: "Shiraz" },
    followers: 4510,
    posts: 96,
    verified: true,
    featured: false,
    tone: "forest",
  },
  {
    id: "biz_5",
    slug: "terme-clothing",
    name: { fa: "پوشاک ترمه", en: "Terme Clothing" },
    tagline: {
      fa: "پارچه‌های طبیعی و دوخت محدود",
      en: "Natural fabrics, limited runs",
    },
    categoryId: "fashion",
    city: { fa: "تبریز", en: "Tabriz" },
    followers: 3190,
    posts: 64,
    verified: false,
    featured: false,
    tone: "clay",
  },
  {
    id: "biz_6",
    slug: "bagh-irani",
    name: { fa: "رستوران باغ ایرانی", en: "Bagh Iranian Restaurant" },
    tagline: {
      fa: "غذای ایرانی خانگی با مواد تازه",
      en: "Home-style Iranian food with fresh ingredients",
    },
    categoryId: "restaurant",
    city: { fa: "مشهد", en: "Mashhad" },
    followers: 15320,
    posts: 187,
    verified: true,
    featured: true,
    tone: "ocean",
  },
];

export const posts: Post[] = [
  {
    id: "post_1",
    author: {
      name: { fa: "کافه رست", en: "Cafe Rest" },
      handle: "cafe.rest",
      tone: "teal",
      isBusiness: true,
      verified: true,
    },
    body: {
      fa: "منوی پاییزی از امروز شروع شد: قهوه با شیر بادام، چای ماسالا و کیک هویج و گردو. تا پایان هفته با هر سفارش یک دمی مهمان ما هستید.",
      en: "Our autumn menu starts today: almond milk latte, masala chai, and carrot-walnut cake. Free tea with every order until the end of the week.",
    },
    time: { fa: "۲ ساعت پیش", en: "2 hours ago" },
    likes: 324,
    comments: 18,
    media: { type: "image", tone: "gold" },
  },
  {
    id: "post_2",
    author: {
      name: { fa: "سارا محمدی", en: "Sara Mohammadi" },
      handle: "sara.designs",
      tone: "plum",
      isBusiness: false,
      verified: false,
    },
    body: {
      fa: "دیروز اولین کارگاه طراحی رابط کاربری را برگزار کردیم. بیست نفر، چهار ساعت، و یک خروجی واقعی برای یک کسب‌وکار محلی.",
      en: "We ran our first UI design workshop yesterday. Twenty people, four hours, and a real deliverable for a local business.",
    },
    time: { fa: "۵ ساعت پیش", en: "5 hours ago" },
    likes: 186,
    comments: 32,
  },
  {
    id: "post_3",
    author: {
      name: { fa: "استودیو نقش", en: "Naghsh Studio" },
      handle: "naghsh.studio",
      tone: "gold",
      isBusiness: true,
      verified: true,
    },
    body: {
      fa: "پروژه جدید ما برای یک کافه محلی: هویت بصری، منو و تابلوی سردر. تمرکز اصلی روی خوانایی در نور کم بود.",
      en: "Our latest project for a local cafe: visual identity, menu, and signage. The main focus was legibility in low light.",
    },
    time: { fa: "دیروز", en: "Yesterday" },
    likes: 512,
    comments: 41,
    media: { type: "image", tone: "forest" },
  },
  {
    id: "post_4",
    author: {
      name: { fa: "امیر رضایی", en: "Amir Rezaei" },
      handle: "amir.rezaei",
      tone: "ocean",
      isBusiness: false,
      verified: false,
    },
    body: {
      fa: "اگر دنبال یک باشگاه با برنامه تمرینی واقعی هستید، باشگاه آیرون در شیراز را پیشنهاد می‌کنم. بعد از سه هفته تفاوت را حس کردم.",
      en: "If you want a gym with an actual training program, try Iron Gym in Shiraz. I felt the difference after three weeks.",
    },
    time: { fa: "۲ روز پیش", en: "2 days ago" },
    likes: 94,
    comments: 12,
  },
  {
    id: "post_5",
    author: {
      name: { fa: "باشگاه آیرون", en: "Iron Gym" },
      handle: "iron.gym",
      tone: "forest",
      isBusiness: true,
      verified: true,
    },
    body: {
      fa: "برنامه تمرینی گروهی پاییز منتشر شد. سه سطح، سه مربی، و امکان جبران جلسه‌های ازدست‌رفته.",
      en: "The autumn group training plan is out. Three levels, three coaches, and make-up sessions available.",
    },
    time: { fa: "۲ روز پیش", en: "2 days ago" },
    likes: 231,
    comments: 27,
    media: { type: "video", tone: "clay" },
  },
];

export const suggestedBusinesses = featuredBusinesses.filter(
  (business) => !business.featured,
);

export const trendingTopics: { fa: string; en: string }[] = [
  { fa: "کافه‌های تهران", en: "Cafes in Tehran" },
  { fa: "طراحی هویت بصری", en: "Brand identity" },
  { fa: "باشگاه‌های شیراز", en: "Gyms in Shiraz" },
  { fa: "پوشاک دست‌دوز", en: "Handmade clothing" },
];
