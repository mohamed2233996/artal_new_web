"use client";

import { PageInfoReturn } from "@/actions/getPageInfo";
import SectionTitle from "@/components/SectionTitle";
import { API_ENDPOINT } from "@/shared/constants";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

export default function MainAboutSection({
  data,
  heading,
}: {
  data: PageInfoReturn;
  heading: React.ReactElement;
}) {
  const isAr = useLocale() === "ar";
  return (
    <div className="introduction-one" dir={isAr ? "rtl" : "ltr"}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            <div className="introduction-one__image">
              <div className="introduction-one__image__single">
                {/* <img src={`${API_ENDPOINT}/${data.image}`} alt="background" /> */}
                <Image
                  src={`${API_ENDPOINT}/${data.image}`}
                  alt="background"
                  priority={true}
                  layout="fill"
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="introduction-one__content">
              <h5>{heading}</h5>
              <SectionTitle spaceBottom="1.875em">
                {isAr ? data.title_ar : data.title_en}
              </SectionTitle>
              <p>{isAr ? data.desc_ar : data.desc_en}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
