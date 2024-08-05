import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import InstagramSection from "@/sections/InstgramSection";
import OrderStatus from "@/sections/OrderStatus";
import { API_ENDPOINT } from "@/shared/constants";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerAuthSession();
  const t = await getTranslations('Order');
  let status;

  if (searchParams?.tap_id) {
    const tapId = searchParams?.tap_id;

    if (tapId) {
      await fetch(`${API_ENDPOINT}/orders/charge/${tapId}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${session?.token}`,
          "Content-Type": "application/json",
        },
      }).then(async (rawRes) => {
        const res = await rawRes.json();
        if (res?.status === "CAPTURED") {
          status = "CAPTURED";
        } else if (res?.status === "IN_PROGRESS") {
          status = "IN_PROGRESS";
        } else if (res?.status === "DECLINED") {
          status = "DECLINED";
        } else if (res?.status === "SHOWN") {
          redirect("/");
        } else {
          status = "SOMETHING_WRONG";
        }
      });
    }
  }

  if (!searchParams?.tap_id) {
    redirect("/");
  }

  return (
    <>
      <BreadcrumbSection name={t("title")} />
      <OrderStatus status={status!} />
    </>
  );
}
