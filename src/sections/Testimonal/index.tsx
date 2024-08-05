import SectionTitle from "@/components/SectionTitle";
import TestimonialSlider from "./TestimonalSlider";
import { Feedback } from "@/types/home";
import { useTranslations } from "next-intl";

export default function Testimonials({ data }: { data: Feedback[] }) {
  const t = useTranslations("Testimonial");
  return (
    <div className="testimonial">
      <div className="container">
        <SectionTitle showSubTitle align="center" subTitle={t("subtitle")}>
          {t("title")}
        </SectionTitle>
        <TestimonialSlider data={data} />
      </div>
    </div>
  );
}
