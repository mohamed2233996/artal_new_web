"use client";

import LinkingButton from "@/components/Button";
import { useAppStore } from "@/providers/app-store-provider";
import { API_ENDPOINT } from "@/shared/constants";
import { calculateSubtotalPrice } from "@/utils/calculateSubtotalPrice";
import { formatCurrency } from "@/utils/formatCurrency";
import { Link } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";

const Cart = () => {
  const t = useTranslations("Cart");
  const isAr = useLocale() === "ar";
  const cart = useAppStore((state) => state.cart);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const removeAllFromCart = useAppStore((state) => state.removeAllFromCart);
  const increaseQuantity = useAppStore((state) => state.increaseQuantity);
  const decreaseQuantity = useAppStore((state) => state.decreaseQuantity);

  /**
   * ! Handlers
   */

  const removeAllProduct = (e: React.SyntheticEvent) => {
    e.preventDefault();
    removeAllFromCart();
  };

  const removeProduct = (e: React.SyntheticEvent, cartId: string) => {
    e.preventDefault();
    removeFromCart(cartId);
  };

  return (
    <div className="cart">
      <div className="container">
        {!cart || cart?.length === 0 ? (
          <div className="cart__empty">
            <h3>{t("No_Products")}</h3>
            <LinkingButton
              color="dark"
              to={"/store"}
              content={t("Shopping_Now")}
            />
          </div>
        ) : (
          <>
            <div className="cart__table">
              <div className="cart__table__wrapper">
                <table>
                  <colgroup>
                    <col style={{ width: "40%" }} />
                    <col style={{ width: "17%" }} />
                    <col style={{ width: "17%" }} />
                    <col style={{ width: "17%" }} />
                    <col style={{ width: "9%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>{t("Product")}</th>
                      <th>{t("Price")}</th>
                      <th>{t("Quantity")}</th>
                      <th>{t("Total")}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="cart-product">
                            <div className="cart-product__image">
                              <img
                                src={`${API_ENDPOINT}/${item.products[0].path}`}
                                alt={item.name_en}
                              />
                            </div>
                            <div className="cart-product__content">
                              <h5>
                                {isAr
                                  ? item?.category?.name_ar
                                  : item?.category.name_en}
                              </h5>
                              <Link href={`/store/product/${item?.id}`}>
                                <span>
                                  {isAr ? item.name_ar : item.name_en}
                                </span>
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td>{formatCurrency(item?.price)}</td>
                        <td>
                          {/* <Quantity defaultQuantity={item.quantity} quantity={item.quantity} /> */}

                          <div className={`quantity-controller`}>
                            <div
                              className="quantity-controller__btn -descrease"
                              onClick={() => {
                                if (item.quantity < 2) {
                                  return;
                                }
                                decreaseQuantity(item?.id);
                              }}
                            >
                              -
                            </div>
                            <h5 className="quantity-controller__number">
                              {item?.quantity}
                            </h5>
                            <div
                              className="quantity-controller__btn -increase"
                              onClick={() => {
                                if (item?.quantity >= 100000) {
                                  return;
                                }
                                increaseQuantity(item?.id);
                              }}
                            >
                              +
                            </div>
                          </div>
                        </td>
                        <td>{formatCurrency(item?.price * item?.quantity)}</td>
                        <td>
                          <a
                            href={"#"}
                            onClick={(e) => removeProduct(e, item.id)}
                          >
                            <i className="fas fa-times"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="cart__table__footer">
                <Link href={"/store"}>
                  <span>
                    <i className="fas fa-long-arrow-left"></i>
                    {t("Continue")}
                  </span>
                </Link>

                <Link href="#">
                  <span onClick={(e) => removeAllProduct(e)}>
                    <i className="fas fa-trash"></i>
                    {t("Clear")}
                  </span>
                </Link>
              </div>
            </div>
            <div className="cart__total">
              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="cart__total__content">
                    <h3>{t("Total")}</h3>
                    <table>
                      <tbody>
                        <tr>
                          <th>{t("Total")}</th>
                          <td className="final-price">
                            {calculateSubtotalPrice(cart, true)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <LinkingButton
                      height={45 / 14 + "em"}
                      width="100%"
                      to={"/checkout"}
                      color="dark"
                      content={t("Proceed")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Cart;
