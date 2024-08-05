"use client";

import BreadcrumbSection from "@/components/BreadcrumbSection";
import InstagramSection from "@/sections/InstgramSection";
import ShopHeader from "@/sections/ShopHeader";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import ShopProducts from "@/sections/ShopProducts";
// @ts-expect-error no typescript support for this package.
import Paginator from "react-hooks-paginator";
import { Category, Product } from "@/types/Product";
import { getProductsByFilter } from "@/utils/getProductsByFilter";
import { useTranslations } from "next-intl";

interface StoreProps {
  categories: Category[];
  products: Product[];
  filters: any;
  images: any[];
}

export default function Store({
  categories,
  products: apisProducts,
  filters,
  images,
}: StoreProps) {
  const t = useTranslations("Store");

  const [currentView, setCurrentView] = useState("list");
  const [products, setProducts] = useState(apisProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [currentSort, setCurrentSort] = useState("default");
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
    });
    setProducts(sortedProducts);
  }, [currentSort, filterBy]);
  return (
    <>
      <BreadcrumbSection name={t("title")} />

      <div className="shop -five-col">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <Sidebar
                data={categories}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                filters={filters}
              />
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <ShopHeader
                // @ts-expect-error FIXME
                getCurrentSort={setCurrentSort}
                curentView={currentView}
                setCurrentView={(view: "list" | "grid") => setCurrentView(view)}
                setCurrentSort={setCurrentSort}
              />

              {!products || products.length === 0 ? (
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
                  <ShopProducts
                    gridColClass="col-12 col-sm-6 col-lg-4"
                    listColClass="col-12 "
                    view={currentView}
                    data={products.slice(offset, offset + pageLimit)}
                  />

                  <Paginator
                    pageContainerClass="paginator"
                    totalRecords={products.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <InstagramSection data={images} />
    </>
  );
}
