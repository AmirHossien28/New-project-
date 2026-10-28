import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export default async function BusinessPage({
  params,
}: PageProps<"/[locale]/business/[slug]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <PagePlaceholder
      locale={locale}
      title={dict.placeholders.businessTitle}
      body={dict.placeholders.businessBody}
      backLabel={dict.placeholders.backHome}
    />
  );
}
