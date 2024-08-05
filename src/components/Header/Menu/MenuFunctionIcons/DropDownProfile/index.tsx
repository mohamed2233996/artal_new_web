import { UserSvg } from "@/shared/svgs";
import { Link } from "@/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const DropDownProfile = ({
  signOut,
  username,
}: {
  signOut: () => Promise<void>;
  username: string;
}) => {
  const t = useTranslations("Profile");
  const [dropdownToggle, setDropdownToggle] = useState<boolean>(false);
  const handleDropdownToggle = () => setDropdownToggle((prev) => !prev);
  const dropdownRef = useRef(null);

  const handleClickOutside = () => {
    if (dropdownRef.current) {
      setDropdownToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown_profile_div menu-icon -wishlist">
      <button
        onClick={handleDropdownToggle}
        type="button"
        className="dropdown_button"
      >
        <UserSvg />
      </button>
      <div
        className={`dropdown_profile ${dropdownToggle ? "active" : ""}`}
        ref={dropdownRef}
      >
        <h3>{username}</h3>
        <div className="menu_items_div">
          <Link href={"/order"} onClick={() => setDropdownToggle(false)}>
            <div className="menu_item">{t("My_Order")}</div>
          </Link>
          <button
            onClick={() => signOut()}
            className="menu_item"
            style={{ border: "none", background: "none" }}
          >
            {t("Logout")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropDownProfile;
