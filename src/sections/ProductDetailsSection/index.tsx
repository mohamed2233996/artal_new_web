"use client";

import ProductDetailInfo from "@/components/Product/ProductQuickView/ProductDetailInfo";
import ProductDetailSlider from "@/components/Product/ProductQuickView/ProductDetailSlider";
import { Product } from "@/types/Product";
import React from "react";

export default function ProductDetailsSection({ data, reviews }: {data: Product, reviews: any[]}) {
  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail__wrapper">
          <div className="row">
            <div className="col-12 col-md-6 pe-md-4">
              <ProductDetailSlider data={data} />
            </div>
            <div className="col-12 col-md-6 ps-md-4">
              <ProductDetailInfo data={data} reviews={reviews}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
