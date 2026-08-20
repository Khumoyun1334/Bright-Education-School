import webpush from "web-push";
import { getSupabaseAdmin } from "../_lib/supabaseAdmin.js";

const cleanText = (value, maxLength) => String(value || "").trim().slice(0, maxLength);

const authenticateAdmin = async (request, supabase) => {
  const token = String(request.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;
  const { data } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
  return data ? user : null;
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return response.status(503).json({ ok: false, message: "Supabase server kaliti sozlanmagan." });
  if (!await authenticateAdmin(request, supabase)) return response.status(401).json({ ok: false, message: "Faqat admin push yubora oladi." });

  const publicKey = process.env.VITE_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT;
  if (!publicKey || !privateKey || !subject) return response.status(503).json({ ok: false, message: "VAPID kalitlari sozlanmagan." });

  let body;
  try { body = typeof request.body === "string" ? JSON.parse(request.body) : request.body || {}; }
  catch { return response.status(400).json({ ok: false, message: "Noto‘g‘ri so‘rov." }); }

  const title = cleanText(body.title, 100);
  const message = cleanText(body.body, 220);
  const newsId = cleanText(body.newsId, 80).replace(/[^a-zA-Z0-9_-]/g, "");
  const url = /^\/news\/[a-zA-Z0-9_%.-]+$/.test(body.url || "") ? body.url : "/#news";
  if (!title || !message) return response.status(400).json({ ok: false, message: "Sarlavha va qisqa mazmun kerak." });

  const { data: subscriptions, error } = await supabase.from("push_subscriptions").select("endpoint,p256dh,auth");
  if (error) return response.status(500).json({ ok: false, message: "Obunachilarni olib bo‘lmadi." });
  if (!subscriptions?.length) return response.status(200).json({ ok: true, sent: 0, failed: 0 });

  webpush.setVapidDetails(subject, publicKey, privateKey);
  const payload = JSON.stringify({ title, body: message, url, tag: `bright-news-${newsId || "new"}` });
  const expired = [];
  let sent = 0;
  let failed = 0;

  await Promise.all(subscriptions.map(async (subscription) => {
    try {
      await webpush.sendNotification({ endpoint: subscription.endpoint, keys: { p256dh: subscription.p256dh, auth: subscription.auth } }, payload, { TTL: 24 * 60 * 60, urgency: "normal" });
      sent += 1;
    } catch (pushError) {
      failed += 1;
      if ([404, 410].includes(pushError.statusCode)) expired.push(subscription.endpoint);
    }
  }));

  if (expired.length) await supabase.from("push_subscriptions").delete().in("endpoint", expired);
  return response.status(200).json({ ok: true, sent, failed });
}
