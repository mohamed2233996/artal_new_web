import Benefits from "@/sections/Benefits";
import InstagramSection from "@/sections/InstgramSection";
import MainAboutSection from "@/sections/MainAboutSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { getPageInfo } from "@/actions/getPageInfo";
import { getOffers } from "@/actions/getOffers";
import { getInstagramImages } from "@/actions/getInstagramImages";
import { getTranslations } from "next-intl/server";

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const data = await getPageInfo(2);
  const offers = await getOffers();
  const images = await getInstagramImages();

  const t = await getTranslations("Terms");
  const heading =
    locale === "ar" ? (
      <>الشروط والأحكام</>
    ) : (
      <>
        <span>Artal</span> Terms & Conditions{" "}
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
