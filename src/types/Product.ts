export type Category = {
  id: string;
  name_ar: string;
  name_en: string;
};

export type ProductImages = {
  id: string;
  path: string;
};

export type Product = {
  active: boolean
  id: string;
  name_ar: string;
  name_en: string;
  desc_ar: string;
  desc_en: string;
  price: number;
  discount: number;
  instagram: string;
  products: ProductImages[];
  category: Category;
  rating: number;
};
