import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const settings = await prisma.seoSetting.findMany();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const setting = await prisma.seoSetting.upsert({
      where: { page: body.page },
      update: {
        titleAr: body.titleAr,
        titleEn: body.titleEn,
        descriptionAr: body.descriptionAr,
        descriptionEn: body.descriptionEn,
        keywords: body.keywords,
        ogImage: body.ogImage,
      },
      create: {
        page: body.page,
        titleAr: body.titleAr,
        titleEn: body.titleEn,
        descriptionAr: body.descriptionAr,
        descriptionEn: body.descriptionEn,
        keywords: body.keywords,
        ogImage: body.ogImage,
      },
    });
    return NextResponse.json(setting);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
