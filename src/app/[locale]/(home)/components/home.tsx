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
import { Category } from "@/types/Product";
import { Link } from "@/navigation";
import Slider from "react-slick";
import Product from "@/components/Product";
import { API_ENDPOINT } from "@/shared/constants";

import CategorySlider from "@/sections/CategorySlider/CategorySlider";
import { getCategories } from "@/actions/getCategories";


interface Props {
  categories: Category[];
  data: HomeData,
  products: IProduct[];
  filters: any;
  sliderSettings: any
}


export default function Home({
  categories,
  data,
  products: apisProducts,
  sliderSettings,
  filters 
}: Props) {
  const scrollRef = useRef();

  const t = useTranslations("Store");
  const [screenWidth, setScreenWidth] = useState(0);
  const [products, setProducts] = useState(apisProducts);
  const [offset] = useState(0);
  const [currentSort] = useState("default");
  const [filterBy, setFilterBy] = useState({
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
    }).slice(0, 10)
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
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      // {
      //   breakpoint: 992,
      //   settings: {
      //     slidesToShow: 2,
      //   },
      // }
    ],
  };
  const categoriesM = [
    {
      id: "all",
      name: t('All'),
    },
    {
      id:"3v9zS",
      name:"عطر 60 م",
      name_en:" perfume 60 M"
    },
    {
      id:"oUqXR",
      name:"عطر 50 م",
      name_en:"perfume 50 M"
    },
    {
      id:"y_WFs",
      name:"عطر 40 م",
      name_en:"perfume 40 M"
    }

  ]

  return (
    <>
      <HomeSlider
        data={data.sliders}
        scrollRef={scrollRef}
      />
      <div className="category-slide">
        <div className="container">
          <CategorySlider
            categoryData={categories}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            filters={filters}
          />
        </div>
      </div>
      <div className="home-produces pb-4">
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
                  <>
                    <div className="home-products-title mb-4 d-flex align-items-center justify-content-between">
                      <div className="fw-bold">
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
                  </>
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
                <>
                  <div className="home-products-title mb-4 d-flex align-items-center justify-content-between">
                    <div className="fw-bold">
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
                </>
              )

            )
          }
        </div>
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
