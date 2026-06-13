"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
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
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    router.push(`/tests?q=${encodeURIComponent(query.trim())}`);
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
                    router.push(`/tests?q=${encodeURIComponent(s.value)}`);
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
    </section>
  );
}
