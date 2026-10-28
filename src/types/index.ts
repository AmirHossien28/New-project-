import type { Locale } from "@/config/site";

/**
 * متن دوزبانه. در نسخه واقعی، محتوای کسب‌وکار در دیتابیس ذخیره می‌شود و
 * می‌تواند یک زبان اصلی داشته باشد؛ اما برای داده نمونه هر دو زبان را داریم.
 */
export type Localized<T = string> = Record<Locale, T>;

/** پالت رنگی تصاویر نمونه؛ برای اینکه کلاس Tailwind به‌صورت پویا ساخته نشود. */
export type Tone = "teal" | "gold" | "ocean" | "forest" | "clay" | "plum";

/** کلید آیکون دسته‌بندی؛ نگاشت به کامپوننت آیکون در features/category انجام می‌شود. */
export type CategoryIconKey =
  | "coffee"
  | "food"
  | "beauty"
  | "fitness"
  | "fashion"
  | "design"
  | "tech"
  | "services";

export interface Category {
  id: string;
  slug: string;
  name: Localized;
  icon: CategoryIconKey;
  businessCount: number;
}

export interface Business {
  id: string;
  slug: string;
  name: Localized;
  tagline: Localized;
  categoryId: string;
  city: Localized;
  followers: number;
  posts: number;
  verified: boolean;
  featured: boolean;
  tone: Tone;
}

export interface PostAuthor {
  name: Localized;
  handle: string;
  tone: Tone;
  isBusiness: boolean;
  verified: boolean;
}

export type PostMediaType = "image" | "video";

export interface Post {
  id: string;
  author: PostAuthor;
  body: Localized;
  time: Localized;
  likes: number;
  comments: number;
  media?: {
    type: PostMediaType;
    tone: Tone;
  };
}

/** وضعیت‌های بررسی کسب‌وکار — همان مقادیر schema آینده Prisma */
export type BusinessStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "CHANGES_REQUESTED"
  | "APPROVED"
  | "REJECTED"
  | "SUSPENDED";
