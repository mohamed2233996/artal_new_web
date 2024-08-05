import classNames from "classnames";

export default function ContactInfoItem({
  iconClass,
  title,
  detail,
}: {
  iconClass: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="contact-info__item">
      <div className="contact-info__item__icon">
        <i className={classNames(iconClass)} />
      </div>
      <div className="contact-info__item__detail">
        <h3>{title}</h3>
        <p>{detail}</p>
      </div>
    </div>
  );
}
