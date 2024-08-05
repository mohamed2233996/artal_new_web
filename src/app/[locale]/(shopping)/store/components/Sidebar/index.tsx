import SectionTitle from "@/components/SectionTitle";
import { Link } from "@/navigation";
import { formatCurrency } from "@/utils/formatCurrency";
import classNames from "classnames";
import { useLocale, useTranslations } from "next-intl";

export default function Sidebar({ filters, data, filterBy, setFilterBy }) {
  const t = useTranslations("Store");
  const isAr = useLocale() === "ar";
  const filterList = Object.values(filters);
  return (
    <div className="shop-sidebar">
      <div className="shop-sidebar__content">
        <div
          className="shop-sidebar__section -categories"
          style={{ overflow: "hidden" }}
        >
          <SectionTitle className="-medium" spaceBottom={30 / 16 + "em"}>
            {t("Categories")}
          </SectionTitle>
          <ul style={{ maxHeight: "200px", overflowY: "auto" }}>
            <li
              className={classNames({
                active: !filterBy.categoryId,
              })}
              style={{ fontSize: "1.3rem" }}
            >
              <Link
                href={"#"}
                onClick={(e) => {
                  e.preventDefault();
                  setFilterBy({ ...filterBy, categoryId: "all" });
                }}
              >
                {t("All")}
              </Link>
            </li>
            {data?.map((item, index) => (
              <li
                key={index}
                style={{ fontSize: "1.3rem" }}
                className={classNames({
                  active: item.id === filterBy?.categoryId,
                })}
              >
                <Link
                  href={"#"}
                  onClick={(e) => {
                    e.preventDefault();
                    setFilterBy({ ...filterBy, categoryId: item.id });
                  }}
                >
                  {isAr ? item.name_ar : item.name_en}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="shop-sidebar__section -refine">
          <SectionTitle className="-medium" spaceBottom={30 / 16 + "em"}>
            {t("Refine_Search")}
          </SectionTitle>
          <div className="shop-sidebar__section__item">
            <h5>{t("Price")}</h5>
            <ul>
              {filterList.map((item, index) => {
                let nextVal = filterList[index + 1];
                if (index === filterList.length - 1) {
                  return;
                }
                return (
                  <li key={index} style={{ fontSize: "1.3rem" }}>
                    <label htmlFor={`f${item}t${nextVal}`}>
                      <input
                        type="checkbox"
                        name="price-filter"
                        id={`f${item}t${nextVal}`}
                        value={`f${item}t${nextVal}`}
                        checked={filterBy?.priceTo === nextVal}
                        onChange={() => {
                          if (filterBy?.priceTo === nextVal) {
                            setFilterBy({
                              ...filterBy,
                              priceTo: undefined,
                              priceFrom: undefined,
                            });
                          } else {
                            setFilterBy({
                              ...filterBy,
                              priceTo: nextVal,
                              priceFrom: item,
                            });
                          }
                        }}
                      />
                      {formatCurrency(item)} - {formatCurrency(nextVal)}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
