"use client";

import { useAppStore } from "@/providers/app-store-provider";
import { Link } from "@/navigation";
import CartItemsSidebar from "./CartSidebar";
import MobileNavSidebar from "./MobileSidebar";
import { LoginIconSvg } from "@/shared/svgs";
import { signOut, useSession } from "next-auth/react";
import DropDownProfile from "./DropDownProfile";
import { API_ENDPOINT } from "@/shared/constants";
import { useState } from "react";
import LocalSwitcher from "./LocalSwitcher";
import { LoadingSvg } from "@/app/[locale]/loading";

const MenuFunctionIcons = () => {
  const { data: session } = useSession();
  // hooks

  const cart = useAppStore((state) => state.cart);
  const [showCart, setShowCart] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const emptyState = useAppStore((state) => state.emptyState);

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

  // Handlers
  const handleShowCart = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowCart(true);
    if (session?.token) {
      handleApiAsync();
    }
  };

  const handleSignOut = async () => {
    await handleApiAsync();
    await signOut({ redirect: true }).then(() => {
      emptyState();
    });
  };

  return (
    <>
      <div className="menu__wrapper__functions">
        <Link href={"/favourites"}>
          <span className="menu-icon -wishlist">
            <img src={"/images/header/wishlist-icon.png"} alt="Wishlist icon" />
          </span>
        </Link>
        {session?.user.id ? (
          <DropDownProfile
            signOut={handleSignOut}
            username={session?.user?.username}
          />
        ) : (
          <Link href={"/login"} className="menu-icon -wishlist">
            <LoginIconSvg />
          </Link>
        )}

        <div className="menu__cart">
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            className="menu-icon -cart"
            onClick={handleShowCart}
          >
            <img src={"/images/header/cart-icon.png"} alt="Cart icon" />
            <span className="cart__quantity"></span>
          </button>
        </div>

        <LocalSwitcher />

        <button
          style={{ border: "none", backgroundColor: "transparent" }}
          className="menu-icon -navbar"
          onClick={(e) => {
            e.preventDefault();
            setShowMobileNav(!showMobileNav);
          }}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
      </div>

      <CartItemsSidebar showCart={showCart} setShowCart={setShowCart} />
      <MobileNavSidebar
        showMobileNav={showMobileNav}
        setShowMobileNav={setShowMobileNav}
      />
    </>
  );
};

export default MenuFunctionIcons;
