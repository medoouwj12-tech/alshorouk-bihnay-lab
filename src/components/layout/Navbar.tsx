"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Home, FlaskConical, Truck, FileSearch, Phone, Globe } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface NavbarProps {
  locale: "ar" | "en";
  labels: {
    home: string;
    tests: string;
    homeVisit: string;
    results: string;
    about: string;
    contact: string;
  };
}

export function Navbar({ locale, labels }: NavbarProps) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { href: "/", label: labels.home, icon: Home },
    { href: "/tests", label: labels.tests, icon: FlaskConical },
    { href: "/home-visit", label: labels.homeVisit, icon: Truck },
    { href: "/results", label: labels.results, icon: FileSearch },
    { href: "/about", label: labels.about, icon: Phone },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md shadow-soft border-b border-border/60"
          : "bg-background/60 backdrop-blur-sm"
      )}
    >
      <nav className="container flex h-16 items-center justify-between" aria-label="Primary">
        {/* Logo */}
        <Link href="/" aria-label="الصفحة الرئيسية - معمل الشروق بهناي وشنشور" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors",
                    isActive(link.href)
                      ? "text-primary-700 bg-primary-50"
                      : "text-foreground/75 hover:text-primary-700 hover:bg-primary-50/50"
                  )}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link
            href={`/${locale === "ar" ? "en" : "ar"}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/70 hover:text-primary-700 px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors"
            aria-label="Switch language"
          >
            <Globe className="h-4 w-4" />
            {locale === "ar" ? "EN" : "عربي"}
          </Link>

          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/home-visit">{labels.homeVisit}</Link>
          </Button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg text-foreground hover:bg-primary-50 transition-colors"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden border-t border-border bg-card overflow-hidden"
          >
            <ul className="container py-3 space-y-1">
              {links.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: locale === "ar" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors",
                        isActive(link.href)
                          ? "text-primary-700 bg-primary-50"
                          : "text-foreground/80 hover:bg-primary-50/50"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
              <li className="pt-2">
                <Button asChild className="w-full">
                  <Link href="/home-visit">{labels.homeVisit}</Link>
                </Button>
              </li>
              <li>
                <Link
                  href={`/${locale === "ar" ? "en" : "ar"}`}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-foreground/70"
                >
                  <Globe className="h-4 w-4" />
                  {locale === "ar" ? "English" : "عربي"}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
