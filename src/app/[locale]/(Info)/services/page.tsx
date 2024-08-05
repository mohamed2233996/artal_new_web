import { getAppointmentBg } from "@/actions/getApppointmentbg";
import { getServices } from "@/actions/getServices";
import { getServicesCTE } from "@/actions/getServicesCTE";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import CTA from "@/sections/CTA";
import ServiceItem from "@/sections/ServiceItem";
import { formatSingleNumber } from "@/utils/formatSingleNumber";
import { getTranslations } from "next-intl/server";

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const res = await getServices();
  const appointment = await getAppointmentBg();
  const servicesCTE = await getServicesCTE();
  const t = await getTranslations("Services");

  return (
    <>
      <BreadcrumbSection name={t("title")} />
      {res?.map((item, index) => (
        <ServiceItem
          key={index}
          desc={locale === "ar" ? item.desc_ar : item.desc_en}
          img={item.bigImage}
          title={locale === "ar" ? item.title_ar : item.title_en}
          order={formatSingleNumber(index + 1)}
          reverse={index % 2 === 1}
        />
      ))}
      <CTA image={appointment?.appointment_bg} services={servicesCTE!} />
    </>
  );
}
