"use client";

import { API_ENDPOINT } from "@/shared/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ZodType, z } from "zod";

type SignupFormData = {
  username: string;
  email: string;
  password: string;
  phone: string;
};

const Signup = () => {
  const router = useRouter();
  const t = useTranslations("Signup");
  const isAr = useLocale() === "ar";

  const SignUpSchema: ZodType<SignupFormData> = z.object({
    username: z
      .string()
      .min(2, { message: t('Invalid_Username') })
      .max(15, { message: t('Invalid_Username') }),
    email: z.string().email({message: t('Invalid_Email')}),
    phone: z
      .string({ required_error: t('Required') })
      .min(10, { message: t('Invalid_Phone')})
      .max(12, { message: t('Invalid_Phone') })
      .refine((v) => /^[0-9]+$/.test(v), {
        message: t('Invalid_Phone'),
      }),
    password: z
      .string()
      .refine(
        (v) =>
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
            v
          ),
        {
          message: t('Weak_Password')
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    const signup = async () => {
      const res = await fetch(`${API_ENDPOINT}/auth/signup`, {
        method: "POST",
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          phone: data.phone,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-lang": isAr ? 'ar' : 'en'
        },
      });

      return await res.json();
    };

    const res = await signup();

    if (res.statusCode === 400) {
      toast.error(res.message);
    } else {
      router.push("/login");
      toast.success(
        t('Success'),
        {
          duration: 20000,
          style: {textAlign: 'center'}
        }
      );
    }
  };
  return (
    <div className="checkout" dir={isAr ? "rtl" : "ltr"}>
      <div className="container">
        <div style={{ margin: "auto" }} className="col-12 col-lg-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="checkout__form">
              <div className="checkout__form__contact">
                {/* Username Field */}
                <div className="checkout__form__contact__title">
                  <h5 className="checkout-title">{t("Username")}</h5>
                </div>
                <div className="input-validator">
                  <input
                    type="text"
                    {...register("username", {
                      required: {
                        message: t("Required"),
                        value: true,
                      },
                    })}
                    placeholder={t("Username_Field")}
                    className={!!errors.username ? "error" : undefined}
                  />
                  <span className="error-message">
                    {!!errors.username && errors.username?.message}
                  </span>
                </div>
                {/* Email Field */}
                <div className="checkout__form__contact__title">
                  <h5 className="checkout-title">{t("Email")}</h5>
                </div>
                <div className="input-validator">
                  <input
                    type="email"
                    {...register("email", {
                      required: {
                        value: true,
                        message: t("Required"),
                      },
                    })}
                    placeholder={t("Email_Field")}
                    className={!!errors.email ? "error" : undefined}
                  />
                  <span className="error-message">
                    {!!errors.email && errors.email?.message}
                  </span>
                </div>

                {/* Phone Field */}
                <div className="checkout__form__contact__title">
                  <h5 className="checkout-title">{t("Phone")}</h5>
                </div>
                <div className="input-validator">
                  <input
                    type="text"
                    {...register("phone", {
                      required: {
                        value: true,
                        message: t("Required"),
                      },
                    })}
                    placeholder={t("Phone_Field")}
                    className={!!errors.phone ? "error" : undefined}
                  />
                  <span className="error-message">
                    {!!errors.phone && errors.phone?.message}
                  </span>
                </div>

                {/* Password Field  */}
                <div className="checkout__form__contact__title">
                  <h5 className="checkout-title">{t("Password")}</h5>
                </div>
                <div className="input-validator">
                  <input
                    type="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: t("Password"),
                      },
                    })}
                    placeholder={t("Password_Field")}
                    className={!!errors.password ? "error" : undefined}
                  />
                  <span className="error-message">
                    {!!errors.password && errors.password?.message}
                  </span>
                </div>
                {/* Submit Button */}
                <button type="submit" className={`btn -${classNames("red")}`}>
                  {t("title")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
