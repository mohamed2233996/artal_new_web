import LinkingButton from "@/components/Button";
import { useAppStore } from "@/providers/app-store-provider";
import { API_ENDPOINT } from "@/shared/constants";
import { Product } from "@/types/Product";
import { formatCurrency } from "@/utils/formatCurrency";
import { Link } from "@/navigation";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function FavouriteItem({ item }: { item: Product }) {
  const isAr = useLocale() === 'ar';
  const t = useTranslations('Favourites')
  const { cart, removeFromFavourites, addToCart, removeFromCart } = useAppStore(
    (state) => state
  );
  const [inCart, setInCart] = useState<boolean>(
    !!cart?.find((p) => p.id === item?.id)
  );

  const handleAddToCart = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!inCart) {
      setInCart(true);
      addToCart(item);
    } else {
      setInCart(false);
      removeFromCart(item?.id);
    }
  };

  const handleRemoveFromFavourites = async (
    e: React.SyntheticEvent,
    id: string
  ) => {
    e.preventDefault();
    removeFromFavourites(id);
  };

  return (
    <tr>
      <td>
        <div className="wishlist-product">
          <div className="wishlist-product__image">
            <img
              src={`${API_ENDPOINT}/${item.products[0].path}`}
              alt={item.desc_en}
            />
          </div>
          <div className="wishlist-product__content">
            <h5>{isAr ? item?.category?.name_ar : item?.category.name_en}</h5>
            <Link
              href={"/store/product/[slug]"}
              as={"/store/product/" + item.id}
            >
              <span>{isAr ? item.name_ar : item.name_en}</span>
            </Link>
          </div>
        </div>
      </td>
      <td>{formatCurrency(item?.price)}</td>
      <td>{t('In_Stock')}</td>
      <td
        style={{
          display: "flex",
          gap: "1em",
          alignItems: "center",
        }}
      >
        <LinkingButton
          height="50px"
          width="50px"
          color="white"
          className={`product_favourite_item -round ${inCart ? "active" : ""}`}
          to="#"
          onClick={handleAddToCart}
          content={<i className="fas fa-shopping-bag" />}
        ></LinkingButton>
        <a
          className="remove-btn"
          href={"#"}
          onClick={(e) => handleRemoveFromFavourites(e, item.id)}
        >
          <i className="fas fa-times"></i>
        </a>
      </td>
    </tr>
  );
}
