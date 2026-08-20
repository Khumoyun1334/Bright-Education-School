import { mandates } from "./_data/mandates.js";
import { getSupabaseAdmin } from "./_lib/supabaseAdmin.js";

const requestLog = new Map();
const RATE_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT = 20;

const isRateLimited = (ip) => {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter((time) => now - time < RATE_WINDOW);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT;
};

export const normalizeStudentName = (value) => String(value || "")
  .trim()
  .replace(/[‘’ʼʻ`]/g, "'")
  .replace(/\s+/g, " ")
  .toLocaleLowerCase("uz-UZ");

export const findMockResults = (fullName) => {
  const studentSearch = normalizeStudentName(fullName);
  return mandates
    .filter((item) => normalizeStudentName(item.fullName) === studentSearch)
    .sort((a, b) => b.mockDate.localeCompare(a.mockDate));
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const ip = String(request.headers["x-forwarded-for"] || request.socket?.remoteAddress || "unknown").split(",")[0].trim();
  if (isRateLimited(ip)) return response.status(429).json({ ok: false, message: "Too many requests" });

  let body;
  try {
    body = typeof request.body === "string" ? JSON.parse(request.body) : request.body || {};
  } catch {
    return response.status(400).json({ ok: false, result: null });
  }

  const fullName = String(body.fullName || "").trim();
  const studentSearch = normalizeStudentName(fullName);
  if (fullName.length < 5 || fullName.length > 100 || !/^[\p{L}\s'‘’ʼʻ-]+$/u.test(fullName)) {
    return response.status(400).json({ ok: false, results: [] });
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from("mock_results")
      .select("id,student_full_name,correct_answers,total_questions,course,group_name,mock_date")
      .eq("student_search", studentSearch)
      .order("mock_date", { ascending: false })
      .limit(12);
    if (error) return response.status(500).json({ ok: false, results: [] });
    const results = (data || []).map((item) => ({
      id: item.id,
      fullName: item.student_full_name,
      correctAnswers: item.correct_answers,
      totalQuestions: item.total_questions,
      course: item.course,
      group: item.group_name,
      mockDate: item.mock_date,
    }));
    return response.status(200).json({ ok: true, results });
  }
  return response.status(200).json({ ok: true, results: findMockResults(fullName) });
}
