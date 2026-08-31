import { NextRequest, NextResponse } from "next/server";
import {
  sendWhatsAppMessage,
  buildCustomerMessage,
  buildSellerMessage,
} from "@/lib/whatsapp";

/**
 * Webhook يستقبل الطلبات من Google Apps Script
 * POST /api/webhook
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      city,
      address,
      size,
      color,
      price,
      sellerPhone,
      // يمكن إرسال بيانات Ultramsg الخاصة بالبائع من السكربت (اختياري)
      instanceId,
      token,
    } = body;

    if (!phone) {
      return NextResponse.json(
        { success: false, error: "رقم هاتف العميل مطلوب" },
        { status: 400 }
      );
    }

    const order = { name, phone, city, address, size, color, price };

    // 1. رسالة تأكيد للعميل
    const customerMsg = buildCustomerMessage(order);
    const customerResult = await sendWhatsAppMessage(
      phone,
      customerMsg,
      instanceId,
      token
    );

    // 2. إشعار للتاجر
    let sellerResult = { success: true as boolean, error?: string };
    if (sellerPhone) {
      const sellerMsg = buildSellerMessage(order);
      sellerResult = await sendWhatsAppMessage(
        sellerPhone,
        sellerMsg,
        instanceId,
        token
      );
    }

    return NextResponse.json({
      success: true,
      customer: customerResult,
      seller: sellerResult,
    });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "خطأ في السيرفر" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Webhook جاهز لاستقبال الطلبات",
  });
}
