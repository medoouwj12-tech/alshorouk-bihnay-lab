import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { SITE_CONFIG } from "@/lib/config";
import { getLabJsonLd, getWebsiteJsonLd } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0077B6" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name.ar} | ${SITE_CONFIG.description.ar}`,
    template: `%s | ${SITE_CONFIG.name.ar}`,
  },
  description: SITE_CONFIG.description.ar,
  keywords: [
    "معمل الشروق",
    "معمل الشروق بهناي",
    "تحاليل طبية بهناي",
    "معمل تحاليل المنوفية",
    "سحب عينة من المنزل",
    "تحاليل دم",
    "معمل تحاليل معتمد",
    "Al-Shorouk Lab",
  ],
  authors: [{ name: SITE_CONFIG.name.en }],
  creator: SITE_CONFIG.name.en,
  alternates: {
    canonical: "/",
    languages: {
      ar: "/ar",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name.ar,
    title: SITE_CONFIG.name.ar,
    description: SITE_CONFIG.description.ar,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name.ar,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name.ar,
    description: SITE_CONFIG.description.ar,
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
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // To be added
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const navLabels = {
  home: "الرئيسية",
  tests: "تحاليلنا",
  homeVisit: "سحب من المنزل",
  results: "استعلام عن النتيجة",
  about: "عن المعمل",
  contact: "تواصل معنا",
};

const footerLabels = {
  tagline: "دقة وثقة في نتائجك الطبية",
  quickLinks: "روابط سريعة",
  services: "خدماتنا",
  contact: "تواصل معنا",
  rights: "جميع الحقوق محفوظة",
  workingHours: "مواعيد العمل",
};

const contactInfo = {
  phone: SITE_CONFIG.phone,
  whatsapp: SITE_CONFIG.whatsapp,
  email: SITE_CONFIG.email,
  address: SITE_CONFIG.address.street,
  city: SITE_CONFIG.address.city,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const labJsonLd = getLabJsonLd();
  const websiteJsonLd = getWebsiteJsonLd();

  return (
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
      <head>
        {/* Schema.org JSON-LD — MedicalLaboratory structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(labJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* Preconnect to important third-party origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
          >
            تخطى إلى المحتوى الرئيسي
          </a>

          <Navbar locale="ar" labels={navLabels} />

          <main id="main-content" className="min-h-[calc(100vh-4rem)]">
            {children}
          </main>

          <Footer
            locale="ar"
            labels={footerLabels}
            nav={navLabels}
            contact={contactInfo}
          />

          <WhatsAppFloatingButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
