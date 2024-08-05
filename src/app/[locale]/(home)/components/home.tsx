"use client";

import HomeSlider from "@/sections/Slider";
import HomeSectionTwo from "@/sections/HomeSectionTwo";
// import Testimonials from "@/sections/Testimonal";
// import Team from "@/sections/TeamSection";
import CTA from "@/sections/CTA";
import HomeSectionOne from "@/sections/HomeSectionOne";
import { useEffect, useRef, useState } from "react";
import { HomeData } from "@/types/home";
import ShopProducts from "@/sections/ShopProducts";
import { getProductsByFilter } from "@/utils/getProductsByFilter";
import { useTranslations } from "next-intl";
import { Product } from "@/types/Product";
import { Link } from "@/navigation";

export default function Home({ data, products: apisProducts }: { data: HomeData, products: Product[], }) {
  const scrollRef = useRef();

  const t = useTranslations("Store");
  const [screenWidth, setScreenWidth] = useState(0);
  const [products, setProducts] = useState(apisProducts);
  const [offset] = useState(0);
  const [currentSort] = useState("default");
  const [filterBy] = useState({
    categoryId: undefined,
    priceFrom: undefined,
    priceTo: undefined,
  });
  const pageLimit = 9;

  useEffect(() => {
    const sortedProducts = getProductsByFilter(apisProducts, {
      categoryId: filterBy.categoryId,
      maxPrice: filterBy.priceTo,
      minPrice: filterBy.priceFrom,
      sortBy: currentSort,
    });
    setProducts(sortedProducts);

  }, [currentSort, filterBy]);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <HomeSlider
        data={data.sliders}
        scrollRef={scrollRef}
      />

      {(!products || products.length === 0) || (screenWidth > 575 && products.length < 2) ? (
        <div
          style={{
            textAlign: "center",
            justifyContent: "center",
            alignContent: "center",
            height: "400px",
          }}
        >
          <h1>{t('No_Products')}</h1>
        </div>
      ) : (
        <div className="home-produces">
          <div className="container">
            <div className="home-products-title d-flex flex-row justify-content-between align-items-center">
              <div>
                {t("New_Products")}
              </div>
              <Link href={"/store"} className="product-name">
                {t("View_All")}
              </Link>
            </div>

            <ShopProducts
              gridColClass="col-12 col-sm-6 col-lg-4"
              listColClass="col-12 "
              view={"grid"}
              data={products.slice(offset, offset + pageLimit)}
            />
          </div>
        </div>
      )}

      <HomeSectionOne data={data.about} scrollRef={scrollRef} />

      {/* {
        screenWidth > 775 && (
          <>
            <HomeSectionTwo data={data.services} />
            <Testimonials data={data.feedbacks} />
            <Team data={data.team} />
          </>
        )
      } */}
      <CTA scrollRef={scrollRef} services={data.services} image={data?.appointment} />
    </>
  );
}
