import Benefits from "@/sections/Benefits";
import InstagramSection from "@/sections/InstgramSection";

import MainAboutSection from "@/sections/MainAboutSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { getPageInfo } from "@/actions/getPageInfo";
import { getInstagramImages } from "@/actions/getInstagramImages";
import { getOffers } from "@/actions/getOffers";
import { getTranslations } from "next-intl/server";

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const data = await getPageInfo(3);
  const images = await getInstagramImages();
  const offers = await getOffers();
  const t = await getTranslations("Policy");
  const heading =
    locale === "ar" ? (
      <>سياسة الاستخدام</>
    ) : (
      <>
        <span>Artal</span> Privacy Policy
      </>
    );
  return (
    <>
      <BreadcrumbSection name={t("title")} />
      <MainAboutSection heading={heading} data={data} />

      <Benefits offers={offers!} />
      <InstagramSection data={images} />
    </>
  );
}
