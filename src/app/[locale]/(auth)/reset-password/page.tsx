"use client";

import { requestPasswordReset } from "@/actions/auth/reset-password";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { useRouter } from "@/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ZodType, z } from "zod";

const ResetPasswordSchema: ZodType<{ email: string }> = z.object({
  email: z.string().email(),
});

export default function resetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const t = useTranslations("ResetPassword");
  const router = useRouter();

  const onSubmit = async (data: { email: string }) => {
    await requestPasswordReset(data?.email).then((res) => {
      toast.success(res?.message);
      router.push("/login");
    });
  };

  return (
    <>
      <BreadcrumbSection name={t("title")} />

      <div className="checkout">
        <div className="container">
          <div style={{ margin: "auto" }} className="col-12 col-lg-6">
            <div className="checkout__form">
              <div className="checkout__form__contact">
                <div className="checkout__form__contact__title">
                  <h5 className="checkout-title">{t("Email")}</h5>
                </div>
                <div className="input-validator">
                  <input
                    type="email"
                    {...register("email", {
                      required: {
                        message: t("Required"),
                        value: true,
                      },
                    })}
                    placeholder={t("Email_Field")}
                    className={!!errors.email ? "error" : undefined}
                  />
                  <span className="error-message">
                    {!!errors.email && errors.email?.message}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                className={`btn -${classNames("red")}`}
              >
                {t("title")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
