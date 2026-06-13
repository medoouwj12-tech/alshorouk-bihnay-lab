import { PrismaClient } from "@prisma/client";

const prisma = (globalThis as any).prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  (globalThis as any).prisma = prisma;
}

export async function getTests(params?: {
  query?: string;
  category?: string;
  featured?: boolean;
  take?: number;
}) {
  const { query, category, featured, take } = params || {};

  return prisma.test.findMany({
    where: {
      isActive: true,
      ...(featured && { isFeatured: true }),
      ...(category && {
        category: { slug: category },
      }),
      ...(query && {
        OR: [
          { nameAr: { contains: query, mode: "insensitive" } },
          { nameEn: { contains: query, mode: "insensitive" } },
          { code: { contains: query, mode: "insensitive" } },
        ],
      }),
    },
    include: {
      category: {
        select: { nameAr: true, nameEn: true, slug: true, icon: true },
      },
    },
    orderBy: [{ isFeatured: "desc" }, { nameAr: "asc" }],
    ...(take && { take }),
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      _count: { select: { tests: { where: { isActive: true } } } },
    },
  });
}

export async function getBranches() {
  return prisma.branch.findMany({
    where: { isActive: true },
    orderBy: [{ isMain: "desc" }, { order: "asc" }],
  });
}

export async function createHomeVisitRequest(data: {
  name: string;
  phone: string;
  address: string;
  city?: string;
  notes?: string;
  preferredDate: Date;
  preferredTime: string;
  tests: string[];
}) {
  return prisma.homeVisitRequest.create({
    data: {
      name: data.name,
      phone: data.phone,
      address: data.address,
      city: data.city,
      notes: data.notes,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      tests: {
        create: data.tests.map((testId) => ({ testId })),
      },
    },
    include: { tests: { include: { test: true } } },
  });
}

export async function getAllRequests() {
  return prisma.homeVisitRequest.findMany({
    include: { tests: { include: { test: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateRequestStatus(id: string, status: "PENDING" | "CONFIRMED" | "SAMPLE_COLLECTED" | "COMPLETED" | "CANCELLED") {
  return prisma.homeVisitRequest.update({
    where: { id },
    data: { status },
  });
}

export { prisma };
