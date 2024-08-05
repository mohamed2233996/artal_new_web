"use client";

import { useForm } from "react-hook-form";
import ContactInfoItem from "./ContactInfoItem";
import { Contacts } from "@/actions/getContacts";
import toast from "react-hot-toast";
import { API_ENDPOINT } from "@/shared/constants";
import { useLocale, useTranslations } from "next-intl";

interface ContactsFormData {
  name: string;
  email: string;
  content: string;
}

const ContactForm = ({ contacts }: { contacts: Contacts }) => {
  const t = useTranslations("Contact");
  const isAr = useLocale() === "ar";

  const contactData = [
    {
      title: t("Address"),
      detail: isAr? contacts.address_ar : contacts.address_en,
      iconClass: "fas fa-map-marker-alt",
    },
    {
      title: t("Phone"),
      iconClass: "fas fa-phone-alt",
      detail: contacts.phone,
    },
    {
      iconClass: "far fa-envelope",
      title: t("Email"),
      detail: contacts.email,
    },
    {
      iconClass: "far fa-clock",
      title: t("Opentime"),
      detail: `${contacts.openTimeFrom} - ${contacts.openTimeTo}`,
    },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactsFormData>();
  const onSubmit = async (data: ContactsFormData) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/messages`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({ "Content-Type": "application/json" }),
      });

      if (!response.ok) {
        toast.error("something went wrong, please try again later");
      } else {
        toast.success("Your message successfully submitted");
        reset();
      }
    } catch (error: any) {
      console.error("Form submission error:", error.message);
    }
  };

  return (
    <div className="contact" dir={isAr ? "rtl" : "ltr"}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <h3 className="contact-title">{t("Info")}</h3>
            {contactData.map((item, index) => (
              <ContactInfoItem
                key={index}
                iconClass={item.iconClass}
                title={item.title}
                detail={item.detail}
              />
            ))}
          </div>
          <div className="col-12 col-md-6">
            <h3 className="contact-title">{t('Get_In_Touch')}</h3>
            <div className="contact-form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-validator">
                  <input
                    type="text"
                    placeholder={t('Name')}
                    {...register("name", {
                      required: {
                        message: t('Required'),
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
                    type="email"
                    placeholder={t('Email_field')}
                    {...register("email", {
                      required: {
                        message: t('Required'),
                        value: true,
                      },
                    })}
                  />
                  {errors.email && (
                    <div style={{ color: "red", textAlign: "start" }}>
                      {errors.email?.message}
                    </div>
                  )}
                </div>
                <div className="input-validator">
                  <textarea
                    {...register("content", {
                      required: {
                        message: t('Required'),
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
                    id=""
                    cols={30}
                    rows={3}
                    placeholder={t('Message')}
                  />
                  {errors.content && (
                    <div style={{ color: "red", textAlign: "start" }}>
                      {errors.content?.message}
                    </div>
                  )}
                </div>
                <button className="btn -dark">{t('Send')}</button>
              </form>
            </div>
          </div>
          <div className="col-12">
            <iframe
              className="contact-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.8626149975366!2d50.550687575416134!3d26.233653177058372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49a5ea1f5183f1%3A0x74cc5dcb5a92b39f!2z2KPYsdiq2KfZhCDYp9mE2LfYqNmK2LnYqSAtIEFydGFsIEFsdGFiaWVh!5e0!3m2!1sen!2seg!4v1712002296873!5m2!1sen!2seg"
              style={{ border: 0 }}
              width="100%"
              height="450"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactForm;
