"use client";

import React from "react";
import classNames from "classnames";
import { useAppStore } from "@/providers/app-store-provider";
import { Product } from "@/types/Product";

interface QuantityProps {
  className?: string;
  defaultQuantity?: number;
  inCart: boolean;
  getQuantity?: (quantity: number) => void;
  product: Product;
  maxValue?: number;
  setInCart: (v: boolean) => void;
  quantity: number;
  setQuantity?: any;
}

export default function Quantity({
  className,
  inCart,
  product,
  maxValue = 100000,
  setInCart,
  quantity,
  setQuantity
}: QuantityProps) {
  const { increaseQuantity, decreaseQuantity, addToCart} = useAppStore((state) => state);
  /**
   * HANLDERS
   */
  const handleIncreaseQnantity = () => {
    if(inCart){
      setQuantity((prev: number) => prev + 1);
      increaseQuantity(product?.id);
    } else {
      addToCart(product, quantity);
      setInCart(true)
    }
  };
  const handleDecreaseQnantity = () => {
    setQuantity((prev: number) => prev - 1);
    decreaseQuantity(product?.id);
  };

  return (
    <div className={`quantity-controller ${classNames(className)}`}>
      <div
        className="quantity-controller__btn -descrease"
        onClick={() => {
          if (quantity < 2) {
            return;
          }
          handleDecreaseQnantity();
        }}
      >
        -
      </div>
      <h5 className="quantity-controller__number">{quantity}</h5>
      <div
        className="quantity-controller__btn -increase"
        onClick={() => {
          if (quantity >= maxValue) {
            return;
          }
          handleIncreaseQnantity();
        }}
      >
        +
      </div>
    </div>
  );
}
