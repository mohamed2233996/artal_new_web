import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import Cart from "@/sections/Cart";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("Cart");
  return (
    <>
      <Breadcrumb title={t('title')}>
        <BreadcrumbItem name={t('Home')}/>
        <BreadcrumbItem name={t("Shop")} />
        <BreadcrumbItem name={t('title')} current />
      </Breadcrumb>
      <Cart />
    </>
  );
}
