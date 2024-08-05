import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import Favourites from "@/sections/favourites";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations('Favourites')
  return (
    <>
      <Breadcrumb title={t("title")}>
        <BreadcrumbItem name={t("Home")} />
        <BreadcrumbItem name={t("Shop")} />
        <BreadcrumbItem name={t('title')} current />
      </Breadcrumb>
      <Favourites />
    </>
  );
}
