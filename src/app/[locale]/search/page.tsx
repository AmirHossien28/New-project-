import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { SearchBar } from "@/components/ui/search-bar";

export default async function SearchPage({ params }: PageProps<"/[locale]/search">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <PagePlaceholder
      locale={locale}
      title={dict.search.title}
      body={dict.search.subtitle}
      backLabel={dict.search.backHome}
    >
      <div className="mx-auto max-w-md">
        <SearchBar
          locale={locale}
          placeholder={dict.common.searchPlaceholder}
          submitLabel={dict.common.search}
        />
      </div>
    </PagePlaceholder>
  );
}
