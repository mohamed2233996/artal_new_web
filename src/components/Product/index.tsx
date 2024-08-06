"use client";

import React, { useState } from "react";
import classNames from "classnames";

import LinkingButton from "../Button";
import Rate from "../Rate";
import Modal from "../Modal";
import ProductQuickView from "./ProductQuickView";
import { Product as IProduct } from "@/types/Product";
import { API_ENDPOINT } from "@/shared/constants";
import { useSession } from "next-auth/react";
import { useAppStore } from "@/providers/app-store-provider";
import { Link } from "@/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
interface ProductProps {
  data: IProduct;
  type?: string;
  className?: string;
}

function Product({ data, type, className }: ProductProps) {
  // hooks
  const { data: session } = useSession();
  const isAr = useLocale() === "ar";

  /**
   * ! Store
   */
  const {
    addToCart,
    cart,
    favourites,
    addToFavourites,
    removeFromFavourites,
    removeFromCart,
  } = useAppStore((state) => state);

  const [showQuickView, setShowQuickView] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [inCart, setInCart] = useState<boolean>(
    !!cart?.find((p) => p.id === data?.id)
  );
  const [inFavourites, setInFavourites] = useState<boolean>(
    !!favourites?.find((p) => p.id === data?.id)
  );

  /**
   * ! Handlers
   */

  const handleAddToCart = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!inCart) {
      setInCart(true);
      addToCart(data);
    } else {
      setInCart(false);
      removeFromCart(data?.id);
    }
  };

  const handleAddToFavourites = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (inFavourites) {
      setIsActive(false);
      setInFavourites((prev) => !prev);
      removeFromFavourites(data.id);
    } else {
      setIsActive(true);
      setInFavourites((prev) => !prev);
      addToFavourites(data);
    }
  };

  return (
    <>
      {!type || type === "grid" ? (
        <div className={`product ${classNames(className)}`}>
          <div className="product__thumb">
            {data.active ? (
              "") : (
              <span className="out_of_stock">Out of Stock</span>)}
            <span
              className="product__thumb__image"
              style={{ height: "100%", width: "100%" }}
            >
              {data.products.slice(0, 3).map((img, index) => (
                <Image
                  priority={true}
                  key={index}
                  src={`${API_ENDPOINT}/${img?.path}`}
                  alt="Product image"
                  style={{
                    maxHeight: "345px",
                  }}
                  height={345}
                  width={270}
                />
              ))}
            </span>
            <div className="product__thumb__actions">
              {data.active ? (
                <div className="product-btn" data-tip data-for="cartIcon">
                  {session?.token ? (
                    <LinkingButton
                      height="50px"
                      width="50px"
                      color="white"
                      className={`product__actions__item -round ${classNames({
                        active: inCart,
                      })}
                      `}
                      to="#"
                      onClick={handleAddToCart}
                      content={<i className="fas fa-shopping-bag" />}
                    ></LinkingButton>
                  ) : (
                    <LinkingButton
                      height="50px"
                      width="50px"
                      color="white"
                      className={`product__actions__item -round`}
                      to="/login"
                      content={<i className="fas fa-shopping-bag" />}
                    ></LinkingButton>
                  )}
                </div>
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
              )
              }

              <div className="product-btn" data-tip data-for="qvIcon">
                <LinkingButton
                  height={50 / 14 + "em"}
                  width={50 / 14 + "em"}
                  color="white"
                  className="product__actions__item -round"
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowQuickView(true);
                  }}
                  content={<i className="fas fa-eye" />}
                ></LinkingButton>
              </div>
              <div className="product-btn" data-tip data-for="wlIcon">
                {session?.token ? (
                  <LinkingButton
                    height={50 / 14 + "em"}
                    width={50 / 14 + "em"}
                    color="white"
                    className={`product__actions__item -round ${classNames({
                      active: inFavourites,
                    })}`}
                    to="#"
                    onClick={handleAddToFavourites}
                    content={<i className="fas fa-heart" />}
                  ></LinkingButton>
                ) : (
                  <LinkingButton
                    height={50 / 14 + "em"}
                    width={50 / 14 + "em"}
                    color="white"
                    to="/login"
                    content={<i className="fas fa-heart" />}
                  ></LinkingButton>
                )}
              </div>
            </div>
          </div>
          <div className="product__content" style={{ padding: "1.5em" }}>
            <div className="product__content__header">
              <h5 className="product-category">
                {isAr ? data?.category?.name_ar : data?.category.name_en}
              </h5>
              <Rate currentRate={data?.rating} />
            </div>
            <span className="product-name">
              {isAr ? data?.name_ar : data?.name_en}
            </span>
            <div className="product__content__footer"></div>
          </div>
        </div>
      ) : (
        <Link href={`/store/product/${data?.id}`}>
          <div className={`product-list ${classNames(className)}`}>
            <div className="product-list__thumb">
              {data.active ? (
                "") : (<span className="out_of_stock">Out of Stock</span>)}
              <span className="product-list__thumb__image">
                {data.products.map((img, index) => (
                  <Image
                    priority={true}
                    key={index}
                    src={`${API_ENDPOINT}/${img?.path}`}
                    alt="Product image"
                    style={{
                      maxHeight: "345px",
                      objectFit: "fill"
                    }}
                    height={345}
                    width={270}
                  />
                ))}
              </span>
            </div>
            <div className="product-list__content">
              <div className="product-list__content__top">
                <div className="product-category__wrapper">
                  <h5 className="product-category">
                    {isAr ? data?.category?.name_ar : data?.category.name_en}
                  </h5>
                  <Rate currentRate={data?.rating} />
                </div>
                <span className="product-name">
                  {isAr ? data.name_ar : data.name_en}
                </span>
                <div className="product__price">
                  <div className="product__price__wrapper">
                    {data?.price} BD
                  </div>
                </div>
              </div>
              <div className="product-list__content__bottom">
                <p className="product-description">
                  {isAr ? data.desc_ar : data.desc_en}
                </p>
                <div className="product__actions">
                  <div className="product-btn">
                    {session?.token ? (
                        data.active ? (
                          <LinkingButton
                            height="50px"
                            width="50px"
                            color="white"
                            className={`product__actions__item -round ${classNames({
                              active: inCart,
                            })}
                      `}
                            to="#"
                            onClick={handleAddToCart}
                            content={<i className="fas fa-shopping-bag" />}
                          ></LinkingButton>) : (
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
                        )
                    ) : (
                      <LinkingButton
                        height="50px"
                        width="50px"
                        color="white"
                        className={`product__actions__item -round`}
                        to="/login"
                        content={<i className="fas fa-shopping-bag" />}
                      ></LinkingButton>
                    )}
                  </div>
                  <div className="product-btn" data-tip data-for="l-qvIcon">
                    <LinkingButton
                      height={50 / 14 + "em"}
                      width={50 / 14 + "em"}
                      color="white"
                      className="product__actions__item -round"
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowQuickView(true);
                      }}
                      content={<i className="fas fa-eye" />}
                    ></LinkingButton>
                  </div>
                  <div
                    className="product-btn"
                    data-tip
                    data-for="l-wlIcon"
                    style={{ marginRight: 0 }}
                  >
                    {session?.token ? (
                      <LinkingButton
                        height={50 / 14 + "em"}
                        width={50 / 14 + "em"}
                        color="white"
                        className={`product__actions__item -round ${classNames({
                          active: inFavourites,
                        })}`}
                        to="#"
                        onClick={handleAddToFavourites}
                        content={<i className="fas fa-heart" />}
                      ></LinkingButton>
                    ) : (
                      <LinkingButton
                        height={50 / 14 + "em"}
                        width={50 / 14 + "em"}
                        color="white"
                        className={`product__actions__item -round ${classNames({
                          active: inFavourites,
                        })}`}
                        to="/login"
                        content={<i className="fas fa-heart" />}
                      ></LinkingButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
      <Modal
        showModal={showQuickView}
        setShowModal={setShowQuickView}
        width={1170}
      >
        <ProductQuickView data={data} />
      </Modal>
    </>
  );
}

export default Product;
