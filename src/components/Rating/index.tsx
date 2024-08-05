"use client";

import { Rating as ReactRating } from "@smastrom/react-rating";

interface RatingProps {
  readonly?: boolean;
  value: number;
  setRating?: any;
}

export default function Rating({ value, setRating, readonly }: RatingProps) {
  return <ReactRating value={value} onChange={setRating} readOnly={readonly} />;
}
