const courseNames = {
  english: "Ingliz tili",
  math: "Matematika",
  ielts: "IELTS tayyorlov",
  russian: "Rus tili",
  it: "IT savodxonlik",
  preschool: "Maktabga tayyorlov",
  consultation: "Maslahat kerak",
};

const timeNames = {
  any: "Istalgan vaqtda",
  morning: "Ertalab",
  afternoon: "Kunduzi",
  evening: "Kechqurun",
};
import { getSupabaseAdmin } from "./_lib/supabaseAdmin.js";

const requestLog = new Map();
const RATE_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT = 5;

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const getIp = (request) => String(request.headers["x-forwarded-for"] || request.socket?.remoteAddress || "unknown").split(",")[0].trim();

const isRateLimited = (ip) => {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter((time) => now - time < RATE_WINDOW);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT;
};

const readBody = (request) => {
  if (typeof request.body === "string") return JSON.parse(request.body);
  return request.body || {};
};

export const createTelegramMessage = ({ name, phone, course, courseTitle, time }) => [
  "<b>🟢 Bright Education — yangi ariza</b>",
  "",
  `<b>Ism:</b> ${escapeHtml(name)}`,
  `<b>Telefon:</b> ${escapeHtml(phone)}`,
  `<b>Kurs:</b> ${escapeHtml(courseNames[course] || courseTitle || course)}`,
  `<b>Qulay vaqt:</b> ${escapeHtml(timeNames[time] || time || "Ko‘rsatilmagan")}`,
  "",
  `<i>${new Intl.DateTimeFormat("uz-UZ", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Tashkent" }).format(new Date())}</i>`,
].join("\n");

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return response.status(503).json({ ok: false, message: "Telegram is not configured" });

  const ip = getIp(request);
  if (isRateLimited(ip)) return response.status(429).json({ ok: false, message: "Too many requests" });

  try {
    const data = readBody(request);
    const name = String(data.name || "").trim();
    const phone = String(data.phone || "").trim();
    const phoneDigits = phone.replace(/\D/g, "");

    if (data.website) return response.status(200).json({ ok: true });
    if (name.length < 2 || name.length > 80 || phoneDigits.length < 9 || phoneDigits.length > 15 || !/^[a-z0-9-]{2,40}$/i.test(data.course) || data.consent !== "on") {
      return response.status(400).json({ ok: false, message: "Invalid form data" });
    }

    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: createTelegramMessage({ ...data, name, phone }),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(9000),
    });

    const result = await telegramResponse.json();
    if (!telegramResponse.ok || !result.ok) throw new Error("Telegram request failed");
    const supabaseAdmin = getSupabaseAdmin();
    if (supabaseAdmin) await supabaseAdmin.from("inquiries").insert({ name, phone, course: data.course, preferred_time: data.time || "any" });
    return response.status(200).json({ ok: true });
  } catch {
    return response.status(500).json({ ok: false, message: "Could not send request" });
  }
}
