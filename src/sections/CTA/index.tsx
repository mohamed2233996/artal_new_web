"use client";

import { ServiceCTE } from "@/actions/getServicesCTE";
import SectionTitle from "@/components/SectionTitle";
import { API_ENDPOINT } from "@/shared/constants";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface MyFormValues {
  name: string;
  phone: string;
  service: string;
  content: string;
}

/**
 * A component for "Book Service" in Home Page.
 */
export default function CTA({
  scrollRef,
  services,
  image,
}: {
  scrollRef?: any;
  services: ServiceCTE[];
  image: string;
}) {
  /**
   * LOCAL STATE
   */
  const t = useTranslations("CTA");
  const gt = useTranslations("General");
  const locale = useLocale();
  const isAr = locale === "ar";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MyFormValues>();

  /**
   * HANDLERS
   */
  const onSubmit = async (data: MyFormValues) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/messages`, {
        method: "POST",
        body: JSON.stringify({ ...data, type: "APPOINTMENT" }),
        headers: new Headers({ "Content-Type": "application/json" }),
      });

      if (!response.ok) {
        toast.error(gt("Something_Wrong"));
      } else {
        toast.success(t("success"), {
          duration: 7000,
          style: { textAlign: "center" },
        });
        reset();
      }
    } catch (error: any) {
      console.error("Form submission error:", error.message);
    }
  };

  const validatePhone = (value: string) => {
    const digitsRegex = /^[+0-9]+$/;
    if (!digitsRegex.test(value)) {
      return t("Valid_Phone");
    }
    if (value.length < 8 || value.length > 13) {
      return t("Valid_Phone");
    }
    return undefined; // No error if valid
  };

  return (
    <div
      ref={scrollRef}
      className="cta -style-1"
      style={{ backgroundImage: `url(${API_ENDPOINT}/${image})` }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mx-auto">
            <div className="cta__form">
              <SectionTitle align="center" spaceBottom="1.875em">
                {t("Book")}
              </SectionTitle>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="cta__form__detail"
              >
                <div className="input-validator">
                  <input
                    type="text"
                    placeholder={t("Name")}
                    {...register("name", {
                      required: {
                        message: t("Required"),
                        value: true,
                      },
                      maxLength: {
                        message: t("At_most_30"),
                        value: 30,
                      },
                      minLength: {
                        message: t("At_least_2"),
                        value: 2,
                      },
                    })}
                  />
                  {errors.name && (
                    <div style={{ color: "red", textAlign: "start" }}>
                      {errors.name?.message}
                    </div>
                  )}
                </div>
                <div className="input-validator">
                  <input
                    type="text"
                    placeholder={t("Phone")}
                    {...register("phone", {
                      required: {
                        message: t("Required"),
                        value: true,
                      },
                      validate: validatePhone,
                    })}
                  />
                  {errors.phone && (
                    <div style={{ color: "red", textAlign: "start" }}>
                      {errors.phone?.message}
                    </div>
                  )}
                </div>
                <div className="input-validator">
                  <textarea
                    {...register("content", {
                      required: {
                        message: t("Required"),
                        value: true,
                      },
                      maxLength: {
                        message: t("Too_Large"),
                        value: 500,
                      },
                      minLength: {
                        message: t("Too_Short"),
                        value: 10,
                      },
                    })}
                    cols={30}
                    rows={3}
                    placeholder={t("Content")}
                  />
                  {errors.content && (
                    <div style={{ color: "red", textAlign: "start" }}>
                      {errors.content?.message}
                    </div>
                  )}
                </div>
                <div className="input-validator">
                  <select
                    {...register("service", {
                      required: {
                        value: true,
                        message: t("Choose_service"),
                      },
                    })}
                    className="customed-select"
                  >
                    <option value="" hidden>
                      {t("Choose_service")}
                    </option>
                    {services?.map((item) => (
                      <option key={item.id} value={item.title_en}>
                        {isAr ? item.title_ar : item.title_en}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <div style={{ color: "red", textAlign: "start" }}>
                      {errors.service?.message}
                    </div>
                  )}
                </div>
                <button className="btn -light-red">{t("Appointment")}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
