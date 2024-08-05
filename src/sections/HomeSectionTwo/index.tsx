"use client";

import { useState } from "react";
import VideoFrame from "@/components/VideoFrame";
import { Link } from "@/navigation"
;import { HomeService } from "@/types/home";
import { API_ENDPOINT } from "@/shared/constants";
import { useLocale } from "next-intl";

export default function HomeSectionTwo({ data }: { data: HomeService[] }) {
  const [currentChoose, setCurrentChoose] = useState(data[0].title_en);
  const [currentVideoImg, setCurrentVideoImg] = useState(
    `${API_ENDPOINT}/${data[0].image}`
  );
  const [currentVideoSrc, setCurrentVideoSrc] = useState(data[0].v_link);
  const locale = useLocale();

  return (
    <div className="introduction-two" dir="ltr">
      <VideoFrame poster={currentVideoImg} height={500} src={currentVideoSrc} />
      <div className="introduction-two__content">
        <div className="container">
          {data.map((item, index) => (
            <div
              onMouseOver={() => {
                setCurrentChoose(item.title_en);
                setCurrentVideoImg(`${API_ENDPOINT}/${item.image}`);
                setCurrentVideoSrc(item.v_link);
              }}
              key={index}
              className={`introduction-two__content__item ${
                currentChoose === item.title_en ? "active" : ""
              }`}
            >
              <Link href="/" onClick={(e) => e.preventDefault()}>
                {locale === "ar" ? item.title_ar : item.title_en}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
