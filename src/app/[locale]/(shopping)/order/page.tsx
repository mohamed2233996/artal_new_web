import { getOrders } from "@/actions/order/getOrders";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import Order from "@/sections/order";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const session = await getServerAuthSession();
  const orders = await getOrders(session?.token!);
  const t = await getTranslations('Order')

  return (
    <>
      <BreadcrumbSection name={t('title')} />
      <Order orders={orders!} />
    </>
  );
}
