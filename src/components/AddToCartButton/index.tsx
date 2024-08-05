import classNames from "classnames";
import LinkingButton from "../Button";
import { useRouter } from "next/navigation";

interface AddToCartProps {
  onClick?: (e: React.SyntheticEvent) => void;
  className?: string;
  to: string;
}

export default function AddToCartButton({
  onClick,
  className,
  to,
}: AddToCartProps) {
  const router = useRouter();
  return (
    <div
      className={`add-to-cart ${classNames(className)}`}
      onClick={onClick ? onClick : () => router.push("/login")}
    >
      <LinkingButton
        height="3.85em"
        width="3.85em"
        color="red"
        className="-round"
        to={to}
        content={<i className="fas fa-shopping-bag"></i>}
      />
      <h5>Add to cart</h5>
    </div>
  );
}
