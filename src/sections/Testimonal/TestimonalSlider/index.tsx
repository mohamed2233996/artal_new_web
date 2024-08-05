"use client";

import { useState, useRef } from "react";
import Slider from "react-slick";
import classNames from "classnames";

import Rate from "@/components/Rate";
import { Feedback } from "@/types/home";
import { API_ENDPOINT } from "@/shared/constants";
import { useLocale } from "next-intl";

export default function TestimonialSlider({ data }: { data: Feedback[] }) {
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const numberOfShownFeedbacks = data.filter((i) => i.show === true).length;
  const isAr = useLocale() === "ar";

  const slider1Settings = {
    slideToShow: 1,
    rows: 2,
    slidesPerRow:
      numberOfShownFeedbacks > 6 ? 4 : numberOfShownFeedbacks > 4 ? 3 : 2,
    arrows: false,
    infinite: false,
  };
  const slider2Settings = {
    slideToShow: 1,
    arrows: false,
    swipeToSlide: true,
    dots: false,
    afterChange: (index: number) => {
      setCurrentIndex(index);
    },
  };
  return (
    <div>
      <div className="testimonial-slider">
        <div className="row">
          <div className={`col-12 col-md-6`}>
            <div className="slide-nav">
              <Slider ref={slider1} {...slider1Settings}>
                {data.map(
                  (item, index) =>
                    item.show && (
                      <div
                        key={index}
                        className={`${classNames({
                          active: currentIndex === index,
                        })} slide-nav__item`}
                        onClick={() => {
                          setCurrentIndex(index);
                          // @ts-expect-error
                          slider2.current.slickGoTo(index);
                        }}
                      >
                        <img
                          src={`${API_ENDPOINT}/${item.image}`}
                          alt="Customer avatar"
                        />
                      </div>
                    )
                )}
              </Slider>
            </div>
          </div>
          <div className={`col-12 col-md-6`}>
            <div className="slide-for">
              <Slider ref={slider2} {...slider2Settings}>
                {data.map(
                  (item, index) =>
                    item.show && (
                      <div key={index} className="slide-for__item">
                        <div className="slide-for__item__header">
                          <div className="quote-icon">
                            <i className="fas fa-quote-right"></i>
                          </div>
                          <div className="customer__info">
                            <h3>{isAr ? item.name_ar : item.name_en}</h3>
                            <h5>{isAr ? item?.city_ar : item.city_en}</h5>
                          </div>
                          <Rate currentRate={5} />
                        </div>
                        <p className="slide-for__item__content">
                          {isAr ? item.feedback_ar : item.feedback_en}
                        </p>
                      </div>
                    )
                )}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
