import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles, TrendingUp } from "lucide-react";

import { localeDirection, localePath } from "@/config/site";
import { getDictionary, hasLocale, pick } from "@/i18n/dictionaries";
import {
  categories,
  featuredBusinesses,
  posts,
  suggestedBusinesses,
  trendingTopics,
} from "@/features/home/data/home-data";
import { SearchBar } from "@/components/ui/search-bar";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { BusinessCard } from "@/features/business/components/business-card";
import { PostCard } from "@/features/post/components/post-card";
import { CategoryCard } from "@/features/category/components/category-card";

/**
 * صفحه خانه — فاز اول: طراحی با داده نمونه.
 * ساختار صفحه عمداً «فید + ستون کنار» است تا در آینده فید شخصی‌سازی‌شده
 * فقط جای ستون اول را پر کند.
 */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  // نام دسته‌بندی برای کارت کسب‌وکار
  const categoryNameById = new Map(
    categories.map((category) => [category.id, pick(category.name, locale)]),
  );

  const ArrowIcon = localeDirection[locale] === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <div className="container-page">
      {/* ================= بخش معرفی و جست‌وجو ================= */}
      <section className="relative mt-6 overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 end-0 size-80 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -start-20 size-80 rounded-full bg-gold/10 blur-3xl"
        />

        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-gold" aria-hidden />
            {dict.home.eyebrow}
          </span>

          <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-4xl sm:leading-[1.2]">
            {dict.home.title}
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            {dict.home.subtitle}
          </p>

          <div className="mt-6 max-w-xl">
            <SearchBar
              locale={locale}
              placeholder={dict.common.searchPlaceholder}
              submitLabel={dict.common.search}
              variant="hero"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">{dict.home.quickFilters}</span>
            {trendingTopics.slice(0, 3).map((topic) => (
              <Link
                key={topic.en}
                href={`${localePath(locale, "/search")}?q=${encodeURIComponent(pick(topic, locale))}`}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {pick(topic, locale)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= کسب‌وکارهای منتخب ================= */}
      <section className="mt-10 animate-rise">
        <SectionHeading
          title={dict.home.featured}
          subtitle={dict.home.featuredSubtitle}
          action={
            <Link
              href={localePath(locale, "/search")}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover"
            >
              {dict.common.seeAll}
              <ArrowIcon className="size-4" aria-hidden />
            </Link>
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredBusinesses.slice(0, 3).map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              categoryName={categoryNameById.get(business.categoryId) ?? ""}
              locale={locale}
              dict={dict}
            />
          ))}
        </div>
      </section>

      {/* ================= دسته‌بندی‌ها ================= */}
      <section className="mt-10">
        <SectionHeading
          title={dict.home.categories}
          subtitle={dict.home.categoriesSubtitle}
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              locale={locale}
              countLabel={dict.business.businessesCount}
            />
          ))}
        </div>
      </section>

      {/* ================= فید + ستون کنار ================= */}
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section>
          <SectionHeading
            title={dict.home.feed}
            subtitle={dict.home.feedSubtitle}
          />

          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} locale={locale} dict={dict} />
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className={buttonVariants({ variant: "secondary", size: "md" })}
              disabled
              title={dict.common.comingSoon}
            >
              {dict.home.loadMore}
            </button>
          </div>
        </section>

        <aside className="space-y-4">
          {/* پیشنهاد کسب‌وکار */}
          <Card className="p-4">
            <h2 className="text-sm font-semibold">{dict.home.suggested}</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {dict.home.suggestedSubtitle}
            </p>

            <div className="mt-4 space-y-4">
              {suggestedBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  categoryName={categoryNameById.get(business.categoryId) ?? ""}
                  locale={locale}
                  dict={dict}
                  variant="compact"
                />
              ))}
            </div>

            <Link
              href={localePath(locale, "/search")}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover"
            >
              {dict.common.seeAll}
              <ArrowIcon className="size-4" aria-hidden />
            </Link>
          </Card>

          {/* موضوع‌های داغ */}
          <Card className="p-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <TrendingUp className="size-4 text-primary" aria-hidden />
              {dict.home.trending}
            </h2>
            <ul className="mt-3 space-y-1">
              {trendingTopics.map((topic) => (
                <li key={topic.en}>
                  <Link
                    href={`${localePath(locale, "/search")}?q=${encodeURIComponent(pick(topic, locale))}`}
                    className="flex items-center justify-between rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
                  >
                    <span>#{pick(topic, locale)}</span>
                    <ArrowIcon className="size-3.5 opacity-50" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          {/* دعوت به ثبت کسب‌وکار */}
          <Card className="overflow-hidden border-transparent brand-gradient p-5 text-white">
            <h2 className="text-base font-semibold">{dict.home.ctaTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-white/80">{dict.home.ctaBody}</p>
            <Link
              href={localePath(locale, "/login")}
              className={buttonVariants({
                variant: "gold",
                size: "sm",
                className: "mt-4",
              })}
            >
              {dict.home.ctaButton}
            </Link>
          </Card>
        </aside>
      </div>
    </div>
  );
}
