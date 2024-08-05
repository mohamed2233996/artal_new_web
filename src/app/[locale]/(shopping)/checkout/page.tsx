import { getTaxAndDeliveryFees } from "@/actions/getTaxAndDeliveryFees";
import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import Checkout from "@/sections/Checkout";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations('Checkout');
  const taxAndDeliveryFees = await getTaxAndDeliveryFees()
  return (
    <>
      <Breadcrumb title={t('title')}>
        <BreadcrumbItem name={t('Home')} />
        <BreadcrumbItem name={t('Shop')} />
        <BreadcrumbItem name={t('title')} current />
      </Breadcrumb>
      <Checkout taxAndDeliveryFees={taxAndDeliveryFees}/>
    </>
  );
}
