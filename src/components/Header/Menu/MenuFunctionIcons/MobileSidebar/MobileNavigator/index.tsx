import { Link } from "@/navigation";
import { useAppStore } from "@/providers/app-store-provider";
import { useTranslations } from "next-intl";

const MobileNavigator = ({
  setShowMobileNav,
}: {
  setShowMobileNav: (v: boolean) => void;
}) => {
  const t = useTranslations("Header");
  const mafa = useTranslations("Footer"); // mobile append from footer

  const { cart } = useAppStore((state) => state);

  const footerLinks = {
    accountLinks: [
      { name: mafa("Favourites"), to: "/favourites" },
      { name: mafa("Cart"), to: "/cart" },
      {
        name: mafa("Checkout"),
        to: `${cart?.length === 0 ? "/cart" : "/checkout"}`,
      },
    ],
    informationLinks: [
      { name: mafa("Policy"), to: "/policy" },
      { name: mafa("Terms"), to: "/terms" },
    ],
    creditLinks: [
      { name: mafa("Policy"), to: "/policy" },
      { name: mafa("Terms"), to: "/terms" },
    ],
  };

  return (
    <div className="navigator-mobile">
      <ul>
        <li className="relative">
          <Link onClick={() => setShowMobileNav(false)} href="/">
            {t("Home")}
          </Link>
        </li>

        <li onClick={() => setShowMobileNav(false)} className="relative">
          <Link href="/services">{t("Services")}</Link>
        </li>

        <li onClick={() => setShowMobileNav(false)} className="relative">
          <Link href="/about">{t("About")}</Link>
        </li>

        <li onClick={() => setShowMobileNav(false)} className="relative">
          <Link href="/store">{t("Store")}</Link>
        </li>

        <li onClick={() => setShowMobileNav(false)} className="relative">
          <Link href="/contact">{t("Contact")}</Link>
        </li>

        <li className="mobile-menu-section-title">
          {mafa("Account")}
        </li>

        {footerLinks.accountLinks.map((link, index) => (
          <li key={index} className="mobile-menu-section-nested">
            <Link href={link.to}>
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mobile-menu-section-title">
          {mafa("Information")}
        </li>

        {footerLinks.informationLinks.map((link, index) => (
          <li key={index} className="mobile-menu-section-nested">
            <Link href={link.to}>
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileNavigator;
