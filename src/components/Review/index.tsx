import React, { MouseEventHandler, useTransition } from "react";
import Rating from "../Rating";
import { useTranslations } from "next-intl";

interface ReviewProps {
  id: string;
  name: string;
  publicDate: string;
  rate: number;
  children: React.ReactNode;
  editable: boolean;
  onReviewDelete: (reviewId: string) => any;
}

export default function Review({
  id,
  name,
  publicDate,
  children,
  rate,
  editable,
  onReviewDelete,
}: ReviewProps) {
  const t = useTranslations('Store');
  return (
    <div className="review">
      <div className="review__header">
        <div className="review__header__avatar">
          <img src={"/images/user.png"} alt="Reviewer avatar" />
        </div>
        <div className="review__header__info">
          <h5>{name}</h5>
          <p>{publicDate}</p>
        </div>
        <div className="review__header__rate">
          <div style={{ maxWidth: 120, height: "100%" }}>
            <Rating readonly value={rate} />
          </div>
        </div>
      </div>

      <div className="review__content-div">
        <p className="review__content">
          {children}
        </p>
        {editable && <button onClick={() => onReviewDelete(id)} className="review__remove-button">{t('Remove')}</button>}
      </div>
    </div>
  );
}
