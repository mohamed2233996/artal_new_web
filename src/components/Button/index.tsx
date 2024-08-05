import { Link } from "@/navigation";
import classNames from "classnames";

interface LinkingButtonProps {
  to: string;
  content: React.ReactElement | string;
  color: string;
  height?: string;
  width?: string;
  className?: string;
  onClick?: (e: React.SyntheticEvent) => void;
  disable?: boolean;
}

export default function LinkingButton({
  to,
  content,
  color,
  height,
  width,
  className,
  onClick,
  disable,
}: LinkingButtonProps) {
  return (
    <Link href={disable ? "#" : to}>
      <span
        className={`btn -${classNames(color)} ${classNames(className)}`}
        onClick={onClick}
        style={{
          height: height,
          width: width,
          lineHeight: height,
          paddingTop: height && 0,
          paddingBottom: height && 0,
          paddingLeft: width && 0,
          paddingRight: width && 0,
          pointerEvents: disable ? "none" : "inherit",
        }}
      >
        {content}
      </span>
    </Link>
  );
}
