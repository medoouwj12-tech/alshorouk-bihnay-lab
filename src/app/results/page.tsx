import { ResultsTracker } from "@/components/results/ResultsTracker";

export const metadata = {
  title: "استعلام عن نتيجة التحليل - معمل الشروق بهناي",
  description: "اعرف نتيجة تحاليلك الطبية في أي وقت. أدخل رقم المريض أو رقم الطلب للاستعلام.",
  alternates: { canonical: "/results" },
};

export default function ResultsPage() {
  return (
    <div className="container py-10 md:py-14">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 text-balance">
            استعلام عن نتيجة التحليل
          </h1>
          <p className="text-muted-foreground">
            أدخل رقمك لمعرفة حالة نتيجة تحاليلك
          </p>
        </div>

        <ResultsTracker />
      </div>
    </div>
  );
}
