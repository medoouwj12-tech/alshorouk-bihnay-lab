"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, X, Clock, FlaskConical, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatPrice } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Test {
  id: string;
  nameAr: string;
  nameEn: string;
  code: string;
  price: string | number;
  description?: string | null;
  turnaroundTime?: string | null;
  category: { nameAr: string; slug: string; icon?: string | null };
}

interface Category {
  id: string;
  nameAr: string;
  slug: string;
  icon?: string | null;
  _count?: { tests: number };
}

interface TestsDirectoryProps {
  locale: "ar" | "en";
  tests: Test[];
  categories: Category[];
  labels: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    all: string;
    noResults: string;
    code: string;
    category: string;
    turnaround: string;
    bookNow: string;
    results: string;
  };
}

export function TestsDirectory({ locale, tests, categories, labels }: TestsDirectoryProps) {
  const [query, setQuery] = React.useState("");
  const [activeCat, setActiveCat] = React.useState<string>("all");
  const router = useRouter();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const q = searchParams.get("q");
    const cat = searchParams.get("category");
    if (q) setQuery(q);
    if (cat) setActiveCat(cat);
  }, [searchParams]);

  const filtered = React.useMemo(() => {
    return tests.filter((t) => {
      const matchesCat = activeCat === "all" || t.category.slug === activeCat;
      const q = query.trim().toLowerCase();
      const matchesQ =
        !q ||
        t.nameAr.toLowerCase().includes(q) ||
        t.nameEn.toLowerCase().includes(q) ||
        t.code.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [tests, query, activeCat]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (activeCat !== "all") params.set("category", activeCat);
    router.push(`/tests?${params.toString()}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 text-balance">
          {labels.title}
        </h1>
        <p className="text-muted-foreground">{labels.subtitle}</p>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={onSearch}
        className="relative flex items-center bg-white rounded-2xl shadow-soft border border-border p-2 max-w-2xl mx-auto"
        role="search"
      >
        <Search className="h-5 w-5 text-muted-foreground mx-3" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={labels.searchPlaceholder}
          className="h-12 border-0 focus-visible:ring-0 text-base flex-1"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="p-2 text-muted-foreground hover:text-foreground"
            aria-label="مسح البحث"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        <Filter className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />
        <button
          onClick={() => setActiveCat("all")}
          className={cn(
            "shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors",
            activeCat === "all"
              ? "bg-primary-600 text-white shadow-soft"
              : "bg-white border border-border text-foreground/70 hover:border-primary-300 hover:text-primary-700"
          )}
        >
          {labels.all} ({tests.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.slug)}
            className={cn(
              "shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors",
              activeCat === cat.slug
                ? "bg-primary-600 text-white shadow-soft"
                : "bg-white border border-border text-foreground/70 hover:border-primary-300 hover:text-primary-700"
            )}
          >
            {cat.nameAr}
            {cat._count && (
              <span className="ms-1.5 text-xs opacity-70">({cat._count.tests})</span>
            )}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">
          {labels.results}: <span className="font-bold text-foreground">{filtered.length}</span>
        </p>
      </div>

      {/* Tests Grid */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="inline-flex h-16 w-16 rounded-full bg-slate-50 items-center justify-center mb-4">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {labels.noResults} &quot;{query}&quot;
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {locale === "ar"
                ? "جرب البحث بكلمة مختلفة أو تصفح الأقسام"
                : "Try a different search term or browse categories"}
            </p>
            <Button variant="outline" onClick={() => { setQuery(""); setActiveCat("all"); }}>
              {locale === "ar" ? "إعادة تعيين" : "Reset"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((test, i) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.3), duration: 0.4 }}
            >
              <Card className="h-full hover:shadow-card-hover hover:border-primary-300 hover:-translate-y-1 transition-all group">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-primary-50 text-primary-700 mb-2">
                        {test.code}
                      </span>
                      <h3 className="font-bold text-foreground leading-snug text-base line-clamp-2 group-hover:text-primary-700 transition-colors">
                        {test.nameAr}
                      </h3>
                    </div>
                    <div className="shrink-0 h-10 w-10 rounded-xl bg-primary-50 group-hover:bg-primary-600 flex items-center justify-center transition-colors">
                      <FlaskConical className="h-5 w-5 text-primary-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  {test.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                      {test.description}
                    </p>
                  )}

                  <div className="mt-auto pt-3 border-t border-border/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {labels.category}
                      </span>
                      <span className="text-xs font-semibold text-foreground">
                        {test.category.nameAr}
                      </span>
                    </div>
                    {test.turnaroundTime && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {labels.turnaround}
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          {test.turnaroundTime}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-extrabold text-primary-700 tabular-nums">
                        {formatPrice(test.price, locale)}
                      </span>
                      <Button asChild size="sm" variant="soft">
                        <Link href={`/home-visit?test=${test.id}`}>
                          {labels.bookNow}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
