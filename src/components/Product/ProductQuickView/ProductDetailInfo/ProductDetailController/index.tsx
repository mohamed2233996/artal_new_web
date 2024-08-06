"use client";

import { useState } from "react";
import classNames from "classnames";
import LinkingButton from "@/components/Button";
import Quantity from "@/components/Quantity";
import { useSession } from "next-auth/react";

interface ProductDetailControllerProps {
  data: any;
  onAddToCart: (e: React.SyntheticEvent) => Promise<void>;
  onAddToWishList: (e: React.SyntheticEvent) => Promise<void>;
  inCart: boolean;
  inFavourites: boolean;
  setInCart: (v: boolean) => void
  quantity: number;
  setQuantity: any;
}

export default function ProductDetailController({
  data,
  onAddToCart,
  onAddToWishList,
  inCart,
  inFavourites,
  setInCart,
  quantity,
  setQuantity
}: ProductDetailControllerProps) {
  const { data: session } = useSession();
  const avaiableProduct = data;


  return (
    <div className="product-detail__controler">
      <Quantity
        className="-border -round"
        product={avaiableProduct}
        inCart={inCart}
        setInCart={setInCart}
        quantity={quantity}
        setQuantity={setQuantity}
      />

      {session?.token ? (
        <div style={{ display: "flex", gap: "1em" }}>
          {data.active ? (
            <LinkingButton
              height="50px"
              width="50px"
              color="white"
              className={`product__actions__item -round ${classNames({
                active: inCart,
              })}`}
              to="#"
              onClick={onAddToCart}
              content={<i className="fas fa-shopping-bag" />}
            ></LinkingButton>
          ):(
            <LinkingButton
              height="50px"
              width="50px"
              color="red"
              className={`product__actions__item -round`}
              to="#"
              onClick={(e) => {
                alert(
                  "This product is out of stock. Please check back later."
                )
              }}
              content={<i className="fas fa-shopping-bag" />}
            ></LinkingButton>
          )}
          <LinkingButton
            to="#"
            height="50px"
            width="50px"
            className={`-round ${classNames({
              active: inFavourites,
            })}`}
            onClick={onAddToWishList}
            color="white"
            content={<i className="fas fa-heart"></i>}
          />
        </div>
      ) : (
        <div style={{ display: "flex", gap: "1em" }}>
          {data.active ? (
          <LinkingButton
            height="50px"
            width="50px"
            color="white"
            className={`product__actions__item -round`}
            to="/login"
            content={<i className="fas fa-shopping-bag" />}
          ></LinkingButton>
          ) : (
          <LinkingButton
            height="50px"
            width="50px"
            color="red"
            className={`product__actions__item -round`}
            to="#"
            onClick={(e) => {
              alert(
                "This product is out of stock. Please check back later."
              )
            }}
            content={<i className="fas fa-shopping-bag" />}
            ></LinkingButton>
          )}
          <LinkingButton
            height="50px"
            width="50px"
            className={`-round`}
            to="/login"
            color="white"
            content={<i className="fas fa-heart"></i>}
          />
        </div>
      )}
    </div>
  );
}
