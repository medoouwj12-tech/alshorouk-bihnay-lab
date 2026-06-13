import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const tests = await prisma.test.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(tests);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tests" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const slug = body.nameEn?.toLowerCase().replace(/\s+/g, "-") || body.nameAr;
    
    const test = await prisma.test.create({
      data: {
        nameAr: body.nameAr,
        nameEn: body.nameEn || body.nameAr,
        code: body.code,
        slug,
        price: parseFloat(body.price),
        description: body.description,
        turnaroundTime: body.turnaroundTime,
        sampleType: body.sampleType,
        preparation: body.preparation,
        categoryId: body.categoryId,
        isFeatured: body.isFeatured || false,
      },
    });
    
    return NextResponse.json(test, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create test" }, { status: 500 });
  }
}
