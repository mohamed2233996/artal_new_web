"use client";

import LinkingButton from "@/components/Button";
import SectionTitle from "@/components/SectionTitle";
import { API_ENDPOINT } from "@/shared/constants";
import { HomeAboutType } from "@/types/home";
import classNames from "classnames";
import { useLocale } from "next-intl";
import React, { MutableRefObject } from "react";

/**
 *
 * About Section in Home Page.
 */
export default function HomeSectionOne({
  data,
  scrollRef,
}: {
  data: HomeAboutType;
  scrollRef: MutableRefObject<undefined>;
}) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const scrollBottom = (e: any) => {
    e.current.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div className="introduction-one" dir={isAr ? "rtl" : "ltr"}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            <div className="introduction-one__image">
              <div className="introduction-one__image__detail">
                <img
                  src={`${API_ENDPOINT}/${data?.about_big_image}`}
                  alt="background"
                />
                <img
                  src={`${API_ENDPOINT}/${data?.about_small_image}`}
                  alt="background"
                />
              </div>
              <div className="wrapper">
                <div className="introduction-one__image__background">
                  <div className="background__item">
                    <div className="wrapper">
                      <img
                        data-depth="0.5"
                        src="/images/introduction/IntroductionOne/bg1.png"
                        alt="background"
                      />
                    </div>
                  </div>
                  <div className="background__item">
                    <div className="wrapper">
                      <img
                        data-depth="0.3"
                        data-invert-x
                        data-invert-y
                        src="/images/introduction/IntroductionOne/bg2.png"
                        alt="background"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="introduction-one__content">
              {isAr ? (
                <h5>
                  عن <span>أرتال</span>
                </h5>
              ) : (
                <h5>
                  About <span>Artal</span>
                </h5>
              )}
              <SectionTitle spaceBottom="1.875em">
                {isAr ? data.about_title_ar : data?.about_title_en}
              </SectionTitle>
              <p>{isAr ? data.about_content_ar : data.about_content_en}</p>
              <button
                onClick={() => scrollBottom(scrollRef)}
                className={`btn -${classNames("white")} white)}`}
              >
                {isAr ? "حـجـز" : "Appointment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
