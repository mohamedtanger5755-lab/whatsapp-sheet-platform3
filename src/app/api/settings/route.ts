import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSettings, saveSettings } from "@/lib/store";

/**
 * GET /api/settings  → جلب إعدادات المستخدم الحالي
 */
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const userId = (session.user as any).id || session.user.email || "";
  if (!userId) {
    return NextResponse.json({ error: "معرف المستخدم غير موجود" }, { status: 400 });
  }

  const settings = await getSettings(userId);
  return NextResponse.json({ settings });
}

/**
 * POST /api/settings  → حفظ إعدادات المستخدم
 */
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const userId = (session.user as any).id || session.user.email || "";
  if (!userId) {
    return NextResponse.json({ error: "معرف المستخدم غير موجود" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { whatsappNumber, apiToken, instanceId, sheetUrl, sellerPhone } = body;

    const settings = await saveSettings(userId, {
      email: session.user.email || undefined,
      whatsappNumber: whatsappNumber || "",
      apiToken: apiToken || "",
      instanceId: instanceId || "",
      sheetUrl: sheetUrl || "",
      sellerPhone: sellerPhone || whatsappNumber || "",
    });

    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "فشل الحفظ" },
      { status: 500 }
    );
  }
}
