import { NextRequest, NextResponse } from "next/server";
import { createHomeVisitRequest } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Basic validation
    if (!body.name || !body.phone || !body.address || !body.preferredDate || !body.preferredTime) {
      return NextResponse.json(
        { error: "بيانات مطلوبة ناقصة" },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.tests) || body.tests.length === 0) {
      return NextResponse.json(
        { error: "يجب اختيار تحليل واحد على الأقل" },
        { status: 400 }
      );
    }

    const request = await createHomeVisitRequest({
      name: body.name,
      phone: body.phone,
      address: body.address,
      city: body.city,
      notes: body.notes,
      preferredDate: new Date(body.preferredDate),
      preferredTime: body.preferredTime,
      tests: body.tests,
    });

    return NextResponse.json({ success: true, id: request.id }, { status: 201 });
  } catch (error) {
    console.error("Home visit request error:", error);
    return NextResponse.json(
      { error: "حدث خطأ في معالجة الطلب" },
      { status: 500 }
    );
  }
}
