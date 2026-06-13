"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Truck, FileSearch, FlaskConical, ArrowLeft, Sparkles, ShieldCheck, Clock, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  locale: "ar" | "en";
  content: {
    title: string;
    subtitle: string;
    description: string;
    cta: { primary: string; secondary: string };
    stats: { tests: string; patients: string; branches: string; experience: string };
  };
  stats: { tests: number; patients: number; branches: number; experience: number };
  whatsappLink: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero({ locale, content, stats, whatsappLink }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden gradient-hero"
      aria-labelledby="hero-heading"
    >
      {/* Decorative grid + glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_30%,transparent_80%)] opacity-40" />
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute top-40 -left-24 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl" />
      </div>

      <div className="container relative py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            <motion.div
              custom={0}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-600" />
              </span>
              <Sparkles className="h-3.5 w-3.5" />
              {locale === "ar" ? "معمل معتمد - نتائج دقيقة وسريعة" : "Certified Lab - Accurate & Fast Results"}
            </motion.div>

            <motion.h1
              id="hero-heading"
              custom={1}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-foreground text-balance"
            >
              {content.title}
              <span className="block mt-2 gradient-text">{content.subtitle}</span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              {content.description}
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button asChild size="xl" variant="whatsapp">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <Truck className="h-5 w-5" />
                  {content.cta.primary}
                </a>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/tests">
                  {content.cta.secondary}
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {[
                { icon: ShieldCheck, text: locale === "ar" ? "معتمد ISO 15189" : "ISO 15189 Certified" },
                { icon: Clock, text: locale === "ar" ? "نتائج في نفس اليوم" : "Same-day Results" },
                { icon: HeartPulse, text: locale === "ar" ? "فريق طبي متخصص" : "Expert Medical Team" },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                  <badge.icon className="h-4 w-4 text-teal-500" />
                  <span className="font-medium">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl bg-white border border-border shadow-card-hover p-8 lg:p-10">
              <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full bg-teal-500 text-white text-xs font-bold shadow-soft">
                {locale === "ar" ? "الأفضل في بهناي" : "Best in Bihnay"}
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: `${stats.tests}+`, label: content.stats.tests, color: "text-primary-600" },
                  { value: `${stats.patients}+`, label: content.stats.patients, color: "text-teal-500" },
                  { value: `${stats.branches}`, label: content.stats.branches, color: "text-primary-600" },
                  { value: `${stats.experience}+`, label: content.stats.experience, color: "text-teal-500" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                    className="text-center p-4 rounded-2xl bg-gradient-to-br from-primary-50/50 to-teal-50/30"
                  >
                    <div className={`text-3xl lg:text-4xl font-extrabold ${stat.color} tabular-nums`}>
                      {stat.value}
                    </div>
                    <div className="text-xs lg:text-sm text-muted-foreground mt-1 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border/60">
                <p className="text-sm text-center text-muted-foreground">
                  {locale === "ar" ? (
                    <>انضم لآلاف المرضى الذين يثقون بنا</>
                  ) : (
                    <>Join thousands of patients who trust us</>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
