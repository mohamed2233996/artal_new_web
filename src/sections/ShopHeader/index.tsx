"use client";

import Select from "@/components/Elements/Select";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export default function ShopHeader({
  curentView,
  setCurrentView,
  setCurrentSort,
}) {
  const t = useTranslations("Store");
  const shop = {
    SORT_TYPES: [
      { name: t("Default"), value: "default" },
      { name: t("AZ_Sorting"), value: "az" },
      { name: t("ZA_Sorting"), value: "za" },
      { name: t("LTH_Sorting"), value: "lth" },
      { name: t("HTL_Sorting"), value: "htl" },
    ],
    DEFAULT_VIEW: "grid",
  };
  const [view, setView] = useState(curentView ? curentView : shop.DEFAULT_VIEW);
  useEffect(() => {
    setCurrentView && setCurrentView(view);
  }, [view]);

  return (
    <div className="shop-header">
      <div className="shop-header__view">
        <div className="shop-header__view__icon">
          <a
            href="/"
            className={view === "grid" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setView("grid");
            }}
          >
            <i className="fas fa-th"></i>
          </a>
          <a
            href={process.env.PUBLIC_URL + "#"}
            className={view === "list" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setView("list");
            }}
          >
            <i className="fas fa-bars"></i>
          </a>
        </div>
        {view === "grid" ? (
          <h5 className="shop-header__page">{t('Grid')}</h5>
        ) : (
          <h5 className="shop-header__page">{t('List')}</h5>
        )}
      </div>
      <Select options={shop.SORT_TYPES} getValue={setCurrentSort} />
    </div>
  );
}
