import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              لوحة التحكم
            </h1>
            <p className="text-slate-600">
              مرحباً بك. من هنا يمكنك إدارة ربط واتساب وجداول البيانات.
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="text-sm text-slate-500 mb-1">حالة الربط</div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-full"></span>
                <span className="font-semibold text-slate-800">غير مكتمل</span>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="text-sm text-slate-500 mb-1">الطلبات اليوم</div>
              <div className="font-semibold text-slate-800 text-xl">0</div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="text-sm text-slate-500 mb-1">الرسائل المرسلة</div>
              <div className="font-semibold text-slate-800 text-xl">0</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-5">
              الخطوات المطلوبة
            </h2>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-green-100 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">
                    ربط رقم واتساب بزنس
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    أدخل رقم واتساب بزنس الخاص بك ومفتاح واجهة البرمجة من مزود
                    الخدمة.
                  </p>
                  <Link
                    href="/settings"
                    className="inline-flex text-sm font-medium text-primary hover:underline"
                  >
                    الذهاب إلى الإعدادات ←
                  </Link>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-green-100 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">
                    ربط جدول بيانات جوجل
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    أضف رابط جدول البيانات الذي تستقبل فيه الطلبات.
                  </p>
                  <Link
                    href="/settings"
                    className="inline-flex text-sm font-medium text-primary hover:underline"
                  >
                    الذهاب إلى الإعدادات ←
                  </Link>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-green-100 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">
                    تثبيت السكربت
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    انسخ السكربت وضعه داخل جدول بيانات جوجل لتفعيل الإرسال
                    التلقائي.
                  </p>
                  <Link
                    href="/guide"
                    className="inline-flex text-sm font-medium text-primary hover:underline"
                  >
                    عرض الدليل ←
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity (placeholder) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-5">
              آخر النشاطات
            </h2>
            <div className="text-center py-10 text-slate-500">
              <p className="text-sm">لا توجد نشاطات بعد</p>
              <p className="text-xs mt-1">
                ستظهر هنا الطلبات والرسائل بعد تفعيل الربط
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
