import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GuidePage() {
  const scriptCode = `/**
 * سكربت ربط Google Sheets مع منصة الطلبات
 * انسخ هذا الكود كاملاً والصقه في Apps Script
 */

// ← غيّر هذا الرابط بالرابط الذي ستحصل عليه بعد نشر الموقع
const WEBHOOK_URL = "https://YOUR-DOMAIN.com/api/webhook";

// ← ضع رقم واتساب التاجر هنا (بالصيغة الدولية بدون +)
const SELLER_PHONE = "212612345678";

function onEdit(e) {
  try {
    const sheet = e.source.getActiveSheet();
    const range = e.range;
    const row = range.getRow();

    // تجاهل صف العناوين
    if (row === 1) return;

    // قراءة بيانات الصف كاملاً
    const lastCol = sheet.getLastColumn();
    const data = sheet.getRange(row, 1, 1, lastCol).getValues()[0];

    // ——— عدّل أرقام الأعمدة حسب جدولك ———
    // العمود A = 0 ، B = 1 ، C = 2 ...
    const payload = {
      name:        String(data[0] || ""),   // A: الاسم
      phone:       String(data[1] || ""),   // B: رقم الهاتف
      city:        String(data[2] || ""),   // C: المدينة
      address:     String(data[3] || ""),   // D: العنوان
      size:        String(data[4] || ""),   // E: المقاس
      color:       String(data[5] || ""),   // F: اللون
      price:       String(data[6] || ""),   // G: الثمن
      sellerPhone: SELLER_PHONE
    };

    // لا ترسل إذا لم يكن هناك رقم هاتف
    if (!payload.phone) return;

    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    UrlFetchApp.fetch(WEBHOOK_URL, options);
  } catch (err) {
    console.error("خطأ في إرسال الطلب: " + err);
  }
}

/**
 * دالة اختبار يدوية (شغّلها من محرر Apps Script للتأكد)
 */
function testSend() {
  const testPayload = {
    name: "عميل تجريبي",
    phone: "212600000000",
    city: "الدار البيضاء",
    address: "حي تجريبي",
    size: "L",
    color: "أسود",
    price: "250 درهم",
    sellerPhone: SELLER_PHONE
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(testPayload),
    muteHttpExceptions: true
  };

  const res = UrlFetchApp.fetch(WEBHOOK_URL, options);
  Logger.log(res.getContentText());
}`;

  return (
    <>
      <Navbar />

      <main className="flex-1 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              دليل الاستخدام الكامل
            </h1>
            <p className="text-slate-600 leading-relaxed">
              اتبع هذه الخطوات بالترتيب لربط جدول بيانات جوجل مع واتساب
            </p>
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  1
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  إنشاء حساب وتسجيل الدخول
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                اضغط على زر &quot;ابدأ الآن&quot; وسجّل دخولك باستخدام حساب جوجل.
                سيتم إنشاء حسابك تلقائياً عند أول دخول.
              </p>
              <Link
                href="/login"
                className="inline-flex text-sm font-medium text-primary hover:underline"
              >
                الانتقال إلى صفحة الدخول ←
              </Link>
            </div>

            {/* Step 2 - Ultramsg */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  2
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  إنشاء حساب في خدمة Ultramsg (واتساب)
                </h2>
              </div>
              <ol className="list-decimal list-inside text-sm text-slate-600 space-y-2 mb-4">
                <li>
                  ادخل إلى{" "}
                  <a
                    href="https://ultramsg.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    ultramsg.com
                  </a>{" "}
                  وسجّل حساباً جديداً
                </li>
                <li>أنشئ Instance جديدة واربط رقم واتساب بزنس الخاص بك (عبر QR Code)</li>
                <li>
                  من لوحة التحكم انسخ:
                  <ul className="list-disc list-inside mr-5 mt-1 space-y-1">
                    <li>
                      <strong>Instance ID</strong>
                    </li>
                    <li>
                      <strong>Token</strong>
                    </li>
                  </ul>
                </li>
                <li>
                  ضع هذين القيمتين في ملف{" "}
                  <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">
                    .env
                  </code>{" "}
                  على السيرفر (أو في صفحة الإعدادات لاحقاً)
                </li>
              </ol>
              <div className="bg-slate-50 rounded-lg p-4 text-xs font-mono text-slate-700" dir="ltr">
                ULTRAMSG_INSTANCE_ID=instancexxxxx
                <br />
                ULTRAMSG_TOKEN=your_token_here
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  3
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  إعداد Google Cloud (لتسجيل الدخول)
                </h2>
              </div>
              <ol className="list-decimal list-inside text-sm text-slate-600 space-y-2">
                <li>
                  ادخل إلى{" "}
                  <a
                    href="https://console.cloud.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google Cloud Console
                  </a>
                </li>
                <li>أنشئ مشروعاً جديداً</li>
                <li>
                  اذهب إلى <strong>APIs &amp; Services → Credentials</strong>
                </li>
                <li>
                  أنشئ <strong>OAuth 2.0 Client ID</strong> من نوع Web application
                </li>
                <li>
                  أضف في Authorized redirect URIs:
                  <br />
                  <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs" dir="ltr">
                    http://localhost:3000/api/auth/callback/google
                  </code>
                </li>
                <li>
                  انسخ Client ID و Client Secret وضعهما في ملف{" "}
                  <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">
                    .env
                  </code>
                </li>
              </ol>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  4
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  تثبيت السكربت داخل جدول بيانات جوجل
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                1. افتح جدول بيانات جوجل الخاص بك
                <br />
                2. من القائمة: <strong>الإضافات ← Apps Script</strong>
                <br />
                3. احذف أي كود موجود والصق الكود التالي كاملاً:
              </p>

              <div className="relative mb-4">
                <pre
                  className="bg-slate-900 text-slate-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed max-h-96"
                  dir="ltr"
                >
                  <code>{scriptCode}</code>
                </pre>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                4. غيّر <code className="bg-slate-100 px-1 rounded text-xs">WEBHOOK_URL</code> و{" "}
                <code className="bg-slate-100 px-1 rounded text-xs">SELLER_PHONE</code>
                <br />
                5. احفظ السكربت (Ctrl+S)
                <br />
                6. من محرر Apps Script شغّل دالة <code className="bg-slate-100 px-1 rounded text-xs">testSend</code> مرة واحدة للموافقة على الصلاحيات
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  5
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  اختبار النظام
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                أضف صفاً جديداً في جدول البيانات (طلب تجريبي يحتوي على رقم هاتف
                حقيقي). يجب أن تصلك رسالة على واتساب، ويصل إشعار تأكيد للعميل
                أيضاً.
              </p>
            </div>
          </div>

          {/* Important note */}
          <div className="mt-10 bg-green-50 border border-green-100 rounded-xl p-5">
            <h3 className="font-semibold text-green-900 mb-1">ملخص ما تم إنجازه</h3>
            <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
              <li>واجهة الموقع كاملة بالعربية</li>
              <li>تسجيل الدخول بـ Google (NextAuth)</li>
              <li>Webhook جاهز لاستقبال الطلبات</li>
              <li>دوال إرسال واتساب عبر Ultramsg</li>
              <li>سكربت Google Apps Script جاهز للنسخ</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
