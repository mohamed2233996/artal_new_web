export type SliderType = {
  name: string;
  link: string;
};

export type HomeAboutType = {
  about_title_ar: string;
  about_title_en: string;
  about_content_ar: string;
  about_content_en: string;
  about_big_image: string;
  about_small_image: string;
};

export type HomeService = {
  id: number;
  title_ar: string;
  title_en: string;
  v_link: string;
  image: string;
};

export type Feedback = {
  id: number;
  name_ar: string;
  name_en: string;
  city_ar: string;
  city_en: string;
  feedback_ar: string;
  feedback_en: string;
  image: string;
  show: boolean;
};

export type Member = {
  id: number;
  name_ar: string;
  name_en: string;
  profession_ar: string;
  profession_en: string;
  about_ar: string;
  about_en: string;
  facebook: string;
  twitter: string;
  youtube: string;
  instagram: string;
  image: string;
};

export type HomeData = {
  sliders: SliderType[];
  about: HomeAboutType;
  services: HomeService[];
  feedbacks: Feedback[];
  team: Member[];
  appointment: string;
};
