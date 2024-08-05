import React from "react";
// @ts-expect-error
import { CSSTransition } from "react-transition-group";

import CartItem from "./CartItem";
import ClientOnlyPortal from "@/shared/clientOnlyPortal";
import { useAppStore } from "@/providers/app-store-provider";
import { calculateSubtotalPrice } from "@/utils/calculateSubtotalPrice";
import LinkingButton from "@/components/Button";
import { API_ENDPOINT } from "@/shared/constants";
import { useLocale, useTranslations } from "next-intl";

interface CartItemsSidebarProps {
  showCart: boolean;
  setShowCart: (val: boolean) => void;
}

function CartItemsSidebar({ showCart, setShowCart }: CartItemsSidebarProps) {
  const cart = useAppStore((state) => state.cart);
  const t = useTranslations("Cart");
  const isAr = useLocale() === "ar";

  return (
    <>
      <ClientOnlyPortal selector="#cart-sidebar">
        <CSSTransition
          in={showCart}
          unmountOnExit
          timeout={200}
          classNames="cart-sidebar"
        >
          <div className="cart-items__wrapper">
            <h2>{t("title")}</h2>
            {cart?.length === 0 ? (
              <h3 className="empty-noti">{t("No_Products")}</h3>
            ) : (
              <>
                {cart?.length !== 0 &&
                  cart?.map((item) => (
                    <CartItem
                      key={item?.id}
                      id={item?.id}
                      image={`${API_ENDPOINT}/${item?.products![0].path}`}
                      name={isAr ? item?.name_ar : item?.name_en}
                      price={item?.price}
                      quantity={item?.quantity}
                      setShowCart={setShowCart}
                    />
                  ))}
                <div className="cart-items__total">
                  <div className="cart-items__total__price">
                    <h5>{t("Total")}</h5>
                    <span>{calculateSubtotalPrice(cart, true)}</span>
                  </div>
                  <div className="cart-items__total__buttons">
                    <LinkingButton
                      width="100%"
                      onClick={() => setShowCart(false)}
                      to="/cart"
                      color="dark"
                      content={t("title")}
                    />
                    <LinkingButton
                      onClick={() => setShowCart(false)}
                      width="100%"
                      to="/checkout"
                      color="red"
                      content={t("Checkout")}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </CSSTransition>
      </ClientOnlyPortal>
      {showCart && (
        <ClientOnlyPortal selector="#overlay">
          <div
            className="overlay"
            onClick={() => {
              setShowCart(false);
            }}
          ></div>
        </ClientOnlyPortal>
      )}
    </>
  );
}

export default CartItemsSidebar;
