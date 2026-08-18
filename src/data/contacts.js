export const admins = [
  {
    name: import.meta.env.VITE_ADMIN_ONE_NAME || "Qabul bo‘limi administratori",
    role: "Kurslar, guruhlar va ro‘yxatdan o‘tish",
    phone: import.meta.env.VITE_ADMIN_ONE_PHONE || "+998 90 000 00 01",
    schedule: "Dushanba–Shanba, 09:00–19:00",
  },
  {
    name: import.meta.env.VITE_ADMIN_TWO_NAME || "O‘quv bo‘limi administratori",
    role: "Davomat, jadval va o‘quv jarayoni",
    phone: import.meta.env.VITE_ADMIN_TWO_PHONE || "+998 90 000 00 02",
    schedule: "Dushanba–Shanba, 09:00–18:00",
  },
];

export const phoneHref = (phone) => `tel:${phone.replace(/\s/g, "")}`;
