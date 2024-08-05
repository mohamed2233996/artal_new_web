import classNames from "classnames";

interface SocialsProps {
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
}

export default function SocialIcons({
  className,
  colored,
  socials,
}: {
  className?: string;
  colored?: boolean;
  socials: SocialsProps;
}) {
  if (!socials) {
    return "loading";
  }
  return (
    <ul className={`${classNames(className)} social-icons`}>
      {socials.facebook !== "" && (
        <li>
          <a target="_blank"
            style={{ color: colored ? "#2463ac" : "" }}
            href={socials.facebook}
          >
            <i className="fab fa-facebook-f" />
          </a>
        </li>
      )}
      {socials.twitter !== "" && (
        <li>
          <a target="_blank" style={{ color: colored ? "#00c4fc" : "" }} href={socials.twitter}>
            <i className="fab fa-twitter" />
          </a>
        </li>
      )}
      {socials.instagram !== "" && (
        <li>
          <a target="_blank"
            style={{ color: colored ? "#dd34c1" : "" }}
            href={socials.instagram}
          >
            <i className="fab fa-instagram" />
          </a>
        </li>
      )}
      {socials.youtube !== "" && (
        <li>
          <a target="_blank" style={{ color: colored ? "#ff081c" : "" }} href={socials.youtube}>
            <i className="fab fa-youtube" />
          </a>
        </li>
      )}
    </ul>
  );
}
