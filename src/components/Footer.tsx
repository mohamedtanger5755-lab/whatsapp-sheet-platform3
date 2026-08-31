export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">منصة الطلبات</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              منصة تساعد التجار على أتمتة إشعارات الطلبات عبر ربط جداول بيانات
              جوجل مع واتساب بزنس بسهولة.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="/guide" className="hover:text-white transition-colors">
                  دليل الاستخدام
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-white transition-colors">
                  تسجيل الدخول
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">تواصل معنا</h4>
            <p className="text-sm text-slate-400">
              للدعم والاستفسارات يمكنك التواصل معنا عبر البريد الإلكتروني.
            </p>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} منصة الطلبات. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
