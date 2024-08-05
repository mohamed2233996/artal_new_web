"use client";

import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import { useAppStore } from "@/providers/app-store-provider";
import classNames from "classnames";
import { signIn, useSession } from "next-auth/react";
import { Link } from "@/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const populateState = useAppStore((state) => state.populateState);
  const [isLoading, setLoading] = useState<boolean>(false);

  const t = useTranslations("Login");
  const isAr = useLocale() === "ar";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  /**
   * * Handlers
   */

  const onSubmit = async (data: LoginFormData) => {
    try {
      const status = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (status?.error) {
        setLoading(false);
        toast.error(status.error);
      }

      if (status?.ok) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      const cart = session?.user?.cart?.cartItems?.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));
      const fav = session?.user?.favourites?.map((item) => item.product);
      populateState(cart, fav);
      router.push("/");
      toast.success(t("success"));
    }
  }, [status]);

  return (
    <>
      <Breadcrumb title={t("title")}>
        <BreadcrumbItem name={t("Home")} />
        <BreadcrumbItem name={t("title")} current />
      </Breadcrumb>
      <div className="checkout" dir={isAr ? "rtl" : "ltr"}>
        <div className="container">
          <div style={{ margin: "auto" }} className="col-12 col-lg-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="checkout__form">
                <div className="checkout__form__contact">
                  <div className="checkout__form__contact__title">
                    <h5 className="checkout-title">{t("Email")}</h5>
                  </div>
                  <div className="input-validator">
                    <input
                      type="text"
                      {...register("email", {
                        required: {
                          message: t("Required"),
                          value: true,
                        },
                      })}
                      placeholder={t("Email_field")}
                      className={!!errors.email ? "error" : undefined}
                    />
                    <span className="error-message">
                      {!!errors.email && errors.email?.message}
                    </span>
                  </div>
                  <div className="checkout__form__contact__title">
                    <h5 className="checkout-title">{t("Password")}</h5>
                  </div>
                  <div className="input-validator">
                    <input
                      type="password"
                      {...register("password", {
                        required: {
                          value: true,
                          message: t("Required"),
                        },
                      })}
                      placeholder={t("Password_field")}
                      className={!!errors.password ? "error" : undefined}
                    />
                    <span className="error-message">
                      {!!errors.password && errors.password?.message}
                    </span>
                  </div>
                  <p>
                    {t("NOT_HAVE_ACCOUNT")}
                    <Link href="/signup">{t("Signup")}</Link>
                  </p>
                  <br />

                  {/* Submit Button */}
                  <button type="submit" className={`btn -${classNames("red")}`}>
                    {t("title")}
                  </button>

                  <div style={{ marginTop: "5px" }}>
                    {t("Forget_Password")} {" "}
                    <Link style={{ color: "red" }} href={"/reset-password"}>
                      {t("Reset")}
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
