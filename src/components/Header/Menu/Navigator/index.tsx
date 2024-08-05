import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function Navigator() {
  const t = useTranslations("Header");
  return (
    <div className="navigator">
      <ul>
        <li className="relative" style={{ fontSize: "1.3rem" }}>
          <Link href="/">{t("Home")}</Link>
        </li>

        <li className="relative" style={{ fontSize: "1.3rem" }}>
          <Link href="/about">{t("About")}</Link>
        </li>

        <li className="relative" style={{ fontSize: "1.3rem" }}>
          <Link href="/services">{t("Services")}</Link>
        </li>

        <li className="relative" style={{ fontSize: "1.3rem" }}>
          <Link href="/store">{t("Store")}</Link>
        </li>

        <li className="relative" style={{ fontSize: "1.3rem" }}>
          <Link href="/contact">{t("Contact")}</Link>
        </li>
      </ul>
    </div>
  );
}
