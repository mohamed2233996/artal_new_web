import type { Metadata } from "next";
import "@/styles/styles.scss";
import "@/styles/fontawesome/css/all.css";
import "@smastrom/react-rating/style.css";
import { League_Spartan } from "next/font/google";
import GlobalProvider from "./globalProvider";
import Layout from "@/components/Layout";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Head } from "next/document";

const spartan = League_Spartan({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "artal altabiea - أرتال الطبيعة",
  description:
    "Artal Al-Tabiah Company for Perfumes and Cosmetics is a Bahraini company, spread throughout the Kingdom of Bahrain. - شركة أرتال الطبيعة للعطور ومستحضرات التجميل هي شركة بحرينية، تنتشر في إرجاء مملكة البحرين.",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Perfume",
    "Perfume for men",
    "Perfume for women",
    "Luxury Perfume",
    "Arabic Perfume",
    "Natural Perfume",
    "Buy perfume online",
    "Perfume shop online",
    "Perfume brands",
    "Bahrain perfume",
    "عطر",
    "عطر نسائي",
    "عطر فخم",
    "عطر عربي",
    "عطر طبيعي",
    "شراء عطر أون لاين",
    "متجر عطور أون لاين",
    "ماركات عطور",
    "عطر بحريني",
  ],
  publisher: "artal altabiea",
  metadataBase: new URL("https://artal-altabiea.com/"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ar: "/ar",
    },
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={spartan.className}>
        <NextIntlClientProvider messages={messages}>
          <GlobalProvider>
            <Layout>
              {children}
              <div id="nav-full" />
              <div id="nav-sidebar" />
              <div id="cart-sidebar" />
              <div id="overlay" />
              <div id="modal" />
            </Layout>
          </GlobalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
