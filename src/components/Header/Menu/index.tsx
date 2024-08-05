import React from "react";

import Navigator from "./Navigator";
import MenuFunctionIcons from "./MenuFunctionIcons";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function MenuOne() {
  const t = useTranslations("Home");
  const isAr = useLocale() === "ar";
  return (
    <div className="menu -style-1" dir={isAr ? "rtl" : "ltr"}>
      <div className="container">
        <div className="menu__wrapper">
          <Link href="/" className="menu__wrapper__logo">
            <span
              style={{
                textTransform: "uppercase",
                fontWeight: "bolder",
                fontSize: "1.5rem",
                color: "black",
              }}
            >
              {t("title")}
            </span>
          </Link>
          <Navigator />
          <MenuFunctionIcons />
        </div>
      </div>
    </div>
  );
}
