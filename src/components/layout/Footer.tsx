import * as React from "react";
import Link from "next/link";
import { Phone, MapPin, Mail, Clock, Facebook, Instagram, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";

interface FooterProps {
  locale: "ar" | "en";
  labels: {
    tagline: string;
    quickLinks: string;
    services: string;
    contact: string;
    rights: string;
    workingHours: string;
  };
  nav: {
    home: string;
    tests: string;
    homeVisit: string;
    results: string;
    about: string;
    contact: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    city: string;
  };
}

export function Footer({ locale, labels, nav, contact }: FooterProps) {
  const year = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`;

  const quickLinks = [
    { href: "/", label: nav.home },
    { href: "/tests", label: nav.tests },
    { href: "/home-visit", label: nav.homeVisit },
    { href: "/results", label: nav.results },
    { href: "/about", label: nav.about },
  ];

  const services = [
    { href: "/tests?category=hematology", labelAr: "تحاليل الدم", labelEn: "Hematology" },
    { href: "/tests?category=chemistry", labelAr: "الكيمياء", labelEn: "Chemistry" },
    { href: "/tests?category=hormones", labelAr: "الهرمونات", labelEn: "Hormones" },
    { href: "/tests?category=pcr", labelAr: "تحاليل PCR", labelEn: "PCR Tests" },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-950/40 border-t border-border mt-20" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {labels.tagline}
              </p>
              <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mt-1.5">
                {locale === "ar" ? "تحت إشراف د. أحمد فهيم الجمال" : "Under supervision of Dr. Ahmed Fahim Al-Jamal"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`https://facebook.com/alshorouk.lab`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 inline-flex items-center justify-center rounded-lg bg-card border border-border text-muted-foreground hover:text-primary-600 hover:border-primary-300 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`https://instagram.com/alshorouk.lab`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 inline-flex items-center justify-center rounded-lg bg-card border border-border text-muted-foreground hover:text-primary-600 hover:border-primary-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 inline-flex items-center justify-center rounded-lg bg-card border border-border text-muted-foreground hover:text-[#25D366] hover:border-[#25D366]/30 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              {labels.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              {labels.services}
            </h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-muted-foreground hover:text-primary-600 transition-colors"
                  >
                    {locale === "ar" ? s.labelAr : s.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              {labels.contact}
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                <span>
                  {contact.address}<br />
                  {contact.city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary-600 shrink-0" />
                <a
                  href={`tel:${contact.phone}`}
                  className="hover:text-primary-600 transition-colors"
                  dir="ltr"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary-600 shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-primary-600 transition-colors"
                  dir="ltr"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                <span>
                  {locale === "ar" ? "السبت - الخميس: 9 ص - 10 م" : "Sat - Thu: 9 AM - 10 PM"}
                  <br />
                  {locale === "ar" ? "الجمعة: 2 م - 10 م" : "Fri: 2 PM - 10 PM"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            © {year} {locale === "ar" ? "معمل الشروق بهناي وشنشور" : "Al-Shorouk Bihnay & Shanshour Lab"}.{" "}
            {labels.rights}.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
            {locale === "ar" ? "المعمل يعمل الآن" : "Lab is open now"}
          </p>
        </div>
      </div>
    </footer>
  );
}
