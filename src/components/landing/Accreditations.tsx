"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Award, BadgeCheck } from "lucide-react";

interface AccreditationsProps {
  locale: "ar" | "en";
  content: { title: string; subtitle: string };
}

const accreditations = [
  { name: "ISO 15189", descAr: "جودة المعامل الطبية", descEn: "Medical Lab Quality" },
  { name: "CAP", descAr: "كلية علماء الأمراض الأمريكية", descEn: "American Pathologists" },
  { name: "JCI", descAr: "اللجنة الدولية المشتركة", descEn: "Joint Commission Intl." },
  { name: "EGAC", descAr: "مجلس الاعتماد المصري", descEn: "Egyptian Accreditation" },
  { name: "CLIA", descAr: "تحسينات معامل أمريكية", descEn: "Clinical Lab Improvement" },
  { name: "MoH", descAr: "وزارة الصحة المصرية", descEn: "Egyptian Ministry of Health" },
];

export function Accreditations({ locale, content }: AccreditationsProps) {
  return (
    <section
      className="py-16 md:py-20 bg-white border-y border-border/60"
      aria-labelledby="accreditations-heading"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold mb-4">
            <Award className="h-3.5 w-3.5" />
            {locale === "ar" ? "الاعتمادات" : "Certifications"}
          </div>
          <h2
            id="accreditations-heading"
            className="text-2xl md:text-3xl font-bold text-foreground mb-2"
          >
            {content.title}
          </h2>
          <p className="text-muted-foreground">{content.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {accreditations.map((acc, i) => (
            <motion.div
              key={acc.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group"
            >
              <div className="aspect-square rounded-2xl border-2 border-dashed border-border bg-slate-50/50 hover:border-primary-300 hover:bg-primary-50/30 transition-all flex flex-col items-center justify-center p-4 text-center">
                <BadgeCheck className="h-7 w-7 text-primary-600 mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-extrabold text-foreground text-sm">{acc.name}</div>
                <div className="text-[10px] text-muted-foreground mt-1 leading-tight">
                  {locale === "ar" ? acc.descAr : acc.descEn}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
