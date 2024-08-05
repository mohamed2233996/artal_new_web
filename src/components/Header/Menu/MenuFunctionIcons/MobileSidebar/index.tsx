import React, { useState } from "react";
// @ts-expect-error
import { CSSTransition } from "react-transition-group";

import ClientOnlyPortal from "@/shared/clientOnlyPortal";
import MobileNavigator from "./MobileNavigator";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

interface MobileNavSidebarProps {
  showMobileNav: boolean;
  setShowMobileNav: (v: boolean) => void;
}

export default function MobileNavSidebar({
  showMobileNav,
  setShowMobileNav,
}: MobileNavSidebarProps) {
  const t = useTranslations("Header");
  return (
    <>
      <ClientOnlyPortal selector="#nav-sidebar">
        <CSSTransition
          in={showMobileNav}
          unmountOnExit
          timeout={200}
          classNames="cart-sidebar"
        >
          <div className="navigation-sidebar">
            <MobileNavigator setShowMobileNav={setShowMobileNav} />
            <div className="navigation-sidebar__footer">
              <Link
                onClick={() => setShowMobileNav(false)}
                href="/login"
                className="navigation-sidebar__footer__auth"
              >
                {t("Login")}
              </Link>
            </div>
          </div>
        </CSSTransition>
      </ClientOnlyPortal>
      {showMobileNav && (
        <ClientOnlyPortal selector="#overlay">
          <div
            className="overlay"
            onClick={() => setShowMobileNav(false)}
          ></div>
        </ClientOnlyPortal>
      )}
    </>
  );
}
