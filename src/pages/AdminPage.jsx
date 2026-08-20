import { useEffect, useMemo, useState } from "react";
import { FiArrowLeft, FiArrowUp, FiCheck, FiChevronLeft, FiEdit3, FiFileText, FiImage, FiLogOut, FiMenu, FiPlus, FiSave, FiTrash2, FiUpload, FiUsers, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { adminSections, emptyItemFor } from "../admin/adminDefinitions";
import { useContent } from "../context/contentContext";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { sendNewsPush } from "../services/pushService";
import "../admin/admin.css";

const clone = (value) => JSON.parse(JSON.stringify(value));
const getPath = (object, path) => path.split(".").reduce((value, key) => value?.[key], object);
const setPath = (object, path, value) => {
  const keys = path.split(".");
  const next = clone(object);
  let target = next;
  keys.slice(0, -1).forEach((key) => { target[key] ??= {}; target = target[key]; });
  target[keys.at(-1)] = value;
  return next;
};

const MediaField = ({ value, onChange, accept = "image/*" }) => {
  const [uploading, setUploading] = useState(false);
  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) return window.alert("Fayl 10 MB dan kichik bo‘lishi kerak.");
    setUploading(true);
    const extension = file.name.split(".").pop()?.toLowerCase() || "file";
    const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("site-media").upload(path, file, { contentType: file.type, cacheControl: "31536000" });
    if (error) window.alert(`Fayl yuklanmadi: ${error.message}`);
    else onChange(supabase.storage.from("site-media").getPublicUrl(path).data.publicUrl);
    setUploading(false);
  };
  return <div className="admin-media-field">
    {accept.startsWith("image") && value && <img src={value} alt="Tanlangan" />}
    <input value={value || ""} onChange={(event) => onChange(event.target.value)} placeholder="Fayl manzili yoki yangi fayl tanlang" />
    <label className="admin-upload"><FiUpload /> {uploading ? "Yuklanmoqda..." : "Fayl tanlash"}<input type="file" accept={accept} onChange={upload} disabled={uploading} /></label>
  </div>;
};

const GroupsField = ({ value = [], onChange }) => {
  const update = (index, key, nextValue) => onChange(value.map((group, groupIndex) => groupIndex === index ? { ...group, [key]: nextValue } : group));
  return <div className="admin-groups-field">
    {value.map((group, index) => <article key={`${group.name}-${index}`}>
      <div><strong>{index + 1}-guruh</strong><button type="button" onClick={() => onChange(value.filter((_, groupIndex) => groupIndex !== index))}><FiTrash2 /> O‘chirish</button></div>
      <label>Guruh nomi<input value={group.name || ""} onChange={(event) => update(index, "name", event.target.value)} /></label>
      <label>Yosh<input value={group.age || ""} onChange={(event) => update(index, "age", event.target.value)} /></label>
      <label>Jadval<input value={group.schedule || ""} onChange={(event) => update(index, "schedule", event.target.value)} /></label>
      <label>Boshlanish sanasi<input value={group.startDate || ""} onChange={(event) => update(index, "startDate", event.target.value)} /></label>
      <label>Bo‘sh joy<input value={group.seats || ""} onChange={(event) => update(index, "seats", event.target.value)} /></label>
      <label>Filial<input value={group.branch || ""} onChange={(event) => update(index, "branch", event.target.value)} /></label>
    </article>)}
    <button className="admin-secondary-button" type="button" onClick={() => onChange([...value, { name: "Yangi guruh", age: "", schedule: "", startDate: "", seats: "", branch: "" }])}><FiPlus /> Guruh qo‘shish</button>
  </div>;
};

const AdminField = ({ field, item, onChange }) => {
  const value = getPath(item, field.path);
  const change = (nextValue) => onChange(setPath(item, field.path, nextValue));
  if (field.type === "image") return <label>{field.label}{field.help && <small>{field.help}</small>}<MediaField value={value} onChange={change} /></label>;
  if (field.type === "file") return <label>{field.label}<MediaField value={value} onChange={change} accept={field.accept || "*/*"} /></label>;
  if (field.type === "textarea") return <label>{field.label}{field.help && <small>{field.help}</small>}<textarea value={value || ""} onChange={(event) => change(event.target.value)} rows="4" required={field.required} /></label>;
  if (field.type === "list") return <label>{field.label}<small>Har bir qatorga bittadan yozing.</small><textarea value={(value || []).join("\n")} onChange={(event) => change(event.target.value.split("\n").filter(Boolean))} rows="5" /></label>;
  if (field.type === "groups") return <label className="admin-field-wide">{field.label}<GroupsField value={value} onChange={change} /></label>;
  if (field.type === "select") return <label>{field.label}<select value={value || ""} onChange={(event) => change(event.target.value)}>{field.options.map(([optionValue, label]) => <option value={optionValue} key={optionValue}>{label}</option>)}</select></label>;
  if (field.type === "toggle") return <label className="admin-toggle"><input type="checkbox" checked={Boolean(value)} onChange={(event) => change(event.target.checked)} /><span><strong>{field.label}</strong><small>Belgilansa saytda namuna deb ko‘rsatiladi.</small></span></label>;
  return <label>{field.label}{field.help && <small>{field.help}</small>}<input type={field.type || "text"} value={value ?? ""} onChange={(event) => change(field.type === "number" ? Number(event.target.value) : event.target.value)} placeholder={field.placeholder} required={field.required} /></label>;
};

const ContentEditor = ({ section, draft, setDraft }) => {
  const isObject = section.kind === "object";
  const items = isObject ? [draft[section.id] || {}] : draft[section.id] || [];
  const [selected, setSelected] = useState(0);
  const item = items[selected] || null;
  const updateItem = (nextItem) => setDraft((current) => {
    const next = clone(current);
    if (isObject) next[section.id] = nextItem;
    else next[section.id] = (next[section.id] || []).map((entry, index) => index === selected ? nextItem : entry);
    return next;
  });
  const addItem = () => {
    const nextIndex = items.length;
    setDraft((current) => ({ ...current, [section.id]: [...(current[section.id] || []), emptyItemFor(section)] }));
    setSelected(nextIndex);
  };
  const removeItem = () => {
    if (!window.confirm("Bu ma’lumotni o‘chirishni tasdiqlaysizmi?")) return;
    setDraft((current) => ({ ...current, [section.id]: current[section.id].filter((_, index) => index !== selected) }));
    setSelected(Math.max(0, selected - 1));
  };
  const moveItem = (direction) => {
    const target = selected + direction;
    if (target < 0 || target >= items.length) return;
    setDraft((current) => {
      const next = clone(current);
      [next[section.id][selected], next[section.id][target]] = [next[section.id][target], next[section.id][selected]];
      return next;
    });
    setSelected(target);
  };

  return <div className={`admin-content-editor ${isObject ? "admin-content-editor--single" : ""}`}>
    {!isObject && <aside className="admin-item-list">
      <button className="admin-add-button" type="button" onClick={addItem}><FiPlus /> Yangi {section.singular || "ma’lumot"}</button>
      {items.map((entry, index) => <button className={selected === index ? "active" : ""} type="button" onClick={() => setSelected(index)} key={`${getPath(entry, section.titlePath || section.fields[0].path)}-${index}`}><span>{index + 1}</span><strong>{getPath(entry, section.titlePath || section.fields[0].path) || "Yangi ma’lumot"}</strong><FiEdit3 /></button>)}
    </aside>}
    <section className="admin-edit-form">
      {item ? <>
        <div className="admin-edit-form__top"><div><small>Tahrirlash</small><h2>{isObject ? section.label : getPath(item, section.titlePath || section.fields[0].path) || `Yangi ${section.singular}`}</h2></div>{!isObject && <div><button type="button" title="Yuqoriga" onClick={() => moveItem(-1)} disabled={selected === 0}><FiArrowUp /></button><button type="button" className="danger" onClick={removeItem}><FiTrash2 /> O‘chirish</button></div>}</div>
        <div className="admin-fields">{section.fields.map((field) => <AdminField field={field} item={item} onChange={updateItem} key={field.path} />)}</div>
      </> : <div className="admin-empty"><FiFileText /><h2>Hozircha ma’lumot yo‘q</h2><button className="admin-add-button" type="button" onClick={addItem}><FiPlus /> Birinchi ma’lumotni qo‘shish</button></div>}
    </section>
  </div>;
};

const normalizeStudentName = (value) => value.trim().replace(/[‘’ʼʻ`]/g, "'").replace(/\s+/g, " ").toLocaleLowerCase("uz-UZ");

const MockResultsEditor = () => {
  const emptyForm = { student_full_name: "", correct_answers: "", total_questions: "", course: "", group_name: "", mock_date: "" };
  const [items, setItems] = useState([]); const [form, setForm] = useState(emptyForm); const [editingId, setEditingId] = useState(null);
  const load = async () => { const { data } = await supabase.from("mock_results").select("*").order("mock_date", { ascending: false }); setItems(data || []); };
  useEffect(() => { let active = true; void supabase.from("mock_results").select("*").order("mock_date", { ascending: false }).then(({ data }) => { if (active) setItems(data || []); }); return () => { active = false; }; }, []);
  const save = async (event) => { event.preventDefault(); const correctAnswers = Number(form.correct_answers); const totalQuestions = Number(form.total_questions); if (correctAnswers > totalQuestions) return window.alert("To‘g‘ri javoblar jami savollardan ko‘p bo‘lishi mumkin emas."); if (new Date(`${form.mock_date}T00:00:00`).getDay() !== 6) return window.alert("Mock test sanasi shanba kuni bo‘lishi kerak."); const fullName = form.student_full_name.trim().replace(/\s+/g, " "); const payload = { student_full_name: fullName, student_search: normalizeStudentName(fullName), correct_answers: correctAnswers, total_questions: totalQuestions, course: form.course.trim(), group_name: form.group_name.trim(), mock_date: form.mock_date, updated_at: new Date().toISOString() }; const query = editingId ? supabase.from("mock_results").update(payload).eq("id", editingId) : supabase.from("mock_results").insert(payload); const { error } = await query; if (error) return window.alert(error.message); setForm(emptyForm); setEditingId(null); load(); };
  const remove = async (item) => { if (!window.confirm(`${item.student_full_name}ning ${item.mock_date} kungi natijasini o‘chirasizmi?`)) return; await supabase.from("mock_results").delete().eq("id", item.id); load(); };
  return <div className="admin-database-page"><form className="admin-record-form" onSubmit={save}><h2>{editingId ? "Mock natijasini tahrirlash" : "Haftalik mock natijasini qo‘shish"}</h2><p>O‘quvchining to‘liq ism-familiyasi va shanba kungi test natijasini kiriting.</p><div><label>To‘liq ism-familiya<input value={form.student_full_name} onChange={(e) => setForm({ ...form, student_full_name: e.target.value })} placeholder="Masalan: Ali Valiyev" minLength="5" maxLength="100" required /></label><label>To‘g‘ri javoblar<input type="number" min="0" value={form.correct_answers} onChange={(e) => setForm({ ...form, correct_answers: e.target.value })} placeholder="27" required /></label><label>Jami savollar<input type="number" min="1" value={form.total_questions} onChange={(e) => setForm({ ...form, total_questions: e.target.value })} placeholder="30" required /></label><label>Yo‘nalish<input value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} placeholder="Ingliz tili" required /></label><label>Guruh<input value={form.group_name} onChange={(e) => setForm({ ...form, group_name: e.target.value })} placeholder="English A2 · 14:00" required /></label><label>Mock test sanasi (shanba)<input type="date" value={form.mock_date} onChange={(e) => setForm({ ...form, mock_date: e.target.value })} required /></label></div><button className="admin-save-button" type="submit"><FiSave /> Natijani saqlash</button></form><div className="admin-record-list"><h2>Saqlangan mock natijalari</h2>{items.map((item) => <article key={item.id}><div><strong>{item.student_full_name}</strong><span>{item.correct_answers}/{item.total_questions} · {item.course} · {item.mock_date}</span></div><button type="button" onClick={() => { setForm({ student_full_name: item.student_full_name, correct_answers: item.correct_answers, total_questions: item.total_questions, course: item.course, group_name: item.group_name, mock_date: item.mock_date }); setEditingId(item.id); }}><FiEdit3 /> Tahrirlash</button><button type="button" className="danger" onClick={() => remove(item)}><FiTrash2 /></button></article>)}</div></div>;
};

const InquiriesEditor = () => {
  const [items, setItems] = useState([]);
  const load = async () => { const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false }); setItems(data || []); };
  useEffect(() => { let active = true; void supabase.from("inquiries").select("*").order("created_at", { ascending: false }).then(({ data }) => { if (active) setItems(data || []); }); return () => { active = false; }; }, []);
  const updateStatus = async (id, status) => { await supabase.from("inquiries").update({ status }).eq("id", id); load(); };
  return <div className="admin-inquiries"><div><h2>Saytdan kelgan arizalar</h2><p>Telegramga yuborilgan arizalar baza ulanganidan keyin shu yerda ham saqlanadi.</p></div>{items.length ? items.map((item) => <article key={item.id}><span className={`admin-inquiry-status status-${item.status}`}>{item.status === "done" ? "Yakunlandi" : "Yangi"}</span><h3>{item.name}</h3><Link to={`tel:${item.phone}`}>{item.phone}</Link><p>{item.course} · {item.preferred_time || "Vaqt tanlanmagan"}</p><time>{new Date(item.created_at).toLocaleString("uz-UZ")}</time><button type="button" onClick={() => updateStatus(item.id, item.status === "done" ? "new" : "done")}><FiCheck /> {item.status === "done" ? "Qayta ochish" : "Yakunlandi"}</button></article>) : <div className="admin-empty"><FiUsers /><h2>Hozircha ariza yo‘q</h2></div>}</div>;
};

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const submit = async (event) => { event.preventDefault(); setLoading(true); setError(""); const { error: authError } = await supabase.auth.signInWithPassword({ email, password }); if (authError) setError("Email yoki parol noto‘g‘ri."); else onLogin(); setLoading(false); };
  return <main className="admin-login"><section><Link to="/"><FiArrowLeft /> Saytga qaytish</Link><div className="admin-login__brand"><img src="/favicon.svg" alt="" /><span>Bright Education<strong>Admin panel</strong></span></div><h1>Boshqaruv paneliga kirish</h1><p>Ma’lumotlarni o‘zgartirish uchun administrator email va parolini kiriting.</p><form onSubmit={submit}><label>Email manzil<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required /></label><label>Parol<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /></label>{error && <p className="admin-login__error">{error}</p>}<button type="submit" disabled={loading}>{loading ? "Tekshirilmoqda..." : "Kirish"}</button></form></section></main>;
};

const AdminPage = () => {
  const { content, setContent } = useContent();
  const [session, setSession] = useState(null); const [checking, setChecking] = useState(isSupabaseConfigured); const [authorized, setAuthorized] = useState(false);
  const [draft, setDraft] = useState(() => clone(content)); const [sectionId, setSectionId] = useState("settings"); const [saving, setSaving] = useState(false); const [saved, setSaved] = useState(false); const [menuOpen, setMenuOpen] = useState(false);
  const sections = useMemo(() => [...adminSections, { id: "mandates", label: "Haftalik mock natijalari", special: true }, { id: "inquiries", label: "Kelgan arizalar", special: true }], []);
  const section = sections.find((entry) => entry.id === sectionId);

  const verify = async () => { const { data: { session: nextSession } } = await supabase.auth.getSession(); setSession(nextSession); if (!nextSession) { setAuthorized(false); setChecking(false); return; } const { data } = await supabase.from("admin_users").select("user_id").eq("user_id", nextSession.user.id).maybeSingle(); setAuthorized(Boolean(data)); setChecking(false); };
  useEffect(() => { if (!supabase) return undefined; void Promise.resolve().then(verify); const { data } = supabase.auth.onAuthStateChange(() => { void verify(); }); return () => data.subscription.unsubscribe(); }, []);
  useEffect(() => { void Promise.resolve().then(() => setDraft(clone(content))); }, [content]);
  const save = async () => { setSaving(true); setSaved(false); const previousNewsIds = new Set((content.news || []).map((item) => item.id)); const newNews = (draft.news || []).filter((item) => item.id && item.title && item.description && !previousNewsIds.has(item.id)); const { error } = await supabase.from("site_content").upsert({ id: "main", content: draft, updated_at: new Date().toISOString(), updated_by: session.user.id }); if (error) window.alert(`Saqlanmadi: ${error.message}`); else { setContent(draft); setSaved(true); setTimeout(() => setSaved(false), 2500); if (newNews.length) { try { const deliveries = await Promise.all(newNews.map((item) => sendNewsPush(item, session.access_token))); const sent = deliveries.reduce((total, result) => total + (result.sent || 0), 0); window.alert(sent ? `Yangilik saqlandi va ${sent} ta qurilmaga bildirishnoma yuborildi.` : "Yangilik saqlandi. Hozircha push-bildirishnomaga obuna bo‘lgan foydalanuvchi yo‘q."); } catch (pushError) { window.alert(`Yangilik saqlandi, lekin push yuborilmadi: ${pushError.message}`); } } } setSaving(false); };

  if (!isSupabaseConfigured) return <main className="admin-setup"><section><FiFileText /><h1>Admin panelni bazaga ulash kerak</h1><p>Supabase loyiha yarating, <code>supabase/schema.sql</code> faylini SQL Editor’da ishga tushiring va `.env.local` ga URL hamda publishable key yozing.</p><pre>VITE_SUPABASE_URL=https://...supabase.co{"\n"}VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...</pre><Link className="button button--dark" to="/">Saytga qaytish</Link></section></main>;
  if (checking) return <div className="admin-loading"><span /> Tekshirilmoqda...</div>;
  if (!session) return <AdminLogin onLogin={verify} />;
  if (!authorized) return <main className="admin-setup"><section><FiX /><h1>Bu foydalanuvchiga admin huquqi berilmagan</h1><p>Supabase’dagi foydalanuvchi UUID qiymatini <code>admin_users</code> jadvaliga qo‘shing.</p><button className="button button--dark" onClick={() => supabase.auth.signOut()}>Chiqish</button></section></main>;

  return <main className="admin-shell">
    <aside className={`admin-sidebar ${menuOpen ? "admin-sidebar--open" : ""}`}><div className="admin-sidebar__brand"><img src="/favicon.svg" alt="" /><span>Bright Education<strong>Boshqaruv</strong></span><button type="button" onClick={() => setMenuOpen(false)}><FiX /></button></div><nav>{sections.map((entry, index) => <button className={sectionId === entry.id ? "active" : ""} type="button" onClick={() => { setSectionId(entry.id); setMenuOpen(false); }} key={entry.id}><span>{String(index + 1).padStart(2, "0")}</span>{entry.label}</button>)}</nav><div className="admin-sidebar__bottom"><Link to="/"><FiChevronLeft /> Saytni ko‘rish</Link><button type="button" onClick={() => supabase.auth.signOut()}><FiLogOut /> Chiqish</button></div></aside>
    <section className="admin-main"><header className="admin-topbar"><button className="admin-menu-button" type="button" onClick={() => setMenuOpen(true)}><FiMenu /></button><div><small>Admin panel</small><h1>{section.label}</h1></div>{!section.special && <button className={`admin-save-button ${saved ? "saved" : ""}`} type="button" onClick={save} disabled={saving}>{saved ? <><FiCheck /> Saqlandi</> : <><FiSave /> {saving ? "Saqlanmoqda..." : "Barcha o‘zgarishni saqlash"}</>}</button>}</header><div className="admin-workspace">{sectionId === "mandates" ? <MockResultsEditor /> : sectionId === "inquiries" ? <InquiriesEditor /> : <ContentEditor key={section.id} section={section} draft={draft} setDraft={setDraft} />}</div></section>
    {menuOpen && <button className="admin-sidebar-backdrop" type="button" aria-label="Menyuni yopish" onClick={() => setMenuOpen(false)} />}
  </main>;
};

export default AdminPage;
