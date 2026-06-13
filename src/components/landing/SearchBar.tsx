"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Loader2, MessageCircle, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  locale: "ar" | "en";
  placeholder: string;
  buttonText: string;
  popularSearches?: { label: string; value: string }[];
}

export function SearchBar({ locale, placeholder, buttonText, popularSearches }: SearchBarProps) {
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [whatsappQuery, setWhatsappQuery] = React.useState("");
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setWhatsappQuery(query.trim());
    setIsModalOpen(true);
  };

  return (
    <section
      className="py-12 md:py-16 bg-gradient-to-b from-white via-primary-50/30 to-white"
      aria-labelledby="search-heading"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2
            id="search-heading"
            className="text-2xl md:text-3xl font-bold text-foreground mb-2"
          >
            {locale === "ar" ? "ابحث عن تحليلك" : "Find Your Test"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {locale === "ar"
              ? "اكتب اسم التحليل أو الكود (مثل: CBC) لتجده فوراً"
              : "Type a test name or code (e.g., CBC) to find it instantly"}
          </p>

          <form
            onSubmit={onSubmit}
            className="relative flex flex-col sm:flex-row items-stretch gap-2 bg-white rounded-2xl shadow-card-hover border border-border p-2"
            role="search"
          >
            <div className="relative flex-1">
              <Search className="absolute top-1/2 -translate-y-1/2 start-4 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="h-12 ps-12 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                aria-label={placeholder}
                dir={locale === "ar" ? "rtl" : "ltr"}
              />
            </div>
            <Button type="submit" size="lg" disabled={loading} className="h-12 sm:w-auto">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : buttonText}
            </Button>
          </form>

          {popularSearches && popularSearches.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">
                {locale === "ar" ? "الأكثر بحثاً:" : "Popular:"}
              </span>
              {popularSearches.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => {
                    setQuery(s.label);
                    setWhatsappQuery(s.label);
                    setIsModalOpen(true);
                  }}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-border text-foreground/70 hover:text-primary-700 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 max-w-md w-full border border-border shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 left-4 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="إغلاق"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Icon & Title */}
            <div className="text-center mt-2">
              <div className="inline-flex h-16 w-16 rounded-2xl bg-[#25D366]/10 text-[#25D366] items-center justify-center mb-4">
                <MessageCircle className="h-8 w-8 fill-current" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                الاستفسار عبر واتساب
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {whatsappQuery ? (
                  <>
                    للاستفسار عن سعر وتفاصيل تحليل <strong className="text-primary-600 font-bold">"{whatsappQuery}"</strong>، اختر أحد الأرقام التالية للتواصل مباشرة معنا عبر واتساب:
                  </>
                ) : (
                  <>
                    للاستفسار عن أسعار وتفاصيل التحاليل، اختر أحد الأرقام التالية للتواصل مباشرة معنا عبر واتساب:
                  </>
                )}
              </p>
            </div>

            {/* WhatsApp Buttons */}
            <div className="space-y-3">
              {[
                { label: "الرقم الأول (01063765052)", phone: "201063765052" },
                { label: "الرقم الثاني (01143699913)", phone: "201143699913" },
              ].map((item, idx) => {
                const message = whatsappQuery 
                  ? `مرحباً، أريد الاستفسار عن سعر وتفاصيل تحليل: ${whatsappQuery}`
                  : "مرحباً، أريد الاستفسار عن التحاليل الطبية والأسعار";
                const url = `https://wa.me/${item.phone}?text=${encodeURIComponent(message)}`;
                
                return (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1DA851] text-white font-bold transition-all shadow-soft hover:shadow-md active:scale-[0.99]"
                  >
                    <MessageCircle className="h-5 w-5 fill-current" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full py-3 px-4 rounded-2xl border border-border bg-slate-50 dark:bg-slate-800 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
