/**
 * إرسال رسالة واتساب عبر Ultramsg
 * وثائق Ultramsg: https://docs.ultramsg.com/
 */
export async function sendWhatsAppMessage(
  to: string,
  body: string,
  instanceId?: string,
  token?: string
): Promise<{ success: boolean; error?: string }> {
  const instance = instanceId || process.env.ULTRAMSG_INSTANCE_ID;
  const apiToken = token || process.env.ULTRAMSG_TOKEN;

  if (!instance || !apiToken) {
    return { success: false, error: "إعدادات واتساب غير مكتملة" };
  }

  // تنظيف الرقم (إزالة + والمسافات)
  const cleanTo = to.replace(/[^0-9]/g, "");

  try {
    const url = `https://api.ultramsg.com/${instance}/messages/chat`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: apiToken,
        to: cleanTo,
        body: body,
      }),
    });

    const data = await response.json();

    if (data.sent === "true" || data.id) {
      return { success: true };
    }

    return {
      success: false,
      error: data.error || "فشل إرسال الرسالة",
    };
  } catch (err: any) {
    return { success: false, error: err.message || "خطأ في الاتصال" };
  }
}

/**
 * بناء رسالة تأكيد للعميل
 */
export function buildCustomerMessage(order: {
  name?: string;
  phone?: string;
  city?: string;
  address?: string;
  size?: string;
  color?: string;
  price?: string;
}): string {
  const lines = [
    "✅ *تم تأكيد طلبك بنجاح*",
    "",
  ];

  if (order.name) lines.push(`👤 الاسم: ${order.name}`);
  if (order.city) lines.push(`📍 المدينة: ${order.city}`);
  if (order.address) lines.push(`🏠 العنوان: ${order.address}`);
  if (order.size) lines.push(`📏 المقاس: ${order.size}`);
  if (order.color) lines.push(`🎨 اللون: ${order.color}`);
  if (order.price) lines.push(`💰 الثمن: ${order.price}`);
  if (order.phone) lines.push(`📱 الهاتف: ${order.phone}`);

  lines.push("");
  lines.push("شكراً لثقتكم بنا 🙏");
  lines.push("سنتواصل معكم قريباً لتأكيد التوصيل.");

  return lines.join("\n");
}

/**
 * بناء رسالة إشعار للتاجر
 */
export function buildSellerMessage(order: {
  name?: string;
  phone?: string;
  city?: string;
  address?: string;
  size?: string;
  color?: string;
  price?: string;
}): string {
  const lines = [
    "🔔 *طلب جديد وصل!*",
    "",
  ];

  if (order.name) lines.push(`👤 الاسم: ${order.name}`);
  if (order.phone) lines.push(`📱 الهاتف: ${order.phone}`);
  if (order.city) lines.push(`📍 المدينة: ${order.city}`);
  if (order.address) lines.push(`🏠 العنوان: ${order.address}`);
  if (order.size) lines.push(`📏 المقاس: ${order.size}`);
  if (order.color) lines.push(`🎨 اللون: ${order.color}`);
  if (order.price) lines.push(`💰 الثمن: ${order.price}`);

  lines.push("");
  lines.push("⏰ تم استلام الطلب الآن");

  return lines.join("\n");
}
