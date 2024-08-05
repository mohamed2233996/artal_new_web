import { getPageInfo } from "@/actions/getPageInfo";
import { getOffers } from "@/actions/getOffers";
import { getInstagramImages } from "@/actions/getInstagramImages";
import { getTranslations } from "next-intl/server";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import MainAboutSection from "@/sections/MainAboutSection";
import Benefits from "@/sections/Benefits";
import InstagramSection from "@/sections/InstgramSection";

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const data = await getPageInfo(1);
  const offers = await getOffers();
  const images = await getInstagramImages();

  const t = await getTranslations("About");
  const heading =
    locale === "ar" ? (
      <>
        عن <span>ارتال</span>
      </>
    ) : (
      <>
        About <span>Artal</span>
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
