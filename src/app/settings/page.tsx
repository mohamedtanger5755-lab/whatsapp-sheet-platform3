"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [instanceId, setInstanceId] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [sheetUrl, setSheetUrl] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setWhatsappNumber(data.settings.whatsappNumber || "");
          setInstanceId(data.settings.instanceId || "");
          setApiToken(data.settings.apiToken || "");
          setSheetUrl(data.settings.sheetUrl || "");
          setSellerPhone(data.settings.sellerPhone || "");
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [status]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whatsappNumber,
          instanceId,
          apiToken,
          sheetUrl,
          sellerPhone: sellerPhone || whatsappNumber,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "تم حفظ الإعدادات بنجاح" });
      } else {
        setMessage({ type: "error", text: data.error || "فشل الحفظ" });
      }
    } catch {
      setMessage({ type: "error", text: "حدث خطأ في الاتصال" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  if (status === "loading" || loading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <p className="text-slate-500">جاري التحميل...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="text-sm text-primary hover:underline mb-3 inline-block"
            >
              ← العودة إلى لوحة التحكم
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              الإعدادات
            </h1>
            <p className="text-slate-600">
              اربط رقم واتساب بزنس وجدول بيانات جوجل الخاص بك
            </p>
            {session?.user?.email && (
              <p className="text-xs text-slate-400 mt-1">
                مسجّل الدخول كـ: {session.user.email}
              </p>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* WhatsApp Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-1">
                إعدادات واتساب (Ultramsg)
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                ستحتاج إلى حساب في{" "}
                <a
                  href="https://ultramsg.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Ultramsg
                </a>
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    رقم واتساب بزنس (للإرسال)
                  </label>
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="مثال: 212612345678"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-green-100 outline-none transition-all text-slate-800"
                    dir="ltr"
                  />
                  <p className="text-xs text-slate-500 mt-1.5">
                    الرقم المرتبط في Ultramsg (بدون +)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Instance ID
                  </label>
                  <input
                    type="text"
                    value={instanceId}
                    onChange={(e) => setInstanceId(e.target.value)}
                    placeholder="instancexxxxx"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-green-100 outline-none transition-all text-slate-800"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Token
                  </label>
                  <input
                    type="password"
                    value={apiToken}
                    onChange={(e) => setApiToken(e.target.value)}
                    placeholder="رمز API من Ultramsg"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-green-100 outline-none transition-all text-slate-800"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    رقم استقبال الإشعارات (اختياري)
                  </label>
                  <input
                    type="text"
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value)}
                    placeholder="نفس رقم الواتساب أو رقم آخر"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-green-100 outline-none transition-all text-slate-800"
                    dir="ltr"
                  />
                  <p className="text-xs text-slate-500 mt-1.5">
                    الرقم الذي سيستقبل إشعار &quot;طلب جديد&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Google Sheet Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-1">
                جدول بيانات جوجل
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                الصق رابط جدول البيانات الذي تستقبل فيه الطلبات
              </p>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  رابط جدول البيانات
                </label>
                <input
                  type="url"
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-green-100 outline-none transition-all text-slate-800"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors disabled:opacity-60"
              >
                {saving ? "جاري الحفظ..." : "حفظ الإعدادات"}
              </button>
              {message && (
                <span
                  className={`text-sm font-medium ${
                    message.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {message.type === "success" ? "✓ " : "✗ "}
                  {message.text}
                </span>
              )}
            </div>
          </form>

          <div className="mt-8 bg-green-50 border border-green-100 rounded-xl p-5">
            <h3 className="font-semibold text-green-900 mb-1">الخطوة التالية</h3>
            <p className="text-sm text-green-800 mb-3">
              بعد حفظ الإعدادات، انتقل إلى دليل الاستخدام لنسخ السكربت وتثبيته
              داخل جدول بيانات جوجل.
            </p>
            <Link
              href="/guide"
              className="text-sm font-medium text-primary hover:underline"
            >
              الانتقال إلى دليل الاستخدام ←
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
