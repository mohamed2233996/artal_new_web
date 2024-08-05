"use client";

import LinkingButton from "@/components/Button";
import { useAppStore } from "@/providers/app-store-provider";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";

const OrderStatus = ({ status }: { status: string }) => {
  const { removeAllFromCart } = useAppStore((state) => state);
  const t = useTranslations("Order");
  const orderMessage =
    status === "CAPTURED"
      ? t("Captured_Order")
      : status === "IN_PROGRESS"
      ? t("In_Progress_Order")
      : t("Something_Wrong");

  useEffect(() => {
    if (status === "CAPTURED" || status === "IN_PROGRESS") {
      removeAllFromCart();
    }
  }, []);

  return (
    <>
      <div className="cart">
        <div className="container">
          <div className="cart__empty">
            {status === "CAPTURED" && (
              <div>
                <Image
                  src="/images/congrats.jpeg"
                  height={300}
                  alt="payment done"
                  width={300}
                />
              </div>
            )}
            <h3>{orderMessage}</h3>
            <LinkingButton
              color="white"
              to={"/store"}
              content={t("Discover")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderStatus;
