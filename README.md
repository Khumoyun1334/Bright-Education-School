# Bright Education School

O‘quv markazi uchun React + Vite asosidagi responsiv veb-sayt.

## Ishga tushirish

```bash
npm install
npm run dev
```

Production build va kod tekshiruvi:

```bash
npm run lint
npm run build
```

## Ariza formasi

Frontend formani `VITE_CONTACT_ENDPOINT` manziliga yuboradi. Qiymat berilmasa, standart `/api/contact` endpoint ishlatiladi. Endpoint quyidagi JSON maydonlarini `POST` orqali qabul qilishi kerak:

```json
{
  "name": "Aziz",
  "phone": "+998 90 123 45 67",
  "course": "english",
  "time": "evening"
}
```

Telegram bot tokenini frontendga yoki `VITE_` bilan boshlanuvchi environment variable ichiga joylamang — bunday qiymatlar brauzer bundle’ida ochiq ko‘rinadi. Bot integratsiyasi serverdagi `/api/contact` orqali bajarilishi kerak.

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

Haqiqiy ma’lumot kiritilgach, profil yoki natijadagi `demo: true` qiymatini `false` qiling.
