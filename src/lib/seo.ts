import { SITE_CONFIG } from "./config";

/**
 * Generates Schema.org JSON-LD structured data for the lab.
 * Type: MedicalLaboratory (subtype of MedicalOrganization)
 * Critical for local SEO — helps Google show rich results.
 */
export function getLabJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalLaboratory", "MedicalOrganization", "LocalBusiness"],
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name.ar,
    alternateName: SITE_CONFIG.name.en,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    image: `${SITE_CONFIG.url}/og-image.jpg`,
    description: SITE_CONFIG.description.ar,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.governorate,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "14:00",
        closes: "22:00",
      },
    ],
    sameAs: [SITE_CONFIG.social.facebook, SITE_CONFIG.social.instagram],
    medicalSpecialty: [
      "Hematology",
      "Clinical Chemistry",
      "Endocrinology",
      "Microbiology",
      "Immunology",
      "Molecular Diagnostics",
    ],
    availableService: [
      {
        "@type": "MedicalProcedure",
        name: "تحاليل الدم الشاملة",
      },
      {
        "@type": "MedicalProcedure",
        name: "سحب عينات من المنزل",
      },
      {
        "@type": "MedicalProcedure",
        name: "تحاليل الهرمونات",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name.ar,
    inLanguage: ["ar", "en"],
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
  };
}
