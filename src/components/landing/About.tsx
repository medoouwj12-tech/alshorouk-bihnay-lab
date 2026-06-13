"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Home as HomeIcon, Award, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AboutProps {
  locale: "ar" | "en";
  content: {
    title: string;
    subtitle: string;
    paragraph1: string;
    paragraph2: string;
    features: {
      accuracy: { title: string; description: string };
      fast: { title: string; description: string };
      home: { title: string; description: string };
      trust: { title: string; description: string };
    };
  };
}

const featureIcons = {
  accuracy: ShieldCheck,
  fast: Zap,
  home: HomeIcon,
  trust: Award,
};

const featureKeys = ["accuracy", "fast", "home", "trust"] as const;

export function About({ locale, content }: AboutProps) {
  return (
    <section
      className="py-16 md:py-20 bg-slate-50/50"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: locale === "ar" ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold mb-4">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {locale === "ar" ? "من نحن" : "About Us"}
            </div>

            <h2
              id="about-heading"
              className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-3 text-balance"
            >
              {content.title}
            </h2>
            <p className="text-lg text-primary-600 font-semibold mb-6">
              {content.subtitle}
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{content.paragraph1}</p>
              <p>{content.paragraph2}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: locale === "ar" ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {featureKeys.map((key, i) => {
              const Icon = featureIcons[key];
              const feature = content.features[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                >
                  <Card className="h-full hover:border-primary-300 hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
                    <CardContent className="p-5">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary-50 to-teal-50 text-primary-600 flex items-center justify-center mb-3">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-foreground mb-1.5">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
