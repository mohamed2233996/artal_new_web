"use client";

import LinkingButton from "@/components/Button";
import { API_ENDPOINT } from "@/shared/constants";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const Order = ({ orders }: { orders: any[] }) => {
  const t = useTranslations("Order");
  const isAr = useLocale() === "ar";
  const { data: session } = useSession();
  const router = useRouter();

  const handleDeleteOrder = async (orderId: string) => {
    await fetch(`${API_ENDPOINT}/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${session?.token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      router.refresh();
    });
  };

  return (
    <div className="cart" dir={isAr ? "rtl" : "ltr"}>
      <div className="container">
        {!orders || orders.length === 0 ? (
          <div className="cart__empty">
            <h3>{t("No_Order")}.</h3>
            <LinkingButton
              color="dark"
              to={"/store"}
              content={t("Shopping_Now")}
            />
          </div>
        ) : (
          <>
            {orders?.map((order, index) => (
              <div key={index} style={{ marginTop: "2em" }}>
                <div
                  style={{
                    border: "1px rgba(0,0,0,0.2) solid",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 8px 0px rgba(0,0,0,0.2)",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        background: `${
                          order?.status === "CANCELED" ? "red" : "#EB7123"
                        }`,
                        width: "0.5em",
                      }}
                    ></div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          padding: "1.5em",
                          display: "flex",
                          flexDirection: "column",
                          gap: "1em",
                        }}
                      >
                        <h3>
                          {t("Id")}: {order.id}
                        </h3>
                        <p>{order.createdAt.slice(0, 16).replace("T", " ")}</p>
                      </div>
                      {order?.status !== "DELIVERED" &&
                      order?.status !== "CANCELED" ? (
                        <div
                          style={{
                            marginRight: isAr ? "0em" : "2em",
                            marginLeft: isAr ? "2em" : "0em",
                          }}
                        >
                          <button
                            onClick={() => handleDeleteOrder(order?.id)}
                            className="btn -red"
                          >
                            {t("Cancel")}
                          </button>
                        </div>
                      ) : (
                        <div
                          style={{
                            marginRight: isAr ? "0em" : "2em",
                            marginLeft: isAr ? "2em" : "0em",
                          }}
                        >
                          {order?.status !== "DELIVERED" && (
                            <button
                              onClick={() => handleDeleteOrder(order?.id)}
                              className="-disable btn -red"
                            >
                              {t("Canceled")}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {order?.status === "CANCELED" ? (
                    <div className="container">
                      <div className="row">
                        <div
                          className="col-12 hh-grayBox pt45 pb20"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "20px",
                            color: "#f26460",
                          }}
                        >
                          <p>{t("Canceled_Order")}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="container">
                      <div className="row">
                        <div className="col-12 hh-grayBox pt45 pb20">
                          <div className="row justify-content-between">
                            <div
                              className={`order-tracking ${
                                order?.status === "CANCELED" ? "" : "completed"
                              }`}
                            >
                              <span className="is-complete"></span>
                              <p>{t("Placed")}</p>
                            </div>
                            <div
                              className={`order-tracking ${
                                (order?.status === "SHIPPED" ||
                                  order?.status === "DELIVERED") &&
                                "completed"
                              }`}
                            >
                              <span className="is-complete"></span>
                              <p>{t("Shipped")}</p>
                            </div>
                            <div
                              className={`order-tracking ${
                                order?.status === "DELIVERED" && "completed"
                              }`}
                            >
                              <span className="is-complete"></span>
                              <p>{t("Delivered")}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    style={{
                      border: "1px rgba(0,0,0,0.2) solid",
                      boxShadow: "0 4px 8px 0px rgba(0,0,0,0.2)",
                    }}
                  >
                    <div
                      style={{
                        padding: "1.5em",
                        display: "flex",
                        justifyContent: "flex-start",
                        gap: "1em",
                      }}
                    >
                      {/* ====== ORDER DETAILS ========= */}
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <h3>{t("Details")}</h3>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <div
                            style={{
                              padding: "1.5em",
                              display: "flex",
                              flexDirection: "column",
                              gap: "1em",
                            }}
                          >
                            <p>
                              {t("Country")}: {order.country}
                            </p>
                            <p>
                              {t("City")}: {order.city}
                            </p>
                            <p>
                              {t("Address")}: {order.address}
                            </p>
                            <p>
                              {t("Zip")}: {order.zip}
                            </p>
                          </div>

                          <div
                            style={{
                              padding: "1.5em",
                              display: "flex",
                              flexDirection: "column",
                              gap: "1em",
                            }}
                          >
                            <p>
                              {t("First_Name")}: {order.firstname}
                            </p>
                            <p>
                              {t("Last_Name")}: {order.lastname}
                            </p>
                            <p>
                              {t("Primary_Phone")}: {order.p_phone}
                            </p>
                            <p>
                              {t("Note")}: {order.notes}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div style={{ padding: "2em" }}>
                          <div
                            key={index}
                            style={{
                              paddingTop: "0.5em",
                              display: "flex",
                              flexDirection: "column",
                              gap: "1em",
                            }}
                          >
                            <p>
                              {t("Total")}: {order.totalPrice}
                            </p>
                            <p>
                              {t("Type")}:{" "}
                              {order.type === "CASH" ? t(`CASH`) : t("CARD")}
                            </p>
                            <p>
                              {t("Paid")}: {order?.paid ? t("Yes") : t("NO")}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* ====== PRODUCT DETAILS ========= */}
                      <div>
                        <h3>{t("Product_Details")}</h3>
                        <div style={{ padding: "2em" }}>
                          {order.orderItems.map((item, index) => (
                            <div key={index} style={{ paddingTop: "0.5em" }}>
                              <span style={{ fontWeight: "bold" }}>
                                {item.quantity}
                              </span>{" "}
                              <span>
                                {isAr
                                  ? item.product?.name_ar
                                  : item.product?.name_en}
                              </span>
                              {"   "}
                              <span style={{ marginLeft: "1em" }}>
                                {item.product?.price * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Order;
