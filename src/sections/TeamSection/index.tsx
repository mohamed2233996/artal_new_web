"use client";

import React from "react";
import Slider from "react-slick";

import SectionTitle from "@/components/SectionTitle";
import TeamCard from "./TeamCard";
import { Member } from "@/types/home";
import { useTranslations } from "next-intl";

export default function Team({ data }: { data: Member[] }) {
  const t = useTranslations('Team')
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="team-one">
      <div className="container">
        <SectionTitle align="center" spaceBottom="1.875em">
          {t('title')}
        </SectionTitle>
        <Slider {...settings}>
          {data.map((user, index) => (
            <div key={index} className="slider__item">
              <TeamCard data={user} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
