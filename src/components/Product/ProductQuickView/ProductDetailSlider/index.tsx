"use client";

import { NextArrow, PrevArrow } from "@/components/Arrows";
import { API_ENDPOINT } from "@/shared/constants";
import { Product } from "@/types/Product";
import React, { useState } from "react";
import Slider from "react-slick";
// TODO
// import ReactImageMagnify from "react-image-magnify";

export default function ProductDetailSlider({ data }: { data: Product }) {
  const [imagesNumber] = useState(() => data?.products?.length);

  const settings = {
    customPaging: function (i: number) {
      return <div className="slider__dot"></div>;
    },
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: imagesNumber === 1 && false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };



  return (
    <div className="product-detail__slide-one">
      <Slider {...settings}>
        {data?.products.map((img, index) => (
          <div key={index} className="slider__item">
            <img src={`${API_ENDPOINT}/${img?.path}`} alt="Product image" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
