# Bright Education School

O‘quv markazi uchun React + Vite asosidagi responsiv veb-sayt.

## Ishga tushirish

```bash
npm install
npm run dev
```

Production oldidan to‘liq tekshiruv:

```bash
npm run check
```

## Telegram bot orqali ariza qabul qilish

Loyihada server tomondagi `/api/contact` endpoint tayyor. BotFather orqali bot yarating, botni kerakli guruhga qo‘shing va `.env.local` faylida quyidagilarni yozing:

```env
TELEGRAM_BOT_TOKEN=bot_token
TELEGRAM_CHAT_ID=-1001234567890
```

Bot tokenini `VITE_` bilan boshlamang: bunday qiymat brauzer kodida ochilib qoladi. Lokal ishlab chiqishda `npm run dev` Vite bilan birga Contact va Mandat API middleware’larini ham ishga tushiradi. Vercel deployda esa `api/` ichidagi server funksiyalari ishlaydi. Endpoint spamga qarshi yashirin maydon, validatsiya va so‘rov chekloviga ega.

## Haftalik mock test natijalari

Namunaviy mock natijalari `api/_data/mandates.js` ichida turadi. Supabase ulanganda adminlar `/admin` panelidagi “Haftalik mock natijalari” bo‘limidan to‘liq ism-familiya, to‘g‘ri javoblar, jami savollar, yo‘nalish, guruh va shanba sanasini kiritadi. Public `/mandate` sahifasi natijalarni to‘liq ism-familiyaning aniq mosligi bo‘yicha ko‘rsatadi. Haqiqiy natijalar Supabase’dagi `mock_results` jadvalida saqlanadi.

## Brauzer push-bildirishnomalari

Yangiliklar bo‘limidagi tugma orqali foydalanuvchi push-bildirishnomaga obuna bo‘ladi. Admin panelda yangi `id` bilan yangilik birinchi marta saqlanganda barcha faol obunachilarga xabar yuboriladi; mavjud yangilikni tahrirlash takroriy push yubormaydi.

1. `supabase/schema.sql` faylini SQL Editor’da qayta ishga tushirib, `push_subscriptions` jadvalini yarating.
2. Bir marta `npm run push:keys` buyrug‘ini bajarib VAPID kalitlarini yarating.
3. `.env.local` va Vercel Environment Variables ichiga quyidagilarni kiriting:

```env
VITE_VAPID_PUBLIC_KEY=public_key
VAPID_PRIVATE_KEY=private_key
VAPID_SUBJECT=mailto:admin@your-domain.uz
```

VAPID private kalitini hech qachon `VITE_` bilan boshlamang. Push API productionda HTTPS talab qiladi. Kompyuterdagi `localhost` xavfsiz kontekst hisoblanadi, lekin telefonda oddiy `http://192.168...` IP manzil orqali push ishlamaydi.

## Administrator ma’lumotlari

`/contact` sahifasidagi admin ismi va telefonlari `.env` orqali beriladi. Kerakli kalitlar `.env.example` ichida ko‘rsatilgan:

```env
VITE_ADMIN_ONE_NAME=Admin ismi
VITE_ADMIN_ONE_PHONE=+998 90 000 00 00
VITE_ADMIN_TWO_NAME=Admin ismi
VITE_ADMIN_TWO_PHONE=+998 91 000 00 00
```

## Namunaviy kontentni almashtirish

- O‘qituvchi va xodim profillari: `src/data/team.js`
- O‘quvchi natijalari va ota-ona fikrlari: `src/data/results.js`
- Markaz hayoti rasmlari: `src/data/gallery.js`
- Kurslar, narxlar va faol guruhlar: `src/data/courses.js`
- Rasmiy hujjatlar va PDF manzillari: `src/data/documents.js`
- Namunaviy haftalik mock natijalari: `api/_data/mandates.js`
- Admin telefonlari va ijtimoiy tarmoqlar: `.env.local`

Haqiqiy ma’lumot kiritilgach, profil yoki natijadagi `demo: true` qiymatini `false` qiling.

## Deploy va SEO

`vercel.json` ichki React Router manzillarini qo‘llaydi. Vercel environment variables bo‘limiga `.env.example` dagi qiymatlarni kiriting. Deploydan oldin `your-domain.uz` qiymatini quyidagi joylarda haqiqiy domen bilan almashtiring:

- `.env.local` ichidagi `VITE_SITE_URL`
- `public/robots.txt`
- `public/sitemap.xml`

Sahifalarda alohida title, description, canonical, Open Graph va strukturali ma’lumotlar mavjud. Maxfiylik siyosati va rozilik belgisi ham forma bilan bog‘langan.

## Admin panelni ulash

Admin panel manzili: `/admin`. Panel kurslar va guruhlar, o‘qituvchilar, xodimlar, yangiliklar, natijalar, galereya, video fikrlar, hujjatlar, telefonlar, bosh sahifa matni va rasmini, statistika, mandat hamda arizalarni boshqaradi.

1. Supabase’da yangi loyiha yarating.
2. Dashboard → SQL Editor ichida `supabase/schema.sql` faylidagi SQL’ni ishga tushiring.
3. Dashboard → Authentication → Users orqali admin email va parolini yarating.
4. Yaratilgan foydalanuvchining UUID qiymatini olib, SQL Editor’da quyidagini ishga tushiring:

```sql
insert into public.admin_users(user_id)
values ('ADMIN_USER_UUID');
```

5. `.env.local` fayliga Supabase qiymatlarini qo‘shing:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...
```

`SUPABASE_SECRET_KEY` faqat serverda ishlaydi va GitHub’ga yuborilmaydi. Publishable key brauzerda ishlashi mumkin; ma’lumotlarni himoyalash `schema.sql` ichidagi Row Level Security siyosatlari orqali bajariladi.

6. `npm run dev` ni qayta ishga tushiring, `/admin` sahifasiga kirib login qiling va birinchi marta “Barcha o‘zgarishni saqlash” tugmasini bosing. Shu orqali namunaviy kontent bazaga yoziladi.

Rasm va PDF fayllar `site-media` Storage bucket’iga yuklanadi. Public sayt admin panelda saqlangan kontentni o‘qiydi; Supabase hali ulanmagan yoki vaqtincha ishlamasa, saytdagi mavjud namunaviy ma’lumotlar fallback sifatida ko‘rsatiladi.
