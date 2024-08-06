"use client";

import { useState } from "react";
import { useAppStore } from "@/providers/app-store-provider";
import Rate from "@/components/Rate";
import { formatCurrency } from "@/utils/formatCurrency";
import ProductDetailController from "./ProductDetailController";
import ProductDetailInfoTab from "./ProductDetailInfoTab";
import { Link } from "@/navigation";
import { Product } from "@/types/Product";
import { useLocale, useTranslations } from "next-intl";

export default function ProductDetailInfo({
  data,
  hideTab,
  reviews,
  quickview,
}: {
  data: Product;
  hideTab?: boolean;
  reviews?: any[];
  quickview?: boolean;
}) {
  const isAr = useLocale() === "ar";
  const t = useTranslations("Store");
  const {
    addToCart,
    cart,
    favourites,
    addToFavourites,
    removeFromFavourites,
    removeFromCart,
    getQuantity,
  } = useAppStore((state) => state);
  const [inCart, setInCart] = useState<boolean>(
    !!cart?.find((p) => p.id === data?.id)
  );
  const [inFavourites, setInFavourites] = useState<boolean>(
    !!favourites?.find((p) => p.id === data?.id)
  );

  const initialQuantity = getQuantity(data?.id);
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  const numbOfReviews = reviews?.length ?? 0;

  /**
   * ! Handlers
   */

  const handleAddToCart = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!inCart) {
      setInCart(true);
      addToCart(data, quantity);
    } else {
      setInCart(false);
      removeFromCart(data?.id);
    }
  };

  const handleAddToFavourites = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (inFavourites) {
      setInFavourites((prev) => !prev);
      removeFromFavourites(data.id);
    } else {
      setInFavourites((prev) => !prev);
      addToFavourites(data);
    }
  };

  return (
    <div className="product-detail__content">
      <div className="product-detail__content__header">
        <h5>{isAr ? data?.category.name_ar : data?.category.name_en}</h5>

        {quickview ? (

          <Link href={`/store/product/${data?.id}`}>
            <h2>{isAr ? data?.name_ar : data?.name_en}</h2>
          </Link>
        ) : (
          <div className="one_row_prodTap">
            <h2>{isAr ? data?.name_ar : data?.name_en}</h2>
            {data.active ? ("") : (
              <span className="out_of_stock">Out of Stock</span>

            )}
          </div>)}

        <div className="product-detail__content__header__comment-block">
          <Rate currentRate={data?.rating} />
          <span>
            {numbOfReviews} {t("Reviews")}{" "}
          </span>
        </div>
        <div className="d-flex justify-content-between">
          <h3>{formatCurrency(data?.price)}</h3>
          <Link
            href={
              data?.instagram
                ? data?.instagram
                : "https://www.instagram.com/artal_altabiea_bh/"
            }
            style={{ display: "flex", alignItems: "center" }}
          >
            <i className="fab fa-instagram" />
          </Link>
        </div>
      </div>
      <div className="divider"></div>
      <div className="product-detail__content__footer">
        <p className="product-detail__content__footer__header">
          {t("Description")}
        </p>
        <p>{isAr ? data.desc_ar : data.desc_en}</p>
        <ProductDetailController
          data={data}
          onAddToCart={handleAddToCart}
          onAddToWishList={handleAddToFavourites}
          inCart={inCart}
          inFavourites={inFavourites}
          setInCart={setInCart}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>
      {!hideTab && (
        <>
          <div className="divider"></div>
          <div className="product-detail__content__tab">
            <ProductDetailInfoTab productId={data?.id} reviews={reviews!} />
          </div>
        </>
      )}
    </div>
  );
}
