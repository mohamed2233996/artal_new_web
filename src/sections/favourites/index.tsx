"use client";

import { useAppStore } from "@/providers/app-store-provider";
import FavouriteItem from "./FavouriteItem";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { API_ENDPOINT } from "@/shared/constants";
import { useLocale, useTranslations } from "next-intl";

const Favourites = () => {
  const t = useTranslations("Favourites");
  const favourites = useAppStore((state) => state.favourites);
  const { data: session, status } = useSession();

  const asyncFavouriteData = async (currentFavouriteData: { id: string }[]) => {
    await fetch(`${API_ENDPOINT}/favourites/sync`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${session?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentFavouriteData),
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      const currentFavouriteData = favourites.map((i) => ({ id: i.id }));
      asyncFavouriteData(currentFavouriteData);
    }
  }, [status]);

  return (
    <div className="wishlist">
      <div className="container">
        {!favourites || favourites.length === 0 ? (
          <div className="wishlist__empty">
            <h3>{t("No_Products")}</h3>
          </div>
        ) : (
          <div className="wishlist__table">
            <div className="wishlist__table__wrapper">
              <table>
                <colgroup>
                  <col style={{ width: "40%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>{t("Product")}</th>
                    <th>{t("Price")}</th>
                    <th>{t("Stock")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {favourites.map((item) => (
                    <FavouriteItem item={item} key={item.id} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Favourites;
