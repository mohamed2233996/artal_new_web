"use client";

import { API_ENDPOINT } from "@/shared/constants";
import Slider from "react-slick";

export default async function InstagramSection({ data }) {
  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div className="instagram-two">
      <Slider {...settings}>
        {data?.map((img) => (
          <div
            key={img?.id}
            width={231}
            height={240}
            style={{ objectFit: "cover" }}
          >
            <a
              href={`${img?.link}`}
              className="slider-item px-1"
              target="_blank"
            >
              <img
                width="100%"
                height="100%"
                src={`${API_ENDPOINT}/${img?.image}`}
                alt="Instagram image"
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
}
