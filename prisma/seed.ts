import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "hematology" },
      update: {},
      create: {
        nameAr: "تحاليل الدم",
        nameEn: "Hematology",
        slug: "hematology",
        icon: "Droplet",
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: "chemistry" },
      update: {},
      create: {
        nameAr: "الكيمياء الإكلينيكية",
        nameEn: "Clinical Chemistry",
        slug: "chemistry",
        icon: "Beaker",
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: "hormones" },
      update: {},
      create: {
        nameAr: "الهرمونات",
        nameEn: "Hormones",
        slug: "hormones",
        icon: "Activity",
        order: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: "pcr" },
      update: {},
      create: {
        nameAr: "تحاليل PCR",
        nameEn: "PCR & Molecular",
        slug: "pcr",
        icon: "Microscope",
        order: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: "microbiology" },
      update: {},
      create: {
        nameAr: "الميكروبيولوجيا",
        nameEn: "Microbiology",
        slug: "microbiology",
        icon: "Bug",
        order: 5,
      },
    }),
    prisma.category.upsert({
      where: { slug: "immunology" },
      update: {},
      create: {
        nameAr: "المناعة",
        nameEn: "Immunology",
        slug: "immunology",
        icon: "Shield",
        order: 6,
      },
    }),
  ]);

  // Tests (samples)
  const tests = [
    { nameAr: "صورة دم كاملة", nameEn: "Complete Blood Count", code: "CBC", categoryId: categories[0].id, price: 80, turnaroundTime: "نفس اليوم" },
    { nameAr: "معدل ترسيب كرات الدم الحمراء", nameEn: "ESR", code: "ESR", categoryId: categories[0].id, price: 40, turnaroundTime: "نفس اليوم" },
    { nameAr: "وظائف كبد", nameEn: "Liver Function Test", code: "LFT", categoryId: categories[1].id, price: 150, turnaroundTime: "24 ساعة" },
    { nameAr: "وظائف كلى", nameEn: "Kidney Function Test", code: "KFT", categoryId: categories[1].id, price: 120, turnaroundTime: "24 ساعة" },
    { nameAr: "سكر صائم", nameEn: "Fasting Blood Sugar", code: "FBS", categoryId: categories[1].id, price: 30, turnaroundTime: "نفس اليوم" },
    { nameAr: "سكر تراكمي", nameEn: "HbA1c", code: "HbA1c", categoryId: categories[1].id, price: 100, turnaroundTime: "24 ساعة" },
    { nameAr: "هرمون الغدة الدرقية TSH", nameEn: "TSH", code: "TSH", categoryId: categories[2].id, price: 90, turnaroundTime: "24 ساعة" },
    { nameAr: "هرمونات الغدة الدرقية الكاملة", nameEn: "Thyroid Panel", code: "TFT", categoryId: categories[2].id, price: 250, turnaroundTime: "24 ساعة" },
    { nameAr: "كورتيزول", nameEn: "Cortisol", code: "COR", categoryId: categories[2].id, price: 180, turnaroundTime: "48 ساعة" },
    { nameAr: "PCR كورونا", nameEn: "COVID-19 PCR", code: "PCR-COV", categoryId: categories[3].id, price: 350, turnaroundTime: "24 ساعة" },
  ];

  for (const test of tests) {
    const slug = test.nameEn.toLowerCase().replace(/\s+/g, "-");
    await prisma.test.upsert({
      where: { code: test.code },
      update: {},
      create: { ...test, slug, isFeatured: true },
    });
  }

  // Branches
  await prisma.branch.upsert({
    where: { id: "main-branch" },
    update: {},
    create: {
      id: "main-branch",
      name: "الفرع الرئيسي - بهناي",
      address: "بهناى 93V9+FGJ El-Bagour",
      city: "بهناي، المنوفية",
      phone: SITE_CONFIG_phone(),
      whatsapp: SITE_CONFIG_whatsapp(),
      workingHours: "السبت - الخميس: 9 ص - 10 م | الجمعة: 2 م - 10 م",
      mapLink: "https://maps.google.com/?q=93V9%2BFGJ%20El-Bagour",
      isMain: true,
      order: 1,
    },
  });

  await prisma.branch.upsert({
    where: { id: "shanshour-branch" },
    update: {},
    create: {
      id: "shanshour-branch",
      name: "فرع شنشور",
      address: "شنشور 9X3W+V6F، شارع شنشور الرئيسي، شارع داير الناحية",
      city: "شنشور، المنوفية",
      phone: SITE_CONFIG_phone(),
      whatsapp: SITE_CONFIG_whatsapp(),
      workingHours: "السبت - الخميس: 9 ص - 10 م | الجمعة: 2 م - 10 م",
      mapLink: "https://maps.google.com/?q=9X3W%2BV6F%20Ashmoun",
      isMain: false,
      order: 2,
    },
  });

  // SEO Settings
  await prisma.seoSetting.upsert({
    where: { page: "home" },
    update: {},
    create: {
      page: "home",
      titleAr: "معمل الشروق بهناي وشنشور - دقة وثقة في نتائجك الطبية",
      titleEn: "Al-Shorouk Bihnay & Shanshour Lab - Precision and Trust",
      descriptionAr: "معمل الشروق بهناي وشنشور - أفضل معمل تحاليل طبية في بهناي وشنشور والمنوفية. تحاليل شاملة، سحب عينات من المنزل، ونتائج دقيقة معتمدة.",
      descriptionEn: "Al-Shorouk Bihnay & Shanshour Lab - The best medical lab in Bihnay and Shanshour, Menoufia. Comprehensive tests, home sample collection, certified accurate results.",
      keywords: "معمل الشروق, معمل بهناي, معمل شنشور, تحاليل طبية, سحب من المنزل",
    },
  });

  console.log("✅ Seeding complete");
}

function SITE_CONFIG_phone() {
  return process.env.NEXT_PUBLIC_LAB_PHONE || "+201234567890";
}
function SITE_CONFIG_whatsapp() {
  return process.env.NEXT_PUBLIC_LAB_WHATSAPP || "+201234567890";
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
