import { Link } from "@/navigation";
import { useAppStore } from "@/providers/app-store-provider";
import { formatCurrency } from "@/utils/formatCurrency";
import { useTranslations } from "next-intl";

interface CartItemProps {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  setShowCart: (value: boolean) => void;
}

function CartItem({
  id,
  image,
  name,
  price,
  quantity,
  setShowCart,
}: CartItemProps) {
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const t = useTranslations("Cart");

  const handleRemoveProduct = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    removeFromCart(id);
  };
  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img src={image} alt="Product image" />
      </div>
      <div className="cart-item__info">
        <Link href={`/store/product/${id}`} onClick={() => setShowCart(false)}>
          <span>{name}</span>
        </Link>
        <h5>{formatCurrency(price)}</h5>
        <p>
          {t("Quantity")}: <span>{quantity}</span>
        </p>
      </div>
    </div>
  );
}

export default CartItem;
