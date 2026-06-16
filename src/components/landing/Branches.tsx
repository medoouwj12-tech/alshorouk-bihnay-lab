"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ExternalLink, MessageCircle, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BranchInfo {
  id: string;
  nameAr: string;
  nameEn: string;
  addressAr: string;
  addressEn: string;
  plusCode: string;
  phone: string;
  whatsapp: string;
  workingHoursAr: string;
  workingHoursEn: string;
  mapEmbedUrl: string;
  mapDirectionUrl: string;
  badgeAr?: string;
  badgeEn?: string;
}

const branchesData: BranchInfo[] = [
  {
    id: "bihnay",
    nameAr: "فرع بهناي (الفرع الرئيسي)",
    nameEn: "Bihnay Branch (Main)",
    addressAr: "بهناى 93V9+FGJ El-Bagour",
    addressEn: "Bihnay 93V9+FGJ El-Bagour",
    plusCode: "93V9+FGJ El-Bagour",
    phone: "+201063765052",
    whatsapp: "+201063765052",
    workingHoursAr: "السبت - الخميس: 9:00 ص - 10:00 م | الجمعة: 2:00 م - 10:00 م",
    workingHoursEn: "Sat - Thu: 9:00 AM - 10:00 PM | Fri: 2:00 PM - 10:00 PM",
    mapEmbedUrl: "https://maps.google.com/maps?q=93V9%2BFGJ%20El-Bagour&t=&z=16&ie=UTF8&iwloc=&output=embed",
    mapDirectionUrl: "https://maps.google.com/?q=93V9%2BFGJ%20El-Bagour",
    badgeAr: "الفرع الرئيسي",
    badgeEn: "Main Branch",
  },
  {
    id: "shanshour",
    nameAr: "فرع شنشور",
    nameEn: "Shanshour Branch",
    addressAr: "شنشور 9X3W+V6F، شارع شنشور الرئيسي، شارع داير الناحية, Ashmoun, Menofia Governorate 32859",
    addressEn: "Shanshour 9X3W+V6F, Main Shanshour St, Dayr Al-Nahya St, Ashmoun, Menofia Governorate 32859",
    plusCode: "9X3W+V6F Ashmoun",
    phone: "+201063765052",
    whatsapp: "+201063765052",
    workingHoursAr: "السبت - الخميس: 9:00 ص - 10:00 م | الجمعة: 2:00 م - 10:00 م",
    workingHoursEn: "Sat - Thu: 9:00 AM - 10:00 PM | Fri: 2:00 PM - 10:00 PM",
    mapEmbedUrl: "https://maps.google.com/maps?q=9X3W%2BV6F%20Ashmoun&t=&z=16&ie=UTF8&iwloc=&output=embed",
    mapDirectionUrl: "https://maps.google.com/?q=9X3W%2BV6F%20Ashmoun",
    badgeAr: "جديد",
    badgeEn: "New",
  },
];

interface BranchesProps {
  locale: "ar" | "en";
}

export function Branches({ locale }: BranchesProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopyPlusCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-16 md:py-20 bg-slate-50/50 dark:bg-slate-950/20" id="branches">
      <div className="container px-4">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 text-teal-700 dark:text-teal-400 text-xs font-semibold mb-4">
              <MapPin className="h-3.5 w-3.5" />
              {locale === "ar" ? "فروعنا ومواقعنا" : "Our Branches & Locations"}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
              {locale === "ar" ? "تفضل بزيارتنا في أقرب فرع لك" : "Visit Us at Our Nearest Branch"}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {locale === "ar"
                ? "مجهزون بأحدث الأجهزة والتقنيات الطبية لخدمتكم، مع توفير كامل سبل الراحة والدقة."
                : "Equipped with the latest medical technology to serve you, ensuring complete comfort and precision."}
            </p>
          </motion.div>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {branchesData.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="h-full overflow-hidden border border-border bg-card shadow-lg hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-800 transition-all duration-300 flex flex-col">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Map Container */}
                  <div className="relative w-full h-[320px] bg-slate-100 dark:bg-slate-900 border-b border-border group overflow-hidden">
                    <iframe
                      src={branch.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={locale === "ar" ? branch.nameAr : branch.nameEn}
                      className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    {branch.badgeAr && (
                      <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-bold bg-primary-600 text-white shadow-soft">
                        {locale === "ar" ? branch.badgeAr : branch.badgeEn}
                      </span>
                    )}
                  </div>

                  {/* Details Container */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                      {locale === "ar" ? branch.nameAr : branch.nameEn}
                    </h3>

                    {/* Information List */}
                    <div className="space-y-4 mb-6 flex-grow">
                      <div className="flex items-start gap-3.5">
                        <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-1 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {locale === "ar" ? "العنوان" : "Address"}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                            {locale === "ar" ? branch.addressAr : branch.addressEn}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5">
                        <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-1 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {locale === "ar" ? "مواعيد العمل" : "Working Hours"}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                            {locale === "ar" ? branch.workingHoursAr : branch.workingHoursEn}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5">
                        <Phone className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-1 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {locale === "ar" ? "رقم الهاتف" : "Phone Number"}
                          </p>
                          <a
                            href={`tel:${branch.phone}`}
                            className="text-sm text-primary-600 hover:underline mt-0.5 block font-semibold"
                            dir="ltr"
                          >
                            {branch.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Actions Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
                      <Button asChild variant="outline" className="w-full justify-center gap-2">
                        <a href={branch.mapDirectionUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          {locale === "ar" ? "الاتجاهات على الخريطة" : "Get Directions"}
                        </a>
                      </Button>

                      <Button
                        variant="ghost"
                        onClick={() => handleCopyPlusCode(branch.plusCode, branch.id)}
                        className="w-full justify-center gap-2 border border-dashed border-border hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        {copiedId === branch.id ? (
                          <>
                            <Check className="h-4 w-4 text-emerald-500" />
                            <span className="text-emerald-500">
                              {locale === "ar" ? "تم النسخ!" : "Copied!"}
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>
                              {locale === "ar" ? "نسخ الرمز الرقمي" : "Copy Plus Code"}
                            </span>
                          </>
                        )}
                      </Button>

                      <Button asChild variant="whatsapp" className="w-full sm:col-span-2 justify-center gap-2">
                        <a
                          href={`https://wa.me/${branch.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-4 w-4" />
                          {locale === "ar" ? "تواصل عبر واتساب" : "Contact via WhatsApp"}
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
