"use client";

import React from "react";
import classNames from "classnames";
import Product from "@/components/Product";
import { Product as IProduct } from "@/types/Product";

interface ShopProductsProps {
  gridColClass: string;
  listColClass: string;
  view: string;
  data: IProduct[];
}

export default function ShopProducts({
  gridColClass,
  listColClass,
  view,
  data,
}: ShopProductsProps) {
  return (
    <div className="shop-products">
      {view === "grid" ? (
        <div className="shop-products__grid">
          {data && (
            <div className="row">
              {data.map((item) => {
                return (
                  <div key={item?.id} className={classNames(gridColClass)}>
                    <Product data={item} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="shop-products__list">
          {data && (
            <div className="row">
              {data.map((item) => (
                <div key={item?.id} className={listColClass}>
                  <Product type={view} data={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
