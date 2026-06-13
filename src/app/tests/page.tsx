import { Suspense } from "react";
import { getTests, getCategories } from "@/lib/db";
import { TestsDirectory } from "@/components/tests/TestsDirectory";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "تحاليلنا الطبية - معمل الشروق بهناي",
  description: "تصفح جميع التحاليل الطبية المتوفرة في معمل الشروق بهناي. CBC، هرمونات، كيمياء، PCR، والمزيد.",
  alternates: { canonical: "/tests" },
};

export default async function TestsPage() {
  const [tests, categories] = await Promise.all([
    getTests(),
    getCategories(),
  ]);

  const labels = {
    title: "تحاليلنا الطبية",
    subtitle: "اكتشف كل التحاليل المتوفرة في معمل الشروق بهناي بأعلى دقة وأسرع وقت",
    searchPlaceholder: "ابحث بالاسم أو الكود (مثل: CBC, HbA1c)...",
    all: "الكل",
    noResults: "لا توجد نتائج لـ",
    code: "الكود",
    category: "القسم",
    turnaround: "مدة النتيجة",
    bookNow: "احجز",
    results: "النتائج",
  };

  return (
    <div className="container py-10 md:py-14">
      <Suspense fallback={null}>
        <TestsDirectory
          locale="ar"
          tests={tests as any}
          categories={categories as any}
          labels={labels}
        />
      </Suspense>
    </div>
  );
}
