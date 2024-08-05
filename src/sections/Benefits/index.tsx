import { API_ENDPOINT } from "@/shared/constants";
import { Offer } from "@/types/about";
import { useLocale } from "next-intl";

export default function Benefits({ offers }: {offers: Offer[]}) {
  const isAr = useLocale() === "ar";
  return (
    <div className="benefits" style={{ marginBottom: 100 / 16 + "rem" }}>
      <div className="container">
        <div
          className="row"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          {offers.map((o, index) => {
            return (
              <>
                {o?.show && (
                  <div key={index} className="col-12 col-sm-6 col-lg-3">
                    <div className="benefits__item">
                      <div className="benefits__item__icon">
                        <img src={`${API_ENDPOINT}/${o?.image}`} alt="" />
                      </div>
                      <div className="benefits__item__content">
                        <h5>{isAr ? o.primaryAr : o?.primaryEn}</h5>
                        <p>{isAr ? o?.secondaryAr : o?.secondaryEn}</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
