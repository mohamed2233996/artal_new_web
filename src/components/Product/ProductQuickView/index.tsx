import React from "react";

import ProductDetailInfo from "./ProductDetailInfo";
import ProductDetailSlider from "./ProductDetailSlider";

export default function ProductQuickView({ data }) {
  return (
    <div className="product-quickview">
      <div className="row">
        <div className="col-12 col-md-6">
          <ProductDetailSlider data={data} />
        </div>
        <div className="col-12 col-md-6">
          <ProductDetailInfo data={data} hideTab quickview/>
        </div>
      </div>
    </div>
  );
}
