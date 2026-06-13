"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  User, Phone, MapPin, Calendar, Clock, CheckCircle2, 
  ChevronLeft, ChevronRight, FlaskConical, Search, X, 
  MessageCircle, Loader2, Check
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatPrice } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";

interface Test {
  id: string;
  nameAr: string;
  code: string;
  price: string | number;
  category: { nameAr: string };
}

interface Category {
  id: string;
  nameAr: string;
  slug: string;
  _count: { tests: number };
}

interface FormData {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
  preferredDate: string;
  preferredTime: string;
  selectedTests: string[];
}

const STEPS = [
  { id: 1, title: "البيانات الشخصية", icon: User },
  { id: 2, title: "العنوان", icon: MapPin },
  { id: 3, title: "الموعد", icon: Calendar },
  { id: 4, title: "التحاليل", icon: FlaskConical },
  { id: 5, title: "التأكيد", icon: CheckCircle2 },
] as const;

const TIME_SLOTS = [
  "09:00 - 11:00",
  "11:00 - 13:00",
  "13:00 - 15:00",
  "15:00 - 17:00",
  "17:00 - 19:00",
  "19:00 - 21:00",
];

export function HomeVisitForm({ tests, categories }: { tests: Test[]; categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedTest = searchParams.get("test");

  const [step, setStep] = React.useState(1);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [data, setData] = React.useState<FormData>({
    name: "",
    phone: "",
    address: "",
    city: "بهناي",
    notes: "",
    preferredDate: "",
    preferredTime: "",
    selectedTests: preselectedTest ? [preselectedTest] : [],
  });

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  // Validation per step
  const isStepValid = (s: number): boolean => {
    switch (s) {
      case 1:
        return data.name.trim().length >= 3 && /^[\d+\s-]{10,}$/.test(data.phone);
      case 2:
        return data.address.trim().length >= 5;
      case 3:
        return !!(data.preferredDate && data.preferredTime);
      case 4:
        return data.selectedTests.length > 0;
      default:
        return true;
    }
  };

  const next = () => {
    if (isStepValid(step)) setStep((s) => Math.min(s + 1, STEPS.length));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const selectedTestsData = tests.filter((t) => data.selectedTests.includes(t.id));
  const totalPrice = selectedTestsData.reduce((sum, t) => sum + Number(t.price), 0);

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      // Send to API
      const res = await fetch("/api/home-visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          preferredDate: new Date(data.preferredDate).toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);

      // Build WhatsApp message
      const testsList = selectedTestsData.map((t) => `- ${t.nameAr} (${t.code})`).join("\n");
      const message = `🔬 *طلب جديد - سحب عينة من المنزل*

👤 الاسم: ${data.name}
📞 الموبايل: ${data.phone}
📍 العنوان: ${data.address}${data.city ? `, ${data.city}` : ""}
📅 الموعد: ${data.preferredDate} | ${data.preferredTime}
🧪 التحاليل المطلوبة:
${testsList}
💰 الإجمالي: ${formatPrice(totalPrice, "ar")}
${data.notes ? `📝 ملاحظات: ${data.notes}` : ""}`;

      const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp after 1.5s (let user see success)
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 1500);
    } catch (err) {
      alert("حدث خطأ. حاول مرة أخرى.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card>
        <CardContent className="p-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-flex h-20 w-20 rounded-full bg-emerald-50 items-center justify-center mb-5"
          >
            <Check className="h-10 w-10 text-emerald-600" />
          </motion.div>
          <h2 className="text-2xl font-extrabold text-foreground mb-2">
            تم إرسال طلبك بنجاح! 🎉
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            جاري تحويلك إلى واتساب لتأكيد الطلب مع المعمل. سيتواصل معك فريقنا في أقرب وقت.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            جاري فتح واتساب...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-8 px-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isActive = step === s.id;
          const isCompleted = step > s.id;
          return (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-1.5 min-w-0">
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center transition-all border-2",
                    isActive && "bg-primary-600 border-primary-600 text-white shadow-soft scale-110",
                    isCompleted && "bg-emerald-500 border-emerald-500 text-white",
                    !isActive && !isCompleted && "bg-card border-border text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <span
                  className={cn(
                    "text-[10px] sm:text-xs font-semibold text-center hidden sm:block",
                    isActive ? "text-primary-700" : "text-muted-foreground"
                  )}
                >
                  {s.title}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-1 sm:mx-2 transition-colors",
                    step > s.id ? "bg-emerald-500" : "bg-border"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <Card>
        <CardContent className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <div className="space-y-5">
                  <StepHeader
                    icon={User}
                    title="البيانات الشخصية"
                    description="من فضلك أدخل بياناتك للتواصل"
                  />
                  <Field label="الاسم بالكامل" required>
                    <Input
                      value={data.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="مثال: أحمد محمد"
                      className="h-12"
                    />
                  </Field>
                  <Field label="رقم الموبايل" required hint="سيتم التواصل معك على هذا الرقم">
                    <Input
                      value={data.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="h-12"
                      dir="ltr"
                      inputMode="tel"
                    />
                  </Field>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <StepHeader
                    icon={MapPin}
                    title="عنوان السحب"
                    description="حدد عنوانك بالتفصيل ليصلك فريقنا"
                  />
                  <Field label="العنوان بالكامل" required>
                    <Input
                      value={data.address}
                      onChange={(e) => update("address", e.target.value)}
                      placeholder="مثال: شارع الجمهورية، أمام المسجد الكبير"
                      className="h-12"
                    />
                  </Field>
                  <Field label="المدينة / المنطقة">
                    <Input
                      value={data.city}
                      onChange={(e) => update("city", e.target.value)}
                      placeholder="بهناي"
                      className="h-12"
                    />
                  </Field>
                  <Field label="ملاحظات إضافية (اختياري)">
                    <textarea
                      value={data.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      placeholder="علامات مميزة، الدور، رقم الشقة..."
                      rows={3}
                      className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 focus-visible:border-primary-500 resize-none"
                    />
                  </Field>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <StepHeader
                    icon={Calendar}
                    title="الموعد المفضل"
                    description="اختر اليوم والوقت المناسب لك"
                  />
                  <Field label="التاريخ" required>
                    <Input
                      type="date"
                      value={data.preferredDate}
                      onChange={(e) => update("preferredDate", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="h-12"
                      dir="ltr"
                    />
                  </Field>
                  <Field label="الوقت المفضل" required>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => update("preferredTime", slot)}
                          className={cn(
                            "px-3 py-3 rounded-lg border-2 text-sm font-semibold transition-all",
                            data.preferredTime === slot
                              ? "border-primary-600 bg-primary-50 text-primary-700"
                              : "border-border text-foreground/70 hover:border-primary-300"
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              )}

              {step === 4 && (
                <TestsStep
                  tests={tests}
                  categories={categories}
                  selected={data.selectedTests}
                  onToggle={(id) =>
                    update(
                      "selectedTests",
                      data.selectedTests.includes(id)
                        ? data.selectedTests.filter((x) => x !== id)
                        : [...data.selectedTests, id]
                    )
                  }
                />
              )}

              {step === 5 && (
                <div className="space-y-5">
                  <StepHeader
                    icon={CheckCircle2}
                    title="مراجعة وتأكيد"
                    description="تأكد من صحة البيانات قبل الإرسال"
                  />

                  <div className="space-y-3 text-sm">
                    <ReviewRow label="الاسم" value={data.name} />
                    <ReviewRow label="الموبايل" value={data.phone} />
                    <ReviewRow label="العنوان" value={`${data.address}${data.city ? `, ${data.city}` : ""}`} />
                    <ReviewRow label="الموعد" value={`${data.preferredDate} | ${data.preferredTime}`} />
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">
                      التحاليل ({selectedTestsData.length})
                    </p>
                    <ul className="space-y-1.5">
                      {selectedTestsData.map((t) => (
                        <li key={t.id} className="flex justify-between text-sm">
                          <span>
                            <span className="font-mono text-xs text-primary-600">{t.code}</span>{" "}
                            <span className="text-foreground">{t.nameAr}</span>
                          </span>
                          <span className="font-bold tabular-nums">{formatPrice(Number(t.price), "ar")}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 pt-3 border-t border-border flex justify-between">
                      <span className="font-bold">الإجمالي</span>
                      <span className="font-extrabold text-primary-700 text-lg tabular-nums">
                        {formatPrice(totalPrice, "ar")}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    بالضغط على &quot;إرسال عبر واتساب&quot; سيتم فتح واتساب لإرسال الطلب مباشرة للمعمل
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={prev}
          disabled={step === 1}
          className={cn(step === 1 && "invisible")}
        >
          <ChevronRight className="h-4 w-4" />
          السابق
        </Button>

        {step < STEPS.length ? (
          <Button onClick={next} disabled={!isStepValid(step)} size="lg">
            التالي
            <ChevronLeft className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            disabled={submitting}
            size="lg"
            variant="whatsapp"
            className="min-w-[200px]"
          >
            {submitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <MessageCircle className="h-5 w-5" />
                إرسال عبر واتساب
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

function StepHeader({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="mb-6">
      <div className="inline-flex h-12 w-12 rounded-xl bg-primary-50 text-primary-600 items-center justify-center mb-3">
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="text-xl font-bold text-foreground mb-1">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground mt-1.5">{hint}</p>}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 pb-2 border-b border-border/50 last:border-0">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="font-semibold text-foreground text-end">{value}</span>
    </div>
  );
}

function TestsStep({
  tests,
  categories,
  selected,
  onToggle,
}: {
  tests: Test[];
  categories: Category[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const [search, setSearch] = React.useState("");
  const [activeCat, setActiveCat] = React.useState<string>("all");

  const filtered = React.useMemo(() => {
    return tests.filter((t) => {
      const matchesCat = activeCat === "all" || t.category.nameAr === activeCat;
      const matchesSearch =
        !search ||
        t.nameAr.toLowerCase().includes(search.toLowerCase()) ||
        t.code.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [tests, search, activeCat]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">اختر التحاليل المطلوبة</h2>
        <p className="text-sm text-muted-foreground">حدد التحاليل اللي عايز تسحبها من البيت</p>
      </div>

      <div className="relative">
        <Search className="absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن تحليل..."
          className="h-11 ps-10"
        />
      </div>

      {selected.length > 0 && (
        <div className="p-3 rounded-lg bg-primary-50 border border-primary-200 flex items-center justify-between">
          <span className="text-sm font-semibold text-primary-700">
            تم اختيار {selected.length} تحليل
          </span>
          <button
            type="button"
            onClick={() => selected.forEach(onToggle)}
            className="text-xs font-semibold text-primary-700 hover:underline"
          >
            مسح الكل
          </button>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2 scrollbar-hide">
        <button
          type="button"
          onClick={() => setActiveCat("all")}
          className={cn(
            "shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold",
            activeCat === "all" ? "bg-primary-600 text-white" : "bg-card border border-border"
          )}
        >
          الكل
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveCat(c.nameAr)}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold",
              activeCat === c.nameAr ? "bg-primary-600 text-white" : "bg-card border border-border"
            )}
          >
            {c.nameAr}
          </button>
        ))}
      </div>

      <div className="max-h-96 overflow-y-auto space-y-2 -mx-1 px-1">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">لا توجد نتائج</p>
        ) : (
          filtered.map((t) => {
            const isSelected = selected.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onToggle(t.id)}
                className={cn(
                  "w-full text-start flex items-center gap-3 p-3 rounded-lg border-2 transition-all",
                  isSelected
                    ? "border-primary-600 bg-primary-50"
                    : "border-border hover:border-primary-300"
                )}
              >
                <div
                  className={cn(
                    "h-5 w-5 rounded border-2 flex items-center justify-center shrink-0",
                    isSelected ? "bg-primary-600 border-primary-600" : "border-border"
                  )}
                >
                  {isSelected && <Check className="h-3 w-3 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-primary-600">
                      {t.code}
                    </span>
                    <span className="text-xs text-muted-foreground">{t.category.nameAr}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground truncate">{t.nameAr}</p>
                </div>
                <span className="text-sm font-bold text-primary-700 shrink-0 tabular-nums">
                  {formatPrice(Number(t.price), "ar")}
                </span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
