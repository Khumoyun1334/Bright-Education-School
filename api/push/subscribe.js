import { getSupabaseAdmin } from "../_lib/supabaseAdmin.js";

const requestLog = new Map();
const isRateLimited = (ip) => {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter((time) => now - time < 10 * 60 * 1000);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > 12;
};

const readBody = (request) => {
  if (typeof request.body === "string") return JSON.parse(request.body);
  return request.body || {};
};

const validEndpoint = (value) => typeof value === "string" && value.length <= 2000 && /^https:\/\//.test(value);

export default async function handler(request, response) {
  if (!['POST', 'DELETE'].includes(request.method)) {
    response.setHeader("Allow", "POST, DELETE");
    return response.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const ip = String(request.headers["x-forwarded-for"] || request.socket?.remoteAddress || "unknown").split(",")[0].trim();
  if (isRateLimited(ip)) return response.status(429).json({ ok: false, message: "Juda ko‘p urinish qilindi." });

  let body;
  try { body = readBody(request); } catch { return response.status(400).json({ ok: false, message: "Noto‘g‘ri so‘rov." }); }
  const supabase = getSupabaseAdmin();
  if (!supabase) return response.status(503).json({ ok: false, message: "Push bazasi sozlanmagan." });

  if (request.method === "DELETE") {
    const endpoint = body.endpoint;
    if (!validEndpoint(endpoint)) return response.status(400).json({ ok: false, message: "Endpoint noto‘g‘ri." });
    const { error } = await supabase.from("push_subscriptions").delete().eq("endpoint", endpoint);
    if (error) return response.status(500).json({ ok: false, message: "Obunani o‘chirib bo‘lmadi." });
    return response.status(200).json({ ok: true });
  }

  const subscription = body.subscription;
  const endpoint = subscription?.endpoint;
  const p256dh = subscription?.keys?.p256dh;
  const auth = subscription?.keys?.auth;
  if (!validEndpoint(endpoint) || typeof p256dh !== "string" || !p256dh || typeof auth !== "string" || !auth) {
    return response.status(400).json({ ok: false, message: "Push obunasi noto‘g‘ri." });
  }

  const { error } = await supabase.from("push_subscriptions").upsert({
    endpoint,
    p256dh,
    auth,
    user_agent: String(request.headers["user-agent"] || "").slice(0, 500),
    updated_at: new Date().toISOString(),
  }, { onConflict: "endpoint" });
  if (error) return response.status(500).json({ ok: false, message: "Push obunasini saqlab bo‘lmadi." });
  return response.status(200).json({ ok: true });
}
