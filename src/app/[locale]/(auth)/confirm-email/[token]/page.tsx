"use client";

import { LoadingSvg } from "@/app/[locale]/loading";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { Link } from "@/navigation";
import { useAppStore } from "@/providers/app-store-provider";
import { API_ENDPOINT } from "@/shared/constants";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const params = useParams();
  const [status, setStatus] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const t = useTranslations("Confirmation");
  const emptyState = useAppStore((state) => state.emptyState);
  const cart = useAppStore((state) => state.cart);

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

  const handleSignOut = () => {
    emptyState();
    handleApiAsync();
    signOut({ callbackUrl: "/login", redirect: true });
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${API_ENDPOINT}/auth/confirm-email/${params.token}`, {
        cache: "no-store",
      })
        .then(async (res) => {
          return await res.json();
        })
        .then((data) => {
          setStatus(data?.status);
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  if (isLoading) return <LoadingSvg />;
  if (!status) return <p>Something Went Wrong</p>;

  return (
    <>
      <BreadcrumbSection name={t("title")} />

      <div style={{ textAlign: "center", margin: "15em" }}>
        {status === "ACTIVIATED" ? (
          <h2>
            {t("Activiated")}{" "}
            {session?.token ? (
              <Link onClick={handleSignOut} href={"/login"}>
                {t("Login")}
              </Link>
            ) : (
              <Link href={"/login"}>{t("Login")}</Link>
            )}
            .
          </h2>
        ) : status === "EXPIRED" ? (
          <h2>{t("Expired")}</h2>
        ) : status === "INVALID" ? (
          <h2>{t("Invalid")}</h2>
        ) : (
          <h2>{t("Something_Wrong")}</h2>
        )}
      </div>
    </>
  );
}
