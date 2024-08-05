"use client";

import React from "react";
import classNames from "classnames";
import { API_ENDPOINT } from "@/shared/constants";
import Image from "next/image";

export default function ServiceItem({
  desc,
  title,
  reverse,
  img,
  order,
}: {
  desc: string;
  title: string;
  reverse: boolean;
  img: string;
  order: string;
}) {
  return (
    <div className={`services__item ${classNames({ "-reverse": reverse })}`}>
      <div className="container">
        <div className="row">
          <div
            className={`col-12 col-md-6 ${classNames({
              "order-md-2": reverse,
            })}`}
          >
            <div className="services__item__image">
              <div className="services__item__image__background">
                <img
                  src="/images/introduction/IntroductionThree/bg.png"
                  alt="background"
                />
              </div>

              <div className="services__item__image__detail">
                <div className="image__item">
                  <div
                    className="wrapper"
                  >
                    <Image
                      priority={true}
                      src={`${API_ENDPOINT}/${img}`}
                      height={345}
                      width={270}
                      data-depth="0.2"
                      data-invert-x
                      data-invert-y
                      alt="image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`col-12 col-md-6 ${classNames({
              "order-md-1": reverse,
            })}`}
          >
            <div className="services__item__content">
              <h2 className="services__item__title">{title}</h2>
              <p className="services__item__description">{desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
