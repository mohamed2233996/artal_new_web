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
import { Product as IProduct } from "@/types/Product";
import { Link } from "@/navigation";
import SimilarProductsSlider from "@/sections/ProductSlider/Slider";
import Slider from "react-slick";
import Product from "@/components/Product";
import { API_ENDPOINT } from "@/shared/constants";
import { NextArrow, PrevArrow } from "@/components/Arrows";



export default function Home({ data, products: apisProducts, sliderSettings }: { data: HomeData, categoryId: string, products: Product[], sliderSettings: any; }) {
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

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: false,
    // prevArrow: <PrevArrow />,
    // nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      }
    ],
  };

  console.log(products)
  return (
    <>
      <HomeSlider
        data={data.sliders}
        scrollRef={scrollRef}
      />
      <div className="container">
        {
          screenWidth < 775 ? (
            <div className="col-12 col-md-8 col-lg-9">

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
                  <div className="home-products-title mb-4 d-flex align-items-center justify-content-between">
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
              )}
            </div>
          ) : (
            (!products || products.length === 0) ? (
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
                <div className="home-products-title mb-4 d-flex align-items-center justify-content-between">
                  <div>
                    {t("New_Products")}
                  </div>
                  <Link href={"/store"} className="product-name">
                    {t("View_All")}
                  </Link>
                </div>
                <Slider {...settings}>
                  {products.map((p, index) => (
                    <div key={index} className="product-slide__item">
                      <Product data={p} />
                    </div>
                  ))}
                </Slider>
              </div>
            )

          )
        }
      </div>

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
