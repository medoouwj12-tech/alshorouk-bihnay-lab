"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileSearch, CheckCircle2, Clock, XCircle, Loader2, Hash, Phone, AlertCircle, Download, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Status = "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED";

interface MockResult {
  id: string;
  patientId: string;
  patientName: string;
  phone: string;
  date: string;
  tests: { code: string; nameAr: string; status: Status }[];
  overallStatus: Status;
  totalAmount: number;
}

const statusConfig: Record<Status, { labelAr: string; color: string; bg: string; icon: React.ElementType }> = {
  PENDING: { labelAr: "قيد الاستلام", color: "text-amber-700", bg: "bg-amber-50 border-amber-200", icon: Clock },
  IN_PROGRESS: { labelAr: "قيد التحليل", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: Loader2 },
  READY: { labelAr: "النتيجة جاهزة", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
  DELIVERED: { labelAr: "تم التسليم", color: "text-slate-700", bg: "bg-slate-50 border-slate-200", icon: CheckCircle2 },
};

// Mock database for demo
const MOCK_RESULTS: MockResult[] = [
  {
    id: "REQ-2024-1523",
    patientId: "P-10234",
    patientName: "أحمد محمد علي",
    phone: "01012345678",
    date: "2024-12-10",
    overallStatus: "READY",
    totalAmount: 350,
    tests: [
      { code: "CBC", nameAr: "صورة دم كاملة", status: "READY" },
      { code: "HbA1c", nameAr: "سكر تراكمي", status: "READY" },
      { code: "LFT", nameAr: "وظائف كبد", status: "READY" },
    ],
  },
  {
    id: "REQ-2024-1524",
    patientId: "P-10235",
    patientName: "سارة محمود",
    phone: "01098765432",
    date: "2024-12-11",
    overallStatus: "IN_PROGRESS",
    totalAmount: 180,
    tests: [
      { code: "TSH", nameAr: "هرمون الغدة الدرقية", status: "IN_PROGRESS" },
      { code: "FT4", nameAr: "هرمون الغدة الدرقية الحر", status: "PENDING" },
    ],
  },
];

export function ResultsTracker() {
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<MockResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [searched, setSearched] = React.useState(false);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setSearched(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));

    const found = MOCK_RESULTS.find(
      (r) =>
        r.patientId.toLowerCase() === query.trim().toLowerCase() ||
        r.phone.includes(query.trim()) ||
        r.id.toLowerCase() === query.trim().toLowerCase()
    );

    if (found) {
      setResult(found);
    } else {
      setError("لم يتم العثور على نتائج بهذا الرقم. تأكد من الرقم أو تواصل مع المعمل.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8">
          <form onSubmit={onSearch} className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-foreground mb-1">ابحث عن نتيجتك</h2>
              <p className="text-sm text-muted-foreground">
                أدخل رقم المريض أو رقم الموبايل أو رقم الطلب
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="P-10234 أو 01012345678"
                className="h-12 flex-1"
                dir="ltr"
              />
              <Button type="submit" size="lg" disabled={loading} className="sm:w-32">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                  <>
                    <Search className="h-4 w-4" />
                    بحث
                  </>
                )}
              </Button>
            </div>

            {/* Quick demo buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-muted-foreground">تجربة سريعة:</span>
              <button
                type="button"
                onClick={() => { setQuery("P-10234"); }}
                className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-foreground/70 hover:bg-primary-50 hover:text-primary-700"
              >
                P-10234
              </button>
              <button
                type="button"
                onClick={() => { setQuery("01012345678"); }}
                className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-foreground/70 hover:bg-primary-50 hover:text-primary-700"
              >
                01012345678
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <Card className="border-red-200 bg-red-50/50">
              <CardContent className="p-6 flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <XCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">لم نجد نتائج</h3>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            {/* Patient Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                      رقم الطلب
                    </p>
                    <p className="text-lg font-extrabold text-foreground font-mono">{result.id}</p>
                  </div>
                  <StatusBadge status={result.overallStatus} />
                </div>

                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">اسم المريض</p>
                    <p className="font-bold text-foreground mt-0.5">{result.patientName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">رقم المريض</p>
                    <p className="font-bold text-foreground mt-0.5 font-mono" dir="ltr">{result.patientId}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">تاريخ الطلب</p>
                    <p className="font-bold text-foreground mt-0.5">{result.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tests List */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-4">التحاليل ({result.tests.length})</h3>
                <ul className="space-y-2">
                  {result.tests.map((t) => (
                    <li
                      key={t.code}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded">
                          {t.code}
                        </span>
                        <span className="font-semibold text-foreground">{t.nameAr}</span>
                      </div>
                      <StatusBadge status={t.status} small />
                    </li>
                  ))}
                </ul>

                {result.overallStatus === "READY" && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button size="lg" className="flex-1 sm:flex-none">
                      <Eye className="h-4 w-4" />
                      عرض النتيجة
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                      <Download className="h-4 w-4" />
                      تحميل PDF
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Help note */}
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">محتاج مساعدة؟</p>
                <p className="text-blue-800/80">
                  لو عندك أي مشكلة في الوصول للنتيجة، تواصل معانا على واتساب أو اتصل بالمعمل.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {!searched && !loading && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="inline-flex h-16 w-16 rounded-full bg-slate-50 items-center justify-center mb-3">
              <FileSearch className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              أدخل رقمك في الحقل أعلاه للبحث عن نتيجتك
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusBadge({ status, small = false }: { status: Status; small?: boolean }) {
  const config = statusConfig[status];
  const Icon = config.icon;
  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 rounded-full border font-semibold",
      config.bg,
      config.color,
      small ? "px-2.5 py-0.5 text-xs" : "px-3 py-1.5 text-sm"
    )}>
      <Icon className={cn(small ? "h-3 w-3" : "h-4 w-4", status === "IN_PROGRESS" && "animate-spin")} />
      {config.labelAr}
    </div>
  );
}
