import { getContacts } from "@/actions/getContacts";
import { getInstagramImages } from "@/actions/getInstagramImages";
import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import ContactForm from "@/sections/ContactForm";
import InstagramSection from "@/sections/InstgramSection";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const contacts = await getContacts();
  const images = await getInstagramImages();

  const t = await getTranslations('Contact')
  return (
    <>
      <Breadcrumb title={t('title')}>
        <BreadcrumbItem name={t('Home')} />
        <BreadcrumbItem name={t('title')} current />
      </Breadcrumb>
      <ContactForm contacts={contacts!} />
      <InstagramSection data={images} />
    </>
  );
}
