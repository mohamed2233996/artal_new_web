import { NextArrow, PrevArrow } from "@/components/Arrows";
import SectionTitle from "@/components/SectionTitle";
import React from "react";
import SimilarProductsSlider from "./Slider";
import { Product } from "@/types/Product";
import { useTranslations } from "next-intl";

export default function ProductSlider({
  data,
  categoryId,
}: {
  data: Product[];
  categoryId: string;
}) {
  const t = useTranslations('Store')
  const settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    className: "product-slide__wrapper",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1170,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="product-slide -style-2">
      <div className="container">
        <SectionTitle align="center" hideDecoration>
          {t('Related')}
        </SectionTitle>
        <SimilarProductsSlider data={data} categoryId={categoryId} sliderSettings={settings} />
      </div>
    </div>
  );
}
