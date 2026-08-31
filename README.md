# منصة ربط الطلبات (واتساب + Google Sheets)

منصة تساعد التجار على أتمتة إشعارات الطلبات عبر ربط جداول بيانات جوجل مع واتساب بزنس.

## المميزات

- تسجيل دخول بـ Google
- ربط رقم واتساب بزنس + جدول بيانات جوجل
- إرسال رسالة تأكيد تلقائية للعميل عند كل طلب جديد
- إشعار فوري للتاجر عند وصول طلب جديد
- واجهة كاملة بالعربية الفصحى

## التشغيل المحلي

### 1. تثبيت الحزم

```bash
cd whatsapp-sheet-platform
npm install
```

### 2. إعداد ملف البيئة

انسخ الملف `.env.example` إلى `.env` واملأ القيم:

```bash
cp .env.example .env
```

القيم المطلوبة:
- `GOOGLE_CLIENT_ID` و `GOOGLE_CLIENT_SECRET` من Google Cloud Console
- `NEXTAUTH_SECRET` (أي نص عشوائي طويل)
- `ULTRAMSG_INSTANCE_ID` و `ULTRAMSG_TOKEN` من ultramsg.com

### 3. تشغيل المشروع

```bash
npm run dev
```

افتح: [http://localhost:3000](http://localhost:3000)

## هيكل المشروع

```
src/
├── app/
│   ├── page.tsx              # الصفحة الرئيسية
│   ├── login/page.tsx        # تسجيل الدخول
│   ├── dashboard/page.tsx    # لوحة التحكم
│   ├── settings/page.tsx     # ربط واتساب + Sheet
│   ├── guide/page.tsx        # دليل الاستخدام + السكربت
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       └── webhook/route.ts  # استقبال الطلبات من Google Sheet
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── Providers.tsx
└── lib/
    └── whatsapp.ts           # دوال إرسال واتساب (Ultramsg)
```

## كيف يعمل النظام

1. العميل يملأ طلباً → يُحفظ في Google Sheet
2. Google Apps Script يكتشف الصف الجديد ويرسله إلى `/api/webhook`
3. السيرفر يرسل:
   - رسالة تأكيد للعميل على واتساب
   - إشعار للتاجر على واتساب

## الخدمة المستخدمة للواتساب

[Ultramsg](https://ultramsg.com) — سهلة الاستخدام وسعرها مناسب للبداية.

## قاعدة البيانات

حالياً يتم حفظ إعدادات كل بائع في ملف محلي (`data/settings.json`) مرتبط بحساب Google الخاص به.

- كل مستخدم يحفظ: رقم الواتساب، Instance ID، Token، رابط Google Sheet
- في الإنتاج على Vercel يُفضّل الانتقال إلى **Supabase** (راجع ملف `DEPLOY.md`)

## النشر

راجع الملف **[DEPLOY.md](./DEPLOY.md)** لشرح مفصل خطوة بخطوة لنشر الموقع على Vercel.
