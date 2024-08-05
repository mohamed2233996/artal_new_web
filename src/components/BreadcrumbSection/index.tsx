"use client";

import { useTranslations } from "next-intl";
import { Breadcrumb, BreadcrumbItem } from "../Breadcrumb";

export default function BreadcrumbSection({ name }: { name: string }) {
  const t = useTranslations("Home");
  return (
    <Breadcrumb title={name}>
      <BreadcrumbItem name={t("Main")} />
      <BreadcrumbItem name={name} current />
    </Breadcrumb>
  );
}
