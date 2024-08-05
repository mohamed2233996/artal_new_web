import SocialIcons from "@/components/Elements/SocialIcons";
import { API_ENDPOINT } from "@/shared/constants";
import { Member } from "@/types/home";
import { useLocale } from "next-intl";
import React from "react";

export default function TeamCard({ data }: { data: Member }) {
  const isAr = useLocale() === "ar";
  return (
    <div className="team-card">
      <div className="team-card__avatar">
        <img src={`${API_ENDPOINT}/${data.image}`} alt={data.name_en} />
      </div>
      <div className="team-card__content">
        <h3>{isAr ? data.name_ar : data.name_en}</h3>
        <h5>{isAr ? data.profession_ar : data.profession_en}</h5>
        <p>{isAr ? data.about_ar : data.about_en}</p>
        <SocialIcons
          socials={{
            facebook: data.facebook,
            twitter: data.twitter,
            instagram: data.instagram,
            youtube: data.youtube,
          }}
        />
      </div>
    </div>
  );
}
