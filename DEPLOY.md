# دليل نشر الموقع على Vercel

## المتطلبات قبل النشر

1. حساب في [GitHub](https://github.com) (مجاني)
2. حساب في [Vercel](https://vercel.com) (مجاني)
3. حساب في [Google Cloud Console](https://console.cloud.google.com)
4. حساب في [Ultramsg](https://ultramsg.com)

---

## الخطوة 1: رفع المشروع على GitHub

```bash
cd whatsapp-sheet-platform
git init
git add .
git commit -m "أول نسخة من منصة الطلبات"
```

ثم أنشئ مستودعاً جديداً على GitHub واربطه:

```bash
git remote add origin https://github.com/USERNAME/whatsapp-sheet-platform.git
git branch -M main
git push -u origin main
```

---

## الخطوة 2: إنشاء مشروع على Vercel

1. ادخل إلى [vercel.com](https://vercel.com) وسجّل الدخول بحساب GitHub
2. اضغط **Add New Project**
3. اختر المستودع `whatsapp-sheet-platform`
4. اضغط **Deploy** (سنضيف المتغيرات البيئية بعد أول نشر)

---

## الخطوة 3: إعداد متغيرات البيئة (Environment Variables)

في لوحة تحكم Vercel → مشروعك → **Settings → Environment Variables** أضف:

| الاسم | القيمة |
|------|--------|
| `GOOGLE_CLIENT_ID` | من Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | من Google Cloud Console |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | نص عشوائي طويل (يمكن توليده من: `openssl rand -base64 32`) |
| `ULTRAMSG_INSTANCE_ID` | من Ultramsg |
| `ULTRAMSG_TOKEN` | من Ultramsg |

بعد إضافة المتغيرات اضغط **Redeploy**.

---

## الخطوة 4: تحديث Google OAuth

1. ادخل إلى Google Cloud Console → Credentials
2. عدّل OAuth 2.0 Client
3. أضف في **Authorized redirect URIs**:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```
4. أضف أيضاً في **Authorized JavaScript origins**:
   ```
   https://your-app.vercel.app
   ```

---

## الخطوة 5: تحديث السكربت في Google Sheet

بعد النشر، غيّر في السكربت:

```javascript
const WEBHOOK_URL = "https://your-app.vercel.app/api/webhook";
```

---

## ملاحظات هامة حول قاعدة البيانات

حالياً التخزين يتم في ملف محلي (`data/settings.json`).  
هذا **يعمل محلياً** فقط.

على Vercel الملفات مؤقتة (تُحذف عند كل نشر جديد).

### للإنتاج يُفضّل استخدام إحدى هذه الخيارات:

### الخيار أ: Supabase (موصى به - مجاني)

1. أنشئ مشروعاً على [supabase.com](https://supabase.com)
2. أنشئ جدولاً:

```sql
create table user_settings (
  user_id text primary key,
  email text,
  whatsapp_number text,
  api_token text,
  instance_id text,
  sheet_url text,
  seller_phone text,
  updated_at timestamptz default now()
);
```

3. أضف إلى Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - أو `SUPABASE_SERVICE_ROLE_KEY`

4. استبدل محتوى `src/lib/store.ts` بكود Supabase.

### الخيار ب: Vercel Postgres / Neon

يمكنك ربط قاعدة Postgres مجانية من لوحة Vercel مباشرة.

---

## اختبار بعد النشر

1. افتح `https://your-app.vercel.app`
2. سجّل الدخول بـ Google
3. ادخل الإعدادات واحفظ رقم واتساب + Sheet
4. ثبت السكربت في Google Sheet مع رابط الـ Webhook الجديد
5. أضف صفاً تجريبياً في الجدول → يجب أن تصلك رسالة واتساب
