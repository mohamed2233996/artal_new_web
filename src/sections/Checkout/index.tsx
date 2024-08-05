"use client";

import { useAppStore } from "@/providers/app-store-provider";
import { API_ENDPOINT } from "@/shared/constants";
import { calculateSubtotalPrice } from "@/utils/calculateSubtotalPrice";
import { formatCurrency } from "@/utils/formatCurrency";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkout as CheckoutType } from "@/types";
import { LoadingSvg } from "@/app/[locale]/loading";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { TaxAndDeliveryFeesData } from "@/actions/getTaxAndDeliveryFees";
import countries from "@/data/countries.json";

function calculateFees(
  subtotal: number,
  freeAfter: number,
  country: string | undefined,
  bahrainDelivery: number,
  worldwideDelivery: number
) {
  if (subtotal > freeAfter) {
    return 0;
  } else {
    if (country === "Bahrain" || country === "البحرين") {
      return bahrainDelivery;
    } else {
      return worldwideDelivery;
    }
  }
}

const Checkout = ({
  taxAndDeliveryFees,
}: {
  taxAndDeliveryFees: TaxAndDeliveryFeesData;
}) => {
  const t = useTranslations("Checkout");
  const lang = useLocale();
  const isAr = lang === "ar";

  const CheckOutSchema: ZodType<CheckoutType> = z.object({
    firstName: z
      .string({ required_error: t("Required") })
      .min(2, {
        message: isAr
          ? "رجاءا قم بادخال اسم أول صحيح"
          : "Please enter a valid first name",
      })
      .max(15, {
        message: isAr
          ? "رجاءا قم بادخال اسم أول صحيح"
          : "Please enter a valid first name",
      })
      .refine((v) => !/\d/.test(v), {
        message: isAr
          ? "رجاءا قم بادخال اسم أول صحيح"
          : "Please enter a valid first name",
      }),
    lastName: z
      .string({ required_error: t("Required") })
      .min(2, {
        message: isAr
          ? "رجاءا قم بادخال اسم ثاني صحيح"
          : "Please enter a valid last name",
      })
      .max(15, {
        message: isAr
          ? "رجاءا قم بادخال اسم ثاني صحيح"
          : "Please enter a valid last name",
      })
      .refine((v) => !/\d/.test(v), {
        message: isAr
          ? "رجاءا قم بادخال اسم ثاني صحيح"
          : "Please enter a valid last name",
      }),
    country: z
      .string({ required_error: t("Required") })
      .min(3, {
        message: isAr
          ? "رجاءا قم بادخال اسم دولة صحيح"
          : "Please enter a valid country name",
      })
      .max(15, {
        message: isAr
          ? "رجاءا قم بادخال اسم دولة صحيح"
          : "Please enter a valid country name",
      })
      .refine((v) => !/\d/.test(v), {
        message: isAr
          ? "رجاءا قم بادخال اسم دولة صحيح"
          : "Please enter a valid country name",
      }),
    city: z
      .string({ required_error: t("Required") })
      .min(3, {
        message: isAr
          ? "رجاءا قم بادخال اسم مدينة صحيح"
          : "Please enter a valid city name",
      })
      .max(15, {
        message: isAr
          ? "رجاءا قم بادخال اسم مدينة صحيح"
          : "Please enter a valid city name",
      })
      .refine((v) => !/\d/.test(v), {
        message: isAr
          ? "رجاءا قم بادخال اسم مدينة صحيح"
          : "Please enter a valid city name",
      }),
    address: z
      .string({ required_error: t("Required") })
      .min(3, {
        message: isAr
          ? "رجاءا قم بادخال عنوان صحيح"
          : "Please enter a valid address",
      })
      .max(100, {
        message: isAr
          ? "رجاءا قم بادخال عنوان صحيح"
          : "Please enter a valid address",
      }),
    zip: z
      .string({ required_error: t("Required") })
      .min(4, {
        message: isAr
          ? "رجاءا قم بادخال رمز بريدي صحيح"
          : "Please enter a valid zip code",
      })
      .max(6, {
        message: isAr
          ? "رجاءا قم بادخال رمز بريدي صحيح"
          : "Please enter a valid zip code",
      }),
    notes: z
      .string({ required_error: t("Required") })
      .min(4, {
        message: isAr
          ? "يجب أن يحتوي على 4 أحرف على الأقل"
          : "this field must contain 4 characters at least.",
      })
      .max(200, {
        message: isAr
          ? "يجب ألا يزيد عن 200 حرف"
          : "this field must contain 200 characters at most.",
      }),
    p_phone: z
      .string({ required_error: t("Required") })
      .min(8, {
        message: isAr
          ? "رجاءا قم بادخال رقم هاتف صحيح"
          : "Please enter a valid phone number",
      })
      .max(13, {
        message: isAr
          ? "رجاءا قم بادخال رقم هاتف صحيح"
          : "Please enter a valid phone number",
      })
      .refine((v) => /^[+0-9]+$/.test(v), {
        message: isAr
          ? "رجاءا قم بادخال رقم هاتف صحيح"
          : "Please enter a valid phone number",
      }),
    s_phone: z
      .string({ required_error: t("Required") })
      .min(8, {
        message: isAr
          ? "رجاءا قم بادخال رقم هاتف صحيح"
          : "Please enter a valid phone number",
      })
      .max(13, {
        message: isAr
          ? "رجاءا قم بادخال رقم هاتف صحيح"
          : "Please enter a valid phone number",
      })
      .refine((v) => /^[+0-9]+$/.test(v), {
        message: isAr
          ? "رجاءا قم بادخال رقم هاتف صحيح"
          : "Please enter a valid phone number",
      }),
  });
  // sync with apis
  const router = useRouter();
  const { cart, removeAllFromCart } = useAppStore((state) => state);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState("cash");
  const payment = useAppStore((state) => state.payment);
  const addPaymentData = useAppStore((state) => state.addPaymentData);

  /**
   * LOCAL STATE
   */
  const subtotal = Number(calculateSubtotalPrice(cart, false));
  const tax = subtotal * Number(taxAndDeliveryFees?.tax);
  const [selectedCountry, setSelectedCountry] = useState(payment?.country || 'Bahrain');
  const [fees, setFees] = useState<number>();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CheckoutType>({
    resolver: zodResolver(CheckOutSchema),
  });

  /**
   * HELPER FUNCTIONS
   */

  const calculateTotalPrice = useCallback(() => {
    return (subtotal + fees! + tax).toFixed(2);
  }, [fees, subtotal, tax]);

  /**
   * CONSTANTS
   */

  const handleApiAsync = async () => {
    const currentCartData = {
      cartId: session?.user?.cart?.id,
      cart: cart.map((i) => ({
        id: i.id,
        quantity: i.quantity,
      })),
    };

    await fetch(`${API_ENDPOINT}/cart/sync`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${session?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentCartData),
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      if (cart.length === 0) {
        router.push("/cart");
        setLoading(false);
      } else {
        handleApiAsync();
        setLoading(false);
      }
    }
  }, [status]);

  useEffect(() => {
    calculateTotalPrice();
  }, [fees, calculateTotalPrice]);

  useEffect(() => {
    setSelectedCountry(payment?.country || 'Bahrain');
  }, [payment]);

  useEffect(() => {
    setFees(
      calculateFees(
        subtotal,
        Number(taxAndDeliveryFees?.freeAfter),
        selectedCountry,
        Number(taxAndDeliveryFees?.bahrainDelivery),
        Number(taxAndDeliveryFees?.worldwideDelivery)
      )
    );
  }, [subtotal, selectedCountry]);

  const onSubmit = async (data: CheckoutType) => {
    setLoading(true);

    if (!payment) {
      addPaymentData(getValues());
    }

    const rawRes = await fetch(`${API_ENDPOINT}/orders`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session?.token}`,
        "Content-Type": "application/json",
        "x-lang": lang,
      },
      body: JSON.stringify({
        ...data,
        country: selectedCountry,
        type: selectedOption,
      }),
    });

    const res = await rawRes.json();

    if (res?.url) {
      if (selectedOption === "cash") {
        removeAllFromCart();
      }
      router.push(res?.url);
    }
  };

  if (loading) {
    return <LoadingSvg />;
  }

  return (
    <div className="checkout" dir={isAr ? "rtl" : "ltr"}>
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-lg-7">
            <form>
              <div className="checkout__form">
                <div className="checkout__form__shipping">
                  <h5 className="checkout-title">{t("Contact_Info")}</h5>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="input-validator">
                        <label>
                          {t("Primary_Phone")}
                          <span>*</span>
                          <input
                            type="text"
                            {...register("p_phone")}
                            defaultValue={payment?.p_phone}
                          />
                          {errors?.p_phone && (
                            <span>{errors.p_phone.message}</span>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="input-validator">
                        <label>
                          {t("Secondary_Phone")} <span>*</span>
                          <input
                            type="text"
                            {...register("s_phone", {
                              required: { value: true, message: "required" },
                            })}
                            defaultValue={payment?.s_phone}
                          />
                          {errors?.s_phone && (
                            <span>{errors.s_phone.message}</span>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <form>
              <div className="checkout__form">
                <div className="checkout__form__shipping">
                  <h5 className="checkout-title">{t("Shipping_Address")}</h5>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="input-validator">
                        <label>
                          {t("First_Name")} <span>*</span>
                          <input
                            type="text"
                            {...register("firstName")}
                            defaultValue={payment?.firstName}
                          />
                          {errors?.firstName && (
                            <span>{errors.firstName.message}</span>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="input-validator">
                        <label>
                          {t("Last_Name")} <span>*</span>
                          <input
                            type="text"
                            {...register("lastName")}
                            defaultValue={payment?.lastName}
                          />
                          {errors?.lastName && (
                            <span>{errors.lastName.message}</span>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="input-validator">
                        <label>
                          {t("Country")} <span>*</span>
                          <select
                            style={{
                              display: "block",
                              marginTop: "1em",
                              padding: "1em",
                            }}
                            defaultValue={payment?.country || 'Bahrain'}
                            {...register("country")}
                            onChange={(e) => {
                              setSelectedCountry(e.target.value);
                              setFees(() =>
                                calculateFees(
                                  subtotal,
                                  Number(taxAndDeliveryFees?.freeAfter),
                                  selectedCountry,
                                  Number(taxAndDeliveryFees?.bahrainDelivery),
                                  Number(taxAndDeliveryFees?.worldwideDelivery)
                                )
                              );
                            }}
                          >
                            {countries.map((c) => (
                              <option key={c.code} value={c.name}>
                                {isAr ? c.nameAr : c.name}
                              </option>
                            ))}
                          </select>
                          {errors?.country && (
                            <span>{errors.country.message}</span>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="input-validator">
                        <label>
                          {t("Address")} <span>*</span>
                          <input
                            type="text"
                            {...register("address")}
                            placeholder="address"
                            defaultValue={payment?.address}
                          />
                          {errors?.address && (
                            <span>{errors.address.message}</span>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="input-validator">
                        <label>
                          {t("City")} <span>*</span>
                          <input
                            type="text"
                            {...register("city")}
                            defaultValue={payment?.city}
                          />
                          {errors?.city && <span>{errors.city.message}</span>}
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="input-validator">
                        <label>
                          {t("Zip")} <span>*</span>
                          <input
                            type="text"
                            {...register("zip")}
                            defaultValue={payment?.zip}
                          />
                          {errors?.zip && <span>{errors.zip.message}</span>}
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="input-validator">
                        <label>
                          {t("Note")}
                          <input
                            type="text"
                            placeholder="Note about your order, e.g, special noe for delivery"
                            {...register("notes")}
                            defaultValue={payment?.notes}
                          />
                          {errors?.notes && <span>{errors.notes.message}</span>}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-12 col-lg-4">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-12 ml-auto">
                <div className="checkout__total">
                  <h5 className="checkout-title">{t("title")}</h5>
                  <div className="checkout__total__price">
                    <h5>{t("Product")}</h5>
                    <table>
                      <colgroup>
                        <col style={{ width: "70%" }} />
                        <col style={{ width: "30%" }} />
                      </colgroup>
                      <tbody>
                        {cart.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <span>{item.quantity}</span>{" "}
                              {isAr ? item?.name_ar : item?.name_en}
                            </td>
                            <td>
                              {formatCurrency(item.price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="checkout__total__price__total-count">
                      <table>
                        <tbody>
                          <tr>
                            <td>Delivery Fees</td>
                            <td>{fees === 0 ? "free" : `${fees} BD`}</td>
                          </tr>
                          <tr>
                            <td>Tax</td>
                            <td>{taxAndDeliveryFees?.tax * 100}%</td>
                          </tr>
                          <tr>
                            <td>{t("Total")}</td>
                            <td>{calculateTotalPrice()} BD</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexDirection: "column",
                    }}
                  >
                    <h5 className="checkout-title">{t("Payment_Methods")}</h5>
                    <div style={{ display: "flex", gap: "0.5em" }}>
                      <input
                        id="cash-checkbox"
                        type="checkbox"
                        value="cash"
                        checked={selectedOption === "cash"}
                        onChange={(event) =>
                          selectedOption !== event.target.value &&
                          setSelectedOption(event.target.value)
                        }
                      />
                      <label htmlFor="cash-checkbox" style={{ marginLeft: 5 }}>
                        {t("Cash")}
                      </label>
                    </div>
                    <div style={{ display: "flex", gap: "0.5em" }}>
                      <input
                        id="card-checkbox"
                        type="checkbox"
                        value="card"
                        checked={selectedOption === "card"}
                        onChange={(event) =>
                          selectedOption !== event.target.value &&
                          setSelectedOption(event.target.value)
                        }
                      />
                      <label htmlFor="card-checkbox" style={{ marginLeft: 5 }}>
                        {t("Card")}
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn -red"
                    style={{ marginTop: 15 }}
                    onClick={handleSubmit((data) => onSubmit(data))}
                  >
                    {t("Proceed")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
