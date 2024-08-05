"use client";

import { SaveNewPassword } from "@/actions/auth/save-new-password";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { Link, useRouter } from "@/navigation";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ZodType, z } from "zod";
import { useTranslations } from "next-intl";

export default function Page() {
  const params = useParams<{ token: string }>();
  const t = useTranslations("ResetPassword");
  const router = useRouter()

  const NewPasswordSchema: ZodType<{ password: string }> = z.object({
    password: z
      .string()
      .refine(
        (v) =>
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
            v
          ),
        {
          message: t("Weak_Password"),
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string }>({
    resolver: zodResolver(NewPasswordSchema),
  });

  const onSubmit = async (data: { password: string }) => {
    await SaveNewPassword(params.token, data?.password).then((res) => {
      if (res.statusCode === 400) {
        toast.error(res.message);
        return;
      }
      toast.success(t("Success"));
      router.push('/login')
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
                  <h5 className="checkout-title">{t("New_Password")}</h5>
                </div>
                <div className="input-validator">
                  <input
                    type="password"
                    {...register("password", {
                      required: {
                        message: t("Required"),
                        value: true,
                      },
                    })}
                    placeholder={t("Password_Field")}
                    className={!!errors.password ? "error" : undefined}
                  />
                  <span className="error-message">
                    {!!errors.password && errors.password?.message}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                className={`btn -${classNames("red")}`}
                style={{ width: "13em" }}
              >
                {t("Save")}
              </button>

              <Link
                href="/reset-password"
                className={`btn -${classNames("dark")}`}
                style={{ margin: "5px" }}
              >
                {t("Request_New")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
