import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">
              و
            </div>
            <span className="font-bold text-lg text-slate-800 hidden sm:inline">
              منصة الطلبات
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1 sm:gap-4">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              href="/guide"
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              دليل الاستخدام
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-primary transition-colors"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
            >
              ابدأ الآن
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
