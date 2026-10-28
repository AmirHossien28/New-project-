import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export default async function LoginPage({ params }: PageProps<"/[locale]/login">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <PagePlaceholder
      locale={locale}
      title={dict.placeholders.loginTitle}
      body={dict.placeholders.loginBody}
      backLabel={dict.placeholders.backHome}
    />
  );
}
