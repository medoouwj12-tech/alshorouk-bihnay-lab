"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Truck, FileSearch, FlaskConical, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickActionsProps {
  locale: "ar" | "en";
  content: { title: string };
  actions: {
    href: string;
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    iconName: "truck" | "results" | "tests";
    variant: "primary" | "teal" | "outline";
  }[];
}

const icons = {
  truck: Truck,
  results: FileSearch,
  tests: FlaskConical,
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function QuickActions({ locale, content, actions }: QuickActionsProps) {
  return (
    <section
      className="py-16 md:py-20 bg-white"
      aria-labelledby="quick-actions-heading"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            id="quick-actions-heading"
            className="text-2xl md:text-3xl font-bold text-foreground"
          >
            {content.title}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {actions.map((action, i) => {
            const Icon = icons[action.iconName] || FlaskConical;
            return (
              <motion.div
                key={action.href}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
              >
                <Link href={action.href} className="block group h-full">
                  <Card className="h-full hover:shadow-card-hover hover:border-primary-300 hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-7 flex flex-col h-full">
                      <div
                        className={cn(
                          "h-14 w-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110",
                          action.variant === "primary" && "bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white",
                          action.variant === "teal" && "bg-teal-50 text-teal-500 group-hover:bg-teal-500 group-hover:text-white",
                          action.variant === "outline" && "bg-slate-50 text-slate-700 group-hover:bg-primary-50 group-hover:text-primary-600"
                        )}
                      >
                        <Icon className="h-7 w-7" />
                      </div>

                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary-700 transition-colors">
                        {locale === "ar" ? action.titleAr : action.titleEn}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {locale === "ar" ? action.descriptionAr : action.descriptionEn}
                      </p>

                      <div className="mt-5 inline-flex items-center text-sm font-semibold text-primary-600 group-hover:gap-2 gap-1 transition-all">
                        {locale === "ar" ? "المزيد" : "Learn more"}
                        <ArrowLeft className="h-4 w-4 rtl-flip" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
