import { Hero } from "@/components/landing/Hero";
import { QuickActions } from "@/components/landing/QuickActions";
import { SearchBar } from "@/components/landing/SearchBar";
import { HomeVisitCTA } from "@/components/landing/HomeVisitCTA";
import { About } from "@/components/landing/About";
import { Accreditations } from "@/components/landing/Accreditations";
import arContent from "../../public/locales/ar/common.json";
import { SITE_CONFIG } from "@/lib/config";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "معمل الشروق بهناي - دقة وثقة في نتائجك الطبية",
  description: "معمل الشروق بهناي - أفضل معمل تحاليل طبية في بهناي والقرى المجاورة. تحاليل شاملة، سحب عينات من المنزل، ونتائج دقيقة معتمدة.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const locale = "ar" as const;
  const whatsappLink = `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    "مرحباً، أريد حجز موعد لسحب عينة من المنزل"
  )}`;

  const quickActions = [
    {
      href: "/home-visit",
      titleAr: arContent.quickActions.homeVisit.title,
      titleEn: "Book Home Sample Collection",
      descriptionAr: arContent.quickActions.homeVisit.description,
      descriptionEn: "Our medical team visits you at your preferred time",
      iconName: "truck" as const,
      variant: "primary" as const,
    },
    {
      href: "/results",
      titleAr: arContent.quickActions.results.title,
      titleEn: "Check Your Results",
      descriptionAr: arContent.quickActions.results.description,
      descriptionEn: "Get your test results anytime",
      iconName: "results" as const,
      variant: "teal" as const,
    },
    {
      href: "/tests",
      titleAr: arContent.quickActions.tests.title,
      titleEn: "Browse Our Tests",
      descriptionAr: arContent.quickActions.tests.description,
      descriptionEn: "Discover all available medical tests",
      iconName: "tests" as const,
      variant: "outline" as const,
    },
  ];

  const stats = {
    tests: 500,
    patients: 10000,
    branches: 2,
    experience: 10,
  };

  return (
    <>
      <Hero
        locale={locale}
        content={arContent.hero}
        stats={stats}
        whatsappLink={whatsappLink}
      />
      <SearchBar
        locale={locale}
        placeholder={arContent.search.placeholder}
        buttonText={arContent.search.button}
        popularSearches={[
          { label: "CBC - صورة دم كاملة", value: "CBC" },
          { label: "HbA1c", value: "HbA1c" },
          { label: "وظائف كبد", value: "liver function" },
          { label: "هرمونات الغدة الدرقية", value: "thyroid" },
        ]}
      />
      <QuickActions
        locale={locale}
        content={{ title: arContent.quickActions.title }}
        actions={quickActions}
      />
      <HomeVisitCTA locale={locale} whatsappLink={whatsappLink} />
      <About locale={locale} content={arContent.about} />
      <Accreditations locale={locale} content={arContent.accreditations} />
    </>
  );
}
