export const adminSections = [
  { id: "settings", label: "Markaz ma’lumotlari", help: "Manzil, ijtimoiy tarmoqlar va bosh sahifa rasmi", kind: "object", fields: [
    { path: "centerName", label: "Markaz nomi", required: true },
    { path: "address", label: "Qisqa manzil", required: true },
    { path: "addressTitle", label: "Manzil sarlavhasi" },
    { path: "mapQuery", label: "Google xarita qidiruv manzili", help: "Masalan: Rishton Tibbiyot Texnikumi" },
    { path: "telegramUrl", label: "Telegram sahifa manzili", placeholder: "https://t.me/..." },
    { path: "instagramUrl", label: "Instagram sahifa manzili", placeholder: "https://instagram.com/..." },
    { path: "heroImage", label: "Bosh sahifa katta rasmi", type: "image" },
    { path: "heroBadge", label: "Bosh sahifa yuqori belgisi" },
    { path: "heroTitleStart", label: "Katta sarlavha — birinchi qism" },
    { path: "heroTitleAccent", label: "Katta sarlavha — yashil qism" },
    { path: "heroTitleEnd", label: "Katta sarlavha — oxirgi qism" },
    { path: "heroLead", label: "Bosh sahifa tavsifi", type: "textarea" },
  ] },
  { id: "admins", label: "Telefon raqamlar", singular: "administrator", fields: [
    { path: "name", label: "Ism yoki bo‘lim nomi", required: true }, { path: "role", label: "Vazifasi" },
    { path: "phone", label: "Telefon raqami", type: "tel", required: true }, { path: "schedule", label: "Ish vaqti" },
  ] },
  { id: "courses", label: "Kurslar va guruhlar", singular: "kurs", titlePath: "title", fields: [
    { path: "id", label: "Qisqa kod", help: "Masalan: english. Bo‘sh joy ishlatmang.", required: true },
    { path: "title", label: "Kurs nomi", required: true }, { path: "eyebrow", label: "Qisqa belgi" },
    { path: "accent", label: "Kartochka rangi", type: "select", options: [["green", "Yashil"], ["mint", "Och yashil"], ["lime", "Limon rang"], ["forest", "To‘q yashil"], ["sage", "Sokin yashil"], ["soft", "Yumshoq rang"]] },
    { path: "img", label: "Kurs rasmi", type: "image" }, { path: "description", label: "Qisqa tavsif", type: "textarea" },
    { path: "duration", label: "Davomiyligi" }, { path: "price", label: "Oylik narxi" },
    { path: "lessons", label: "Dars kunlari" }, { path: "classSize", label: "Guruh formati" },
    { path: "audience", label: "Kimlar uchun?", type: "textarea" },
    { path: "teacher.name", label: "Ustoz yoki jamoa nomi" }, { path: "teacher.role", label: "Ustoz yo‘nalishi" },
    { path: "teacher.note", label: "Ustoz haqida izoh", type: "textarea" },
    { path: "skills", label: "O‘rganiladigan ko‘nikmalar", type: "list" }, { path: "program", label: "Kurs dasturi", type: "list" },
    { path: "groups", label: "Faol guruhlar", type: "groups" },
  ] },
  { id: "team", label: "O‘qituvchi va xodimlar", singular: "xodim", titlePath: "name", fields: [
    { path: "name", label: "Ism-familiya", required: true }, { path: "role", label: "Lavozimi", required: true },
    { path: "photo", label: "Rasmi", type: "image" }, { path: "experience", label: "Tajribasi" },
    { path: "qualification", label: "Malakasi" }, { path: "description", label: "Xodim haqida", type: "textarea" },
    { path: "tag", label: "Yo‘nalish belgisi" }, { path: "type", label: "Turi", type: "select", options: [["teacher", "O‘qituvchi"], ["staff", "Xodim"]] },
    { path: "demo", label: "Namuna profili", type: "toggle" },
  ] },
  { id: "news", label: "Yangiliklar", singular: "yangilik", titlePath: "title", fields: [
    { path: "id", label: "Qisqa manzil kodi", required: true }, { path: "title", label: "Yangilik sarlavhasi", required: true },
    { path: "category", label: "Toifasi" }, { path: "status", label: "Holati" }, { path: "date", label: "Ko‘rinadigan sana" },
    { path: "isoDate", label: "Aniq sana", type: "date" }, { path: "image", label: "Yangilik rasmi", type: "image" },
    { path: "description", label: "Qisqa mazmun", type: "textarea" }, { path: "body", label: "Asosiy matn paragraflari", type: "list" },
    { path: "facts", label: "Muhim punktlar", type: "list" }, { path: "action", label: "Tugma matni" },
    { path: "href", label: "Tugma olib boradigan manzil", placeholder: "#aloqa yoki mandate" },
    { path: "featured", label: "Asosiy yangilik", type: "toggle" },
  ] },
  { id: "results", label: "O‘quvchi natijalari", singular: "natija", titlePath: "name", fields: [
    { path: "name", label: "O‘quvchi ismi", required: true }, { path: "course", label: "Kurs" },
    { path: "result", label: "Natija" }, { path: "label", label: "Avvalgi holat" }, { path: "duration", label: "Qancha vaqtda" },
    { path: "quote", label: "O‘quvchi fikri", type: "textarea" }, { path: "image", label: "O‘quvchi rasmi", type: "image" },
    { path: "demo", label: "Namuna natija", type: "toggle" },
  ] },
  { id: "gallery", label: "Galereya rasmlari", singular: "rasm", titlePath: "title", fields: [
    { path: "title", label: "Rasm nomi", required: true }, { path: "image", label: "Rasm", type: "image", required: true },
  ] },
  { id: "stories", label: "Video fikrlar", singular: "video fikr", titlePath: "name", fields: [
    { path: "name", label: "Ism", required: true }, { path: "result", label: "Kurs va natija" },
    { path: "quote", label: "Fikr matni", type: "textarea" }, { path: "image", label: "Muqova rasmi", type: "image" },
    { path: "video", label: "Video yoki YouTube manzili", placeholder: "https://..." },
  ] },
  { id: "documents", label: "Hujjatlar", singular: "hujjat", titlePath: "title", fields: [
    { path: "id", label: "Qisqa kod", required: true }, { path: "title", label: "Hujjat nomi", required: true },
    { path: "description", label: "Hujjat haqida", type: "textarea" }, { path: "number", label: "Hujjat raqami" },
    { path: "url", label: "PDF fayl", type: "file", accept: "application/pdf" },
  ] },
  { id: "stats", label: "Bosh sahifa raqamlari", singular: "raqam", titlePath: "label", fields: [
    { path: "value", label: "Katta raqam", required: true }, { path: "label", label: "Nomi", required: true }, { path: "note", label: "Izoh" },
  ] },
  { id: "parentQuotes", label: "Ota-onalar fikrlari", singular: "fikr", titlePath: "text", fields: [
    { path: "text", label: "Ota-ona fikri", type: "textarea", required: true },
  ] },
  { id: "monthlyProgress", label: "Oylik natija chizig‘i", singular: "oy", titlePath: "month", fields: [
    { path: "month", label: "Oy nomi", required: true }, { path: "value", label: "Natija foizi", type: "number", required: true },
  ] },
  { id: "courseProgress", label: "Kurslar statistikasi", singular: "kurs statistikasi", titlePath: "course", fields: [
    { path: "course", label: "Kurs nomi", required: true }, { path: "start", label: "Boshlang‘ich foiz", type: "number", required: true }, { path: "current", label: "Hozirgi foiz", type: "number", required: true },
  ] },
];

export const emptyItemFor = (section) => {
  const item = {};
  section.fields.forEach((field) => {
    if (field.type === "list" || field.type === "groups") item[field.path] = [];
    else if (field.type === "toggle") item[field.path] = false;
    else if (!field.path.includes(".")) item[field.path] = "";
  });
  if (section.id === "courses") item.teacher = { name: "", role: "", note: "" };
  return item;
};
