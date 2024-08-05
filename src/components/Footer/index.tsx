"use client";

import SocialIcons from "../Elements/SocialIcons";

import { Link } from "@/navigation";
import { useAppStore } from "@/providers/app-store-provider";
import { WHATSAPP } from "@/shared/constants";
import { useLocale, useTranslations } from "next-intl";

interface FooterDataProps {
  // social
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  // contacts
  address_ar: string;
  address_en: string;
  phone: string;
  email: string;
  openTimeFrom: string;
  openTimeTo: string;
}

const Footer = ({ data }: { data: FooterDataProps }) => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const { cart } = useAppStore((state) => state);

  const footerLinks = {
    accountLinks: [
      { name: t("Favourites"), to: "/favourites" },
      { name: t("Cart"), to: "/cart" },
      { name: t("Store"), to: "/store" },
      {
        name: t("Checkout"),
        to: `${cart?.length === 0 ? "/cart" : "/checkout"}`,
      },
    ],
    informationLinks: [
      { name: t("About_Us"), to: "/about" },
      { name: t("Contact"), to: "/contact" },
      { name: t("Policy"), to: "/policy" },
      { name: t("Terms"), to: "/terms" },
    ],
    creditLinks: [
      { name: t("Policy"), to: "/policy" },
      { name: t("Terms"), to: "/terms" },
    ],
  };

  return (
    <div className="footer-one" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="container">
        <div className="footer-one__header">
          <div className="footer-one__header__logo">
            <Link href="/">
              <span
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bolder",
                  fontSize: "1.5rem",
                  color: "black",
                }}
              >
                {t("title")}
              </span>
            </Link>
          </div>
          <div className="footer-one__header__social">
            <SocialIcons
              className="-border"
              socials={{
                facebook: data?.facebook,
                twitter: data?.twitter,
                youtube: data?.youtube,
                instagram: data?.instagram,
              }}
            />
          </div>
        </div>
        <div className="footer-one__body">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 fotter-flex-center">
              <div className="footer__section -info">
                <h5 className="footer-title">{t("Contact_Info")}</h5>
                <p>
                  <span className="pc-only">{t("Address")}:{" "}</span>
                  <span className="mobile-only-flex">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.5" d="M19.7165 20.3624C21.143 19.5846 22 18.5873 22 17.5C22 16.3475 21.0372 15.2961 19.4537 14.5C17.6226 13.5794 14.9617 13 12 13C9.03833 13 6.37738 13.5794 4.54631 14.5C2.96285 15.2961 2 16.3475 2 17.5C2 18.6525 2.96285 19.7039 4.54631 20.5C6.37738 21.4206 9.03833 22 12 22C15.1066 22 17.8823 21.3625 19.7165 20.3624Z" fill="#1C274C" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M5 8.51464C5 4.9167 8.13401 2 12 2C15.866 2 19 4.9167 19 8.51464C19 12.0844 16.7658 16.2499 13.2801 17.7396C12.4675 18.0868 11.5325 18.0868 10.7199 17.7396C7.23416 16.2499 5 12.0844 5 8.51464ZM12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" fill="#1C274C" />
                    </svg>
                  </span>
                  <span>
                    {locale === "en" ? data.address_en : data.address_ar}
                  </span>
                </p>
                <p>
                  <span className="pc-only">{t("Phone")}:</span>
                  <span className="mobile-only-flex">
                    <a href={`tel:${data.phone}`} target="_blank">
                      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.3545 22.2323C15.3344 21.7262 11.1989 20.2993 7.44976 16.5502C3.70065 12.8011 2.2738 8.66559 1.76767 6.6455C1.47681 5.48459 2.00058 4.36434 2.88869 3.72997L5.21694 2.06693C6.57922 1.09388 8.47432 1.42407 9.42724 2.80051L10.893 4.91776C11.5152 5.8165 11.3006 7.0483 10.4111 7.68365L9.24234 8.51849C9.41923 9.1951 9.96939 10.5846 11.6924 12.3076C13.4154 14.0306 14.8049 14.5807 15.4815 14.7576L16.3163 13.5888C16.9517 12.6994 18.1835 12.4847 19.0822 13.1069L21.1995 14.5727C22.5759 15.5257 22.9061 17.4207 21.933 18.783L20.27 21.1113C19.6356 21.9994 18.5154 22.5232 17.3545 22.2323ZM8.86397 15.136C12.2734 18.5454 16.0358 19.8401 17.8405 20.2923C18.1043 20.3583 18.4232 20.2558 18.6425 19.9488L20.3056 17.6205C20.6299 17.1665 20.5199 16.5348 20.061 16.2171L17.9438 14.7513L17.0479 16.0056C16.6818 16.5182 16.0047 16.9202 15.2163 16.7501C14.2323 16.5378 12.4133 15.8569 10.2782 13.7218C8.1431 11.5867 7.46219 9.7677 7.24987 8.7837C7.07977 7.9953 7.48181 7.31821 7.99439 6.95208L9.24864 6.05618L7.78285 3.93893C7.46521 3.48011 6.83351 3.37005 6.37942 3.6944L4.05117 5.35744C3.74413 5.57675 3.64162 5.89565 3.70771 6.15943C4.15989 7.96418 5.45459 11.7266 8.86397 15.136Z" fill="#1C274C" />
                      </svg>
                    </a>
                    <a href={`https://wa.me/${WHATSAPP}`} target="_blank">
                      <svg width="24px" height="24px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g id="Color-" transform="translate(-700.000000, -360.000000)" fill="#1C274C">
                            <path d="M723.993033,360 C710.762252,360 700,370.765287 700,383.999801 C700,389.248451 701.692661,394.116025 704.570026,398.066947 L701.579605,406.983798 L710.804449,404.035539 C714.598605,406.546975 719.126434,408 724.006967,408 C737.237748,408 748,397.234315 748,384.000199 C748,370.765685 737.237748,360.000398 724.006967,360.000398 L723.993033,360.000398 L723.993033,360 Z M717.29285,372.190836 C716.827488,371.07628 716.474784,371.034071 715.769774,371.005401 C715.529728,370.991464 715.262214,370.977527 714.96564,370.977527 C714.04845,370.977527 713.089462,371.245514 712.511043,371.838033 C711.806033,372.557577 710.056843,374.23638 710.056843,377.679202 C710.056843,381.122023 712.567571,384.451756 712.905944,384.917648 C713.258648,385.382743 717.800808,392.55031 724.853297,395.471492 C730.368379,397.757149 732.00491,397.545307 733.260074,397.27732 C735.093658,396.882308 737.393002,395.527239 737.971421,393.891043 C738.54984,392.25405 738.54984,390.857171 738.380255,390.560912 C738.211068,390.264652 737.745308,390.095816 737.040298,389.742615 C736.335288,389.389811 732.90737,387.696673 732.25849,387.470894 C731.623543,387.231179 731.017259,387.315995 730.537963,387.99333 C729.860819,388.938653 729.198006,389.89831 728.661785,390.476494 C728.238619,390.928051 727.547144,390.984595 726.969123,390.744481 C726.193254,390.420348 724.021298,389.657798 721.340985,387.273388 C719.267356,385.42535 717.856938,383.125756 717.448104,382.434484 C717.038871,381.729275 717.405907,381.319529 717.729948,380.938852 C718.082653,380.501232 718.421026,380.191036 718.77373,379.781688 C719.126434,379.372738 719.323884,379.160897 719.549599,378.681068 C719.789645,378.215575 719.62006,377.735746 719.450874,377.382942 C719.281687,377.030139 717.871269,373.587317 717.29285,372.190836 Z" id="Whatsapp">
                            </path>
                          </g>
                        </g>
                      </svg>
                    </a>
                  </span>
                  <a href={`https://wa.me/${WHATSAPP}`} target="_blank">
                    <span>
                      {data.phone}
                    </span>
                  </a>
                </p>
                <p>
                  <a href={`mailto:${data.email}`} target="_blank">
                    <span className="pc-only">{t("Email")}:</span>
                    <span className="mobile-only-flex">
                      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="style=fill">
                          <g id="email">
                            <path id="Subtract" fillRule="evenodd" clipRule="evenodd" d="M7 2.75C5.38503 2.75 3.92465 3.15363 2.86466 4.1379C1.79462 5.13152 1.25 6.60705 1.25 8.5V15.5C1.25 17.393 1.79462 18.8685 2.86466 19.8621C3.92465 20.8464 5.38503 21.25 7 21.25H17C18.615 21.25 20.0754 20.8464 21.1353 19.8621C22.2054 18.8685 22.75 17.393 22.75 15.5V8.5C22.75 6.60705 22.2054 5.13152 21.1353 4.1379C20.0754 3.15363 18.615 2.75 17 2.75H7ZM19.2285 8.3623C19.5562 8.10904 19.6166 7.63802 19.3633 7.31026C19.1101 6.98249 18.6391 6.9221 18.3113 7.17537L12.7642 11.4616C12.3141 11.8095 11.6858 11.8095 11.2356 11.4616L5.6886 7.17537C5.36083 6.9221 4.88982 6.98249 4.63655 7.31026C4.38328 7.63802 4.44367 8.10904 4.77144 8.3623L10.3185 12.6486C11.3089 13.4138 12.691 13.4138 13.6814 12.6486L19.2285 8.3623Z" fill="#1C274C" />
                          </g>
                        </g>
                      </svg>
                    </span>
                    <span>{data.email}</span>
                  </a>
                </p>
                <p>
                  <span className="pc-only">{t("Opentime")}:{" "}</span>
                  <span className="mobile-only-flex">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.707,16.325a1,1,0,0,0-1.414,0l-5.627,5.628L13.978,19.3A1,1,0,0,0,12.543,20.7L15.287,23.4a1.876,1.876,0,0,0,1.345.6h.033A1.873,1.873,0,0,0,18,23.447l5.707-5.708a1,1,0,0,0,0-1.414Z
M11.09,21.959A10,10,0,1,1,22,12c0,.307-.015.611-.041.911A1,1,0,0,0,22.866,14a.989.989,0,0,0,1.085-.907C23.983,12.73,24,12.367,24,12A12,12,0,1,0,10.91,23.951c.031,0,.061,0,.091,0a1,1,0,0,0,.089-2Z
M11,7v4.586L8.293,14.293a1,1,0,1,0,1.414,1.414l3-3A1,1,0,0,0,13,12V7a1,1,0,0,0-2,0Z"/>
                    </svg>
                  </span>
                  <span>
                    {data.openTimeFrom} - {data.openTimeTo}
                  </span>
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 pc-only">
              <div className="footer__section -links">
                <div className="column">
                  <div className="col-12 col-sm-6 fotter-flex-center">
                    <h5 className="footer-title">{t("Account")}</h5>
                    <ul>
                      {footerLinks.accountLinks.map((link, index) => (
                        <li key={index}>
                          <Link href={link.to}>
                            <span>{link.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-12 col-sm-6 fotter-flex-center">
                    <h5 className="footer-title">{t("Information")}</h5>
                    <ul>
                      {footerLinks.informationLinks.map((link, index) => (
                        <li key={index}>
                          <Link href={link.to}>
                            <span>{link.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="footer__section -payment fotter-flex-center">
                <h5 className="footer-title">{t("Payment_Methods")}</h5>
                <div className="payment-methods">
                  <img
                    src={"/images/footer/payment.png"}
                    alt="Payment methods"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-one__footer">
        <div className="container">
          <div className="footer-one__footer__wrapper">
            <p>{t("Copyright")}</p>
            <ul>
              {footerLinks.creditLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.to}>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
