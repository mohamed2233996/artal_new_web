"use client";

import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Slider from "react-slick";
import { SliderType } from "@/types/home";
import { NextArrow, PrevArrow } from "@/components/Arrows";
import { API_ENDPOINT } from "@/shared/constants";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface SliderProps {
  data: SliderType[];
  scrollRef: any;
}

export default function HomeSlider({ data, scrollRef }: SliderProps) {
  const t = useTranslations("Home");
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [sliderReady, setSliderReady] = useState<boolean>();

  const scrollBottom = (e: any) => {
    e.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    dotsClass: "slider-dots container",
    customPaging: () => {
      return <div className="slider-dot"></div>;
    },
    onInit: () => {
      setSliderReady(true);
    },
    beforeChange: (oldIndex: number, newIndex: number) => {
      setTimeout(() => {
        setSliderReady(false);
      }, 10);
    },
    afterChange: (index: number) => {
      setSliderIndex(index);
      setSliderReady(true);
    },
  };

  return (
    <div className={`slider -style-1`} dir="ltr">
      <div className="slider__carousel">
        <Slider {...settings}>
          {data.map((slide, index) => (
            <div
              className={"slider__carousel__item " + `slider-${index + 1}`}
              key={index}
            >
              <div className="container">
                <div className="slider-background">
                  <CSSTransition
                    in={sliderIndex === index && sliderReady}
                    timeout={2000}
                    classNames="slider-zoom-in"
                    unmountOnExit
                  >
                    <Image
                      src={`${API_ENDPOINT}/${slide.link}`}
                      alt="Slider image"
                      layout="fill"
                      objectFit="fill"
                    />
                  </CSSTransition>
                </div>
                <div className="slider-content">
                  <div className="slider-animation-wrapper">
                    <CSSTransition
                      in={sliderIndex === index && sliderReady}
                      timeout={2000}
                      classNames={"slider-one-subtitle"}
                      unmountOnExit
                    >
                      <h5 className="slider-content__subtitle"></h5>
                    </CSSTransition>
                  </div>
                  <div className="slider-animation-wrapper">
                    <CSSTransition
                      in={sliderIndex === index && sliderReady}
                      timeout={2000}
                      classNames={"slider-one-title"}
                      unmountOnExit
                    >
                      <h1 className="slider-content__title">
                        {/* Title */}
                        {/* Inner beauty out */}
                      </h1>
                    </CSSTransition>
                  </div>

                  <div className="slider-animation-wrapper">
                    <CSSTransition
                      in={sliderIndex === index && sliderReady}
                      timeout={2000}
                      classNames={"slider-one-button"}
                      unmountOnExit
                    >
                      <div className="Appointment---">
                        <button
                          onClick={() => scrollBottom(scrollRef)}
                          className={`btn -${classNames("red")} red)}`}
                        >
                          {t("Appointment")}
                        </button>
                      </div>
                    </CSSTransition>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
