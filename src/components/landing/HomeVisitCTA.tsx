"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Truck, Calendar, MessageCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HomeVisitCTAProps {
  locale: "ar" | "en";
  whatsappLink: string;
}

const features = [
  { icon: CheckCircle2, textAr: "فريق طبي متخصص", textEn: "Expert medical team" },
  { icon: CheckCircle2, textAr: "نفس دقة المعمل", textEn: "Same lab-grade accuracy" },
  { icon: CheckCircle2, textAr: "مواعيد مرنة", textEn: "Flexible scheduling" },
  { icon: CheckCircle2, textAr: "تغطية لكل بهناي والمنوفية", textEn: "Coverage across Bihnay & Menoufia" },
];

export function HomeVisitCTA({ locale, whatsappLink }: HomeVisitCTAProps) {
  return (
    <section
      className="py-16 md:py-20 bg-white"
      aria-labelledby="home-visit-cta-heading"
    >
      <div className="container">
        <Card className="overflow-hidden border-0 shadow-card-hover bg-gradient-to-br from-primary-600 via-primary-700 to-teal-600 text-white">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 lg:p-14 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold mb-5">
                    <Truck className="h-3.5 w-3.5" />
                    {locale === "ar" ? "خدمة سحب العينات من المنزل" : "Home Sample Collection"}
                  </div>

                  <h2
                    id="home-visit-cta-heading"
                    className="text-3xl md:text-4xl font-extrabold leading-tight text-balance"
                  >
                    {locale === "ar"
                      ? "ما تحركش من بيتك.. إحنا نيجيلك"
                      : "Don't leave your home. We come to you."}
                  </h2>

                  <p className="mt-4 text-white/85 leading-relaxed">
                    {locale === "ar"
                      ? "فريقنا الطبي يوصل لحد عندك في الموعد اللي يناسبك، بنفس دقة المعمل وأعلى معايير السلامة."
                      : "Our medical team visits you at your preferred time, with the same lab-grade accuracy and highest safety standards."}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {features.map((f, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: locale === "ar" ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 + 0.2, duration: 0.4 }}
                        className="flex items-center gap-2.5 text-sm"
                      >
                        <f.icon className="h-4 w-4 text-teal-200 shrink-0" />
                        <span>{locale === "ar" ? f.textAr : f.textEn}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button asChild size="xl" variant="whatsapp">
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-5 w-5" />
                        {locale === "ar" ? "احجز عبر واتساب" : "Book via WhatsApp"}
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="xl"
                      className="bg-white/15 text-white border border-white/30 hover:bg-white/25 hover:border-white/50"
                    >
                      <Link href="/home-visit">
                        <Calendar className="h-5 w-5" />
                        {locale === "ar" ? "احجز أونلاين" : "Book Online"}
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square max-w-md mx-auto rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex h-24 w-24 rounded-2xl bg-white/20 items-center justify-center mb-4">
                      <Truck className="h-12 w-12 text-white" />
                    </div>
                    <div className="text-5xl font-extrabold mb-1">24/7</div>
                    <div className="text-sm text-white/80">
                      {locale === "ar" ? "خدمة متاحة طوال أيام الأسبوع" : "Service available all week"}
                    </div>
                  </div>
                </div>

                {/* Floating chips */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 -right-4 px-4 py-2 rounded-2xl bg-white text-primary-700 shadow-card-hover text-sm font-bold"
                >
                  {locale === "ar" ? "⚡ حجز سريع" : "⚡ Quick Booking"}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-4 -left-4 px-4 py-2 rounded-2xl bg-teal-400 text-white shadow-card-hover text-sm font-bold"
                >
                  {locale === "ar" ? "✓ معتمد طبياً" : "✓ Medically Certified"}
                </motion.div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
