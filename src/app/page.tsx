import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-green-50 to-white py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              أتمتة الطلبات بسهولة
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              اربط طلبات{" "}
              <span className="text-primary">جداول بيانات جوجل</span>
              <br />
              مع <span className="text-primary">واتساب</span> تلقائياً
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              منصة تساعدك على إرسال رسائل تأكيد الطلبات للعملاء وإشعارات
              للتجار فور وصول طلب جديد إلى جدول بيانات جوجل الخاص بك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-lg shadow-green-200 transition-all"
              >
                ابدأ مجاناً الآن
              </Link>
              <Link
                href="/guide"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-all"
              >
                كيف يعمل النظام؟
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                كيف تعمل المنصة؟
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                ثلاث خطوات بسيطة لبدء استقبال الطلبات وإرسال الإشعارات تلقائياً
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 text-primary rounded-xl flex items-center justify-center text-xl font-bold mb-5">
                  1
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  سجّل وربط حسابك
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  قم بتسجيل الدخول باستخدام حساب جوجل، ثم أدخل رقم واتساب بزنس
                  الخاص بك ورابط جدول بيانات جوجل.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 text-primary rounded-xl flex items-center justify-center text-xl font-bold mb-5">
                  2
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  ثبّت السكربت
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  انسخ السكربت الجاهز وضعه داخل جدول بيانات جوجل الخاص بك.
                  سيقوم بإرسال الطلبات الجديدة تلقائياً إلى المنصة.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 text-primary rounded-xl flex items-center justify-center text-xl font-bold mb-5">
                  3
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  استقبل الإشعارات
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  عند وصول طلب جديد، يتلقى العميل رسالة تأكيد على واتساب،
                  وتتلقى أنت إشعاراً فورياً بالطلب الجديد.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                لماذا تستخدم منصتنا؟
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "توفير الوقت",
                  desc: "لا حاجة لإرسال الرسائل يدوياً لكل طلب جديد",
                  icon: "⏱️",
                },
                {
                  title: "تقليل الأخطاء",
                  desc: "الرسائل تُرسل تلقائياً بنفس التنسيق في كل مرة",
                  icon: "✅",
                },
                {
                  title: "تجربة أفضل للعميل",
                  desc: "العميل يتلقى تأكيداً فورياً لطلبه على واتساب",
                  icon: "💬",
                },
                {
                  title: "سهولة الاستخدام",
                  desc: "لا تحتاج معرفة تقنية متقدمة للبدء",
                  icon: "🚀",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 border border-slate-100 text-center"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-primary">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              جاهز لأتمتة طلباتك؟
            </h2>
            <p className="text-green-100 mb-8 text-lg">
              ابدأ الآن مجاناً واربط جدول بياناتك مع واتساب في دقائق
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-primary bg-white hover:bg-green-50 rounded-xl transition-colors"
            >
              إنشاء حساب مجاني
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
