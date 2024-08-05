"use client";

import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import InstagramSection from "@/sections/InstgramSection";
import ProductDetailsSection from "@/sections/ProductDetailsSection";
import ProductSlider from "@/sections/ProductSlider";
import { Product } from "@/types/Product";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export default function ProductPage({
  reviews,
  products,
  product: apiProduct,
  instagramImages,
}: {
  reviews: any[];
  products: Product[];
  product: Product;
  instagramImages: any[];
}) {
  const [product, setProduct] = useState<Product>(apiProduct);
  const t = useTranslations('Store')
  const isAr = useLocale() === 'ar'

  if (!product) {
    return <div>{t('Not_Found')}</div>;
  }

  return (
    <>
      <Breadcrumb title={t('Details')}>
        <BreadcrumbItem name={t("Home")} />
        <BreadcrumbItem name={t("Shop")} />
        <BreadcrumbItem name={isAr ? product?.name_ar : product?.name_en} current />
      </Breadcrumb>
      <ProductDetailsSection data={product} reviews={reviews} />
      <ProductSlider data={products} categoryId={product?.category?.id} />
      <InstagramSection data={instagramImages} />
    </>
  );
}
