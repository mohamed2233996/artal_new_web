import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import Signup from "@/sections/signup";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

const page = async ({ params: { locale } }: { params: { locale: string } }) => {
  const session = await getServerAuthSession();
  const t = await getTranslations('Signup')
  if (session?.token) {
    redirect(`/${locale}/`);
  }

  return (
    <>
      <Breadcrumb title={t('title')}>
        <BreadcrumbItem name={t('Home')} />
        <BreadcrumbItem name={t('title')} current />
      </Breadcrumb>
      <Signup />
    </>
  );
};

export default page;
