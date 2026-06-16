import type { Metadata } from "next";

export const SITE_CONFIG = {
  name: {
    ar: "معمل الشروق بهناي وشنشور",
    en: "Al-Shorouk Bihnay & Shanshour Lab",
  },
  shortName: "معمل الشروق",
  description: {
    ar: "معمل الشروق بهناي وشنشور - دقة وثقة في نتائجك الطبية. تحاليل طبية شاملة، سحب عينات من المنزل، ونتائج دقيقة معتمدة.",
    en: "Al-Shorouk Bihnay & Shanshour Lab - Precision and trust in your medical results. Comprehensive medical tests, home sample collection, and certified accurate results.",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://alshorouk-lab.com",
  phone: process.env.NEXT_PUBLIC_LAB_PHONE || "+201063765052",
  whatsapp: process.env.NEXT_PUBLIC_LAB_WHATSAPP || "+201063765052",
  email: "info@alshorouk-lab.com",
  address: {
    street: "بهناي (بجوار كوبري بهناي) & شنشور (شارع شنشور الرئيسي)",
    city: "المنوفية",
    governorate: "المنوفية",
    country: "EG",
  },
  geo: {
    latitude: 30.5526, // placeholder - to be updated
    longitude: 31.0117,
  },
  social: {
    facebook: "https://facebook.com/alshorouk.lab",
    instagram: "https://instagram.com/alshorouk.lab",
  },
};

export function buildMetadata(locale: string = "ar"): Metadata {
  const isAr = locale === "ar";
  return {
    title: {
      default: isAr
        ? `${SITE_CONFIG.name.ar} | ${SITE_CONFIG.description.ar}`
        : `${SITE_CONFIG.name.en} | ${SITE_CONFIG.description.en}`,
      template: isAr
        ? `%s | ${SITE_CONFIG.name.ar}`
        : `%s | ${SITE_CONFIG.name.en}`,
    },
    description: isAr ? SITE_CONFIG.description.ar : SITE_CONFIG.description.en,
    keywords: isAr
      ? [
          "معمل الشروق",
          "معمل الشروق بهناي",
          "تحاليل طبية بهناي",
          "معمل تحاليل",
          "سحب عينة من المنزل",
          "تحاليل دم",
          "معامل المنوفية",
        ]
      : [
          "Al-Shorouk Lab",
          "Bihnay Lab",
          "Medical Lab Egypt",
          "Home Sample Collection",
          "Blood Tests",
        ],
    authors: [{ name: SITE_CONFIG.name.en }],
    creator: SITE_CONFIG.name.en,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: "/",
      languages: {
        ar: "/ar",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_EG" : "en_US",
      url: SITE_CONFIG.url,
      siteName: isAr ? SITE_CONFIG.name.ar : SITE_CONFIG.name.en,
      title: isAr ? SITE_CONFIG.name.ar : SITE_CONFIG.name.en,
      description: isAr ? SITE_CONFIG.description.ar : SITE_CONFIG.description.en,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: isAr ? SITE_CONFIG.name.ar : SITE_CONFIG.name.en,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isAr ? SITE_CONFIG.name.ar : SITE_CONFIG.name.en,
      description: isAr ? SITE_CONFIG.description.ar : SITE_CONFIG.description.en,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}
