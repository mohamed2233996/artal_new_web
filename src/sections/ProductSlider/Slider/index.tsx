"use client";

import Slider from "react-slick";

import Product from "@/components/Product";
import { Product as IProduct } from "@/types/Product";

export default function SimilarProductsSlider({
  data,
  sliderSettings,
  categoryId,
}: {
  data: IProduct[];
  sliderSettings: any;
  categoryId: string;
}) {
  const DatafilteredBasedOnCategory = data.filter(
    (p) => p.category.id === categoryId
  );
  const products =
    DatafilteredBasedOnCategory.length === 1
      ? data?.sort((a, b) => b.rating - a.rating)
      : DatafilteredBasedOnCategory;

  return (
    <div className="product-slider">
      <Slider {...sliderSettings}>
        {products.map((p, index) => (
          <div key={index} className="product-slide__item">
            <Product data={p} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
